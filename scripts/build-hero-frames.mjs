// Hero frame pipeline.
//
// Reads a source image sequence, re-encodes it to WebP at WIDTH/QUALITY,
// normalises filenames to frame-NNN.webp in public/hero/frames, and emits a
// JSON manifest plus a TS module so HERO_FRAME_COUNT stays in sync.
//
// Source may be PNG, JPEG or WebP. WebP sources used to be copied through
// untouched, which shipped a 14 MB sequence — exporters routinely emit WebP at
// a quality far above what a full-bleed background canvas needs, so everything
// is re-encoded regardless of input format.
//
// After encoding it ANALYSES the result and prints the three constants that
// HeroFrames.tsx needs tuned to the footage:
//
//   WATERMARK_CROP   how much of the bottom to discard, if a static watermark
//                    is burned into the frames
//   ACTIVE_FIRST     where the sequence actually starts moving
//   ACTIVE_LAST      where it stops
//
// Those are not cosmetic. Generated clips open and close on held frames, and
// mapping scroll across the full range spends the first and last stretch of
// the hero showing no visible change — which reads as a broken page, not as a
// held shot. This report replaces doing that measurement by hand.
//
// Usage:
//   npm run build:hero-frames                       # auto-detect source
//   npm run build:hero-frames -- <dir>              # explicit source
//   npm run build:hero-frames -- <dir> --crop-bottom=0.07
//   npm run build:hero-frames -- --analyze-only     # report on shipped frames
//
// Flags:
//   --crop-bottom=F  discard the bottom F (0-1) of each source frame
//   --crop-top=F     discard the top F of each source frame
//   --width=N        output width (default 1920)
//   --quality=N      WebP quality (default 72)
//   --count=N        sample N frames evenly (default 0 = keep all)
//   --knee=F         motion-detection threshold, 0-1 (default 0.2)
//   --analyze-only   skip encoding, just report on public/hero/frames

import { readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = "public/hero/frames";
const MANIFEST = "public/hero/manifest.json";
const TS_MANIFEST = "lib/hero-frames.ts";

const IMAGE_RE = /\.(png|webp|jpe?g)$/i;

// Where to look for a sequence when no directory is given. Any immediate
// subdirectory of these that contains images is a candidate; the most recently
// modified one wins, so dropping in a "v2" folder picks it up without editing
// this file.
const SEARCH_ROOTS = ["Graphics/Hero Components", "Graphics", "frames"];

function parseArgs(argv) {
  const opts = {
    src: null,
    cropBottom: 0,
    cropTop: 0,
    width: 1920,
    quality: 72,
    count: 0,
    knee: 0.2,
    analyzeOnly: false,
  };
  for (const arg of argv) {
    const flag = /^--([a-z-]+)(?:=(.*))?$/.exec(arg);
    if (!flag) {
      opts.src = arg;
      continue;
    }
    const [, name, value] = flag;
    switch (name) {
      case "crop-bottom":
        opts.cropBottom = Number(value);
        break;
      case "crop-top":
        opts.cropTop = Number(value);
        break;
      case "width":
        opts.width = Number(value);
        break;
      case "quality":
        opts.quality = Number(value);
        break;
      case "count":
        opts.count = Number(value);
        break;
      case "knee":
        opts.knee = Number(value);
        break;
      case "analyze-only":
        opts.analyzeOnly = true;
        break;
      default:
        console.error(`Unknown flag: --${name}`);
        process.exit(1);
    }
  }
  const frac = (v, label) => {
    if (!Number.isFinite(v) || v < 0 || v >= 1) {
      console.error(`--${label} must be between 0 and 1 (got ${v})`);
      process.exit(1);
    }
  };
  frac(opts.cropBottom, "crop-bottom");
  frac(opts.cropTop, "crop-top");
  if (opts.cropTop + opts.cropBottom >= 1) {
    console.error("--crop-top and --crop-bottom would remove the whole frame");
    process.exit(1);
  }
  return opts;
}

/** Directories holding an image sequence, newest first. */
async function findSources() {
  const found = [];
  for (const root of SEARCH_ROOTS) {
    if (!existsSync(root)) continue;
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    // The root itself may hold the sequence.
    if (entries.some((e) => e.isFile() && IMAGE_RE.test(e.name))) {
      found.push(root);
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(root, entry.name);
      const files = await readdir(dir).catch(() => []);
      if (files.filter((f) => IMAGE_RE.test(f)).length >= 2) found.push(dir);
    }
  }
  // Prefer the most recently touched directory, so a freshly added v2 folder
  // wins over the sequence that is already shipping.
  const { stat } = await import("node:fs/promises");
  const withTime = await Promise.all(
    found.map(async (dir) => ({ dir, mtime: (await stat(dir)).mtimeMs })),
  );
  return withTime.sort((a, b) => b.mtime - a.mtime).map((e) => e.dir);
}

/** Evenly sample `count` entries across a list (count <= 0 keeps everything). */
function sample(list, count) {
  if (count <= 0 || count >= list.length) return list;
  const out = [];
  const span = list.length - 1;
  for (let i = 0; i < count; i++) {
    out.push(list[Math.round((i / (count - 1)) * span)]);
  }
  return out;
}

async function encode(opts) {
  let src = opts.src;
  if (!src) {
    const candidates = await findSources();
    if (candidates.length === 0) {
      console.error("No source image sequence found. Looked under:");
      SEARCH_ROOTS.forEach((p) => console.error(`  - ${p}/`));
      console.error("\nPass one explicitly:  npm run build:hero-frames -- <dir>");
      process.exit(1);
    }
    src = candidates[0];
    if (candidates.length > 1) {
      console.log("Candidate sources (newest first):");
      candidates.forEach((c, i) =>
        console.log(`  ${i === 0 ? "→" : " "} ${c}`),
      );
    }
  }
  if (!existsSync(src)) {
    console.error(`Source not found: ${src}`);
    process.exit(1);
  }

  const all = (await readdir(src)).filter((f) => IMAGE_RE.test(f)).sort();
  if (all.length === 0) {
    console.error(`No image files in ${src}`);
    process.exit(1);
  }

  const selected = sample(all, opts.count);
  const first = await sharp(path.join(src, all[0])).metadata();
  console.log(
    `\nSource: ${src}\n` +
      `  ${all.length} frames · ${first.width}x${first.height} · ${first.format}`,
  );

  const keepTop = opts.cropTop;
  const keepHeight = 1 - opts.cropTop - opts.cropBottom;
  if (keepHeight < 1) {
    console.log(
      `  cropping: top ${(opts.cropTop * 100).toFixed(1)}% · bottom ` +
        `${(opts.cropBottom * 100).toFixed(1)}% → keeping ${(keepHeight * 100).toFixed(1)}%`,
    );
  }

  if (existsSync(OUT)) await rm(OUT, { recursive: true });
  await mkdir(OUT, { recursive: true });

  console.log(
    `\nEncoding ${selected.length} frames → WebP @ ${opts.width}px Q${opts.quality}`,
  );

  let totalBytes = 0;
  for (let i = 0; i < selected.length; i++) {
    const inPath = path.join(src, selected[i]);
    const outPath = path.join(OUT, `frame-${String(i + 1).padStart(3, "0")}.webp`);
    let pipeline = sharp(inPath);
    if (keepHeight < 1) {
      const meta = await sharp(inPath).metadata();
      pipeline = pipeline.extract({
        left: 0,
        top: Math.round(meta.height * keepTop),
        width: meta.width,
        height: Math.round(meta.height * keepHeight),
      });
    }
    const info = await pipeline
      .resize({ width: opts.width, withoutEnlargement: true })
      .webp({ quality: opts.quality, effort: 6 })
      .toFile(outPath);
    totalBytes += info.size;
    process.stdout.write(
      `\r  ${String(i + 1).padStart(3, "0")}/${selected.length} · ${(info.size / 1024).toFixed(0)} KB    `,
    );
  }
  console.log();

  await writeFile(
    MANIFEST,
    JSON.stringify(
      {
        count: selected.length,
        source: src,
        sourceFormat: first.format,
        width: opts.width,
        quality: opts.quality,
        cropTop: opts.cropTop,
        cropBottom: opts.cropBottom,
        totalBytes,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  await writeFile(
    TS_MANIFEST,
    `// Generated by scripts/build-hero-frames.mjs — do not edit by hand.\n` +
      `export const HERO_FRAME_COUNT = ${selected.length};\n`,
  );

  console.log(
    `Done · ${selected.length} frames · ${(totalBytes / 1024 / 1024).toFixed(2)} MB total`,
  );
  return selected.length;
}

// ── Analysis ────────────────────────────────────────────────────────────────

const ANALYSIS_W = 160;
const ANALYSIS_H = 90;

/** Greyscale buffer of a frame, downscaled to a fixed analysis size. */
async function luma(file) {
  const { data } = await sharp(file)
    .resize(ANALYSIS_W, ANALYSIS_H, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = new Float32Array(ANALYSIS_W * ANALYSIS_H);
  for (let i = 0, p = 0; i < data.length; i += 3, p++) {
    out[p] = (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  return out;
}

/**
 * Find a burned-in watermark.
 *
 * A watermark is static and bright while the scene beneath it moves, so the
 * per-pixel MINIMUM across the whole sequence stays high exactly where the
 * watermark sits and drops everywhere else. That separates it from a bright
 * patch of scene far more reliably than thresholding any single frame.
 */
function findWatermark(frames) {
  const n = ANALYSIS_W * ANALYSIS_H;
  const min = new Float32Array(n).fill(Infinity);
  for (const f of frames) {
    for (let i = 0; i < n; i++) if (f[i] < min[i]) min[i] = f[i];
  }
  const THRESHOLD = 110;
  let top = Infinity, bottom = -1, left = Infinity, right = -1, count = 0;
  for (let y = 0; y < ANALYSIS_H; y++) {
    for (let x = 0; x < ANALYSIS_W; x++) {
      if (min[y * ANALYSIS_W + x] <= THRESHOLD) continue;
      count++;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  // Require a small, low-lying, off-centre cluster — a genuinely bright sky or
  // a lit subject would be large or high in the frame.
  if (count === 0 || count > n * 0.05) return null;
  const topFrac = top / ANALYSIS_H;
  if (topFrac < 0.75) return null;
  return {
    topFrac,
    bottomFrac: (bottom + 1) / ANALYSIS_H,
    leftFrac: left / ANALYSIS_W,
    rightFrac: (right + 1) / ANALYSIS_W,
    pixels: count,
    // Crop to just above the mark, with a little margin.
    suggestedCrop: Math.ceil((1 - topFrac + 0.006) * 1000) / 1000,
  };
}

/**
 * Where the sequence actually starts and stops PROGRESSING.
 *
 * The obvious metric — mean absolute difference between consecutive frames —
 * is the wrong one, and wrong in a way that looks right. On this footage the
 * water ripples and the grass sways for the entire clip, so consecutive-frame
 * delta is nonzero everywhere and reports the whole sequence as active. But a
 * held opening where the scene idles is exactly what produces dead scroll: the
 * picture moves and yet nothing appears to happen.
 *
 * So measure divergence from the endpoints instead. Distance from frame 0 stays
 * flat through a held opening and then climbs; distance from the final frame
 * does the mirror image. The point where each leaves its plateau is the frame
 * where the sequence starts, and stops, actually going somewhere.
 */
function findActiveRange(frames, knee = 0.2) {
  const mad = (a, b) => {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
    return sum / a.length;
  };

  const first = frames[0];
  const last = frames[frames.length - 1];
  const fromStart = frames.map((f) => mad(f, first));
  const fromEnd = frames.map((f) => mad(f, last));

  const maxStart = Math.max(...fromStart);
  const maxEnd = Math.max(...fromEnd);
  if (maxStart === 0 || maxEnd === 0) return null;

  // How far the frame must have travelled from the endpoint before it counts
  // as having started. There is no sharp knee to detect — on this footage the
  // divergence curve is close to linear from frame 16 to 61 — so this is a
  // judgement about how much held footage to tolerate, not a feature the data
  // hands you. 0.20 reproduces the values that were verified by scroll-testing
  // the current clip by hand (20/60 against a hand-tuned 21/62). Raise it to
  // trim harder; the printed curve below shows what you are cutting.
  const KNEE = knee;

  let activeFirst = 0;
  while (
    activeFirst < frames.length - 1 &&
    fromStart[activeFirst] < maxStart * KNEE
  ) {
    activeFirst++;
  }

  // Walk back to the last frame that still differs from the ending, then step
  // forward one. That +1 matters: without it the scrub stops on the last frame
  // that is still *travelling* and never reaches the frame where the motion has
  // arrived, so the payoff — the fully-bloomed end state — is never drawn at
  // all. The walk finds the boundary; the frame we want is on the far side of
  // it.
  let activeLast = frames.length - 1;
  while (activeLast > 0 && fromEnd[activeLast] < maxEnd * KNEE) {
    activeLast--;
  }
  activeLast = Math.min(frames.length - 1, activeLast + 1);

  if (activeLast <= activeFirst) return null;

  return {
    activeFirst,
    activeLast,
    deadHead: activeFirst,
    deadTail: frames.length - 1 - activeLast,
    travel: maxStart,
    curve: fromStart,
  };
}

async function analyse(knee = 0.2) {
  if (!existsSync(OUT)) {
    console.error(`No frames at ${OUT} to analyse.`);
    process.exit(1);
  }
  const files = (await readdir(OUT)).filter((f) => IMAGE_RE.test(f)).sort();
  if (files.length < 2) {
    console.error(`Need at least 2 frames to analyse (found ${files.length}).`);
    process.exit(1);
  }

  console.log(`\nAnalysing ${files.length} encoded frames…`);
  const frames = [];
  for (const f of files) frames.push(await luma(path.join(OUT, f)));

  const meta = await sharp(path.join(OUT, files[0])).metadata();
  console.log(`\n  Output: ${meta.width}x${meta.height} · aspect ${(meta.width / meta.height).toFixed(3)}`);

  console.log("\n─── HeroFrames.tsx constants ───");

  const wm = findWatermark(frames);
  if (wm) {
    console.log(
      `\n  Static bright mark detected in the lower frame:\n` +
        `    x ${wm.leftFrac.toFixed(3)}–${wm.rightFrac.toFixed(3)} · ` +
        `y ${wm.topFrac.toFixed(3)}–${wm.bottomFrac.toFixed(3)}\n` +
        `    → const WATERMARK_CROP = ${wm.suggestedCrop};`,
    );
  } else {
    console.log(
      `\n  No static watermark detected.\n` +
        `    → const WATERMARK_CROP = 0;  (removing it widens the usable frame)`,
    );
  }

  const range = findActiveRange(frames, knee);
  if (range) {
    console.log("\n  Divergence from the opening frame (% of total travel):");
    const step = Math.max(1, Math.round(files.length / 12));
    for (let i = 0; i < frames.length; i += step) {
      const pct = (100 * range.curve[i]) / range.travel;
      const bar = "#".repeat(Math.round(pct / 2.5));
      const mark =
        i === range.activeFirst || i === range.activeLast ? "  <-- cut" : "";
      console.log(
        `    f${String(i + 1).padStart(3)} ${pct.toFixed(1).padStart(5)}%  ${bar}${mark}`,
      );
    }
    console.log(
      `\n  Motion runs from frame ${range.activeFirst + 1} to ${range.activeLast + 1} ` +
        `of ${files.length} (1-based)\n` +
        `    → const ACTIVE_FIRST = ${range.activeFirst};\n` +
        `    → const ACTIVE_LAST = ${range.activeLast};`,
    );
    if (range.deadHead || range.deadTail) {
      console.log(
        `\n    Trimming ${range.deadHead} held frame(s) at the head and ` +
          `${range.deadTail} at the tail.\n` +
          `    Left in, these are the dead scroll at the top and bottom of the hero.`,
      );
    }
  }
  console.log(
    `\n  Set these in components/sections/HeroFrames.tsx, then re-run\n` +
      `  \`npm run build\` and check the hero moves within ~50px of scroll.\n`,
  );
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.analyzeOnly) await encode(opts);
  await analyse(opts.knee);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
