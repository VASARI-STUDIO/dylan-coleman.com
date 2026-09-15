"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion defaults to `reducedMotion: "never"` — it ignores the OS
 * setting unless told otherwise. Individual components had been opting in one
 * at a time, which meant everything using the shared FadeUp wrapper (most of
 * the site) still animated for people who had asked their system not to.
 *
 * "user" makes every motion component in the tree honour the preference:
 * transforms and scroll-linked movement are dropped, opacity is kept.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
