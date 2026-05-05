"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Word-by-word opacity reveal driven by scroll position over the container.
// Words fade from 0.15 → 1 as the section moves through the viewport.
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(/(\s+)/); // keep whitespace tokens
  const wordIndices = words
    .map((w, i) => (w.trim().length ? i : -1))
    .filter((i) => i >= 0);
  const total = Math.max(wordIndices.length, 1);

  return (
    <p ref={ref} className={className}>
      {words.map((token, i) => {
        if (!token.trim()) return <span key={i}>{token}</span>;
        const idx = wordIndices.indexOf(i);
        const start = idx / total;
        const end = Math.min(start + 1 / total, 1);
        const normalized = token.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlight = highlight.includes(normalized);
        return (
          <RevealWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            highlight={isHighlight}
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
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{
        opacity,
        color: highlight
          ? "hsl(var(--foreground))"
          : "hsl(var(--hero-subtitle))",
      }}
    >
      {children}
    </motion.span>
  );
}
