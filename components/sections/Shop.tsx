import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";
import { SHOP } from "@/content/shop";
import { asset } from "@/lib/asset";

export function Shop() {
  return (
    <section id="shop" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="04"
            label="The Shop"
            title={
              <>
                Templates,{" "}
                <span className="serif-italic">considered.</span>
              </>
            }
            intro="A small, growing shelf of premium digital products — built to the same standard as the commissioned work. For people who want a high-end starting point without commissioning one."
          />
        </FadeUp>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SHOP.map((p, i) => (
            <FadeUp key={p.id} delay={0.1 + i * 0.1}>
              <li className="flex h-full flex-col overflow-hidden rounded-2xl bg-card">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary/40">
                  {p.cover ? (
                    <img
                      src={asset(p.cover)}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <span className="smallcaps">{p.index} · preview</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="smallcaps">{p.platform}</span>
                    <span className="smallcaps">{p.status}</span>
                  </div>
                  <h3 className="mt-4 font-sans text-h4 font-medium tight-tracking">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>

                  <Rule className="my-6" />

                  <div className="flex items-center justify-between">
                    <IndustryTag k={p.audience} />
                    {p.price && (
                      <span className="font-sans text-h6 font-semibold leading-none">
                        {p.price}
                      </span>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button href={p.externalUrl} external variant="glass" className="w-full">
                      <span className="inline-flex items-center gap-1.5">
                        {p.ctaLabel} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </Button>
                  </div>
                </div>
              </li>
            </FadeUp>
          ))}

          {/* Coming-soon ghost */}
          <FadeUp delay={0.1 + SHOP.length * 0.1}>
            <li className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border/60">
              <div className="aspect-[4/5] grid place-items-center text-muted-foreground">
                <span className="smallcaps">More coming</span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-sans text-h4 font-medium tight-tracking text-foreground/60">
                  Next.js templates · soon
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Self-hosted templates for teams that need to ship without a
                  custom engagement.
                </p>
              </div>
            </li>
          </FadeUp>
        </ol>
      </div>
    </section>
  );
}
