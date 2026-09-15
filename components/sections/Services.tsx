import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";
import { SERVICES } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="01"
            label="Working Together"
            title={
              <>
                Three ways we can grow your{" "}
                <span className="serif-italic">brand.</span>
              </>
            }
            intro="Engagements scoped to fit — no bloat, no rushed deliverables, no agency markup. One designer, one developer, one direct line."
          />
        </FadeUp>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <FadeUp
              as="li"
              key={s.id}
              delay={0.1 + i * 0.1}
              className="flex"
            >
              {s.openCta ? (
                <div className="liquid-glass flex h-full w-full flex-col rounded-2xl p-8 md:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="smallcaps shrink-0">{s.index}</span>
                    <span className="smallcaps text-right">Open brief</span>
                  </div>

                  <h3 className="mt-6 font-sans text-h3 font-medium tight-tracking">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-body text-muted-foreground">
                    {s.tagline}
                  </p>

                  <div className="mt-auto pt-10">
                    <Button href="/#contact" variant="solid" className="w-full">
                      <span className="inline-flex items-center gap-1.5">
                        Get in touch
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="liquid-glass flex h-full w-full flex-col rounded-2xl p-8 md:p-10">
                  {/* gap-4 + shrink-0 on the index: a long timeline used to wrap
                      straight into it, rendering as "S/014 – 8 weeks". */}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="smallcaps shrink-0">{s.index}</span>
                    {s.timeline && (
                      <span className="smallcaps text-right">{s.timeline}</span>
                    )}
                  </div>

                  <h3 className="mt-6 font-sans text-h3 font-medium tight-tracking">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-body text-muted-foreground">
                    {s.tagline}
                  </p>

                  {s.scope.length > 0 && (
                    <>
                      <Rule className="my-8" />
                      <p className="smallcaps">Scope includes</p>
                      <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                        {s.scope.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2 block h-px w-3 shrink-0 bg-foreground/40"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-auto flex items-center justify-end pt-8">
                    <Button
                      href="/#contact"
                      variant="outline"
                      className="!h-10 !px-6 text-xs uppercase tracking-[0.18em]"
                    >
                      Enquire
                    </Button>
                  </div>
                </div>
              )}
            </FadeUp>
          ))}
        </ol>

        <FadeUp delay={0.1}>
          <div className="mt-14">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm text-foreground transition-colors"
            >
              See how each engagement runs — process, deliverables and what
              isn&apos;t included
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
