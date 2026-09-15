"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

// Word-by-word reveal driven by scroll position over the container.
//
// TUNING — the first pass gave every word a hard 1/total-wide window and faded
// from 0.15, so words snapped on one at a time and the un-read text sat almost
// black against the background. Three changes soften it:
//   • FLOOR raised well off black, so unread copy is dim but comfortably legible.
//   • Each word fades across SPREAD word-slots instead of one, so neighbouring
//     windows overlap into a gradient wave rather than a row of switches.
//   • The scroll progress runs through a spring, which takes the edge off
//     Lenis's deceleration and keeps the wave moving smoothly.

/** Opacity of not-yet-revealed words. */
const FLOOR = 0.45;
/** How many word-slots each word takes to fade in. Higher = softer wave. */
const SPREAD = 5;
/** Complete the wave by this fraction of scroll, so it isn't still going at the end. */
const COMPLETE_BY = 0.85;

export function ScrollRevealParagraph({
  text,
  highlight = [],
  className,
}: {
  text: string;
  /** Words (lowercased, punctuation-stripped) that should always render in foreground color. */
  highlight?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  // Light spring so the wave glides instead of tracking every scroll jitter.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  const words = text.split(/(\s+)/); // keep whitespace tokens
  // Map token position -> word ordinal in one pass. This used to call
  // wordIndices.indexOf(i) inside the render loop, which is O(n^2) over ~100
  // tokens on every render of the About paragraph.
  const wordOrdinal = new Map<number, number>();
  words.forEach((w, i) => {
    if (w.trim().length) wordOrdinal.set(i, wordOrdinal.size);
  });
  const total = Math.max(wordOrdinal.size, 1);
  const span = 1 / total;

  return (
    <p ref={ref} className={className}>
      {words.map((token, i) => {
        if (!token.trim()) return <span key={i}>{token}</span>;
        const idx = wordOrdinal.get(i) ?? 0;
        const start = (idx / total) * COMPLETE_BY;
        const end = Math.min(start + span * SPREAD, 1);
        const normalized = token.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlight = highlight.includes(normalized);
        return (
          <RevealWord
            key={i}
            progress={smoothed}
            range={[start, end]}
            highlight={isHighlight}
            disabled={!!reduceMotion}
          >
            {token}
          </RevealWord>
        );
      })}
    </p>
  );
}

function RevealWord({
  progress,
  range,
  highlight,
  disabled,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
  disabled: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [FLOOR, 1]);
  const color = highlight
    ? "hsl(var(--foreground))"
    : "hsl(var(--hero-subtitle))";

  // Reduced motion: no scroll-linked animation, just render the copy plainly.
  if (disabled) return <span style={{ color }}>{children}</span>;

  return (
    <motion.span style={{ opacity, color }}>{children}</motion.span>
  );
}
