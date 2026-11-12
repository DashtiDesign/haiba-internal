/**
 * 12 Nov: bird looks. Students buy a look with points in the points store (a "Bird looks" row on /haiba/rewards,
 * tap one to preview it) and pick the one their hub bird wears in their profile (/haiba/membership#bird).
 * The hub button next to the bird opens that profile section.
 *
 * Files are pulled only when they are needed: the hub loads the look you wear, the store loads a look when you tap
 * it to preview. Each file is kept in memory for the visit, so going back and forth never downloads it twice.
 * Nothing is bundled into the page.
 *
 * A look is made like the classic hub bird: a still, one action loop (6 s) and one idle (4 s), every loop starting and
 * ending on the still, 412 x 560 (wider for looks that move past the classic box), animated AVIF with a WebP copy.
 * tools/key_look.py makes them from the Seedance videos. Files: <id>-still.webp, <id>-reveal.avif / .webp,
 * <id>-idle.avif / .webp.
 *
 * Where they live (12 Nov): the public "bird-looks" folder in Lovable Cloud storage, so a new look is an upload, not a
 * code change. VITE_HAIBA_LOOKS_URL can point somewhere else (for example a local copy while testing).
 */
import { resetPrototypeLooks } from "./resetPrototypeLooks";

const CLOUD = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const RAW_URL =
  (import.meta.env["VITE_HAIBA_LOOKS_URL"] as string | undefined) ||
  (CLOUD ? `${CLOUD}/storage/v1/object/public/bird-looks/` : "/haiba/motion/looks/");
export const LOOKS_URL = RAW_URL.endsWith("/") ? RAW_URL : `${RAW_URL}/`;

/**
 * Looks that have their files made. padL / padR: extra px left and right of the 412 px classic width. padT: extra px
 * above the 560 px classic height (12 Nov, for looks that fly or throw above his head). His feet never move.
 */
export const LOOK_FILES: Record<
  string,
  {
    ms: number;
    idleMs: number;
    padL?: number;
    padR?: number;
    padT?: number;
    name?: string;
    still?: string;
    sound?: string;
  }
> = {
  // name: the files' prefix when it is not the id. 12 Nov (evening): every look was checked frame by frame so nothing
  // is cut at an edge. Gold, F1, dragon and football were made again with more room around him, so their files are
  // *-wide-* (Cloud keeps old names). The falcon's flight and the dragon's fire reach the edge on purpose and fade out.
  gold: { ms: 6000, idleMs: 4000, padL: 51, padR: 20, padT: 43, name: "gold-wide" },
  f1: { ms: 6000, idleMs: 4000, padL: 58, padR: 16, padT: 30, name: "f1-wide" },
  dragon: { ms: 6000, idleMs: 4000, padL: 422, padR: 271, padT: 404, name: "dragon-wide" },
  football: { ms: 6000, idleMs: 4000, padR: 74, padT: 26, name: "football-wide" },
  pearl: { ms: 6000, idleMs: 4000, padL: 82, padR: 43, name: "pearl-wide" },
  karak: { ms: 6000, idleMs: 4000, padL: 66, padR: 31, name: "karak-wide" },
  falcon: { ms: 6000, idleMs: 4000, padL: 244, padR: 304, padT: 307 },
  // Thobe looks: the majlis greeting (agal, hand on chest, a small wave). Ghutra in Bahrain, shemagh in Saudi.
  ghutra: { ms: 6000, idleMs: 4000 },
  // 12 Nov: the first look with sound, the viral Bahraini fish clip everyone knows as "Abood Yowda".
  // The sound (fish-sound.m4a, 70 KB) sits in the same Cloud folder and loads on the first tap.
  // fish-v2 (12 Nov, night): the action now ends on him standing up with the fish, so it no longer blends two poses at
  // the end. New file names so phones that kept the first version load the new one. The still is unchanged.
  fish: {
    ms: 6000,
    idleMs: 4000,
    padL: 249,
    padR: 190,
    padT: 125,
    name: "fish-v2",
    still: "fish-still.webp",
    sound: "fish-sound.m4a",
  },
  // 12 Nov (night): Hamdha, the second sound look (Bahrain only). The viral clip of the old man who tastes the
  // watermelon and says "7aam'6a" (sour). A slice pops into his wings, he eats it all, his face goes sour on the word,
  // then he settles back. The sound is the clip from 9.0 s to just before the laugh (6.5 s), so the word lands at
  // about 5.8 s, on the sour face. 8 s action because he keeps chewing sour after the word.
  melon: { ms: 8100, idleMs: 4000, padR: 51, sound: "melon-sound.m4a" },
  shemagh: { ms: 6000, idleMs: 4000 },
};

