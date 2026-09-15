"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { onHeroReady } from "@/lib/hero-ready";

// Elegant one-shot preloader. Mounts at app boot, holds for a minimum
// duration so the brand mark has a beat to land, then performs a curtain
// reveal that slides up and exposes the site beneath.
//
// We used to wait on `window.load`, but that does not fire until EVERY image
// has downloaded — including the whole hero frame sequence. On a first visit
// the curtain sat for its full timeout and then lifted onto a blank canvas.
// Now we lift as soon as the hero's first frame is painted, which is the only
// thing actually behind the curtain.
//
// Minimum visible time: 1100ms (the mark feels intentional)
// Maximum wait for the hero: 2200ms (never block on a slow connection)
const MIN_VISIBLE_MS = 1100;
const MAX_WAIT_MS = 2200;

export function Preloader() {
  // The intro is a homepage-entry moment only. If the visitor's first paint is a
  // project page (deep link), or they reach the homepage later via client-side
  // navigation, we skip it — the page-slide transition (app/template.tsx) covers
  // those cases instead. Captured in a ref so the decision is made once, at
  // mount, and never re-triggers when the route later changes.
  const pathname = usePathname();
  const shouldPreload = useRef(pathname === "/");
  const [show, setShow] = useState(shouldPreload.current);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldPreload.current) return;

    const start = performance.now();
    document.documentElement.classList.add("is-preloading");

    // Tracked so unmounting mid-reveal cannot fire setShow on a dead component.
    let revealTimer: number | undefined;
    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      revealTimer = window.setTimeout(() => {
        setShow(false);
        document.documentElement.classList.remove("is-preloading");
      }, remaining);
    };

    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      finish();
    };

    // Whichever comes first: the hero's first frame, or the hard cap.
    const unsubscribe = onHeroReady(settle);
    const cap = window.setTimeout(settle, MAX_WAIT_MS);

    return () => {
      unsubscribe();
      window.clearTimeout(cap);
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
      document.documentElement.classList.remove("is-preloading");
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.95,
            ease: [0.7, 0, 0.2, 1], // strong custom curtain ease
          }}
          aria-hidden
          className="fixed inset-0 z-[60] grid place-items-center bg-background"
        >
          {/* Centered mark + word */}
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Logo size={56} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="smallcaps"
            >
              Dylan Coleman · Brisbane
            </motion.p>
          </div>

          {/* Corner index markers — editorial chrome */}
          <span className="smallcaps absolute left-6 top-6">
            Vol. 01 · 2026
          </span>
          <span className="smallcaps absolute right-6 top-6">Loading</span>

          {/* Progress hairline — slides from 0 to full width */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: MIN_VISIBLE_MS / 1000,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "0 50%" }}
            className="absolute bottom-0 left-0 h-px w-full bg-foreground"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
