import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { FadeUp } from "@/components/ui/FadeUp";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { PRINCIPLES } from "@/content/principles";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dylan Coleman — designer and developer in Brisbane, Australia. Brand and web work for businesses that need to be taken seriously.",
  alternates: { canonical: "/about" },
};

// Colophon. Every line is checkable against the repo — a designer's about
// page that hand-waves about its own construction is the wrong signal, and
// crediting the generated hero footage is the same disclosure the Spark
// Electrical case study already makes about its imagery.
const colophon = [
  {
    k: "Built with",
    v: "Next.js and TypeScript, styled with Tailwind, deployed on Vercel.",
  },
  {
    k: "Type",
    v: "Inter for text, Instrument Serif for the italic accents. Both self-hosted at build time, so loading a page doesn't tell a font provider you visited.",
  },
  {
    k: "Hero sequence",
    v: "A 76-frame scroll-scrubbed canvas. The footage was generated with Kling AI, then re-encoded and sequenced for the web.",
  },
  {
    k: "Project imagery",
    v: "Photography and renders are my own unless a case study says otherwise — demonstration projects credit generated imagery in their details.",
  },
  {
    k: "Tracking",
    v: "None. No analytics, no cookies, no pixels. See the privacy page.",
  },
];

const working = [
  {
    k: "Based",
    v: "Brisbane, Queensland",
    note: "AEST, UTC+10. Queensland does not observe daylight saving, so my offset is the same all year.",
  },
  {
    k: "Working with",
    v: "Founders and studios",
    note: "Remote across Australia, and anywhere with a workable overlap. Most projects run without a single in-person meeting.",
  },
  {
    k: "Engagements",
    v: "Fixed scope, fixed price",
    note: "Quoted in Australian dollars against a written proposal. No hourly billing surprises.",
  },
  {
    k: "Currently",
    v: "Bar-Tech Automation · Freelance",
    note: "In-house design for industrial Building Management Systems, alongside a small freelance practice.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      index="A/00"
      label="About"
      title={
        <>
          A studio of one — patient by{" "}
          <span className="serif-italic">practice,</span> fast by design.
        </>
      }
      lede="I design and build brand identities and websites from Brisbane. The short version: I learned this by running a business that needed it, then kept going."
    >
      {/* Portrait + story */}
      <section className="border-t border-border/40">
        <div className="mx-auto grid max-w-page gap-12 px-6 md:grid-cols-12 md:px-12 py-16 md:py-24">
          <FadeUp className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-card">
              <Image
                src={asset("/about/portrait.webp")}
                alt="Dylan Coleman"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeUp>

          <div className="md:col-span-7">
            <FadeUp>
              <p className="max-w-prose font-sans text-2xl font-medium tight-tracking">
                I founded my first business at seventeen — Finish Line Car
                Detailing, a mobile studio I ran in Brisbane for three years.
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="prose-page mt-8 max-w-prose">
                <p>
                  Building that brand from scratch became my proof of concept.
                  Detailing is a category where most competitors look like they
                  were last touched in 2008, and the identity was the thing that
                  let a teenager&apos;s mobile operation charge like an
                  established studio. Design, treated like architecture, can
                  move a small operator into a category most consider out of
                  reach. I have been working from that premise ever since.
                </p>
                <p>
                  Today I split my time between an in-house role at{" "}
                  <strong>Bar-Tech Automation</strong> — designing for
                  industrial Building Management Systems, which is a useful
                  corrective to designing only pretty things — and a small
                  freelance practice for brands ready to be taken seriously.
                </p>
                <p>
                  The industrial work matters more than it sounds. It is
                  technical, unglamorous, and read by people who will not
                  forgive a confusing interface. It keeps the rest of my work
                  honest about the difference between something that looks
                  designed and something that works.
                </p>
                <p>
                  I take on a small number of freelance clients so that each one
                  gets the attention the work needs. The result is meant to feel
                  inevitable — as though it was the only way the brand could
                  have been built.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
          <FadeUp>
            <h2 className="smallcaps">How I work</h2>
          </FadeUp>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {PRINCIPLES.map((p, i) => (
              <li key={p.n}>
                <FadeUp delay={0.05 + i * 0.06}>
                  <span className="smallcaps">{p.n}</span>
                  <h3 className="mt-3 font-sans text-h4 font-medium tight-tracking">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-body text-muted-foreground">{p.long}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Practicalities */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
          <FadeUp>
            <h2 className="smallcaps">The practical details</h2>
          </FadeUp>
          {/* FadeUp renders the <div> that <dl> expects as a direct child — an
              extra wrapper in between would orphan each dt/dd pair. */}
          <dl className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
            {working.map((w, i) => (
              <FadeUp key={w.k} delay={0.05 + i * 0.05}>
                <dt className="smallcaps">{w.k}</dt>
                <dd className="mt-2 font-sans text-h5 font-medium tight-tracking">
                  {w.v}
                </dd>
                <dd className="mt-2 text-body-sm text-muted-foreground">
                  {w.note}
                </dd>
              </FadeUp>
            ))}
          </dl>

          <Rule className="my-12 md:my-16" />

          <FadeUp>
            <h2 className="smallcaps">Colophon</h2>
          </FadeUp>
          <dl className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-12">
            {colophon.map((c, i) => (
              <FadeUp
                key={c.k}
                delay={0.04 + i * 0.04}
                className="md:col-span-12 md:grid md:grid-cols-12 md:gap-12"
              >
                <dt className="smallcaps md:col-span-3">{c.k}</dt>
                <dd className="mt-1 max-w-prose text-body-sm text-muted-foreground md:col-span-9 md:mt-0">
                  {c.v}
                </dd>
              </FadeUp>
            ))}
          </dl>

          <Rule className="my-12 md:my-16" />

          <FadeUp>
            <h2 className="max-w-[22ch] font-sans text-h2 font-medium tight-tracking">
              If that sounds like the way you want to work, say hello.
            </h2>
            <div className="mt-10">
              <Button href="/#contact" variant="solid">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}
