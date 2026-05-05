import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";
import { HERO_WORK, RECENT_WORK } from "@/content/work/_recent";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="01"
            label="Selected Work"
            title={
              <>
                A small body of work — each grown around a{" "}
                <span className="serif-italic">specific</span> audience.
              </>
            }
            intro="Every project is positioned for a single industry. So the right clients see themselves in the work, and the rest move on."
          />
        </FadeUp>

        {/* Hero case studies (linked) */}
        <ol className="mt-16 grid gap-10 md:grid-cols-2">
          {HERO_WORK.map((w, i) => (
            <FadeUp key={w.slug} delay={0.1 + i * 0.1}>
              <li>
                <Link
                  href={`/work/${w.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-secondary/40">
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <span className="smallcaps">{w.index} · cover</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-sans text-h3 font-medium tight-tracking text-foreground transition-colors group-hover:text-foreground/85">
                        {w.title}
                      </h3>
                      <span className="smallcaps shrink-0">{w.year}</span>
                    </div>
                    <p className="mt-3 max-w-prose text-sm text-muted-foreground">
                      {w.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <IndustryTag k={w.audience} />
                      <span className="inline-flex items-center gap-1 text-sm text-foreground transition-transform group-hover:translate-x-0.5">
                        Read case <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </FadeUp>
          ))}
        </ol>

        <Rule className="mt-24" />

        {/* Recent work — no detail page */}
        <div className="mt-12 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="smallcaps">Recent</p>
          </div>
          <ul className="md:col-span-9 grid gap-10 md:grid-cols-2">
            {RECENT_WORK.map((w, i) => (
              <FadeUp key={w.index} delay={i * 0.1}>
                <li className="overflow-hidden rounded-2xl bg-card">
                  <div className="aspect-[3/2] w-full overflow-hidden bg-secondary/40">
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <span className="smallcaps">{w.index} · cover</span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-sans text-h4 font-medium tight-tracking">
                        {w.title}
                      </h4>
                      <span className="smallcaps shrink-0">{w.year}</span>
                    </div>
                    <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                      {w.summary}
                    </p>
                    <div className="mt-5">
                      <IndustryTag k={w.audience} />
                    </div>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
