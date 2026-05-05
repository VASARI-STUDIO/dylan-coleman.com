"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type Variant = "solid" | "glass" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  solid:
    "bg-foreground text-background hover:bg-foreground/90",
  glass:
    "liquid-glass text-foreground hover:bg-white/[0.04]",
  outline:
    "border border-foreground/30 text-foreground hover:border-foreground/80",
  ghost:
    "text-foreground/80 hover:text-foreground",
};

const base =
  "inline-flex h-11 items-center justify-center px-7 rounded-full font-medium text-sm tracking-tight transition-all";

type AsButton = HTMLMotionProps<"button"> & { href?: undefined };
type AsLink = {
  href: string;
  external?: boolean;
} & Omit<HTMLMotionProps<"a">, "href">;

type Props = (AsButton | AsLink) & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button(props: Props) {
  const { variant = "solid", className, children } = props;
  const cls = clsx(base, variants[variant], className);

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" },
  } as const;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as AsLink;
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...motionProps}
          {...rest}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href} className="inline-flex">
        <motion.span className={cls} {...motionProps}>
          {children}
        </motion.span>
      </Link>
    );
  }

  const { href: _ignored, ...buttonProps } = props as AsButton & { href?: undefined };
  return (
    <motion.button className={cls} {...motionProps} {...buttonProps}>
      {children}
    </motion.button>
  );
}
