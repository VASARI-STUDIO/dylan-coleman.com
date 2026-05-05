import Link from "next/link";
import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:bg-ink/90",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost:
    "text-ink hover:text-ink/70",
};

const base =
  "inline-flex h-11 items-center justify-center px-6 smallcaps transition";

export function Button({
  children,
  variant = "solid",
  className,
  href,
  external,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  external?: boolean;
} & Omit<ComponentProps<"button">, "children">) {
  const cls = clsx(base, variants[variant], className);
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
