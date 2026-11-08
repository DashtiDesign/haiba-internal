import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Taps feel instant (8 Nov): each screen's code is its own small file that used to load on the first tap,
 * so the first visit to every screen waited on the network. Once the first screen is up and the phone is idle,
 * this loads the code for every other screen in the background, one at a time.
 */
export default function PreloadScreens() {
  const router = useRouter();
  useEffect(() => {
    let stop = false;
    const idle = (fn: () => void) => {
      if (typeof window.requestIdleCallback === "function")
        window.requestIdleCallback(fn, { timeout: 2500 });
      else setTimeout(fn, 1200);
    };
    idle(async () => {
      for (const route of Object.values(router.routesById)) {
        if (stop) return;
        try {
          await router.loadRouteChunk(route);
        } catch {
          // a screen that fails here still loads on tap as before
        }
      }
    });
    return () => {
      stop = true;
    };
  }, [router]);
  return null;
}
