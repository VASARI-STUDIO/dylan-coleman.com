"use client";

import { useEffect, useRef } from "react";

// Edge-to-edge horizontal marquee that drifts on its own and nudges with
// scroll velocity via GSAP ScrollTrigger. Used as a section divider.
export function Marquee({
  items,
  speed = 50,
}: {
  items: string[];
  /** Pixels per second base drift */
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let kill: (() => void) | undefined;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const track = trackRef.current;
      if (!track) return;

      // Width of one copy of the track (we render two copies back-to-back).
      const totalWidth = track.scrollWidth / 2;
      const duration = totalWidth / speed;

      const tween = gsap.to(track, {
        x: -totalWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
        },
      });

      let scrollDirection = 1;
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const dir = self.direction;
          if (dir !== scrollDirection) {
            scrollDirection = dir;
            gsap.to(tween, {
              timeScale: dir === 1 ? 1 : -1,
              duration: 0.4,
              overwrite: true,
            });
          }
        },
      });

      kill = () => {
        tween.kill();
        trigger.kill();
      };
    })();

    return () => kill?.();
  }, [speed]);

  // Render the items twice so the loop can wrap seamlessly.
  const sequence = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="font-sans text-2xl md:text-4xl font-medium text-foreground/80">
            {it}
          </span>
          <span aria-hidden className="block h-1 w-1 rounded-full bg-foreground/30" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="border-y border-border/40 overflow-hidden py-8 md:py-10"
    >
      <div ref={trackRef} className="flex w-max">
        {sequence}
        {sequence}
      </div>
    </section>
  );
}
