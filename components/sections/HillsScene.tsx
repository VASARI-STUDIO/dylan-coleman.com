"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

// Monochrome parallax hill scene with scroll-driven flower bloom.
// Three hill layers (back/mid/front) translate at different speeds; flowers
// staggered across the layers grow from base as the user scrolls through the
// hero. SVG-native — no images, no extra requests.

type Bloom = "dot" | "asterisk" | "tulip";

type FlowerSpec = {
  x: number;
  baseY: number;
  stem: number;
  size: number;
  layer: 1 | 2 | 3;
  range: [number, number];
  type: Bloom;
};

const flowers: FlowerSpec[] = [
  // Back layer — small, distant, blooms first
  { x: 80, baseY: 720, stem: 12, size: 6, layer: 1, range: [0.04, 0.18], type: "dot" },
  { x: 240, baseY: 705, stem: 14, size: 6, layer: 1, range: [0.06, 0.20], type: "asterisk" },
  { x: 480, baseY: 715, stem: 11, size: 5, layer: 1, range: [0.09, 0.23], type: "dot" },
  { x: 760, baseY: 700, stem: 14, size: 6, layer: 1, range: [0.12, 0.26], type: "tulip" },
  { x: 1040, baseY: 712, stem: 12, size: 5, layer: 1, range: [0.14, 0.28], type: "dot" },
  { x: 1300, baseY: 705, stem: 13, size: 6, layer: 1, range: [0.16, 0.30], type: "asterisk" },

  // Mid layer
  { x: 160, baseY: 770, stem: 24, size: 9, layer: 2, range: [0.18, 0.40], type: "asterisk" },
  { x: 420, baseY: 760, stem: 28, size: 10, layer: 2, range: [0.22, 0.44], type: "tulip" },
  { x: 880, baseY: 765, stem: 26, size: 9, layer: 2, range: [0.26, 0.48], type: "dot" },
  { x: 1200, baseY: 755, stem: 30, size: 10, layer: 2, range: [0.30, 0.52], type: "asterisk" },

  // Front layer — large, full opacity, blooms last
  { x: 120, baseY: 840, stem: 38, size: 15, layer: 3, range: [0.34, 0.62], type: "tulip" },
  { x: 380, baseY: 855, stem: 44, size: 17, layer: 3, range: [0.40, 0.68], type: "asterisk" },
  { x: 720, baseY: 850, stem: 34, size: 15, layer: 3, range: [0.46, 0.74], type: "dot" },
  { x: 1060, baseY: 845, stem: 46, size: 19, layer: 3, range: [0.52, 0.80], type: "tulip" },
  { x: 1380, baseY: 855, stem: 38, size: 15, layer: 3, range: [0.58, 0.86], type: "asterisk" },
];

const layerOpacity = { 1: 0.55, 2: 0.78, 3: 1.0 } as const;

export function HillsScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Per-layer parallax — back drifts least, front drifts most.
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -110]);

  // Pre-computed grass tick positions — sampled along the front hill curve.
  const grassTicks = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 0.5) * (1700 / 90);
    const t = (x + 100) / 1800;
    const yHill = 850 - Math.sin(t * Math.PI) * 32;
    const h = 4 + ((i * 13) % 6);
    return { x, y: yHill, h };
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Subtle floor wash so the hills sit on a barely-warmer band of black */}
        <defs>
          <linearGradient id="floor-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>
        <rect x="0" y="600" width="1600" height="300" fill="url(#floor-wash)" />

        {/* Back hill */}
        <motion.path
          style={{ y: yBack }}
          d="M -100 720 Q 400 660, 800 700 T 1700 690 L 1700 900 L -100 900 Z"
          fill="rgba(255,255,255,0.04)"
        />

        {/* Mid hill */}
        <motion.path
          style={{ y: yMid }}
          d="M -100 780 Q 400 740, 900 770 T 1700 760 L 1700 900 L -100 900 Z"
          fill="rgba(255,255,255,0.07)"
        />

        {/* Front hill + grass ticks (parallax together) */}
        <motion.g style={{ y: yFront }}>
          <path
            d="M -100 850 Q 500 815, 1000 840 T 1700 835 L 1700 900 L -100 900 Z"
            fill="rgba(255,255,255,0.10)"
          />
          <path
            d="M -100 850 Q 500 815, 1000 840 T 1700 835"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.6"
          />
          {grassTicks.map(({ x, y, h }, i) => (
            <line
              key={i}
              x1={x}
              x2={x}
              y1={y - h}
              y2={y}
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="0.5"
            />
          ))}
        </motion.g>

        {/* Flowers — each follows its hill layer's parallax, blooms on scroll */}
        {flowers.map((f, i) => (
          <FlowerNode
            key={i}
            spec={f}
            progress={scrollYProgress}
            yShift={f.layer === 1 ? yBack : f.layer === 2 ? yMid : yFront}
          />
        ))}
      </svg>
    </div>
  );
}

function FlowerNode({
  spec,
  progress,
  yShift,
}: {
  spec: FlowerSpec;
  progress: MotionValue<number>;
  yShift: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    spec.range,
    [0, layerOpacity[spec.layer]],
  );
  const scale = useTransform(progress, spec.range, [0, 1]);

  return (
    <motion.g style={{ y: yShift }}>
      {/* Outer translate puts (0,0) at the base of this flower */}
      <g transform={`translate(${spec.x} ${spec.baseY})`}>
        {/* Inner scaling group — origin at (0,0) so the flower grows up from the ground */}
        <motion.g
          style={{
            scale,
            opacity,
            transformOrigin: "0px 0px",
            transformBox: "fill-box",
          }}
        >
          <Stem stem={spec.stem} />
          <Blossom type={spec.type} y={-spec.stem} size={spec.size} />
        </motion.g>
      </g>
    </motion.g>
  );
}

function Stem({ stem }: { stem: number }) {
  return (
    <line
      x1={0}
      x2={0}
      y1={0}
      y2={-stem}
      stroke="white"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  );
}

function Blossom({
  type,
  y,
  size,
}: {
  type: Bloom;
  y: number;
  size: number;
}) {
  if (type === "dot") {
    return (
      <g>
        <circle
          cx={0}
          cy={y}
          r={size / 2}
          fill="none"
          stroke="white"
          strokeWidth="0.9"
        />
        <circle cx={0} cy={y} r={size / 6} fill="white" />
      </g>
    );
  }
  if (type === "asterisk") {
    const petals = [0, 60, 120, 180, 240, 300];
    return (
      <g>
        {petals.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={0}
              x2={Math.cos(rad) * size * 0.6}
              y1={y}
              y2={y + Math.sin(rad) * size * 0.6}
              stroke="white"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx={0} cy={y} r={size / 5} fill="white" />
      </g>
    );
  }
  // tulip — small upright cup
  const w = size / 2.3;
  const h = size * 0.7;
  return (
    <path
      d={`M ${-w} ${y + size * 0.18}
          Q 0 ${y - h}
            ${w} ${y + size * 0.18}
          L 0 ${y + size * 0.42} Z`}
      fill="none"
      stroke="white"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  );
}
