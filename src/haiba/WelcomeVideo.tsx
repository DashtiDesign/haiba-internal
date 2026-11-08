import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { welcomeVideos, type VideoStep } from "./welcomeVideos";
import { createTransparentRenderer } from "./transparentVideo";

export default function WelcomeVideo({ step }: { step: VideoStep }) {
  const asset = welcomeVideos[step];
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locked = useRef(false);
  const attempt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video || locked.current) return;
    locked.current = true;
    const id = ++attempt.current;
    setPlaying(true);
    setHasFrame(false);
    video.currentTime = 0;
    video.defaultPlaybackRate = asset.rate;
    video.playbackRate = asset.rate;
    // Only the latest attempt may unlock; stale aborted plays (e.g. remounts) are ignored.
    void video.play().catch(() => {
      if (id !== attempt.current) return;
      locked.current = false;
      setPlaying(false);
      setHasFrame(false);
    });
  }, [asset.rate]);

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
    // Each newly mounted step plays once; the final-frame poster covers loading.
    replay();
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

  const finish = () => {
    locked.current = false;
    setPlaying(false);
    setHasFrame(false);
  };
  return (
    <Button
      variant="ghost"
      className="hb-welcome-video-stage"
      aria-label={`Replay welcome animation ${step}`}
      aria-disabled={playing}
      onClick={replay}
    >
      <img
        src={asset.poster}
        width={720}
        height={720}
        alt=""
        className={hasFrame ? "hb-welcome-still hb-welcome-still-hidden" : "hb-welcome-still"}
        fetchPriority={step === 1 ? "high" : "auto"}
      />
      <canvas
        ref={canvasRef}
        width={720}
        height={720}
        className="hb-welcome-video-canvas"
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        src={asset.src}
        crossOrigin="anonymous"
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
        aria-hidden="true"
        className="hb-welcome-video-source"
      />
    </Button>
  );
}
