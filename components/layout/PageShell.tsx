import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import type { ReactNode } from "react";

/**
 * Shared frame for the standalone pages (services, about, privacy, terms).
 * Mirrors the case-study shell's chrome — index row, oversized title, sparse
 * rules — so a deeper page still reads as part of the same publication.
 */
export function PageShell({
  index,
  label,
  title,
  lede,
  meta,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Small-caps line under the lede — e.g. "Last updated 15 September 2026". */
  meta?: string;
  children: ReactNode;
}) {
  return (
    <article>
      <div className="mx-auto max-w-page px-6 md:px-12 pt-6 md:pt-10">
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Index
          </Link>
          <span className="smallcaps">{index}</span>
        </div>
      </div>

      <header className="mx-auto max-w-page px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
        <FadeUp>
          <p className="smallcaps">{label}</p>
          <h1 className="mt-6 max-w-[20ch] font-sans text-h1 font-medium tight-tracking">
            {title}
          </h1>
          {lede && (
            <p className="mt-8 max-w-prose text-body-lg text-muted-foreground">
              {lede}
            </p>
          )}
          {meta && <p className="smallcaps mt-8">{meta}</p>}
        </FadeUp>
      </header>

      {children}
    </article>
  );
}

/** A titled block within a page. Keeps heading rhythm consistent across pages. */
export function PageSection({
  n,
  heading,
  children,
}: {
  n?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border/40">
      <div className="mx-auto grid max-w-page gap-8 px-6 md:grid-cols-12 md:gap-12 md:px-12 py-12 md:py-16">
        <div className="md:col-span-3">
          <FadeUp>
            {n && <span className="smallcaps">{n}</span>}
            <h2 className="mt-3 font-sans text-h5 font-medium tight-tracking">
              {heading}
            </h2>
          </FadeUp>
        </div>
        <div className="md:col-span-9">
          <FadeUp delay={0.08}>
            <div className="prose-page max-w-prose">{children}</div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
