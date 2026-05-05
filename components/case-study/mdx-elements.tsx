// Editorial MDX building blocks for case studies.
import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 border-l border-ink pl-6">
      <p className="font-display italic text-h4 leading-[1.2] tracking-[-0.01em] text-ink">
        {children}
      </p>
    </blockquote>
  );
}

export function FullBleed({
  caption,
  className,
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      className={clsx(
        "not-prose my-16 -mx-6 md:-mx-10 lg:mx-[calc(50%-50vw+1rem)]",
        className,
      )}
    >
      <div className="aspect-[16/9] w-full border border-rule bg-rule/40">
        <div className="grid h-full place-items-center text-muted">
          <span className="smallcaps">image slot</span>
        </div>
      </div>
      {caption && (
        <figcaption className="smallcaps mt-3 text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export function Spread({
  caption,
}: {
  caption?: string;
}) {
  return (
    <figure className="not-prose my-12 grid gap-3 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="aspect-[4/5] border border-rule bg-rule/40">
          <div className="grid h-full place-items-center text-muted">
            <span className="smallcaps">image slot</span>
          </div>
        </div>
      ))}
      {caption && (
        <figcaption className="smallcaps col-span-full mt-1 text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Spec({
  rows,
}: {
  rows: { k: string; v: string }[];
}) {
  return (
    <dl className="not-prose my-10 grid grid-cols-2 gap-y-4 border-t border-b border-rule py-6 md:grid-cols-4">
      {rows.map((r) => (
        <div key={r.k}>
          <dt className="smallcaps text-muted">{r.k}</dt>
          <dd className="mt-1 text-body text-ink">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export const editorialMDX = { Pull, FullBleed, Spread, Spec };
