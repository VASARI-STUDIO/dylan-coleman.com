import type { IndustryKey } from "@/lib/industries";

export type ShopItem = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  audience: IndustryKey;
  platform: "Framer" | "Next.js" | "Webflow" | "Web app";
  /** Optional — leave undefined to hide. */
  price?: string;
  ctaLabel: string;
  externalUrl: string;
  /** Optional preview image — path under /public, resolved via asset(). */
  cover?: string;
  status: "Available" | "Coming Soon" | "Free";
};
