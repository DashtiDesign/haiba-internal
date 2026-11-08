import { useEffect } from "react";

/**
 * Every tray (bottom sheet) in Haiba behaves the same way (8 Nov):
 * - tap outside it to close it
 * - drag it down to close it (from the top of the tray, or anywhere when it is scrolled to the top)
 * - Escape closes the top tray
 * - the page behind does not scroll while a tray is open
 *
 * Trays come from two places: the shared Sheet in journey/ui.tsx and the screens ported from the design canvas.
 * Both render a [role=dialog] inside a full screen backdrop, so one listener on the document handles them all
 * and keeps working when a canvas screen is ported again.
 *
 * How a tray closes: the backdrop's own close button (aria-label "Close"), else a backdrop marked
 * data-tray-backdrop (the shared Sheet), else the tray's own dismiss button (Close, Not now, No thanks, ...).
 */
const DISMISS =
  /^(close|not now|no thanks|maybe later|keep (haiba|my membership|my reservation)|done|got it|ok|back)$/i;

function dialogs(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"]')).filter(
    (d) => d.offsetParent !== null || getComputedStyle(d).position === "fixed",
  );
}

function backdropOf(d: HTMLElement): HTMLElement | null {
  const p = d.parentElement;
  if (!p) return null;
  const s = getComputedStyle(p);
  return s.position === "fixed" || s.position === "absolute" ? p : null;
}

function closeTray(d: HTMLElement): boolean {
  const back = backdropOf(d);
  const backBtn = back?.querySelector<HTMLElement>(':scope > button[aria-label="Close"]');
  if (backBtn) return (backBtn.click(), true);
  if (back?.hasAttribute("data-tray-backdrop")) return (back.click(), true);
  const own = d.querySelector<HTMLElement>('button[aria-label="Close"]');
  if (own) return (own.click(), true);
  const btn = Array.from(d.querySelectorAll<HTMLElement>("button, a")).find((b) =>
    DISMISS.test((b.textContent || "").trim()),
  );
  if (btn) return (btn.click(), true);
  return false;
}

export default function TrayGestures() {
  useEffect(() => {
    type Drag = { d: HTMLElement; y0: number; t0: number; dy: number };
    let drag: Drag | null = null;
    let downOnBack: HTMLElement | null = null;
    // A drag should not also press the button it started on: real clicks right after a drag are dropped.
    let suppressUntil = 0;

    const topTray = () => {
      const open = dialogs();
      return open[open.length - 1] ?? null;
    };

    // Start: on the backdrop (for tap outside) or inside a tray that is scrolled to the top (for drag to close).
    const start = (target: HTMLElement, y: number, t: number) => {
      const top = topTray();
      if (!top) return;
      const back = backdropOf(top);
      downOnBack = back && target === back ? back : null;
      drag =
        top.contains(target) &&
        !target.closest("input, textarea, select, [data-no-drag]") &&
        top.scrollTop <= 0
          ? { d: top, y0: y, t0: t, dy: 0 }
          : null;
    };
    // Move: follow the finger down. Returns true while the tray is being dragged.
    const move = (y: number) => {
      if (!drag) return false;
      const dy = y - drag.y0;
      if (dy <= 0 && drag.dy === 0) {
        drag = null; // moving up first means the person is scrolling the tray
        return false;
      }
      drag.dy = Math.max(0, dy);
      drag.d.style.transition = "none";
      drag.d.style.transform = `translateY(${drag.dy}px)`;
      return true;
    };
    const end = (target: HTMLElement, t: number) => {
      if (downOnBack && target === downOnBack) {
        const top = topTray();
        if (top) closeTray(top);
      }
      downOnBack = null;
      if (!drag) return;
      const { d, dy, t0 } = drag;
      drag = null;
      if (dy > 6) suppressUntil = performance.now() + 400;
      const v = dy / Math.max(1, t - t0); // px per ms
      if (dy > 90 || (dy > 30 && v > 0.6)) {
        d.style.transition = "transform 160ms ease-in";
        d.style.transform = `translateY(${d.offsetHeight}px)`;
        window.setTimeout(() => {
          if (!closeTray(d)) d.style.transform = "";
        }, 150);
      } else if (dy > 0) {
        d.style.transition = "transform 200ms cubic-bezier(.2,.8,.2,1)";
        d.style.transform = "";
      }
    };

    // Touch (phones): touchmove is not passive so the page does not scroll or bounce while a tray is dragged.
    const onTouchStart = (e: TouchEvent) =>
      start(e.target as HTMLElement, e.touches[0]!.clientY, e.timeStamp);
    const onTouchMove = (e: TouchEvent) => {
      if (move(e.touches[0]!.clientY) && e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => end(e.target as HTMLElement, e.timeStamp);
    // Mouse (desktop preview).
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") start(e.target as HTMLElement, e.clientY, e.timeStamp);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.buttons) move(e.clientY);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") end(e.target as HTMLElement, e.timeStamp);
    };
    // Only real clicks are dropped. closeTray's own click() is not trusted, so it always goes through.
    const onClick = (e: MouseEvent) => {
      if (e.isTrusted && performance.now() < suppressUntil) {
        suppressUntil = 0;
        e.stopPropagation();
        e.preventDefault();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const top = topTray();
      if (top && closeTray(top)) e.preventDefault();
    };

    // Lock the page behind while a tray is open.
    const root = document.documentElement;
    const lock = () => root.classList.toggle("hb-tray-open", dialogs().length > 0);
    const mo = new MutationObserver(lock);
    mo.observe(document.body, { childList: true, subtree: true });

    const opts = { capture: true, passive: false } as const;
    document.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    document.addEventListener("touchmove", onTouchMove, opts);
    document.addEventListener("touchend", onTouchEnd, true);
    document.addEventListener("touchcancel", onTouchEnd, true);
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("pointermove", onMove, true);
    document.addEventListener("pointerup", onUp, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      mo.disconnect();
      root.classList.remove("hb-tray-open");
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("touchmove", onTouchMove, true);
      document.removeEventListener("touchend", onTouchEnd, true);
      document.removeEventListener("touchcancel", onTouchEnd, true);
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
