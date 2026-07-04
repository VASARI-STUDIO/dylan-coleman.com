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

export const SHOP: ShopItem[] = [
  {
    id: "uil4b",
    index: "T/01",
    title: "UIL4B — Design Toolkit",
    blurb:
      "A free, in-browser workspace for building UI systems — colour, type, UI components, icons & emoji, imagery and AI in one place. Build, validate and export your interface foundations. No install, no credit card.",
    audience: "designers-builders",
    platform: "Web app",
    price: "Free",
    cover: "/work/uil4b/02-colour.webp",
    ctaLabel: "Open the toolkit",
    externalUrl: "https://uil4b.com/",
    status: "Free",
  },
  {
    id: "adam-and-emily",
    index: "T/02",
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
