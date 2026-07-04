"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { FadeUp } from "@/components/ui/FadeUp";
import { HERO_WORK, type WorkItem } from "@/content/work";
import { asset } from "@/lib/asset";

// Full-width scroll-list of projects. Each row spans 90vh, holds the visitor's
// attention on a single piece, and reveals an audience-targeted blurb only
// when the row sits centered in the viewport — so prospects self-select by
// the industry that matches them.
//
// CSS scroll-snap is set to `proximity` (not mandatory) so the page never
// feels grabby — Lenis's smoothed scroll glides between rows but lands cleanly.
export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-border/40"
      style={{ scrollSnapType: "y proximity" }}
    >
      <div className="mx-auto max-w-page px-6 md:px-12 pt-24 md:pt-36 pb-12 md:pb-16">
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
            intro="Scroll through each piece. Linger on the one closest to what you're building — its detail page is written for that audience."
          />
        </FadeUp>
      </div>

      <ul className="w-full">
        {HERO_WORK.map((item, i) => (
          <WorkRow key={item.slug} item={item} index={i} />
        ))}
      </ul>
    </section>
  );
}

function WorkRow({ item, index }: { item: WorkItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Focus = how "centered" the row is in the viewport (peaks at 0.5).
  const focus = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5, 0.65, 1],
    [0, 0.6, 1, 0.6, 0],
  );
  const opacity = useTransform(focus, [0, 1], [0.45, 1]);
  const blurbOpacity = useTransform(focus, [0.55, 1], [0, 1]);
  const blurbY = useTransform(focus, [0.55, 1], [12, 0]);
  const imageScale = useTransform(focus, [0, 1], [1.08, 1]);
  // Indent slightly when centered — subtle "selected" feel
  const titleX = useTransform(focus, [0, 1], [0, 12]);

  const isLeftAlign = index % 2 === 0;

  return (
    <motion.li
      ref={ref}
      style={{ opacity, scrollSnapAlign: "center" }}
      className="relative border-t border-border/40"
    >
      <Link
        href={`/work/${item.slug}`}
        className="group block min-h-[90vh] py-12 md:py-0"
      >
        <div
          className={`mx-auto grid h-full min-h-[90vh] max-w-page items-center gap-8 px-6 md:px-12 md:gap-16 ${
            isLeftAlign ? "md:grid-cols-[5fr_7fr]" : "md:grid-cols-[7fr_5fr]"
          }`}
        >
          {/* Type column */}
          <motion.div
            style={{ x: titleX }}
            className={`order-2 ${isLeftAlign ? "md:order-1" : "md:order-2"}`}
          >
            <div className="flex items-center gap-4">
              <span className="smallcaps">{item.index}</span>
              <span className="smallcaps">{item.year}</span>
            </div>
            <h3 className="mt-6 font-sans text-h2 font-medium tight-tracking">
              {item.title}
            </h3>
            <div className="mt-4">
              <IndustryTag k={item.audience} />
            </div>
            <motion.div
              style={{ opacity: blurbOpacity, y: blurbY }}
              className="mt-8"
            >
              <p className="max-w-prose text-body-lg text-muted-foreground">
                {item.summary}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground transition-transform group-hover:translate-x-1">
                Read case
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </motion.div>
          </motion.div>

          {/* Image column */}
          <div
            className={`relative order-1 h-[55vh] overflow-hidden rounded-2xl bg-card md:h-[78vh] ${
              isLeftAlign ? "md:order-2" : "md:order-1"
            }`}
          >
            {item.cover && (
              <motion.img
                src={asset(item.cover)}
                alt={item.title}
                style={{ scale: imageScale }}
                loading={index < 1 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
