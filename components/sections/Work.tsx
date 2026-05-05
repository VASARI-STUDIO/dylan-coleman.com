import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { Rule } from "@/components/ui/Rule";
import { HERO_WORK, RECENT_WORK } from "@/content/work/_recent";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="mx-auto max-w-page px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="01"
          label="Selected Work"
          title="A small body of work, sold as a product to the audience it serves."
          intro="Each engagement is positioned for a specific industry — so the right clients see themselves in the work, and the rest move on."
        />

        {/* Hero case studies (linked) */}
        <ol className="mt-16 grid gap-16 md:grid-cols-2">
          {HERO_WORK.map((w) => (
            <li key={w.slug}>
              <Link
                href={`/work/${w.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] w-full overflow-hidden border border-rule bg-rule/40">
                  {/* Placeholder slot — replace with hi-res asset in /public/work/<slug>/cover.* */}
                  <div className="grid h-full place-items-center text-muted">
                    <span className="smallcaps">{w.index} · cover</span>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-h3 leading-[1.05] tracking-[-0.015em] group-hover:text-ink/80 transition">
                    {w.title}
                  </h3>
                  <span className="smallcaps text-muted shrink-0">
                    {w.year}
                  </span>
                </div>
                <p className="mt-3 max-w-prose text-body-sm text-ink/75">
                  {w.summary}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <IndustryTag k={w.audience} />
                  <span className="smallcaps text-ink group-hover:underline underline-offset-4">
                    Read case →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <Rule className="mt-24" />

        {/* Recent work cards (no detail page) */}
        <div className="mt-12 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="smallcaps text-muted">Recent work</p>
          </div>
          <ul className="md:col-span-9 grid gap-10 md:grid-cols-2">
            {RECENT_WORK.map((w) => (
              <li key={w.index} className="group">
                <div className="aspect-[3/2] w-full overflow-hidden border border-rule bg-rule/40">
                  <div className="grid h-full place-items-center text-muted">
                    <span className="smallcaps">{w.index} · cover</span>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-h4 leading-[1.1] tracking-[-0.01em]">
                    {w.title}
                  </h4>
                  <span className="smallcaps text-muted shrink-0">{w.year}</span>
                </div>
                <p className="mt-2 max-w-prose text-body-sm text-ink/75">
                  {w.summary}
                </p>
                <div className="mt-4">
                  <IndustryTag k={w.audience} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
