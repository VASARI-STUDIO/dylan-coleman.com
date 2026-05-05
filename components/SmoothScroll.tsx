"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Mounts Lenis once at the root and drives its frame loop with rAF.
// Also exposes its scroll position to GSAP ScrollTrigger so triggers fire on
// the smoothed timeline — not the native scroll, which Lenis intercepts.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Wire ScrollTrigger to Lenis if it's loaded on the page.
    // Imported lazily so non-GSAP pages don't pay for it.
    let cleanup: (() => void) | undefined;
    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);

        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        // Use Lenis's loop instead of GSAP's built-in scroller poll
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          lenis.off("scroll", onScroll);
        };
      } catch {
        // GSAP not installed yet — Lenis still works on its own.
      }
    })();

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      cleanup?.();
    };
  }, []);

  return null;
}
