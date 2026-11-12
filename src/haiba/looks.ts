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
  // The sound (fish-sound.m4a, 84 KB) sits in the same Cloud folder and loads on the first tap.
  fish: { ms: 5600, idleMs: 4000, padL: 249, padR: 190, padT: 125, sound: "fish-sound.m4a" },
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
  try {
    return window.localStorage.getItem("haiba-look") || "classic";
  } catch {
    return "classic";
  }
}
export function ownedLooks(): string[] {
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

// The store preview loops the action and keeps one object URL per look, so reopening it is instant.
const previews = new Map<string, string>();
async function preview(id: string): Promise<string | null> {
  const have = previews.get(id);
  if (have) return have;
  // The classic bird previews with his coin trick, the same file the hub plays.
  const b =
    id === "classic"
      ? await cachedBlob(`/haiba/motion/hub-coin.${await loopFormat()}`)
      : await lookLoop(id, "reveal");
  if (!b) return null;
  const u = URL.createObjectURL(b);
  previews.set(id, u);
  return u;
}

/**
 * 12 Nov: looks with sound (recreations of viral clips). The sound plays only when the student taps: the bird on the hub,
 * or a look in the store. Never when a page opens. Each sound starts with the action, so the two stay in time.
 * Sounds are small (under 100 KB), live in the same Cloud folder as the looks and load on the first tap.
 */
const sounds = new Map<string, HTMLAudioElement>();
function lookAudio(id: string): HTMLAudioElement | null {
  const f = LOOK_FILES[id]?.sound;
  if (!f) return null;
  let a = sounds.get(id);
  if (!a) {
    a = new Audio(`${LOOKS_URL}${f}`);
    a.preload = "auto";
    sounds.set(id, a);
  }
  return a;
}
export const lookHasSound = (id: string) => !!LOOK_FILES[id]?.sound;

/** Sound on or off for looks, the student's choice from the Bird looks page (saved on the phone, on by default). */
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
  if (off) stopLookSounds();
}
/** Stops every look sound (another look was picked, or the page closed). */
export function stopLookSounds() {
  sounds.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
}
/** Plays a look's sound from the start. Call it from the tap itself (phones only allow sound after a tap). */
export function playLookSound(id: string) {
  stopLookSounds();
  if (lookSoundOff()) return;
  const a = lookAudio(id);
  if (!a) return;
  a.currentTime = 0;
  void a.play().catch(() => {
    /* sound blocked or not loaded: the look still plays */
  });
}

/**
 * The store's tap: the action plays from its first frame together with the sound. Called during the tap, so the sound
 * is allowed; while the action loads the sound waits (paused on its first frame), then both start together.
 */
let fresh: string | null = null;
async function previewTap(id: string): Promise<string | null> {
  stopLookSounds();
  const a = lookSoundOff() ? null : lookAudio(id);
  if (a) {
    a.muted = true;
    void a
      .play()
      .then(() => a.pause())
      .catch(() => undefined);
  }
  await preview(id);
  const b = id === "classic" ? undefined : await lookLoop(id, "reveal");
  if (!b) return previews.get(id) ?? null;
  // a new address each time, so the animation starts on frame one with the sound
  if (fresh) URL.revokeObjectURL(fresh);
  fresh = URL.createObjectURL(b);
  if (a) {
    a.muted = false;
    a.currentTime = 0;
    void a.play().catch(() => undefined);
  }
  return fresh;
}

declare global {
  interface Window {
    __hbLooks?: {
      has: (id: string) => boolean;
      preview: (id: string) => Promise<string | null>;
      tap?: (id: string) => Promise<string | null>;
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
    preview,
    tap: previewTap,
    stop: stopLookSounds,
    soundOff: lookSoundOff,
    setSoundOff: setLookSoundOff,
    thumb: lookThumb,
  };
}
