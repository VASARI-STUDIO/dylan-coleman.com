// Work collection — one file per project.
//
// ┌─ To add a case study ──────────────────────────────────────────────┐
// │ 1. Copy an existing entry file in this folder (e.g. `uil4b.ts`).    │
// │ 2. Rename it to your slug, give it a new `slug`, and fill the fields.│
// │ 3. Import it below and add it to HERO_WORK (order = display order). │
// └────────────────────────────────────────────────────────────────────┘
//
// For a home-card-only entry with no detail page, leave `slug: ""` and add it
// to RECENT_WORK instead (see `campus-map.ts`).

import type { WorkItem } from "./types";
import { uil4b } from "./uil4b";
import { adamAndEmily } from "./adam-and-emily";
import { finishLine } from "./finish-line";
import { bmsSalesSite } from "./3d-design";
import { campusMap } from "./campus-map";
import { floorsRestore } from "./floors-restore";

/** Full /work/[slug] case studies, in display order. */
export const HERO_WORK: WorkItem[] = [
  uil4b,
  adamAndEmily,
  finishLine,
  bmsSalesSite,
];

/** Home-only cards (no detail page). */
export const RECENT_WORK: WorkItem[] = [campusMap, floorsRestore];

export const ALL_WORK: WorkItem[] = [...HERO_WORK, ...RECENT_WORK];

/** Look up any entry (hero or recent) by its slug. */
export function getWorkBySlug(slug: string): WorkItem | undefined {
  return ALL_WORK.find((w) => w.slug === slug);
}

export type { WorkItem, GalleryImage, SalesPoint } from "./types";
