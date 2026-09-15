"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { HERO_FRAME_COUNT } from "@/lib/hero-frames";
import { markHeroReady } from "@/lib/hero-ready";

// Apple-style scroll-driven frame sequence. Each hero frame is a WebP produced
// by scripts/build-hero-frames.mjs. We paint the current frame to a <canvas>
// and let GSAP ScrollTrigger drive the frame index from the Hero section's
// scroll progress. Lenis updates window.scrollY so the trigger reads the
// smoothed value automatically.
//
// LOADING STRATEGY — this used to fire all ~76 requests at once and keep the
// canvas at opacity 0 until every one resolved, so a first-time visitor stared
// at an empty hero for the length of the whole sequence. Now:
//   1. Frame 0 loads at high priority and reveals the canvas on its own.
//   2. The rest load through a small concurrency window in subdivision order
//      (ends, then midpoints, then the gaps), so coverage across the sequence
//      improves evenly instead of filling in left-to-right.
//   3. Scrubbing falls back to the nearest already-loaded frame, so an early
//      scroll shows the closest real frame rather than nothing.
//
// Sub-frame blending: we draw frame N at full opacity and frame N+1 at the
// fractional alpha, so the bloom keeps interpolating cleanly even when the
// smooth-scroll deceleration drags scrollY through tiny sub-frame increments.
const FRAME_COUNT = HERO_FRAME_COUNT;

// How many frame requests may be in flight at once after the first one. Kept
// small so the frames don't contend with fonts, CSS and the rest of the page.
const CONCURRENCY = 6;

const frameSrc = (i: number) =>
  asset(`/hero/frames/frame-${String(i + 1).padStart(3, "0")}.webp`);

/**
 * Order to fetch frames in: both ends first, then repeatedly halve the gap.
 * Gives the scrubber usable coverage across the whole sequence early, instead
 * of a fully-loaded first third and nothing after it.
 */
function subdivisionOrder(n: number): number[] {
  if (n <= 0) return [];
  const order: number[] = [];
  const seen = new Set<number>();
  const push = (i: number) => {
    if (i >= 0 && i < n && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };

  push(0);
  push(n - 1);
  for (let step = n - 1; step > 1; step = Math.floor(step / 2)) {
    for (let i = step; i < n; i += step) push(i);
  }
  for (let i = 0; i < n; i++) push(i); // sweep up anything left
  return order;
}

/**
 * How much of the sequence this visitor should actually download.
 *
 * The full run is ~3.9 MB. That is a fine trade on a desktop connection for a
 * scroll-driven centrepiece, and an indefensible one on a phone on mobile data
 * — which, for a Brisbane studio, is a large share of real traffic. So pick a
 * stride: every Nth frame is fetched, and the painter interpolates across the
 * gaps, which it has to do between any two frames anyway.
 */
function frameStride(): number {
  if (typeof window === "undefined") return 1;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return FRAME_COUNT; // ends only — the scrub is disabled anyway
  }

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (conn?.saveData) return 8;
  if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return 8;
  if (window.innerWidth < 768) return 6;
  if (window.innerWidth < 1280) return 3;
  return 2;
}

/** Frame indices to fetch for a given stride. Always includes both ends. */
function framesForStride(stride: number): number[] {
  if (stride <= 1) return Array.from({ length: FRAME_COUNT }, (_, i) => i);
  const set = new Set<number>([0, FRAME_COUNT - 1]);
  for (let i = 0; i < FRAME_COUNT; i += stride) set.add(i);
  return [...set].sort((a, b) => a - b);
}

