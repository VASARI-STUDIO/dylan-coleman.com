import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { FadeUp } from "@/components/ui/FadeUp";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites end-to-end, and brand and marketing design — how each engagement runs, what it produces, and what it doesn't include.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const detailed = SERVICES.filter((s) => s.stages?.length);
  const open = SERVICES.find((s) => s.openCta);

  return (
    <PageShell
      index="S/00"
      label="Services"
      title={
        <>
          Two ways to <span className="serif-italic">work</span> together.
        </>
      }
      lede="Most engagements are one of the two below. Both are quoted as a fixed scope against a written proposal, billed in Australian dollars, and run from Brisbane — remote, across any timezone that overlaps a reasonable part of my day."
    >
      {detailed.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="scroll-mt-24 border-t border-border/40"
        >
          <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
            <FadeUp>
              <span className="smallcaps">{s.index}</span>
              <h2 className="mt-4 max-w-[20ch] font-sans text-h2 font-medium tight-tracking">
                {s.title}
              </h2>
              <p className="mt-6 max-w-prose text-body-lg text-muted-foreground">
                {s.tagline}
              </p>
              {s.detail && (
                <p className="mt-5 max-w-prose text-body text-muted-foreground">
                  {s.detail}
                </p>
              )}
              {s.timeline && (
                <p className="smallcaps mt-8">Typically {s.timeline}</p>
              )}
            </FadeUp>

            {/* Process */}
            <Rule className="my-12 md:my-16" />
            <FadeUp>
              <h3 className="smallcaps">How it runs</h3>
            </FadeUp>
            <ol className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {s.stages?.map((stage, i) => (
                <li key={stage.n}>
                  <FadeUp delay={0.05 + i * 0.05}>
                    <span className="smallcaps">{stage.n}</span>
                    <h4 className="mt-3 font-sans text-h5 font-medium tight-tracking">
                      {stage.title}
                    </h4>
                    <p className="mt-3 text-body text-muted-foreground">
                      {stage.body}
                    </p>
                  </FadeUp>
                </li>
              ))}
            </ol>

            {/* What you get / what you don't */}
            <Rule className="my-12 md:my-16" />
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <FadeUp>
                <h3 className="smallcaps">What you end up with</h3>
                <ul className="mt-6 space-y-3">
                  {s.deliverables?.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-body text-muted-foreground"
                    >
                      <span aria-hidden className="text-foreground/40">
                        —
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h3 className="smallcaps">What it doesn&apos;t cover</h3>
                <ul className="mt-6 space-y-3">
                  {s.notIncluded?.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-body text-muted-foreground"
                    >
                      <span aria-hidden className="text-foreground/40">
                        —
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* Open brief */}
      {open && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
            <FadeUp>
              <span className="smallcaps">{open.index}</span>
              <h2 className="mt-4 max-w-[20ch] font-sans text-h2 font-medium tight-tracking">
                {open.title}
              </h2>
              <p className="mt-6 max-w-prose text-body-lg text-muted-foreground">
                {open.tagline}
              </p>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Close */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
          <FadeUp>
            <h2 className="max-w-[20ch] font-sans text-h2 font-medium tight-tracking">
              Every engagement starts with a written quote.
            </h2>
            <p className="mt-6 max-w-prose text-body text-muted-foreground">
              Tell me what you&apos;re building and I&apos;ll come back with
              scope, timeline and a fixed price — or tell you honestly if
              I&apos;m not the right person for it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/#contact" variant="solid">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Button>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                How engagements work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}
