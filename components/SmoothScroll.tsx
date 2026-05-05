"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Approximate height of the fixed nav — used as an offset when smooth-scrolling
// to in-page anchors so section headers don't land underneath the nav bar.
const NAV_OFFSET = -88;

// Mounts Lenis once at the root, drives its frame loop with rAF, and:
//  - forwards each scroll tick to GSAP ScrollTrigger (if loaded) so scroll-driven
//    GSAP tweens stay in sync with the smoothed scroll position
//  - intercepts clicks on same-page hash links (e.g. /#work) and routes them
//    through Lenis's scrollTo so the navigation is smooth instead of jumping.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Single rAF driver — never doubled-up with a GSAP ticker hookup.
    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    // Same-page anchor interceptor — this is what makes the nav links work.
    // Clicks on `<a href="#x">` or `<a href="/#x">` get diverted to Lenis's
    // scrollTo so the navigation is smooth and the URL hash updates without
    // a full route push (which Next/Link would suppress when already on /).
    const onAnchorClick = (e: MouseEvent) => {
      // Respect modifier-key clicks (open in new tab, etc.)
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.target && link.target !== "_self") return;

      const href = link.getAttribute("href") ?? "";
      // Skip anything that isn't a hash on this page
      if (!href || href === "#") return;

      // Resolve absolute URL to compare path
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Strip basePath when comparing pathnames so /dylan-coleman.com/#x
      // matches /dylan-coleman.com/ on Pages.
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const stripBase = (p: string) =>
        basePath && p.startsWith(basePath) ? p.slice(basePath.length) || "/" : p;
      const linkPath = stripBase(url.pathname).replace(/\/+$/, "/") || "/";
      const herePath =
        stripBase(window.location.pathname).replace(/\/+$/, "/") || "/";

      if (linkPath !== herePath) return; // cross-route link — let Next handle it
      if (!url.hash) return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
      history.replaceState(null, "", url.hash);
    };

    // Capture phase — fires before React/Next/Link delegated handlers, so we
    // can intercept and preventDefault on same-page hash links cleanly.
    document.addEventListener("click", onAnchorClick, { capture: true });

    // Wire ScrollTrigger to Lenis after GSAP loads.
    let detachScrollTrigger: (() => void) | undefined;
    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onLenisScroll);
        ScrollTrigger.refresh();
        detachScrollTrigger = () => lenis.off("scroll", onLenisScroll);
      } catch {
        // GSAP not available — Lenis still smooths on its own.
      }
    })();

    // Honor an initial hash on load (e.g. landing on /#work).
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        // Defer one frame so layout is ready.
        requestAnimationFrame(() => {
          lenis.scrollTo(el as HTMLElement, {
            offset: NAV_OFFSET,
            immediate: true,
          });
        });
      }
    }

    return () => {
      document.removeEventListener("click", onAnchorClick, { capture: true });
      cancelAnimationFrame(frameId);
      detachScrollTrigger?.();
      lenis.destroy();
    };
  }, []);

  return null;
}