export function HeroFrames({
  triggerRef,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  // Lets the "a frame arrived" effect ask the paint effect to repaint, WITHOUT
  // being in its dependency list — otherwise every one of the ~76 loads would
  // tear down and rebuild the ScrollTrigger and re-import GSAP.
  const redrawRef = useRef<(() => void) | null>(null);
  const exactRef = useRef(0);
  // Bumped each time a frame lands, so the canvas can repaint with better
  // source material as the sequence fills in.
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Load frame 0 first, reveal, then stream the rest through a small window.
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(FRAME_COUNT);
    loadedRef.current = new Array(FRAME_COUNT).fill(false);

    const load = (i: number, priority: "high" | "low") =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        // fetchPriority is not in every TS DOM lib yet; harmless where unsupported.
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          priority;
        const done = () => {
          if (!cancelled) {
            loadedRef.current[i] = img.naturalWidth > 0;
            setLoadedCount((c) => c + 1);
          }
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        img.src = frameSrc(i);
        imagesRef.current[i] = img;
      });

    (async () => {
      const wanted = new Set(framesForStride(frameStride()));
      const order = subdivisionOrder(FRAME_COUNT).filter((i) => wanted.has(i));
      if (!order.length) {
        setFirstFrameReady(true);
        markHeroReady();
        return;
      }

      // 1. First frame — this alone un-hides the canvas.
      await load(order[0], "high");
      if (cancelled) return;
      setFirstFrameReady(true);
      markHeroReady();

      // 2. Everything else, CONCURRENCY at a time.
      const rest = order.slice(1);
      let cursor = 0;
      const worker = async () => {
        while (!cancelled) {
          const i = cursor++;
          if (i >= rest.length) return;
          await load(rest[i], "low");
        }
      };
      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, rest.length) }, worker),
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Paint + scroll-driven scrub
  useEffect(() => {
    if (!firstFrameReady) return;
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastDrawn = -1;

    /** Highest loaded index at or below `i`. */
    const prevLoadedAt = (i: number): number => {
      for (let k = Math.min(i, FRAME_COUNT - 1); k >= 0; k--) {
        if (loadedRef.current[k]) return k;
      }
      return -1;
    };

    /** Lowest loaded index at or above `i`. */
    const nextLoadedAt = (i: number): number => {
      for (let k = Math.max(i, 0); k < FRAME_COUNT; k++) {
        if (loadedRef.current[k]) return k;
      }
      return -1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Assigning canvas.width/height WIPES the bitmap. Marking lastDrawn
      // dirty only helps if something paints afterwards, and the only painter
      // is the scroll handler — so resizing without scrolling left the hero
      // permanently blank. Repaint at the current position immediately.
      lastDrawn = -1;
      drawAt(exactRef.current);
    };

    /**
     * object-cover geometry for one image against the current canvas box.
     *
     * Derived per draw from the image actually being painted rather than
     * cached from a "sample" frame at setup time. The cached version was a
     * trap: if the sample lookup missed — which it can, because setup now runs
     * as soon as the FIRST frame lands rather than after all of them — the
     * rect stayed {0,0,0,0} for the life of the component and every later
     * redraw silently painted at zero size onto a blank canvas.
     */
    const coverFor = (img: HTMLImageElement, boxW: number, boxH: number) => {
      const imgAR = img.naturalWidth / img.naturalHeight;
      const boxAR = boxW / boxH;
      if (!Number.isFinite(imgAR) || imgAR <= 0) {
        return { dW: boxW, dH: boxH, dX: 0, dY: 0 };
      }
      if (imgAR > boxAR) {
        const dH = boxH;
        const dW = dH * imgAR;
        return { dW, dH, dX: (boxW - dW) / 2, dY: 0 };
      }
      const dW = boxW;
      const dH = dW / imgAR;
      return { dW, dH, dX: 0, dY: (boxH - dH) / 2 };
    };

    const drawAt = (exact: number) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, exact));

      // Interpolate between the two nearest LOADED frames rather than between
      // exact neighbours. With a stride the exact next frame is usually absent,
      // and blending across the real gap is what keeps a reduced sequence
      // looking continuous instead of stepping.
      let a = prevLoadedAt(Math.floor(clamped));
      if (a < 0) a = nextLoadedAt(0);
      if (a < 0) return;
      const imgA = imagesRef.current[a];
      if (!imgA) return;

      const rect = canvas.getBoundingClientRect();
      const { dW, dH, dX, dY } = coverFor(imgA, rect.width, rect.height);

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = 1;
      ctx.drawImage(imgA, dX, dY, dW, dH);

      const b = nextLoadedAt(a + 1);
      if (b > a) {
        const imgB = imagesRef.current[b];
        const t = (clamped - a) / (b - a);
        if (imgB && t > 0.005) {
          ctx.globalAlpha = Math.min(1, t);
          ctx.drawImage(imgB, dX, dY, dW, dH);
          ctx.globalAlpha = 1;
        }
      }
    };

    resize();
    drawAt(lastDrawn >= 0 ? lastDrawn : 0);
    window.addEventListener("resize", resize);

    // Respect reduced-motion: paint a representative frame and skip the scrub
    // entirely rather than tying a large animation to the scroll wheel.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      exactRef.current = FRAME_COUNT - 1;
      drawAt(exactRef.current);
      redrawRef.current = () => drawAt(exactRef.current);
      return () => {
        redrawRef.current = null;
        window.removeEventListener("resize", resize);
      };
    }

    redrawRef.current = () => {
      lastDrawn = -1;
      drawAt(exactRef.current);
    };

    // GSAP ScrollTrigger scrubs frame index from the hero's scroll progress.
    // Range is shortened to half the hero (top top → center top) so the bloom
    // completes well before the visitor exits the hero, leaving headroom for
    // the fade-to-black bridge.
    let st: { kill: () => void } | undefined;
    // The GSAP import is async, so this effect can be cleaned up before the
    // trigger exists. Without this flag the late-arriving trigger is never
    // killed — it keeps firing against a dead canvas and pins the frame
    // buffers in memory.
    let disposed = false;
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
          exactRef.current = exact;
          if (Math.abs(exact - lastDrawn) > 0.005) {
            drawAt(exact);
            lastDrawn = exact;
          }
        },
      });

      if (disposed) {
        st.kill();
        st = undefined;
        return;
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      disposed = true;
      redrawRef.current = null;
      window.removeEventListener("resize", resize);
      st?.kill();
    };
  }, [firstFrameReady, triggerRef]);

  // As frames stream in, repaint so an early scroll that landed on a fallback
  // neighbour sharpens up to the real frame. Cheap: one canvas draw, no
  // ScrollTrigger churn.
  useEffect(() => {
    redrawRef.current?.();
  }, [loadedCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="hero-canvas pointer-events-none fixed inset-0 h-screen w-screen"
      style={{
        opacity: firstFrameReady ? 1 : 0,
        transition: "opacity 800ms ease-out",
      }}
    />
  );
}
