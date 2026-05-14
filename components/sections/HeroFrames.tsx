"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

// Apple-style scroll-driven frame sequence. Each PNG hero frame was re-encoded
// to WebP via scripts/build-hero-frames.mjs. We preload them, paint the current
// one to a <canvas>, and let GSAP ScrollTrigger drive the frame index from the
// Hero section's scroll progress. Lenis updates window.scrollY so the trigger
// reads the smoothed value automatically.
const FRAME_COUNT = 40;

const frameSrc = (i: number) =>
  asset(`/hero/frames/frame-${String(i + 1).padStart(3, "0")}.webp`);

export function HeroFrames({
  triggerRef,
}: {
  /** Ref to the tall outer section that drives the scroll progress. */
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
      img.onload = () => {
        loaded++;
        if (!cancelled && loaded === FRAME_COUNT) setReady(true);
      };
      img.onerror = () => {
        // Don't block forever on a single 404 — count it as loaded
        loaded++;
        if (!cancelled && loaded === FRAME_COUNT) setReady(true);
      };
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

    let currentFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(currentFrame);
    };

    const draw = (idx: number) => {
      const img = imagesRef.current[idx];
      if (!img || !img.complete) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // object-cover: scale to cover, crop overflow
      const imgAR = img.naturalWidth / img.naturalHeight;
      const boxAR = rect.width / rect.height;
      let dW: number, dH: number, dX: number, dY: number;
      if (imgAR > boxAR) {
        dH = rect.height;
        dW = dH * imgAR;
        dX = (rect.width - dW) / 2;
        dY = 0;
      } else {
        dW = rect.width;
        dH = dW / imgAR;
        dX = 0;
        dY = (rect.height - dH) / 2;
      }
      ctx.drawImage(img, dX, dY, dW, dH);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);

    // Wire up GSAP ScrollTrigger lazily so non-hero pages don't pay for it.
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
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const idx = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1))),
          );
          if (idx !== currentFrame) {
            currentFrame = idx;
            draw(idx);
          }
        },
      });

      // Ensure correct frame on first paint
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
      className="absolute inset-0 h-full w-full"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 800ms ease-out" }}
    />
  );
}
