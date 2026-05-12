import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

// Modelled on Studio Namma's section 5 — sparse stacked rows, large grotesk,
// each row a comma-separated cluster of disciplines under a small numeric
// label. Reads as "the full range" — the Services section above pitches the
// packaged offerings; this surfaces everything I can actually do.
const groups = [
  {
    n: "01",
    label: "Web",
    items: [
      "Brand websites",
      "Landing pages",
      "Premium templates",
      "Performance builds",
      "CMS integration",
    ],
  },
  {
    n: "02",
    label: "Brand & Marketing",
    items: [
      "Visual identity",
      "Brand guidelines",
      "Marketing collateral",
      "Launch campaigns",
      "Art direction",
    ],
  },
  {
    n: "03",
    label: "Motion & 3D",
    items: [
      "GSAP scroll motion",
      "Editorial transitions",
      "Smooth scroll",
      "3D in Blender",
      "Animation direction",
    ],
  },
  {
    n: "04",
    label: "Strategy",
    items: [
      "Audience definition",
      "Positioning",
      "Conversion design",
      "SEO foundations",
      "Analytics setup",
    ],
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-border/40"
    >
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="03"
            label="Capabilities"
            title={
              <>
                The full <span className="serif-italic">range</span> — every
                discipline I bring to a project.
              </>
            }
            intro="The packaged offerings above cover most engagements. The list below is the broader toolkit underneath them."
          />
        </FadeUp>

        <ol className="mt-16 md:mt-20">
          {groups.map((g, i) => (
            <FadeUp key={g.n} delay={i * 0.06}>
              <li className="grid grid-cols-12 items-baseline gap-4 border-t border-border/40 py-10 md:py-14">
                <div className="col-span-12 flex items-center gap-3 md:col-span-3">
                  <span className="smallcaps">{g.n}</span>
                  <span className="smallcaps text-foreground">{g.label}</span>
                </div>
                <p className="col-span-12 max-w-[42ch] font-sans text-h4 font-medium tight-tracking text-foreground/85 md:col-span-9 md:text-h3">
                  {g.items.join(", ")}
                </p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
