import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";
import { ScrollRevealParagraph } from "@/components/ui/ScrollReveal";
import { asset } from "@/lib/asset";

const stats = [
  { k: "Practicing", v: "5+ years" },
  { k: "Projects shipped", v: "45+" },
  { k: "Based", v: "Brisbane, AU" },
  { k: "Currently", v: "Bar-Tech · Freelance" },
];

const principles = [
  {
    n: "01",
    t: "Audience first",
    b: "Every project starts with the person it's meant to win over. Design follows.",
  },
  {
    n: "02",
    t: "Edit hard",
    b: "Restraint is the most premium signal there is. Cut until what remains is unarguable.",
  },
  {
    n: "03",
    t: "Build it once",
    b: "Performance, accessibility and craft aren't passes — they're the floor.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="04"
            label="About"
            title={
              <>
                A studio of one — patient by{" "}
                <span className="serif-italic">practice,</span> fast by design.
              </>
            }
          />
        </FadeUp>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <FadeUp className="md:col-span-5" delay={0.1}>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-card">
              <img
                src={asset("/about/portrait.jpg")}
                alt="Dylan Coleman"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </FadeUp>

          <div className="md:col-span-7">
            {/* Scroll-driven word reveal */}
            <ScrollRevealParagraph
              className="font-sans text-2xl md:text-3xl font-medium tight-tracking max-w-prose"
              text="I founded my first business at seventeen — Finish Line Car Detailing, a mobile studio I ran in Brisbane for three years. Building the brand from scratch became my proof of concept: design, treated like architecture, can move a small operator into a category most consider out of reach."
              highlight={["seventeen", "architecture", "Brisbane"]}
            />

            <FadeUp delay={0.1}>
              <p className="mt-8 max-w-prose text-body text-muted-foreground">
                Today I split my work between an in-house role at Bar-Tech
                Automation — designing for industrial Building Management
                Systems — and a small freelance practice for brands ready to be
                taken seriously. I work with a few clients a year. The result
                is meant to feel inevitable: the only way the brand could have
                been built.
              </p>
            </FadeUp>

            <Rule className="my-10" />

            <ol className="grid gap-8 md:grid-cols-3">
              {principles.map((p, i) => (
                <li key={p.n}>
                  <FadeUp delay={i * 0.08}>
                    <span className="smallcaps">{p.n}</span>
                    <h4 className="mt-3 font-sans text-h5 font-medium tight-tracking">
                      {p.t}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">{p.b}</p>
                  </FadeUp>
                </li>
              ))}
            </ol>

            <Rule className="my-10" />

            <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 text-sm">
              {stats.map((s) => (
                <div key={s.k}>
                  <dt className="smallcaps">{s.k}</dt>
                  <dd className="mt-1 text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
