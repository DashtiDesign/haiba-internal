import video1 from "@/assets/haiba/welcome/smooth-original-background-1.mp4.asset.json";
import still1 from "@/assets/haiba/welcome/original-background-1.webp.asset.json";
import video2 from "@/assets/haiba/welcome/smooth-clean-step-2.mp4.asset.json";
import still2 from "@/assets/haiba/welcome/clean-step-2.webp.asset.json";
import video3 from "@/assets/haiba/welcome/smooth-step-3.mp4.asset.json";
import still3 from "@/assets/haiba/welcome/polished-step-3.webp.asset.json";
import video4 from "@/assets/haiba/welcome/smooth-edge-to-edge-4.mp4.asset.json";
import still4 from "@/assets/haiba/welcome/empty-start-4.webp.asset.json";
import video5 from "@/assets/haiba/welcome/smooth-clean-step-5.mp4.asset.json";
import still5 from "@/assets/haiba/welcome/clean-step-5.webp.asset.json";

export const welcomeVideos = {
  1: { src: video1.url, poster: still1.url, rate: 2 },
  2: { src: video2.url, poster: still2.url, rate: 2 },
  3: { src: video3.url, poster: still3.url, rate: 2 },
  4: { src: video4.url, poster: still4.url, rate: 1 },
  5: { src: video5.url, poster: still5.url, rate: 1 },
} as const;
export type VideoStep = keyof typeof welcomeVideos;