"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Subtle radial vignette behind the content — reads as monochrome depth without imagery */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 30%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)",
        }}
      />
      {/* Bottom fade-to-black for the gradient hero treatment */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-page flex-col items-center px-6 md:px-12 pt-28 md:pt-40 pb-32 md:pb-48 text-center">
        {/* Trust pill */}
        <motion.div
          {...fade(0)}
          className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2 text-sm"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-card"
              >
                <Logo size={14} outerClass="border-foreground/40" innerClass="border-foreground/40" />
              </span>
            ))}
          </div>
          <span className="text-muted-foreground">
            Trusted by 45+ brands · Booking late-2026
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          {...fade(0.1)}
          className="mt-10 max-w-[18ch] font-sans text-display font-medium tight-tracking"
        >
          Considered design,
          <br />
          built like <span className="serif-italic">architecture.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.2)}
          className="mt-8 max-w-2xl text-lg leading-relaxed"
          style={{ color: "hsl(var(--hero-subtitle))" }}
        >
          Premium digital identities for ambitious brands — designed and built
          by Dylan Coleman. Each project is shaped around the audience it&apos;s
          meant to convert.
        </motion.p>

        {/* CTA pill — liquid glass shell with primary action */}
        <motion.form
          {...fade(0.3)}
          action="/#contact"
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
          <Button variant="solid" className="!h-10 !px-6 text-xs uppercase tracking-[0.18em]">
            Inquire
          </Button>
        </motion.form>

        {/* Spec strip */}
        <motion.dl
          {...fade(0.45)}
          className="mt-20 grid w-full grid-cols-2 gap-6 md:grid-cols-4 text-left text-sm"
        >
          <div>
            <dt className="smallcaps">Discipline</dt>
            <dd className="mt-1 text-foreground">Brand · Web · Editorial</dd>
          </div>
          <div>
            <dt className="smallcaps">Based</dt>
            <dd className="mt-1 text-foreground">United States · Remote</dd>
          </div>
          <div>
            <dt className="smallcaps">Index</dt>
            <dd className="mt-1 text-foreground">VOL.&nbsp;01 · 2026</dd>
          </div>
          <div>
            <dt className="smallcaps">Status</dt>
            <dd className="mt-1 text-foreground">Booking late-2026</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
