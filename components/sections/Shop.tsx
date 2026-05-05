import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { Rule } from "@/components/ui/Rule";
import { SHOP } from "@/content/shop";

export function Shop() {
  return (
    <section id="shop" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-page px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="03"
          label="The Shop"
          title="Considered templates and digital products — built to the same standard as commissioned work."
          intro="A small, growing shelf of templates for people who want a premium starting point without a custom build."
        />

        <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {SHOP.map((p) => (
            <li
              key={p.id}
              className="flex flex-col border border-rule"
            >
              <div className="aspect-[4/5] overflow-hidden bg-rule/40">
                <div className="grid h-full place-items-center text-muted">
                  <span className="smallcaps">{p.index} · preview</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="smallcaps text-muted">{p.platform}</span>
                  <span className="smallcaps text-muted">{p.status}</span>
                </div>
                <h3 className="mt-4 font-display text-h4 leading-[1.1] tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-body-sm text-ink/75">{p.blurb}</p>

                <Rule className="my-6" />

                <div className="flex items-center justify-between">
                  <IndustryTag k={p.audience} />
                  <span className="font-display text-h6 leading-none">
                    {p.price}
                  </span>
                </div>

                <div className="mt-6">
                  <Button href={p.externalUrl} external variant="outline" className="w-full">
                    {p.ctaLabel} ↗
                  </Button>
                </div>
              </div>
            </li>
          ))}

          {/* Coming-soon ghost card */}
          <li className="flex flex-col border border-dashed border-rule">
            <div className="aspect-[4/5] grid place-items-center text-muted">
              <span className="smallcaps">More coming</span>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-h4 leading-[1.1] tracking-[-0.01em] text-ink/60">
                Next.js templates · soon
              </h3>
              <p className="mt-3 text-body-sm text-muted">
                Self-hosted, code-owned templates for teams that need to ship
                without a custom engagement. Drop your email below to be told first.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
