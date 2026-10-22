// Original canvas paths remain stable; delivery uses immutable optimized assets.
import bird0 from "../assets/haiba/01-cheer.webp.asset.json";
import bird1 from "../assets/haiba/02-jump.webp.asset.json";
import bird2 from "../assets/haiba/03-wink.webp.asset.json";
import bird3 from "../assets/haiba/04-peek.webp.asset.json";
import bird4 from "../assets/haiba/05-shrug.webp.asset.json";
import bird5 from "../assets/haiba/06-coin.webp.asset.json";
import bird6 from "../assets/haiba/07-phone.webp.asset.json";
import bird7 from "../assets/haiba/08-stamp.webp.asset.json";
import bird8 from "../assets/haiba/09-show.webp.asset.json";
import bird9 from "../assets/haiba/10-gift.webp.asset.json";
import bird10 from "../assets/haiba/11-run.webp.asset.json";
import bird11 from "../assets/haiba/12-ledge.webp.asset.json";
import bird12 from "../assets/haiba/13-fist.webp.asset.json";
import bird13 from "../assets/haiba/14-sit.webp.asset.json";
import bird14 from "../assets/haiba/15-receipt.webp.asset.json";
import bird15 from "../assets/haiba/16-torn.webp.asset.json";

export const artwork = {
  "/haiba/birds/01-cheer.png": { src: bird0.url, width: 382, height: 700 },
  "/haiba/birds/02-jump.png": { src: bird1.url, width: 446, height: 700 },
  "/haiba/birds/03-wink.png": { src: bird2.url, width: 535, height: 700 },
  "/haiba/birds/04-peek.png": { src: bird3.url, width: 270, height: 700 },
  "/haiba/birds/05-shrug.png": { src: bird4.url, width: 437, height: 700 },
  "/haiba/birds/06-coin.png": { src: bird5.url, width: 396, height: 700 },
  "/haiba/birds/07-phone.png": { src: bird6.url, width: 460, height: 700 },
  "/haiba/birds/08-stamp.png": { src: bird7.url, width: 340, height: 700 },
  "/haiba/birds/09-show.png": { src: bird8.url, width: 288, height: 700 },
  "/haiba/birds/10-gift.png": { src: bird9.url, width: 269, height: 700 },
  "/haiba/birds/11-run.png": { src: bird10.url, width: 700, height: 698 },
  "/haiba/birds/12-ledge.png": { src: bird11.url, width: 604, height: 700 },
  "/haiba/birds/13-fist.png": { src: bird12.url, width: 493, height: 700 },
  "/haiba/birds/14-sit.png": { src: bird13.url, width: 498, height: 700 },
  "/haiba/birds/15-receipt.png": { src: bird14.url, width: 416, height: 700 },
  "/haiba/birds/16-torn.png": { src: bird15.url, width: 325, height: 700 },
} as const;

export function imagePreload(path: keyof typeof artwork) {
  return { rel: "preload", as: "image", href: artwork[path].src, type: "image/webp", fetchPriority: "high" } as const;
}
