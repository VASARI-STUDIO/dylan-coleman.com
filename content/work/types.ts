import type { IndustryKey } from "@/lib/industries";

export type GalleryImage = {
  src?: string; // /public path (without basePath); resolved via asset() at render time
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
  summary: string; // home-card blurb
  audience: IndustryKey;

  /** Path under /public for the home card cover (without basePath). */
  cover?: string;
  /** Path under /public for the case study page hero (without basePath). */
  hero?: string;

  // Brochure fields (only used by hero case studies)
  blurb?: string;
  role?: string;
  scope?: string[];
  status?: string;
  collaborators?: string[];
  photography?: string;
  duration?: string;
  /** Audience-targeted brochure pitch — facts + sales points framed for the target industry. */
  salesPoints?: SalesPoint[];
  gallery?: GalleryImage[];
};
