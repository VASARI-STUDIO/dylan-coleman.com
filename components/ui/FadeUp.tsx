"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/** Elements FadeUp can render as. Extend when a new container needs animating. */
type FadeUpTag = "div" | "li" | "section" | "article" | "span";

/**
 * Reusable scroll-into-view fade+rise.
 *
 * `as` matters for more than tidiness: this wrapper is used inside <ol>, <ul>
 * and <dl>, and a <div> in those positions is invalid markup that breaks the
 * list semantics assistive technology relies on ("list, 4 items" becomes
 * nothing at all). Pass `as="li"` inside a list; wrap <dt>/<dd> pairs in a
 * plain element instead of animating them individually.
 */
export function FadeUp({
  as: Tag = "div",
  delay = 0,
  duration = 0.6,
  y = 20,
  children,
  ...rest
}: {
  as?: FadeUpTag;
  delay?: number;
  duration?: number;
  y?: number;
  children: ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">) {
  // motion[Tag] is a union of per-element components, so TS can't reconcile the
  // single div-shaped prop type against it. The rendered tag is correct at
  // runtime; only the prop typing is being pinned here.
  const Component = motion[Tag] as typeof motion.div;
  return (
    <Component
      // `transform` strings rather than the x/y/scale shorthands: Framer's
      // shorthands run through requestAnimationFrame on the main thread, so
      // they drop frames while the page is still loading images. The full
      // transform string is hardware-accelerated.
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      // Strong ease-out. CSS's built-in easeOut is too weak to feel deliberate.
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
