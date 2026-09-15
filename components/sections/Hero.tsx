"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";
import { HeroFrames } from "@/components/sections/HeroFrames";
import { SOCIALS } from "@/content/social";
import { HERO_FACTS } from "@/content/claims";

/**
 * Hero as a single screen the sequence scrubs across.
 *
 * This was briefly a tall scroll track with a `sticky` stage pinned inside it,
 * so the hero held still while the sequence played through. That bought a
 * fully-visible bloom at the cost of the thing people actually notice first:
 * the hero did not move when you scrolled. Roughly 470px of wheel produced no
 * visible change, which reads as a broken page, not as a held shot.
 *
 * So the hero is one viewport again and the sequence scrubs across its own
 * exit. The first pixel of scroll moves both the page and the image. To keep
 * the bloom from peaking off-screen — the flaw that motivated the pin — the
 * scrub finishes before the hero has finished leaving (see HeroFrames), so the
 * light reaches full while the island is still in frame and the last stretch
 * is simply a bloomed hero sliding away.
 *
 * The copy rides the same scroll progress, dimming as it goes so the words
 * hand off to the image instead of competing with the brightest frames.
 */

/** Entrance stagger, 60ms apart — long enough to read as a cascade. */
const enter = (i: number) => ({
  initial: { opacity: 0, transform: "translateY(18px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  transition: {
    duration: 0.75,
    delay: 0.1 + i * 0.06,
    // Strong ease-out — the built-in curve is too soft to feel intentional.
    ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
  },
});

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 with the hero filling the screen, 1 once it has fully scrolled off the
  // top — one viewport of travel, matching the ScrollTrigger in HeroFrames.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  // Copy holds at full strength while the bloom builds, then dims as it leaves.
  // The lift is slight: the section is already moving with the page, so a large
  // offset on top of that reads as the text detaching rather than as parallax.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5, 0.92], [1, 1, 0]);
  const copyLift = useTransform(
    scrollYProgress,
    [0, 0.5, 0.92],
    ["0px", "0px", "-32px"],
  );
  const copyTransform = useTransform(copyLift, (v) => `translateY(${v})`);

  // The scroll cue only makes sense while there is still track left to run.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    /* .hero-track is exactly 100svh (globals.css) — the hero fills the screen
       and nothing more.

       `-mt-20` cancels the `pt-20` that <main> uses to clear the fixed header.
       Without it the stage started 80px down the page while still being
       100svh tall, so it overhung the viewport by exactly that much and the
       spec strip along its bottom edge was sliced in half. With `sticky` that
       only showed on first paint — scrolling 80px pinned the stage and hid the
       mistake. Under prefers-reduced-motion the stage is `static`, so there is
       no pin to rescue it and the clipped strip is simply what the hero looks
       like. The hero is meant to be full-bleed under the transparent header
       anyway; the copy clears it with its own pt-24/pt-28. */
    <section ref={trackRef} className="hero-track relative -mt-20 w-full">
      {/* The stage. `relative` is load-bearing: the canvas and the two scrims
          below are positioned against it. */}
      <div className="relative h-[100svh] w-full overflow-hidden">
        {/* Frame-scrub background, scrubbed across the whole track */}
        <HeroFrames triggerRef={trackRef} />

        {/* Soft top vignette so the type sits crisply against the night sky */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-background via-background/40 to-transparent"
        />

        {/* Matching bottom scrim. As the sequence blooms, the island lights up
            exactly where the spec strip sits — without this the labels end up
            as white text on sunlit grass. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-background via-background/70 to-transparent"
        />

        {/* Hero content overlays the canvas */}
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { opacity: copyOpacity, transform: copyTransform }
          }
          className="relative z-10 mx-auto flex h-[100svh] max-w-page flex-col items-center justify-between px-6 md:px-12 pt-24 md:pt-28 pb-10 md:pb-12 text-center"
        >
          <div className="flex flex-col items-center">
            {/* Identity pill */}
            <motion.div
              {...enter(0)}
              className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2 text-sm"
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-foreground/80"
              />
              <span className="text-muted-foreground">
                <span className="text-foreground">Dylan Coleman</span>
                &nbsp;·&nbsp;Designer &amp; Developer
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              {...enter(1)}
              className="mt-8 max-w-[16ch] font-sans text-display font-medium tight-tracking"
            >
              Helping brands <span className="serif-italic">flourish.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...enter(2)}
              className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed"
              style={{ color: "hsl(var(--hero-subtitle))" }}
            >
              I build premium digital identities for ambitious brands — the kind
              of website that earns trust at first glance, and gets out of the
              way once it has it.
            </motion.p>

            {/* Action row */}
            <motion.div
              {...enter(3)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#contact"
                className="liquid-glass press inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm text-foreground/90 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                Contact
              </a>

              <span
                aria-hidden
                className="mx-1 hidden h-5 w-px bg-foreground/15 sm:block"
              />

              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="liquid-glass press grid h-11 w-11 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Spec strip — bottom of the stage, over the water-reflection edge */}
          <motion.dl
            {...enter(5)}
            className="grid w-full grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4 text-left text-sm"
          >
            {HERO_FACTS.map((f) => (
              <div key={f.label}>
                <dt className="smallcaps">{f.label}</dt>
                <dd className="mt-1 text-foreground">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Scroll cue — the stage is pinned, so say so. Fades once they move. */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center"
          >
            <span className="scroll-cue smallcaps">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
