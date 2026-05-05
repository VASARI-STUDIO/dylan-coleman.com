import { clsx } from "clsx";

export function Rule({ className }: { className?: string }) {
  return <hr className={clsx("border-0 border-t border-border/40", className)} />;
}
