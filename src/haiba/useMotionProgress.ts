import { useEffect, useState } from "react";
import { animate } from "motion";
import { useReducedMotion } from "motion/react";

/** A short, cancellable count-up; reduced-motion users see final values immediately. */
export function useMotionProgress() {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const animation = animate(0, 1, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setProgress,
    });
    return () => animation.stop();
  }, [reduced]);
  return progress;
}