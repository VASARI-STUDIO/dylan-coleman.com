"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HeroFrames } from "@/components/sections/HeroFrames";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

// Hero is a normal-height section (~one viewport). The frame sequence plays
// out as a parallax background while the user freely scrolls past — no
// scroll trap, no pinned scrub-section.
//
// ScrollTrigger spans `top top` → `bottom top` on this section, so the bloom
// completes by the time the section's bottom edge passes the viewport top
// (i.e. by the time the visitor has just scrolled past the hero).
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Frame-scrub parallax background */}
      <HeroFrames triggerRef={sectionRef} />

      {/* Soft top vignette so the type sits crisply against the night sky */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-background via-background/40 to-transparent"
      />

      {/* Hero content overlays the canvas */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-page flex-col items-center justify-between px-6 md:px-12 pt-28 md:pt-32 pb-10 md:pb-12 text-center">
        <div className="flex flex-col items-center">
          {/* Identity pill */}
          <motion.div
            {...fade(0)}
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
            {...fade(0.1)}
            className="mt-8 max-w-[16ch] font-sans text-display font-medium tight-tracking"
          >
            Helping brands{" "}
            <span className="serif-italic">flourish.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fade(0.2)}
            className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: "hsl(var(--hero-subtitle))" }}
          >
            I build premium digital identities for ambitious brands — the kind
            of website that earns trust at first glance, and gets out of the
            way once it has it.
          </motion.p>

          {/* CTA pill */}
          <motion.form
            {...fade(0.3)}
            action="#contact"
            method="get"
            className="liquid-glass mt-8 flex w-full max-w-lg items-center gap-2 rounded-full p-2"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.hash = "#contact";
            }}
          >
            <input
              type="email"
              placeholder="Your email — start a conversation"
              className="flex-1 bg-transparent px-5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Your email"
            />
            <Button
              variant="solid"
              className="!h-10 !px-6 text-xs uppercase tracking-[0.18em]"
            >
              Inquire
            </Button>
          </motion.form>
        </div>

        {/* Spec strip — bottom of viewport, over the water-reflection edge */}
        <motion.dl
          {...fade(0.45)}
          className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 text-left text-sm"
        >
          <div>
            <dt className="smallcaps">Discipline</dt>
            <dd className="mt-1 text-foreground">Brand &amp; Web</dd>
          </div>
          <div>
            <dt className="smallcaps">Based</dt>
            <dd className="mt-1 text-foreground">Brisbane, Australia · Remote</dd>
          </div>
          <div>
            <dt className="smallcaps">Working with</dt>
            <dd className="mt-1 text-foreground">Founders &amp; Studios</dd>
          </div>
          <div>
            <dt className="smallcaps">Status</dt>
            <dd className="mt-1 text-foreground">Booking late 2026</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
