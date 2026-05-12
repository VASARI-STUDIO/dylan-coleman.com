"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Approximate height of the fixed nav — used as the offset for anchor scrolls
// so section headers don't land underneath the nav bar.
const NAV_OFFSET = -88;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Mounts Lenis at the root with its built-in rAF and anchor handling, plus
// forwards each scroll tick to GSAP ScrollTrigger (when loaded) so scroll-
// driven tweens stay in sync with the smoothed timeline.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      // Tightened from 0.1 → 0.08 for a more pronounced Studio Namma glide.
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: true, // Lenis manages requestAnimationFrame internally
      anchors: { offset: NAV_OFFSET }, // built-in same-page hash handler
    });

    // Expose for devtools poking — `window.__lenis` should exist if Lenis is
    // running. If it doesn't, the module didn't initialize.
    window.__lenis = lenis;

    // Sync GSAP ScrollTrigger with Lenis so any GSAP scroll-driven tween
    // reads the smoothed scrollTop instead of the raw native value.
    let detach: (() => void) | undefined;
    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);
        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);
        ScrollTrigger.refresh();
        detach = () => lenis.off("scroll", onScroll);
      } catch {
        // GSAP not available — Lenis still smooths on its own.
      }
    })();

    return () => {
      detach?.();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
