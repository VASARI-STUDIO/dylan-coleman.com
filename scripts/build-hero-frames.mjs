// One-shot script: re-encode the source PNG hero frame sequence into a
// reasonable WebP set we can actually ship.
//
// Source:  Graphics/Hero Components/Portfolio Hero Frames/frame-NNNNN.png
// Output:  public/hero/frames/frame-NNN.webp + public/hero/manifest.json
//
// Tuning knobs are at the top — change FRAME_COUNT, WIDTH, QUALITY and
// re-run `npm run build:hero-frames` if you want to trade size for fidelity.

import { readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "Graphics/Hero Components/Portfolio Hero Frames";
const OUT = "public/hero/frames";
const MANIFEST = "public/hero/manifest.json";

// Output settings
const FRAME_COUNT = 40; // Even sampling across the source sequence
const WIDTH = 1280; // Max output width (px)
const QUALITY = 70; // WebP quality 0-100

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Source folder not found: ${SRC}`);
    console.error(
      "Drop the PNG frame sequence into that folder and re-run, or update SRC at the top of this script.",
    );
    process.exit(1);
  }

  const all = (await readdir(SRC))
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();

  if (all.length === 0) {
    console.error(`No .png files in ${SRC}`);
    process.exit(1);
  }

  console.log(`Source: ${all.length} frames`);

  // Clean output, re-create
  if (existsSync(OUT)) await rm(OUT, { recursive: true });
  await mkdir(OUT, { recursive: true });

  // Pick FRAME_COUNT evenly-spaced frames (always includes first + last).
  const selected = [];
  const span = all.length - 1;
  const steps = FRAME_COUNT - 1;
  for (let i = 0; i < FRAME_COUNT; i++) {
    const idx = Math.round((i / steps) * span);
    selected.push(all[idx]);
  }

  console.log(
    `Encoding ${selected.length} frames → WebP @ ${WIDTH}px Q${QUALITY}`,
  );

  let totalBytes = 0;
  for (let i = 0; i < selected.length; i++) {
    const src = path.join(SRC, selected[i]);
    const out = path.join(OUT, `frame-${String(i + 1).padStart(3, "0")}.webp`);
    const info = await sharp(src)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);
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
        count: FRAME_COUNT,
        width: WIDTH,
        quality: QUALITY,
        totalBytes,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  console.log(
    `Done · ${selected.length} frames · ${(totalBytes / 1024 / 1024).toFixed(2)} MB total`,
  );
  console.log(`Manifest: ${MANIFEST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
