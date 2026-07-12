import { ArrowUpRight } from "lucide-react";
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
            <FadeUp key={s.id} delay={0.1 + i * 0.1}>
              {s.openCta ? (
                <li className="liquid-glass flex h-full flex-col rounded-2xl p-8 md:p-10">
                  <div className="flex items-baseline justify-between">
                    <span className="smallcaps">{s.index}</span>
                    <span className="smallcaps">Open brief</span>
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
                </li>
              ) : (
                <li className="liquid-glass flex h-full flex-col rounded-2xl p-8 md:p-10">
                  <div className="flex items-baseline justify-between">
                    <span className="smallcaps">{s.index}</span>
                    {s.timeline && (
                      <span className="smallcaps">{s.timeline}</span>
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
                      Inquire
                    </Button>
                  </div>
                </li>
              )}
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
