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
 * <id>-idle.avif / .webp (and <id>-card.webp for a wide look's thumbnail).
 *
 * Where they live (12 Nov): the public "bird-looks" folder in Lovable Cloud storage, so a new look is an upload, not a
 * code change. VITE_HAIBA_LOOKS_URL can point somewhere else (for example a local copy while testing).
 */
const CLOUD = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const RAW_URL =
  (import.meta.env["VITE_HAIBA_LOOKS_URL"] as string | undefined) ||
  (CLOUD ? `${CLOUD}/storage/v1/object/public/bird-looks/` : "/haiba/motion/looks/");
export const LOOKS_URL = RAW_URL.endsWith("/") ? RAW_URL : `${RAW_URL}/`;

/** Looks that have their files made. padL / padR: extra px left and right of the 412 px classic width. */
export const LOOK_FILES: Record<
  string,
  { ms: number; idleMs: number; padL?: number; padR?: number }
> = {
  gold: { ms: 6000, idleMs: 4000 },
  f1: { ms: 6000, idleMs: 4000 },
  dragon: { ms: 6000, idleMs: 4000, padL: 64, padR: 31 },
  football: { ms: 6000, idleMs: 4000, padL: 17, padR: 36 },
  pearl: { ms: 6000, idleMs: 4000 },
};

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
  f1: "Audi F1",
  gold: "Golden parrot",
  dragon: "Dragon rider",
};

export const CLASSIC_STILL = "/haiba/motion/hub-still.webp";

/** The thumbnail of a look (classic bird until its files are made). */
export function lookThumb(id: string) {
  const f = LOOK_FILES[id];
  if (!f) return CLASSIC_STILL;
  return `${LOOKS_URL}${id}-${f.padL || f.padR ? "card" : "still"}.webp`;
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
  return cachedBlob(`${LOOKS_URL}${id}-${kind}.${ext}`);
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

declare global {
  interface Window {
    __hbLooks?: {
      has: (id: string) => boolean;
      preview: (id: string) => Promise<string | null>;
      thumb: (id: string) => string;
    };
  }
}

// The ported canvas boards (the points store) call these through window, as boards cannot import modules.
if (typeof window !== "undefined") {
  window.__hbLooks = {
    has: (id) => id === "classic" || !!LOOK_FILES[id],
    preview,
    thumb: lookThumb,
  };
}
