import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";
import { SERVICES } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-page px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="02"
          label="Working Together"
          title="Two ways to work — both sharpened around a single outcome."
          intro="Engagements are scoped to fit. No bloat, no rushed deliverables, no agency markup."
        />

        <ol className="mt-16 grid gap-12 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.id} className="border border-rule p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="smallcaps text-muted">{s.index}</span>
                <span className="smallcaps text-muted">{s.priceRange}</span>
              </div>

              <h3 className="mt-6 font-display text-h3 leading-[1.05] tracking-[-0.015em]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-prose text-body text-ink/80">
                {s.tagline}
              </p>

              <Rule className="my-8" />

              <p className="smallcaps text-muted">Scope includes</p>
              <ul className="mt-4 space-y-2 text-body-sm text-ink/85">
                {s.scope.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 block h-px w-3 shrink-0 bg-ink/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between gap-6">
                <p className="smallcaps text-muted">
                  Timeline · {s.timeline}
                </p>
                <Button href="/#contact" variant="outline">
                  Inquire
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