/** How tall a look's image is against the classic 560 px, so previews can keep his size the same. */
export const lookHeight = (id: string) => (560 + (LOOK_FILES[id]?.padT ?? 0)) / 560;

/** The start of a look's file names (its id unless the look names its files). */
export const lookFile = (id: string) => LOOK_FILES[id]?.name ?? id;

/**
 * Where the bird's feet are across a look's image, as a % of its width. Every file puts his feet 188.5 px in from the
 * left of the 412 px classic box (where the hub needs him), plus any extra width on the left. Previews and tiles
 * centre on this, not on the image, so every look stands in the middle.
 */
export function lookAnchor(id: string) {
  const f = LOOK_FILES[id];
  const l = f?.padL ?? 0;
  const r = f?.padR ?? 0;
  return ((l + 188.5) / (412 + l + r)) * 100;
}

/** Names for the profile picker. Keep in step with the LOOKS list on the points store board (Rewards.dc.html). */
export const LOOK_NAMES: Record<string, string> = {
  classic: "Classic",
  karak: "Karak break",
  movie: "Movie night",
  skater: "Skater",
  football: "Football star",
  ghutra: "Thobe and ghutra",
  shemagh: "Thobe and shemagh",
  pearl: "Pearl diver",
  falcon: "Falcon friend",
  camp: "Desert camp",
  dunes: "Dune drive",
  space: "Space walk",
  pixel: "Pixel bird",
  fish: "Abood Yowda",
  melon: "Hamdha",
  f1: "Audi F1",
  gold: "Golden parrot",
  dragon: "Dragon rider",
};

export const CLASSIC_STILL = "/haiba/motion/hub-still.webp";

/** The thumbnail of a look (classic bird until its files are made). */
export function lookThumb(id: string) {
  return lookStill(id);
}

/** The still the hub rests on (412 wide, or wider for a wide look). */
export function lookStill(id: string) {
  const f = LOOK_FILES[id];
  if (!f) return CLASSIC_STILL;
  return `${LOOKS_URL}${f.still ?? `${lookFile(id)}-still.webp`}`;
}

// Saved on the phone, the same keys the prototype has used since 12 Nov.
export function savedLook(): string {
  resetPrototypeLooks();
  try {
    return window.localStorage.getItem("haiba-look") || "classic";
  } catch {
    return "classic";
  }
}
export function ownedLooks(): string[] {
  resetPrototypeLooks();
  try {
    const v = JSON.parse(window.localStorage.getItem("haiba-looks-owned") || '["classic"]');
    return Array.isArray(v) && v.length ? v : ["classic"];
  } catch {
    return ["classic"];
  }
}
export function wearLook(id: string) {
  try {
    window.localStorage.setItem("haiba-look", id);
  } catch {
    /* private mode: the look is not kept */
  }
}

// A 1 x 1 AVIF with alpha. If it decodes, the browser reads AVIF.
const AVIF_TEST =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAAGGbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAACxpbG9jAAAAAEQAAAIAAQAAAAEAAAHCAAAAIQACAAAAAQAAAa4AAAAUAAAAQmlpbmYAAAAAAAIAAAAaaW5mZQIAAAAAAQAAYXYwMUNvbG9yAAAAABppbmZlAgAAAAACAABhdjAxQWxwaGEAAAAAGmlyZWYAAAAAAAAADmF1eGwAAgABAAEAAADDaXBycAAAAJ1pcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAAA5waXhpAAAAAAEIAAAADGF2MUOBABwAAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAeaXBtYQAAAAAAAAACAAEEAQKDBAACBAEFhgcAAAA9bWRhdBIACgQYAAYVMgoYACihAAIhHctgEgAKCBgABogIaDQgMhMZR4eGIYeeeeaAAACQQMkcYUK+";

/**
 * Animated AVIF or WebP. Apple devices only play animated AVIF correctly from iOS 16.4.1 and macOS 13.3.1
 * (WebKit bug 248755), and every iPhone browser and the Unipal app use WebKit, so older Apple versions get WebP.
 * Everyone else gets AVIF when a test image decodes.
 */
