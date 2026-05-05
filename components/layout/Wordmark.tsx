import { clsx } from "clsx";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "font-display text-[1.0625rem] tracking-[-0.01em] leading-none",
        className,
      )}
    >
      Dylan Coleman
    </span>
  );
}
