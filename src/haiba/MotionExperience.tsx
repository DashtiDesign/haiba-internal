import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { animate } from "motion/mini";
import { useReducedMotion } from "motion/react";

const entranceSelector = ".hb-rise, .hb-pop, .hb-peek, .hb-in-r, .hb-in-l, .hb-stamp, .hb-flip, .hb-drop, .hb-up, .hb-stagger > *, .hb-pops > *, .hb-flips > *, .hb-stamps > *, .hb-home-carousel > *";
const ambientSelector = ".hb-float, .hb-wobble, .hb-run, .hb-nudge, .hb-coin, .hb-spin, .hb-shade, .hb-pulse, .hb-jump";
const ease = [0.22, 1, 0.36, 1] as const;

/** Motion owns the existing canvas animation hooks without changing their layout. */
export default function MotionExperience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const seen = new WeakSet<HTMLElement>();
    const animations = new Set<ReturnType<typeof animate>>();
    const track = (animation: ReturnType<typeof animate>) => {
      animations.add(animation);
      void animation.finished.then(() => animations.delete(animation));
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        const element = entry.target;
        observer.unobserve(element);
        if (reduced) continue;
        const popping = element.matches(".hb-pop, .hb-stamp, .hb-flip, .hb-pops > *, .hb-flips > *, .hb-stamps > *");
        const index = element.parentElement?.matches(".hb-stagger, .hb-pops, .hb-flips, .hb-stamps, .hb-home-carousel")
          ? Array.from(element.parentElement.children).indexOf(element) : 0;
        // Individual CSS transforms preserve canvas rotation and fixed positioning.
        const fixedAncestor = element.querySelector(".hb-fixed-bottom") || getComputedStyle(element).position === "fixed";
        track(animate(element, {
          opacity: [0, 1],
          ...(!fixedAncestor ? { translate: ["0 10px", "0 0"], ...(popping ? { scale: [0.94, 1] } : {}) } : {}),
        }, { duration: 0.38, delay: Math.min(index * 0.045, 0.18), ease }));
      }
    }, { threshold: 0.06 });

    const scan = () => {
      root.querySelectorAll<HTMLElement>(`${entranceSelector}, ${ambientSelector}, .hb-press, .hb-lift, .hb-ease`).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        element.dataset['hbMotion'] = "true";
        element.style.setProperty("--hb-base-transform", element.style.transform || "none");
        if (element.matches(entranceSelector)) observer.observe(element);
        if (!reduced && element.matches(ambientSelector)) {
          const decorative = element.matches(".hb-spin, .hb-shade, .hb-pulse");
          track(animate(element, decorative ? { opacity: [1, 0.8, 1] } : { translate: ["0 0", "0 -4px", "0 0"] }, {
            duration: element.matches(".hb-run") ? 1.2 : 3.6,
            ease: "easeInOut", repeat: element.matches(".hb-jump") ? 0 : Infinity,
          }));
        }
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    if (!reduced) track(animate(root, { opacity: [0.6, 1] }, { duration: 0.2, ease: "easeOut" }));

    let pressed: HTMLElement | null = null;
    const interactive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const element = target.closest<HTMLElement>("button, a, [role='button']");
      return element && root.contains(element) && !element.matches(":disabled, [aria-disabled='true']") ? element : null;
    };
    const release = () => {
      if (pressed?.isConnected && !reduced) track(animate(pressed, { scale: 1 }, { duration: 0.24, ease }));
      pressed = null;
    };
    const down = (event: PointerEvent) => {
      release();
      pressed = interactive(event.target);
      if (pressed && !reduced) track(animate(pressed, { scale: 0.97 }, { duration: 0.09 }));
    };
    const hover = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced || !(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(".hb-lift");
      if (element && !element.contains(event.relatedTarget as Node | null)) {
        track(animate(element, { translate: event.type === "pointerover" ? "0 -3px" : "0 0" }, { duration: 0.2, ease }));
      }
    };
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerover", hover);
    root.addEventListener("pointerout", hover);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerover", hover);
      root.removeEventListener("pointerout", hover);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, [pathname, reduced]);

  return <div ref={ref} className="hb-motion-experience">{children}</div>;
}