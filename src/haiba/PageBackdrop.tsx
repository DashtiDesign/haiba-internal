import { useEffect } from "react";

/**
 * No light strip when a page is pulled past its end (9 Nov). On iPhone a pull at the top or bottom shows the
 * page's backdrop for a moment, and in the Unipal app that bounce cannot always be switched off. This paints
 * the backdrop the same colour as what sits at the bottom of the screen right now (a purple story step, the
 * dark Haiba page, a lilac screen), so the pull shows more of the same colour instead of a light strip.
 */
function opaque(c: string) {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1]!.split(",").map((x) => parseFloat(x));
  return parts.length < 4 || (parts[3] ?? 1) > 0.9 ? c : null;
}

function colourAt(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('[aria-label="Prototype panel"], .hb-proto-tab')) continue;
    const s = getComputedStyle(el);
    const c = opaque(s.backgroundColor);
    if (c) return c;
    // A gradient: use its last colour, the one at its far end.
    if (s.backgroundImage.includes("gradient")) {
      const stops = s.backgroundImage.match(/rgba?\([^)]+\)/g);
      const last = stops && opaque(stops[stops.length - 1]!);
      if (last) return last;
    }
  }
  return null;
}

export default function PageBackdrop() {
  useEffect(() => {
    let frame = 0;
    let last = "";
    const run = () => {
      frame = 0;
      const c = colourAt(window.innerWidth / 2, window.innerHeight - 2);
      if (c && c !== last) {
        last = c;
        document.documentElement.style.backgroundColor = c;
        document.body.style.backgroundColor = c;
      }
    };
    const later = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    const mo = new MutationObserver(later);
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("scroll", later, { passive: true });
    window.addEventListener("resize", later);
    const t = window.setInterval(later, 1500); // steps that only change styles (a story step's colour)
    later();
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", later);
      window.removeEventListener("resize", later);
      window.clearInterval(t);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