let formatOnce: Promise<"avif" | "webp"> | null = null;
export function loopFormat(): Promise<"avif" | "webp"> {
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

// One download per file per visit. A failed download is forgotten, so the next try fetches again.
const files = new Map<string, Promise<Blob | undefined>>();
export function cachedBlob(url: string): Promise<Blob | undefined> {
  let p = files.get(url);
  if (!p) {
    p = fetch(url)
      .then((r) => (isImage(r) ? r.blob() : undefined))
      .catch(() => undefined)
      .then((b) => {
        if (!b) files.delete(url);
        return b;
      });
    files.set(url, p);
  }
  return p;
}

/** A look's action or idle loop, from memory after the first time. */
export async function lookLoop(id: string, kind: "reveal" | "idle"): Promise<Blob | undefined> {
  if (!LOOK_FILES[id]) return undefined;
  const ext = await loopFormat();
  return cachedBlob(`${LOOKS_URL}${lookFile(id)}-${kind}.${ext}`);
}

/**
 * 12 Nov (night): sound runs on Web Audio. The old audio element sometimes stayed silent (a late pause from the unlock
 * step could land after the real play) and started late on phones. Web Audio starts on the exact moment the action
 * shows. Each sound is downloaded and decoded once per visit. On iPhone it follows the silent switch.
 */
type AudioCtor = typeof AudioContext;
let ctx: AudioContext | null = null;
function audioCtx(): AudioContext | null {
  if (ctx) return ctx;
  const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
  const C = w.AudioContext ?? w.webkitAudioContext;
  if (!C) return null;
  try {
    ctx = new C();
    // every look sound goes through one volume knob, so Sound off and on only mutes, never restarts anything
    gain = ctx.createGain();
    gain.gain.value = lookSoundOff() ? 0 : 1;
    gain.connect(ctx.destination);
  } catch {
    return null;
  }
  return ctx;
}
let gain: GainNode | null = null;
/** Call from a tap: phones only start sound after one. Later plays on the page are then allowed. */
export function unlockLookSound() {
  const c = audioCtx();
  if (c && c.state !== "running") void c.resume().catch(() => undefined);
}
const buffers = new Map<string, Promise<AudioBuffer | undefined>>();
function soundBuffer(id: string): Promise<AudioBuffer | undefined> {
  const f = LOOK_FILES[id]?.sound;
  const c = audioCtx();
  if (!f || !c) return Promise.resolve(undefined);
  let p = buffers.get(id);
  if (!p) {
    p = fetch(`${LOOKS_URL}${f}`)
      .then((r) => (r.ok ? r.arrayBuffer() : undefined))
      .then((ab) =>
        ab ? new Promise<AudioBuffer>((res, rej) => c.decodeAudioData(ab, res, rej)) : undefined,
      )
      .catch(() => undefined)
      .then((b) => {
        if (!b) buffers.delete(id);
        return b;
      });
    buffers.set(id, p);
  }
  return p;
}
export const lookHasSound = (id: string) => !!LOOK_FILES[id]?.sound;

/** Sound on or off for looks, the student's choice from the Looks page (saved on the phone, on by default). */
export function lookSoundOff(): boolean {
  try {
    return window.localStorage.getItem("haiba-look-sound") === "off";
  } catch {
    return false;
  }
}
export function setLookSoundOff(off: boolean) {
  try {
    window.localStorage.setItem("haiba-look-sound", off ? "off" : "on");
  } catch {
    /* private mode: the choice lasts for this visit only */
  }
  // 12 Nov (night): the switch only mutes or unmutes. The animation and the sound keep their place.
  if (gain) gain.gain.value = off ? 0 : 1;
  if (!off) {
    unlockLookSound();
    soundWanted?.();
  }
}
let playing: AudioBufferSourceNode | null = null;
/** Stops the look sound that is playing (another look was picked, or the page closed). */
export function stopLookSounds() {
  try {
    playing?.stop();
  } catch {
    /* already ended */
  }
  playing = null;
}
// offset: seconds into the sound, to join an action already playing in time
function startSound(b: AudioBuffer, offset = 0) {
  const c = audioCtx();
  if (!c || !gain) return;
  stopLookSounds();
  const src = c.createBufferSource();
  src.buffer = b;
  src.connect(gain);
  src.start(0, offset);
  playing = src;
}
/** Plays a look's sound from the start, from the hub tap. The sound starts once it is ready (one short download). */
export function playLookSound(id: string) {
  unlockLookSound();
  stopLookSounds();
  if (lookSoundOff()) return;
  const want = ++soundAsk;
  void soundBuffer(id).then((b) => {
    if (b && want === soundAsk) startSound(b);
  });
}
let soundAsk = 0;

// A fresh address per play, decoded before it shows, so the animation starts on frame one right when the sound does.
async function readyUrl(b: Blob): Promise<string> {
  const u = URL.createObjectURL(b);
  const img = new Image();
  img.src = u;
  try {
    await img.decode();
  } catch {
    /* shows anyway */
  }
  return u;
}
const idleFile = async (id: string) =>
  id === "classic"
    ? cachedBlob(`/haiba/motion/hub-idle.${await loopFormat()}`)
    : lookLoop(id, "idle");
const actionFile = async (id: string) =>
  id === "classic"
    ? cachedBlob(`/haiba/motion/hub-coin.${await loopFormat()}`)
    : lookLoop(id, "reveal");
// Pause between two actions on the Looks page when a look has no idle file: he holds still this long.
const PREVIEW_GAP_MS = 4000;

/**
 * 12 Nov (night): the Looks page stage plays a look on repeat: the action, a 4 s idle, the action again, and so on.
 * With sound (after a tap, never when the page opens) the sound starts again with every action, so it can never drift.
 * show() gets each new image address. Only the newest call keeps running.
 */
let run = 0;
let shown: string | null = null;
// Set while a preview runs: Sound on calls it, so a look that opened silent joins its sound in time.
let soundWanted: (() => void) | null = null;
let timer: number | undefined;
export function stopLookPreview() {
  run += 1;
  soundWanted = null;
  window.clearTimeout(timer);
  stopLookSounds();
}
async function playPreview(id: string, withSound: boolean, show: (src: string | null) => void) {
  stopLookPreview();
  const me = run;
  const live = () => me === run;
  if (withSound) unlockLookSound();
  // loaded even when Sound is off, so turning it on mid action just unmutes it
  const sound = withSound && lookHasSound(id) ? soundBuffer(id) : null;
  const action = await actionFile(id);
  if (!live()) return;
  if (!action) return show(null);
  // wait for the sound too (it is small), but never more than 2 s, so a slow sound does not hold the look back
  let buf = sound
    ? await Promise.race([
        sound,
        new Promise<undefined>((r) => setTimeout(() => r(undefined), 2000)),
      ])
    : undefined;
  if (!live()) return;
  const swap = (u: string) => {
    const old = shown;
    shown = u;
    show(u);
    if (old) window.setTimeout(() => URL.revokeObjectURL(old), 500);
  };
  const ms = id === "classic" ? 6000 : (LOOK_FILES[id]?.ms ?? 6000);
  const idleMs = id === "classic" ? 3900 : (LOOK_FILES[id]?.idleMs ?? 4000);
  let actionAt = 0;
  let inAction = false;
  soundWanted = () => {
    if (buf || !lookHasSound(id)) return;
    void soundBuffer(id).then((b) => {
      if (!b || !live() || buf) return;
      buf = b;
      const at = (performance.now() - actionAt) / 1000;
      if (inAction && at < b.duration) startSound(b, at);
    });
  };
  const loop = async () => {
    const u = await readyUrl(action);
    if (!live()) return URL.revokeObjectURL(u);
    swap(u);
    actionAt = performance.now();
    inAction = true;
    if (buf) startSound(buf);
    timer = window.setTimeout(async () => {
      inAction = false;
      const idle = await idleFile(id);
      if (!live()) return;
      if (idle) swap(await readyUrl(idle));
      if (!live()) return;
      timer = window.setTimeout(loop, idle ? idleMs : PREVIEW_GAP_MS);
    }, ms);
  };
  void loop();
}

/** Downloads and decodes a look's sound ahead of the first tap (the hub does this for the look he wears). */
export function preloadLookSound(id: string) {
  if (lookHasSound(id)) void soundBuffer(id);
}

declare global {
  interface Window {
    __hbLooks?: {
      has: (id: string) => boolean;
      play?: (id: string, withSound: boolean, show: (src: string | null) => void) => void;
      stopPreview?: () => void;
      stop?: () => void;
      soundOff?: () => boolean;
      setSoundOff?: (off: boolean) => void;
      thumb: (id: string) => string;
    };
  }
}

// The ported canvas boards (the points store) call these through window, as boards cannot import modules.
if (typeof window !== "undefined") {
  window.__hbLooks = {
    has: (id) => id === "classic" || !!LOOK_FILES[id],
    play: (id, withSound, show) => void playPreview(id, withSound, show),
    stopPreview: stopLookPreview,
    stop: stopLookSounds,
    soundOff: lookSoundOff,
    setSoundOff: setLookSoundOff,
    thumb: lookThumb,
  };
}
