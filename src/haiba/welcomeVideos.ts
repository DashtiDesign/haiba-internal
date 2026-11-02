import video1 from "@/assets/haiba/welcome/step-1.mp4.asset.json";
import still1 from "@/assets/haiba/welcome/step-1.webp.asset.json";
import video2 from "@/assets/haiba/welcome/step-2.mp4.asset.json";
import still2 from "@/assets/haiba/welcome/step-2.webp.asset.json";
import video4 from "@/assets/haiba/welcome/step-4.mp4.asset.json";
import still4 from "@/assets/haiba/welcome/step-4.webp.asset.json";
import video5 from "@/assets/haiba/welcome/step-5.mp4.asset.json";
import still5 from "@/assets/haiba/welcome/step-5.webp.asset.json";

export const welcomeVideos = {
  1: { src: video1.url, poster: still1.url },
  2: { src: video2.url, poster: still2.url },
  4: { src: video4.url, poster: still4.url },
  5: { src: video5.url, poster: still5.url },
} as const;
export type VideoStep = keyof typeof welcomeVideos;