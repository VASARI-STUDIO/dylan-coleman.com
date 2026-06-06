"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Page-transition reveal.
//
// A `template` re-mounts a fresh instance on every client navigation (unlike a
// `layout`, which persists), so it's the natural place to play a one-shot
// transition. We render a solid panel that starts covering the freshly-rendered
// page and slides off to the right, revealing it — like a curtain pulled aside.
// The outgoing page is swapped instantly underneath the panel, so no exit
// animation is needed (and we never wrap `children` in a transformed element,
// which would break the hero canvas's `position: fixed`).
//
// The very first paint of the site is owned by the Preloader, so we skip the
// wipe there. A module-level flag flips after that first mount; every subsequent
// navigation gets the reveal.
let isFirstMount = true;

export default function Template({ children }: { children: React.ReactNode }) {
  // Decide once, at mount, whether this instance is the first paint. Reading and
  // clearing the module flag in render is idempotent, so React StrictMode's
  // double-invoke in dev is harmless.
  const skip = useRef(isFirstMount);
  isFirstMount = false;

  // The panel is mounted only for a navigation and removed the moment the wipe
  // finishes — so it never lingers off-screen, and (via the timeout fallback)
  // can never get stuck covering the page if the animation frame loop is paused.
  const [revealing, setRevealing] = useState(!skip.current);

  useEffect(() => {
    if (skip.current) return;
    const safety = setTimeout(() => setRevealing(false), 1000);
    return () => clearTimeout(safety);
  }, []);

  return (
    <>
      {children}

      {revealing && (
        <motion.div
          aria-hidden
          initial={{ x: "0%" }}
          animate={{ x: "101%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setRevealing(false)}
          className="pointer-events-none fixed inset-0 z-[55] bg-background"
        >
          {/* Faint leading edge so the wipe reads cleanly against dark content. */}
          <span className="absolute right-0 top-0 h-full w-px bg-foreground/15" />
        </motion.div>
      )}
    </>
  );
}
