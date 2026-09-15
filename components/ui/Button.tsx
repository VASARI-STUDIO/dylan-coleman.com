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

const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeOut" },
} as const;

/**
 * Every branch below destructures `variant`, `className` and `children` OUT of
 * the forwarded props before spreading. They used to be read but left in place,
 * so `{...rest}` re-applied the caller's raw `className` after the computed one
 * and wiped every base and variant class — a Button with a className rendered
 * completely unstyled — while `variant` leaked into the DOM as an invalid
 * attribute. The internal-link branch had the opposite problem: it forwarded
 * nothing, so onClick, aria-* and the rest were silently dropped.
 */
export function Button(props: Props) {
  const { variant = "solid", className, children } = props;
  const cls = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    const {
      href,
      external,
      variant: _v,
      className: _c,
      children: _ch,
      ...rest
    } = props as AsLink & { variant?: Variant; className?: string };

    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
          {...rest}
          className={cls}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <Link href={href} className="inline-flex">
        <motion.span {...motionProps} {...rest} className={cls}>
          {children}
        </motion.span>
      </Link>
    );
  }

  const {
    href: _href,
    variant: _v,
    className: _c,
    children: _ch,
    ...buttonProps
  } = props as AsButton & {
    href?: undefined;
    variant?: Variant;
    className?: string;
  };

  return (
    <motion.button {...motionProps} {...buttonProps} className={cls}>
      {children}
    </motion.button>
  );
}
