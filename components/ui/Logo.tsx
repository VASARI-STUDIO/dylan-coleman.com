import { clsx } from "clsx";

// Concentric-circles mark. Two stroked circles, no fill — works in any size,
// adopts currentColor.
export function Logo({
  size = 28,
  className,
  outerClass,
  innerClass,
}: {
  size?: number;
  className?: string;
  outerClass?: string;
  innerClass?: string;
}) {
  const inner = Math.round(size * 0.43);
  return (
    <span
      aria-label="Dylan Coleman"
      role="img"
      className={clsx("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className={clsx(
          "absolute inset-0 rounded-full border-2 border-foreground/60",
          outerClass,
        )}
      />
      <span
        aria-hidden
        className={clsx(
          "block rounded-full border border-foreground/60",
          innerClass,
        )}
        style={{ width: inner, height: inner }}
      />
    </span>
  );
}
