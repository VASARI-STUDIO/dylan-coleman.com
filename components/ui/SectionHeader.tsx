import { clsx } from "clsx";

export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string; // e.g. "01"
  label: string; // e.g. "Selected Work"
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header className={clsx("grid gap-8 md:grid-cols-12", className)}>
      <div className="md:col-span-3 flex items-start gap-4">
        <span className="smallcaps text-muted">{index}</span>
        <span className="smallcaps text-muted">{label}</span>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-h2 leading-[1.02] tracking-[-0.02em] max-w-[20ch]">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-prose text-body-lg text-ink/80">{intro}</p>
        )}
      </div>
    </header>
  );
}
