import { useEffect, useRef, useState } from "react";

/**
 * The hub mascot (8 Nov). Real animated loops made with Seedance 2.0 from the mascot reference sheet.
 * When the hub opens he plays one reveal, picked at random (shades on, or the coin trick). Then he holds still for a few
 * seconds, plays the short idle (hair, breathing, a blink), holds still again, and so on until the next tap.
 * Each tap plays the other reveal, then the same rest and idle rhythm.
 * Every loop starts and ends on the still frame, so the swaps never jump.
 * When the phone asks for less motion he stays on the still pose.
 */
// Both loops and the still are cut with the same crop, 970 x 1320 at (280, 0) of the 1440 video, so the bird lines up
// across swaps. box = where the image sits inside the 184 x 254 bird box (left, top, width, height).
const LOOPS = [
  { src: "/haiba/motion/hub-shades.webp", ms: 6000 },
  { src: "/haiba/motion/hub-coin.webp", ms: 6000 },
];
const BOX = [-27, -45, 220, 300] as const;
const STILL = "/haiba/motion/hub-still.webp";
// Plays once, 3.9 s (hair, breathing, a blink). Starts and ends on the still frame, the same as the reveals.
const IDLE = "/haiba/motion/hub-idle.webp";
const IDLE_MS = 3900;
// He holds the still pose this long (random in the range) before each idle.
const REST_MS = [4000, 6000] as const;

export default function HubBird({ onTap }: { onTap?: () => void }) {
  // The image now showing. Each play gets a fresh object URL, so the animation always starts from frame one.
  const [src, setSrc] = useState<string>(STILL);
  const reduced = useRef(false);
  const last = useRef(-1);
  const plays = useRef(0);
  const blobs = useRef<(Blob | undefined)[]>([]);
  const idle = useRef<Blob | undefined>(undefined);
  const timer = useRef<number | undefined>(undefined);
  const live = useRef<string | null>(null);

  const playLoop = (i: number) => {
    last.current = i;
    plays.current += 1;
    const b = blobs.current[i];
    const u = b ? URL.createObjectURL(b) : `${LOOPS[i]!.src}?p=${plays.current}`;
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
    // The still shows first (about 25 KB). The loops (about 1 MB each) load once, and the random first loop
    // plays as soon as it has loaded, unless a tap already started one.
    const first = Math.floor(Math.random() * LOOPS.length);
    let alive = true;
    fetch(IDLE)
      .then((r) =>
        r.ok && r.headers.get("content-type")?.startsWith("image/") ? r.blob() : undefined,
      )
      .then((b) => (idle.current = b ?? undefined))
      .catch(() => undefined);
    LOOPS.forEach((l, i) => {
      fetch(l.src)
        .then((r) => r.blob())
        .then((b) => {
          blobs.current[i] = b;
          if (alive && i === first && last.current === -1) playLoop(first);
        })
        .catch(() => undefined);
    });
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
