import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-page px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-36">
        {/* Status line */}
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-ink/70" />
          <p className="smallcaps text-muted">
            Available for select projects · Booking late-2026
          </p>
        </div>

        {/* Display headline */}
        <h1 className="mt-12 font-display text-display leading-[0.9] tracking-[-0.025em]">
          Considered design,
          <br />
          built like <em className="italic font-light">architecture.</em>
        </h1>

        {/* Lede + CTA */}
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-1">
            <p className="max-w-prose text-body-lg text-ink/80">
              Dylan Coleman designs and builds premium digital identities for
              ambitious brands. Each project is shaped around the audience it&apos;s
              meant to convert — quietly, but unmistakably.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:items-end">
            <div className="flex flex-col gap-3">
              <Button href="/#contact">Start a project</Button>
              <Button href="/#work" variant="ghost">
                See selected work →
              </Button>
            </div>
          </div>
        </div>

        {/* Spec strip */}
        <Rule className="mt-24" />
        <dl className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 text-body-sm">
          <div>
            <dt className="smallcaps text-muted">Discipline</dt>
            <dd className="mt-1 text-ink">Brand · Web · Editorial</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Based</dt>
            <dd className="mt-1 text-ink">United States · Remote</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Index</dt>
            <dd className="mt-1 text-ink">VOL.&nbsp;01 · 2026</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Status</dt>
            <dd className="mt-1 text-ink">Booking late-2026</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
