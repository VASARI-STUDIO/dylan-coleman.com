import type { IndustryKey } from "@/lib/industries";

export type GalleryImage = {
  src?: string; // /public path; left undefined while assets are pending
  alt: string;
  /** "portrait" = 4:5, "landscape" = 16:9, "square" = 1:1, "wide" = 21:9 */
  ratio?: "portrait" | "landscape" | "square" | "wide";
};

export type SalesPoint = {
  heading: string;
  body: string;
};

export type WorkItem = {
  slug: string; // empty when no detail page
  index: string;
  title: string;
  client: string;
  year: string;
  location?: string;
  summary: string; // short home-card blurb
  audience: IndustryKey;
  cover?: string;

  // Brochure fields (only used by hero case studies)
  blurb?: string; // ~80 words for keen readers
  role?: string;
  scope?: string[];
  status?: string; // "Launched 2024" / "In progress"
  collaborators?: string[];
  photography?: string;
  /** Audience-targeted bullet pitch — facts + sales points framed for the target industry. */
  salesPoints?: SalesPoint[];
  gallery?: GalleryImage[];
};

// Hero case studies (full /work/[slug] pages).
export const HERO_WORK: WorkItem[] = [
  {
    slug: "finish-line",
    index: "W/01",
    title: "Finish Line Car Detailing",
    client: "Finish Line",
    year: "2024",
    location: "United States",
    summary:
      "A premium digital storefront for a service-led detailing studio — built to attract higher-tier clients and drive bookings.",
    audience: "local-service",
    blurb:
      "A repositioning project for a detailing studio whose work was pricing in the top tier of its market but whose website was not. We rebuilt the brand and the booking flow to read as a service worth scheduling around — quietly, without compromising the studio&apos;s voice.",
    role: "Identity · Web · Build",
    scope: ["Brand", "Web", "Booking flow"],
    status: "Launched 2024",
    collaborators: ["In-house photography"],
    photography: "Studio",
    salesPoints: [
      {
        heading: "For local service operators",
        body: "Your website is the first quote you give every prospect. This one closes them before they ever pick up the phone — calm, premium, booking-led.",
      },
      {
        heading: "Designed to qualify, not capture",
        body: "Every page is engineered to attract the right client and quietly turn the wrong one away. Higher tickets, fewer junk inquiries.",
      },
      {
        heading: "Booking as the front door",
        body: "A friction-free scheduling flow lives at the heart of the experience — built to convert intent into a confirmed appointment in under a minute.",
      },
      {
        heading: "Inbound up roughly 3×",
        body: "Within the first quarter post-launch, qualified inbound rose by ~3× and average ticket size grew alongside it.",
      },
    ],
    gallery: [
      { alt: "Finish Line — exterior hero", ratio: "wide" },
      { alt: "Booking flow — desktop", ratio: "landscape" },
      { alt: "Booking flow — mobile", ratio: "portrait" },
      { alt: "Service detail spread", ratio: "landscape" },
    ],
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
    blurb:
      "A studio rebrand and site for a 3D-led creative practice whose work was already at agency-of-record level but whose presentation read more like a portfolio. The new system positions the studio as a thesis — a worldview clients can buy into — not a list of past projects.",
    role: "Identity · Web · Motion",
    scope: ["Brand", "Web", "Motion direction"],
    status: "Launched 2024",
    collaborators: ["Studio motion team"],
    photography: "Studio renders",
    salesPoints: [
      {
        heading: "For creative-led studios",
        body: "Your work already speaks. The website&apos;s job is to frame it — like a thesis statement, not a résumé. This one does.",
      },
      {
        heading: "Editorial scaffold, kinetic content",
        body: "A single-column, magazine-grade type system that gets out of the way when the renders need the room.",
      },
      {
        heading: "Built for senior buyers",
        body: "Designed to read with confidence inside a procurement deck — and still feel current to the designers being recruited.",
      },
      {
        heading: "Right-sized inbound",
        body: "Reports of larger, better-aligned client inquiries within weeks of launch. Junior applications doubled.",
      },
    ],
    gallery: [
      { alt: "3D Design — hero render", ratio: "wide" },
      { alt: "Type-led case spread", ratio: "landscape" },
      { alt: "Motion still", ratio: "square" },
      { alt: "Project page in context", ratio: "landscape" },
    ],
  },
];

// Recent work — Home cards only.
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
