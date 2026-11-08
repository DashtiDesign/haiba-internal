import { useEffect, useRef, useState } from "react";

/**
 * The hub mascot (8 Nov). Real animated loops made with Seedance 2.0 from the mascot reference sheet.
 * When the hub opens he plays one reveal, picked at random (shades on, or the coin trick). Then he holds still for a few
 * seconds, plays the short idle (hair, breathing, a blink), holds still again, and so on until the next tap.
 * Each tap plays the other reveal, then the same rest and idle rhythm.
 * Every loop starts and ends on the still frame, so the swaps never jump.
 * When the phone asks for less motion he stays on the still pose.
 *
 * Files (8 Nov): all four are 412 x 560, so the loops and the still are equally sharp.
 * The loops are animated AVIF (about 1 MB for all three), with WebP copies for phones that cannot play animated
 * AVIF. Each phone downloads one format only. Only the first reveal loads before he moves; the other reveal and
 * the idle load quietly after it.
 */
// Both loops and the still are cut with the same crop, 970 x 1320 at (280, 0) of the 1440 video, so the bird lines up
// across swaps. box = where the image sits inside the 184 x 254 bird box (left, top, width, height).
const LOOPS = [
  { name: "hub-shades", ms: 6000 },
  { name: "hub-coin", ms: 6000 },
];
const BOX = [-27, -45, 220, 300] as const;
const STILL = "/haiba/motion/hub-still.webp";
// Plays once, 3.9 s (hair, breathing, a blink). Starts and ends on the still frame, the same as the reveals.
const IDLE = "hub-idle";
const IDLE_MS = 3900;
// He holds the still pose this long (random in the range) before each idle.
const REST_MS = [4000, 6000] as const;

// A 1 x 1 AVIF with alpha. If it decodes, the browser reads AVIF.
const AVIF_TEST =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAAGGbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAACxpbG9jAAAAAEQAAAIAAQAAAAEAAAHCAAAAIQACAAAAAQAAAa4AAAAUAAAAQmlpbmYAAAAAAAIAAAAaaW5mZQIAAAAAAQAAYXYwMUNvbG9yAAAAABppbmZlAgAAAAACAABhdjAxQWxwaGEAAAAAGmlyZWYAAAAAAAAADmF1eGwAAgABAAEAAADDaXBycAAAAJ1pcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAAA5waXhpAAAAAAEIAAAADGF2MUOBABwAAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAeaXBtYQAAAAAAAAACAAEEAQKDBAACBAEFhgcAAAA9bWRhdBIACgQYAAYVMgoYACihAAIhHctgEgAKCBgABogIaDQgMhMZR4eGIYeeeeaAAACQQMkcYUK+";

/**
 * Animated AVIF or WebP. Apple devices only play animated AVIF correctly from iOS 16.4.1 and macOS 13.3.1
 * (WebKit bug 248755), and every iPhone browser and the Unipal app use WebKit, so older Apple versions get WebP.
 * Everyone else gets AVIF when a test image decodes.
 */
let formatOnce: Promise<"avif" | "webp"> | null = null;
function loopFormat(): Promise<"avif" | "webp"> {
  if (formatOnce) return formatOnce;
  formatOnce = (async () => {
    const ua = navigator.userAgent;
    const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))? like Mac OS X/);
    if (ios) {
      const [maj, min, patch] = [Number(ios[1]), Number(ios[2]), Number(ios[3] ?? 0)];
      const ok = maj > 16 || (maj === 16 && (min > 4 || (min === 4 && patch >= 1)));
      if (!ok) return "webp";
    } else if (/Macintosh/.test(ua) && /Version\/(\d+)/.test(ua) && !/Chrome|Firefox/.test(ua)) {
      const v = Number(
        ua
          .match(/Version\/(\d+)\.(\d+)/)
          ?.slice(1)
          .join(".") ?? 0,
      );
      if (v < 16.5) return "webp";
    }
    try {
      const img = new Image();
      img.src = AVIF_TEST;
      await img.decode();
      return img.naturalWidth > 0 ? "avif" : "webp";
    } catch {
      return "webp";
    }
  })();
  return formatOnce;
}

// Some hosts send .avif without an image type, so only an HTML page (a missing file) is turned away.
const isImage = (r: Response) => r.ok && !(r.headers.get("content-type") ?? "").startsWith("text/");

export default function HubBird({ onTap }: { onTap?: () => void }) {
  // The image now showing. Each play gets a fresh object URL, so the animation always starts from frame one.
  const [src, setSrc] = useState<string>(STILL);
  const reduced = useRef(false);
  const ext = useRef<"avif" | "webp">("webp");
  const last = useRef(-1);
  const plays = useRef(0);
  const blobs = useRef<(Blob | undefined)[]>([]);
  const idle = useRef<Blob | undefined>(undefined);
  const timer = useRef<number | undefined>(undefined);
  const live = useRef<string | null>(null);

  const url = (name: string) => `/haiba/motion/${name}.${ext.current}`;

  const playLoop = (i: number) => {
    last.current = i;
    plays.current += 1;
    const b = blobs.current[i];
    // Not loaded yet (a fast tap): the browser loads it straight from the file.
    const u = b ? URL.createObjectURL(b) : `${url(LOOPS[i]!.name)}?p=${plays.current}`;
    show(u, !!b);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(settle, LOOPS[i]!.ms);
  };

  // After a reveal or an idle he holds the still pose for a few seconds, then plays the idle once.
  const settle = () => {
    show(STILL, false);
    window.clearTimeout(timer.current);
    const rest = REST_MS[0] + Math.random() * (REST_MS[1] - REST_MS[0]);
    timer.current = window.setTimeout(playIdle, rest);
  };

  const playIdle = () => {
    if (!idle.current) return settle();
    show(URL.createObjectURL(idle.current), true);
    timer.current = window.setTimeout(settle, IDLE_MS);
  };

  const show = (u: string, isObject: boolean) => {
    const old = live.current;
    live.current = isObject ? u : null;
    setSrc(u);
    if (old) window.setTimeout(() => URL.revokeObjectURL(old), 500);
  };

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    // The still shows first (about 20 KB). Then the random first reveal loads and plays.
    // The other reveal and the idle load one after the other once it is playing.
    const first = Math.floor(Math.random() * LOOPS.length);
    const other = (first + 1) % LOOPS.length;
    let alive = true;
    const get = (name: string) =>
      fetch(url(name))
        .then((r) => (isImage(r) ? r.blob() : undefined))
        .catch(() => undefined);
    (async () => {
      ext.current = await loopFormat();
      if (!alive) return;
      blobs.current[first] = await get(LOOPS[first]!.name);
      if (!alive) return;
      if (blobs.current[first] && last.current === -1) playLoop(first);
      blobs.current[other] = await get(LOOPS[other]!.name);
      if (!alive) return;
      idle.current = await get(IDLE);
    })();
    return () => {
      alive = false;
      window.clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tap = () => {
    onTap?.();
    if (!reduced.current) playLoop((last.current + 1) % LOOPS.length);
  };

  return (
    <button aria-label="Say hi to the Haiba bird" onClick={tap} className="hb-hubbird">
      <img
        src={src}
        style={{ left: BOX[0], top: BOX[1], width: BOX[2], height: BOX[3] }}
        alt=""
        width={220}
        height={300}
        decoding="async"
      />
    </button>
  );
}
