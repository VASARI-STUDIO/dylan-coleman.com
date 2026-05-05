import type { IndustryKey } from "@/lib/industries";

export type WorkItem = {
  slug: string; // empty string when no detail page
  index: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  audience: IndustryKey;
  cover?: string; // /image path; left undefined until assets are dropped
};

// Hero case studies (full /work/[slug] pages).
export const HERO_WORK: WorkItem[] = [
  {
    slug: "finish-line",
    index: "W/01",
    title: "Finish Line Car Detailing",
    client: "Finish Line",
    year: "2024",
    summary:
      "A premium digital storefront for a service-led detailing studio — built to attract higher-tier clients and drive bookings.",
    audience: "local-service",
  },
  {
    slug: "3d-design",
    index: "W/02",
    title: "3D Design",
    client: "Confidential",
    year: "2024",
    summary:
      "Identity and site for a 3D-led creative studio — typography, motion and image working as a single editorial voice.",
    audience: "creative-brand",
  },
];

// Recent work (Home cards only, no detail page yet).
export const RECENT_WORK: WorkItem[] = [
  {
    slug: "",
    index: "W/03",
    title: "Campus & Site Map Design",
    client: "Confidential",
    year: "2024",
    summary:
      "A wayfinding system rendered with the legibility of a printed atlas — for an institutional audience.",
    audience: "education-civic",
  },
  {
    slug: "",
    index: "W/04",
    title: "Floors Restore & More",
    client: "Floors Restore",
    year: "2024",
    summary:
      "Brand and site for a restoration trade — repositioning a local service as a craft.",
    audience: "restoration-trades",
  },
];

export const ALL_WORK: WorkItem[] = [...HERO_WORK, ...RECENT_WORK];
