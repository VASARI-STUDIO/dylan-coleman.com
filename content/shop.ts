import type { IndustryKey } from "@/lib/industries";

export type ShopItem = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  audience: IndustryKey;
  platform: "Framer" | "Next.js" | "Webflow";
  /** Optional — leave undefined to hide. */
  price?: string;
  ctaLabel: string;
  externalUrl: string;
  /** Optional preview image — path under /public, resolved via asset(). */
  cover?: string;
  status: "Available" | "Coming Soon";
};

export const SHOP: ShopItem[] = [
  {
    id: "adam-and-emily",
    index: "T/01",
    title: "Adam & Emily — Wedding Invitation Template",
    blurb:
      "An editorial wedding-invitation site for couples planning a premium, considered day. Calm typography, a deep-cream palette, every page already shaped — RSVP, schedule, accommodation, travel.",
    audience: "weddings",
    platform: "Framer",
    cover: "/work/adam-and-emily/01.webp",
    ctaLabel: "Preview & Buy",
    externalUrl: "https://adamandemily.framer.website/",
    status: "Available",
  },
];
