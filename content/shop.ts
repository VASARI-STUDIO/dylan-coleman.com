import type { IndustryKey } from "@/lib/industries";

export type ShopItem = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  audience: IndustryKey;
  platform: "Framer" | "Next.js" | "Webflow";
  price: string;
  ctaLabel: string;
  externalUrl: string;
  status: "Available" | "Coming Soon";
};

export const SHOP: ShopItem[] = [
  {
    id: "framer-template-01",
    index: "T/01",
    title: "Editorial — A Premium Brand Template",
    blurb:
      "An editorial Framer template for studios and creative-led businesses. Considered typography, generous whitespace, and a calm, confident voice.",
    audience: "creative-brand",
    platform: "Framer",
    price: "From $79",
    ctaLabel: "Buy on Framer",
    externalUrl: "https://framer.com/marketplace/",
    status: "Available",
  },
];
