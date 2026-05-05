"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

// Reusable scroll-into-view fade+rise. Match the spec's fadeUp helper.
export function FadeUp({
  delay = 0,
  duration = 0.6,
  y = 20,
  children,
  ...rest
}: {
  delay?: number;
  duration?: number;
  y?: number;
  children: ReactNode;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
