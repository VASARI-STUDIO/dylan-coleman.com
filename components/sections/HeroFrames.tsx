"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { HERO_FRAME_COUNT } from "@/lib/hero-frames";

// Apple-style scroll-driven frame sequence. Each PNG hero frame was re-encoded
// to WebP via scripts/build-hero-frames.mjs. We preload them, paint the current
// one to a <canvas>, and let GSAP ScrollTrigger drive the frame index from the
// Hero section's scroll progress. Lenis updates window.scrollY so the trigger
// reads the smoothed value automatically.
//
// Sub-frame blending: we draw frame N at full opacity and frame N+1 at the
// fractional alpha, so the bloom keeps interpolating cleanly even when the
// smooth-scroll deceleration drags scrollY through tiny sub-frame increments.
// Without this, the canvas would step between discrete frames during decel
// and look like dropped FPS.
const FRAME_COUNT = HERO_FRAME_COUNT;

const frameSrc = (i: number) =>
  asset(`/hero/frames/frame-${String(i + 1).padStart(3, "0")}.webp`);

export function HeroFrames({
  triggerRef,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      const done = () => {
        loaded++;
        if (!cancelled && loaded === FRAME_COUNT) setReady(true);
      };
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  // Paint + scroll-driven scrub
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastDrawn = -1;
    let coverRect = { dW: 0, dH: 0, dX: 0, dY: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recompute object-cover rect from a known-loaded image
      const sample = imagesRef.current.find((i) => i.complete);
      if (sample) {
        const imgAR = sample.naturalWidth / sample.naturalHeight;
        const boxAR = rect.width / rect.height;
        if (imgAR > boxAR) {
          const dH = rect.height;
          const dW = dH * imgAR;
          coverRect = { dH, dW, dX: (rect.width - dW) / 2, dY: 0 };
        } else {
          const dW = rect.width;
          const dH = dW / imgAR;
          coverRect = { dW, dH, dX: 0, dY: (rect.height - dH) / 2 };
        }
      }

      lastDrawn = -1; // force a redraw at the next paint
    };

    const drawAt = (exact: number) => {
      const idxA = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(exact)));
      const idxB = Math.max(0, Math.min(FRAME_COUNT - 1, idxA + 1));
      const alpha = Math.max(0, Math.min(1, exact - idxA));

      const imgA = imagesRef.current[idxA];
      const imgB = imagesRef.current[idxB];
      if (!imgA || !imgA.complete) return;

      const rect = canvas.getBoundingClientRect();
      const { dW, dH, dX, dY } = coverRect;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = 1;
      ctx.drawImage(imgA, dX, dY, dW, dH);

      // Blend the next frame at fractional alpha — sub-frame interpolation
      if (imgB && imgB.complete && idxB !== idxA && alpha > 0.005) {
        ctx.globalAlpha = alpha;
        ctx.drawImage(imgB, dX, dY, dW, dH);
        ctx.globalAlpha = 1;
      }
    };

    resize();
    drawAt(0);
    window.addEventListener("resize", resize);

    // GSAP ScrollTrigger scrubs frame index from the hero's scroll progress.
    // Range is shortened to half the hero (top top → center top) so the bloom
    // completes well before the visitor exits the hero, leaving headroom for
    // the fade-to-black bridge.
    let st: { kill: () => void } | undefined;
    (async () => {
      const [{ default: gsap }, mod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = mod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "center top", // ~50vh of scroll instead of the full 100vh
        scrub: 0.3, // tighter than 0.4 — quicker catch-up, less drift
        onUpdate: (self) => {
          const exact = self.progress * (FRAME_COUNT - 1);
          if (Math.abs(exact - lastDrawn) > 0.005) {
            drawAt(exact);
            lastDrawn = exact;
          }
        },
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      window.removeEventListener("resize", resize);
      st?.kill();
    };
  }, [ready, triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="hero-canvas pointer-events-none fixed inset-0 h-screen w-screen"
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 800ms ease-out",
      }}
    />
  );
}
