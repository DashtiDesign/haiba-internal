import { useEffect, useRef, useState } from "react";
import {
  CLASSIC_STILL,
  LOOKS_URL,
  LOOK_FILES,
  cachedBlob,
  lookFile,
  lookHasSound,
  lookStill,
  loopFormat,
  playLookSound,
  preloadLookSound,
  savedLook,
  stopLookSounds,
} from "./looks";

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
 *
 * 12 Nov: bird looks (see looks.ts). The look the student wears swaps in its own still, action and idle, with the same
 * rhythm. Only that look's files are pulled, and they come from memory if the store already loaded them.
 */
// Both loops and the still are cut with the same crop, 970 x 1320 at (280, 0) of the 1440 video, so the bird lines up
// across swaps. box = where the image sits inside the 184 x 254 bird box (left, top, width, height).
const BOX = [-27, -45, 220, 300] as const;
const PX = BOX[2] / 412; // css px per image px
// How far his soles sit below the top of the hub page (the button is 21 px down, his soles 246 px into it).
const HUB_ROOM = 267;
// He holds the still pose this long (random in the range) before each idle.
const REST_MS = [4000, 6000] as const;

type Look = {
  still: string;
  loops: { url: (ext: string) => string; ms: number }[];
  idle?: (ext: string) => string;
  idleMs: number;
  box: readonly [number, number, number, number];
};
const motion = (name: string) => (ext: string) => `/haiba/motion/${name}.${ext}`;
const CLASSIC: Look = {
  still: CLASSIC_STILL,
  loops: [
    { url: motion("hub-shades"), ms: 6000 },
    { url: motion("hub-coin"), ms: 6000 },
  ],
  // Plays once, 3.9 s (hair, breathing, a blink). Starts and ends on the still frame, the same as the reveals.
  idle: motion("hub-idle"),
  idleMs: 3900,
  box: BOX,
};

function currentLook(): Look {
  const id = savedLook();
  const f = LOOK_FILES[id];
  if (!f) return CLASSIC;
  const file = (kind: string) => (ext: string) => `${LOOKS_URL}${lookFile(id)}-${kind}.${ext}`;
  // A wide look (the dragon) keeps his feet in the same spot and adds room left, right and on top.
  const l = f.padL ?? 0;
  const r = f.padR ?? 0;
  const t = f.padT ?? 0;
  // room below his feet (the puppy): the image just reaches lower, his feet stay on the same line
  const b = f.padB ?? 0;
  // 12 Nov: the hub has little room above his head, so a look that reaches high (the falcon's flight, the dragon) is
  // drawn a little smaller, just enough that nothing goes past the top of the screen. His feet stay put.
  const s = Math.min(1, HUB_ROOM / ((545 + t - 20) * PX));
  const feetX = BOX[0] + 188.5 * PX;
  const solesY = BOX[1] + 545 * PX;
  return {
    still: lookStill(id),
    loops: [{ url: file("reveal"), ms: f.ms }],
    idle: file("idle"),
    idleMs: f.idleMs,
    box: [
      feetX - (l + 188.5) * PX * s,
      solesY - (545 + t) * PX * s,
      (412 + l + r) * PX * s,
      (560 + t + b) * PX * s,
    ],
  };
}

export default function HubBird({ onTap }: { onTap?: () => void }) {
  // The image now showing. Each play gets a fresh object URL, so the animation always starts from frame one.
  // The server cannot see the phone's saved look, so the page first renders the classic bird and the saved look
  // takes over once the page is running (no hydration mismatch).
  const lookRef = useRef<Look>(CLASSIC);
  const [src, setSrc] = useState<string>(CLASSIC.still);
  const [box, setBox] = useState<Look["box"]>(BOX);
  const reduced = useRef(false);
  const ext = useRef<"avif" | "webp">("webp");
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
    // Not loaded yet (a fast tap): the browser loads it straight from the file.
    const u = b
      ? URL.createObjectURL(b)
      : `${lookRef.current.loops[i]!.url(ext.current)}?p=${plays.current}`;
    show(u, !!b);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(settle, lookRef.current.loops[i]!.ms);
  };

  // After a reveal or an idle he holds the still pose for a few seconds, then plays the idle once.
  const settle = () => {
    show(lookRef.current.still, false);
    window.clearTimeout(timer.current);
    const rest = REST_MS[0] + Math.random() * (REST_MS[1] - REST_MS[0]);
    timer.current = window.setTimeout(playIdle, rest);
  };

  const playIdle = () => {
    if (!idle.current) return settle();
    show(URL.createObjectURL(idle.current), true);
    timer.current = window.setTimeout(settle, lookRef.current.idleMs);
  };

  const show = (u: string, isObject: boolean) => {
    const old = live.current;
    live.current = isObject ? u : null;
    setSrc(u);
    if (old) window.setTimeout(() => URL.revokeObjectURL(old), 500);
  };

  useEffect(() => {
    const look = currentLook();
    lookRef.current = look;
    if (look !== CLASSIC) {
      setSrc(look.still);
      setBox(look.box);
    }
    // A look with sound gets its sound ready now, so the first tap starts both together.
    preloadLookSound(savedLook());
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    // The still shows first (about 20 KB). Then the random first reveal loads and plays.
    // The other reveal and the idle load one after the other once it is playing.
    const first = Math.floor(Math.random() * look.loops.length);
    const other = (first + 1) % look.loops.length;
    let alive = true;
    (async () => {
      ext.current = await loopFormat();
      if (!alive) return;
      blobs.current[first] = await cachedBlob(look.loops[first]!.url(ext.current));
      if (!alive) return;
      if (blobs.current[first] && last.current === -1) playLoop(first);
      if (other !== first)
        blobs.current[other] = await cachedBlob(look.loops[other]!.url(ext.current));
      if (!alive) return;
      if (look.idle) idle.current = await cachedBlob(look.idle(ext.current));
    })();
    return () => {
      alive = false;
      window.clearTimeout(timer.current);
      stopLookSounds();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tap = () => {
    onTap?.();
    if (reduced.current) return;
    playLoop((last.current + 1) % lookRef.current.loops.length);
    // A look with sound plays it with the action, only on a tap (never when the hub opens).
    const id = savedLook();
    if (lookHasSound(id)) playLookSound(id);
  };

  return (
    <button aria-label="Say hi to the Haiba parrot" onClick={tap} className="hb-hubbird">
      <img
        src={src}
        // A wide look (the falcon's flight, the dragon) reaches past the button; only the bird area takes the tap.
        style={{ left: box[0], top: box[1], width: box[2], height: box[3], pointerEvents: "none" }}
        alt=""
        width={Math.round(box[2])}
        height={Math.round(box[3])}
        decoding="async"
      />
    </button>
  );
}
