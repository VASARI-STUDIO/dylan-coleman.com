"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

// Sparse stacked rows, large grotesk, each row a discipline cluster under a
// small numeric label. Reads as "the full range" — the Services section above
// pitches the packaged offerings; this surfaces everything underneath them.
//
// Each row is a disclosure: the headline cluster stays scannable, and opening a
// row explains how that discipline actually gets used, pointing at work that is
// in this portfolio rather than making abstract claims.
type Group = {
  n: string;
  label: string;
  items: string[];
  detail: string;
};

const groups: Group[] = [
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
    detail:
      "Most engagements land here. Builds run on Next.js or Framer depending on who has to maintain the site afterwards — Next.js when it needs to be fast, custom and owned outright, Framer when you want to edit it yourself without me in the loop. Spark Electrical is the reference build: nine service pages generated from a typed data source, an interactive calculator, and an intent-aware contact flow, shipped as one static site with no backend to pay for.",
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
    detail:
      "Identity work that survives contact with the real world — a wordmark that still reads at the size of a van door or a favicon, a palette that holds up in print and on screen, and a guidelines document so the next person to touch it does not undo it. Floors Restore was logo plus a full guidelines set; Finish Line was the whole system, built to hold premium pricing in a category that mostly does not.",
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
    detail:
      "Motion used to direct attention, not to decorate. GSAP ScrollTrigger for scroll-linked sequences, Lenis for smoothed scrolling, and reduced-motion paths so none of it fights anyone who has asked their system to calm down. 3D is modelled in Blender when a diagram will not do the job — the isometric campus map for Bar-Tech exists because a screenshot could not show system reach at a glance.",
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
    detail:
      "The part that decides whether the rest is worth building. Who the site is for, what it has to prove to them, and which single action it is trying to earn. That drives page structure, not the other way around — the Bar-Tech sales site was re-pointed at distributors and integrators rather than end users, and the whole information architecture changed as a result. SEO foundations and analytics are set up at launch so you can tell whether any of it worked.",
  },
];

export function Capabilities() {
  const [open, setOpen] = useState<string | null>(null);

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
            intro="The packaged offerings above cover most engagements. The list below is the broader toolkit underneath them — open any row for how it actually gets used."
          />
        </FadeUp>

        <ol className="mt-16 md:mt-20">
          {groups.map((g, i) => (
            <FadeUp key={g.n} delay={i * 0.06}>
              <CapabilityRow
                group={g}
                open={open === g.n}
                onToggle={() => setOpen((cur) => (cur === g.n ? null : g.n))}
              />
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CapabilityRow({
  group,
  open,
  onToggle,
}: {
  group: Group;
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const labelId = useId();

  return (
    <li className="border-t border-border/40">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          id={labelId}
          className="group grid w-full grid-cols-12 items-baseline gap-4 py-10 text-left md:py-14"
        >
          <span className="col-span-12 flex items-center gap-3 md:col-span-3">
            <span className="smallcaps">{group.n}</span>
            <span className="smallcaps text-foreground">{group.label}</span>
          </span>

          <span className="col-span-12 flex items-start justify-between gap-6 md:col-span-9">
            <span className="max-w-[42ch] font-sans text-h4 font-medium tight-tracking text-foreground/85 transition-colors group-hover:text-foreground md:text-h3">
              {group.items.join(", ")}
            </span>
            <span
              aria-hidden
              className="mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors group-hover:border-foreground/60 group-hover:text-foreground"
            >
              <Plus
                className={`h-4 w-4 transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
                strokeWidth={1.5}
              />
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={labelId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-12 md:pb-16">
              <div className="col-span-12 md:col-span-9 md:col-start-4">
                <p className="max-w-prose text-body text-muted-foreground">
                  {group.detail}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border/60 px-3 py-1.5 text-sm text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
