import { clsx } from "clsx";
import type { ReactNode } from "react";

export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string; // e.g. "01"
  label: string;
  title: ReactNode; // accept JSX so callers can italicize accent words
  intro?: string;
  className?: string;
}) {
  return (
    <header className={clsx("grid gap-8 md:grid-cols-12", className)}>
      <div className="md:col-span-3 flex items-start gap-4">
        <span className="smallcaps">{index}</span>
        <span className="smallcaps">{label}</span>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-sans text-h2 font-medium tight-tracking max-w-[20ch]">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-prose text-body-lg text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
