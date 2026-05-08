export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  scope: string[];
  timeline?: string;
  /** When true, this card renders as the open-ended "anything else?" CTA. */
  openCta?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "website",
    index: "S/01",
    title: "Websites, end-to-end",
    tagline:
      "A premium digital presence — designed, built, launched, and (if you want) looked after. Considered, performance-tuned, made to last.",
    scope: [
      "Discovery, audience & positioning",
      "Custom design across every page and breakpoint",
      "Performance build on Next.js or Framer",
      "SEO foundations and analytics setup",
      "Launch support and a 30-day warranty",
      "Optional ongoing management — updates, content, performance tuning",
    ],
    timeline: "4 – 8 weeks · Ongoing optional",
  },
  {
    id: "brand-marketing",
    index: "S/02",
    title: "Brand & Marketing Design",
    tagline:
      "Visual identity systems and the marketing materials that live inside them. From wordmark to launch campaign — built coherent, made to scale.",
    scope: [
      "Visual identity — wordmark, type, colour, motion direction",
      "Brand guidelines documentation",
      "Marketing collateral — decks, brochures, social, ads",
      "Launch campaign assets",
      "Photography and 3D art direction",
    ],
    timeline: "2 – 6 weeks",
  },
  {
    id: "open-brief",
    index: "S/03",
    title: "Got something else in mind?",
    tagline:
      "Brand systems, product launches, packaging, identity refreshes, or something I haven't even thought of yet — get in touch and tell me what you're building.",
    scope: [],
    openCta: true,
  },
];
