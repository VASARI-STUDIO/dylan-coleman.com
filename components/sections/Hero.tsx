"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HillsScene } from "@/components/sections/HillsScene";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Parallax hills + scroll-driven flower bloom (no sky — just hills against the dark theme) */}
      <HillsScene />

      {/* Soft top-down vignette behind the headline so the type sits crisply against the scene */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-background/80 via-background/30 to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-page flex-col items-center px-6 md:px-12 pt-28 md:pt-36 pb-32 md:pb-44 text-center">
        {/* Identity pill — name + role surfaced first */}
        <motion.div
          {...fade(0)}
          className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2 text-sm"
        >
          <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-foreground/80" />
          <span className="text-muted-foreground">
            <span className="text-foreground">Dylan Coleman</span>
            &nbsp;·&nbsp;Designer &amp; Developer
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          {...fade(0.1)}
          className="mt-10 max-w-[16ch] font-sans text-display font-medium tight-tracking"
        >
          Helping brands{" "}
          <span className="serif-italic">flourish.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.2)}
          className="mt-8 max-w-2xl text-lg leading-relaxed"
          style={{ color: "hsl(var(--hero-subtitle))" }}
        >
          I build premium digital identities for ambitious brands — the kind of
          website that earns trust at first glance, and gets out of the way once
          it has it.
        </motion.p>

        {/* CTA pill — start a conversation */}
        <motion.form
          {...fade(0.3)}
          action="#contact"
          method="get"
          className="liquid-glass mt-12 flex w-full max-w-lg items-center gap-2 rounded-full p-2"
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

        {/* Spacer to push spec strip to the bottom of the viewport */}
        <div className="flex-1" />

        {/* Spec strip */}
        <motion.dl
          {...fade(0.45)}
          className="mt-20 grid w-full grid-cols-2 gap-6 md:grid-cols-4 text-left text-sm"
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
