import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { HERO_WORK } from "@/content/work";

// Without its own metadata a 404 inherits the root canonical ("/") and
// robots: index — telling crawlers a missing page is the homepage.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: undefined },
};

// Previously styled against a design system this project no longer has:
// `text-muted` (a background token — near-black on black), plus `border-ink`,
// `bg-ink`, `text-paper` and `font-display`, none of which are defined, so
// they silently did nothing. Rebuilt on the tokens that actually exist, and
// offers the real case studies rather than dead-ending on one link.
export default function CaseStudyNotFound() {
  return (
    <section className="mx-auto max-w-page px-6 md:px-12 py-28 md:py-40">
      <p className="smallcaps">404 · Case not found</p>
      <h1 className="mt-6 max-w-[16ch] font-sans text-h1 font-medium tight-tracking">
        That study isn&apos;t in the{" "}
        <span className="serif-italic">index.</span>
      </h1>
      <p className="mt-8 max-w-prose text-body-lg text-muted-foreground">
        The address you followed doesn&apos;t match a case study on this site.
        Everything that does is listed below.
      </p>

      <div className="mt-10">
        <Button href="/#work" variant="solid">
          Back to selected work
          <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
        </Button>
      </div>

      <Rule className="my-12 md:my-16" />

      <h2 className="smallcaps">The case studies</h2>
      <ul className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {HERO_WORK.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/work/${w.slug}`}
              className="group flex items-baseline justify-between gap-6 border-b border-border/40 pb-4 transition-colors hover:border-foreground/50"
            >
              <span className="font-sans text-h5 font-medium tight-tracking">
                {w.title}
              </span>
              <span className="smallcaps shrink-0">{w.index}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
