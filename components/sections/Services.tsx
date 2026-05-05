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
            index="02"
            label="Working Together"
            title={
              <>
                Two ways to work — both sharpened around a single{" "}
                <span className="serif-italic">outcome.</span>
              </>
            }
            intro="Engagements are scoped to fit. No bloat, no rushed deliverables, no agency markup."
          />
        </FadeUp>

        <ol className="mt-16 grid gap-8 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.id} delay={0.1 + i * 0.1}>
              <li className="liquid-glass rounded-2xl p-8 md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="smallcaps">{s.index}</span>
                  <span className="smallcaps">{s.priceRange}</span>
                </div>

                <h3 className="mt-6 font-sans text-h3 font-medium tight-tracking">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-prose text-body text-muted-foreground">
                  {s.tagline}
                </p>

                <Rule className="my-8" />

                <p className="smallcaps">Scope includes</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {s.scope.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 block h-px w-3 shrink-0 bg-foreground/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-between gap-6">
                  <p className="smallcaps">Timeline · {s.timeline}</p>
                  <Button href="/#contact" variant="solid" className="!h-10 !px-6 text-xs uppercase tracking-[0.18em]">
                    Inquire
                  </Button>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
