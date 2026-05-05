import { clsx } from "clsx";
import { industry, type IndustryKey } from "@/lib/industries";

export function IndustryTag({
  k,
  className,
}: {
  k: IndustryKey;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "smallcaps inline-flex items-center gap-2 text-muted",
        className,
      )}
    >
      <span aria-hidden className="block h-px w-6 bg-rule" />
      {industry(k).short}
    </span>
  );
}
