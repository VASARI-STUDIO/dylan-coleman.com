import type { IndustryKey } from "@/lib/industries";

export type GalleryImage = {
  src?: string; // /public path (without basePath); resolved via asset() at render time
  alt: string;
  /** "portrait" = 4:5, "landscape" = 16:9, "square" = 1:1, "wide" = 21:9 */
  ratio?: "portrait" | "landscape" | "square" | "wide";
  /**
   * Short visible caption under the image. `alt` stays the accessibility
   * description; this is the line a reader actually sees, so write it as
   * commentary ("what this shows and why it matters"), not a repeat of alt.
   */
  caption?: string;
};

/** A single "at a glance" figure — rendered as a value over a small-caps label. */
export type Metric = {
  label: string;
  value: string;
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
  /** External link to a live, visitable demo of the project. */
  liveUrl?: string;

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
  /**
   * Hard numbers for the "At a glance" strip. Keep these to facts that are
   * verifiable from the shipped project — 3 to 5 reads best.
   */
  metrics?: Metric[];
  gallery?: GalleryImage[];
};
