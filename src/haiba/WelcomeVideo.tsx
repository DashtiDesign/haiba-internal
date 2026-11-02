import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { welcomeVideos, type VideoStep } from "./welcomeVideos";
import { createTransparentRenderer } from "./transparentVideo";

export default function WelcomeVideo({ step }: { step: VideoStep }) {
  const asset = welcomeVideos[step];
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locked = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video || locked.current) return;
    locked.current = true;
    setPlaying(true);
    setHasFrame(false);
    video.currentTime = 0;
    void video.play().catch(() => { locked.current = false; setPlaying(false); setHasFrame(false); });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const renderer = createTransparentRenderer(canvas);
    let frameId = 0;
    let animationId = 0;
    let active = true;
    const draw = () => {
      if (!active || !locked.current) return;
      if (renderer?.draw(video)) setHasFrame(true);
      if (video.requestVideoFrameCallback) frameId = video.requestVideoFrameCallback(draw);
      else animationId = requestAnimationFrame(draw);
    };
    video.addEventListener("playing", draw);
    // Step 1 deliberately stays on its exact final-frame still until tapped.
    if (step !== 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) replay();
    return () => {
      active = false;
      locked.current = false;
      video.removeEventListener("playing", draw);
      video.pause();
      if (frameId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameId);
      cancelAnimationFrame(animationId);
      renderer?.dispose();
    };
  }, [replay, step]);

  const finish = () => { locked.current = false; setPlaying(false); setHasFrame(false); };
  return (
    <Button variant="ghost" className="hb-welcome-video-stage" aria-label={`Replay welcome animation ${step}`} aria-disabled={playing} onClick={replay}>
      <img src={asset.poster} width={480} height={480} alt="" className={hasFrame ? "hb-welcome-still hb-welcome-still-hidden" : "hb-welcome-still"} fetchPriority={step === 1 ? "high" : "auto"} />
      <canvas ref={canvasRef} width={480} height={480} className="hb-welcome-video-canvas" aria-hidden="true" />
      <video ref={videoRef} src={asset.src} crossOrigin="anonymous" muted playsInline preload={step === 1 ? "none" : "auto"} onEnded={finish} onError={finish} aria-hidden="true" className="hb-welcome-video-source" />
    </Button>
  );
}