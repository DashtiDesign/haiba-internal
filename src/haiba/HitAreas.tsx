import { useEffect } from "react";

/**
 * Every button and link is easy to hit (8 Nov). Anything smaller than 44 x 44 on screen (text links like
 * "See all", chips, tabs, the story step bars) gets an invisible hit area that grows it to 44, without changing
 * how it looks or moving anything. It runs on every screen, including screens ported again from the canvas.
 */
const MIN = 44;
const SEL = '.hb-app :is(button, a[href], [role="button"], [role="tab"])';

function fit(el: HTMLElement) {
  if (el.closest("[data-no-hit]")) return;
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const y = Math.max(0, Math.ceil((MIN - r.height) / 2));
  const x = Math.max(0, Math.ceil((MIN - r.width) / 2));
  if (!x && !y) {
    if (el.classList.contains("hb-hit")) el.classList.remove("hb-hit");
    return;
  }
  // Leave buttons that already draw their own ::after alone.
  if (!el.classList.contains("hb-hit") && getComputedStyle(el, "::after").content !== "none")
    return;
  el.style.setProperty("--hb-hit-y", `${y}px`);
  el.style.setProperty("--hb-hit-x", `${x}px`);
  el.classList.add("hb-hit");
  if (getComputedStyle(el).position === "static") el.classList.add("hb-hit-rel");
}

export default function HitAreas() {
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>(SEL).forEach(fit);
    };
    const later = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    const mo = new MutationObserver(later);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", later);
    later();
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", later);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
