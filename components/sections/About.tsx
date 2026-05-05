import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";

const stats = [
  { k: "Practicing", v: "5+ years" },
  { k: "Projects shipped", v: "45+" },
  { k: "Discipline", v: "Brand · Web" },
  { k: "Currently", v: "In-house · Freelance" },
];

const principles = [
  {
    n: "01",
    t: "Audience first",
    b: "Every project starts with the person it&apos;s meant to convert. Design follows.",
  },
  {
    n: "02",
    t: "Edit hard",
    b: "Restraint is the most premium signal there is. We cut until what remains is unarguable.",
  },
  {
    n: "03",
    t: "Build it once",
    b: "Performance, accessibility and craft aren&apos;t passes — they&apos;re the floor.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-page px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="04"
          label="About"
          title="A studio of one. Meticulous by default, fast by design."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* Portrait slot */}
            <div className="aspect-[4/5] w-full max-w-md overflow-hidden border border-rule bg-rule/40">
              <div className="grid h-full place-items-center text-muted">
                <span className="smallcaps">Portrait · drop in /public/portrait.jpg</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="font-display text-lede italic text-ink/85 max-w-prose">
              I started building websites at seventeen. What began as a
              freelance habit became a discipline — and a quiet conviction that
              the best digital work feels less like marketing and more like
              architecture.
            </p>
            <p className="mt-6 max-w-prose text-body text-ink/80">
              I work with a small number of clients each year, mostly on brand
              websites and launches where the design and the code matter
              equally. The result is meant to feel inevitable — the only way the
              brand could have been built.
            </p>

            <Rule className="my-10" />

            <ol className="grid gap-8 md:grid-cols-3">
              {principles.map((p) => (
                <li key={p.n}>
                  <span className="smallcaps text-muted">{p.n}</span>
                  <h4 className="mt-3 font-display text-h5 leading-[1.15] tracking-[-0.01em]">
                    {p.t}
                  </h4>
                  <p
                    className="mt-2 text-body-sm text-ink/75"
                    dangerouslySetInnerHTML={{ __html: p.b }}
                  />
                </li>
              ))}
            </ol>

            <Rule className="my-10" />

            <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 text-body-sm">
              {stats.map((s) => (
                <div key={s.k}>
                  <dt className="smallcaps text-muted">{s.k}</dt>
                  <dd className="mt-1 text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
