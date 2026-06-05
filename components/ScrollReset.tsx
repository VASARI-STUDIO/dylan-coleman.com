"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll to the top whenever the route (pathname) changes.
 *
 * Next.js App Router normally scrolls to the top on navigation, but Lenis owns
 * the scroll timeline: it keeps an internal `animatedScroll` value and writes it
 * back to the document on every rAF tick. After a route change that stale value
 * snaps the freshly-rendered page back to the previous scroll position — which is
 * why clicking into a /work/[slug] case study didn't start at the top. Resetting
 * Lenis (with a native fallback) on each pathname change fixes it.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't let the browser restore a remembered scroll position over the top of us.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const toTop = () => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    toTop();
    // Run once more after the new page has laid out, in case Lenis recomputed
    // its dimensions on the same frame and re-applied the old offset.
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
