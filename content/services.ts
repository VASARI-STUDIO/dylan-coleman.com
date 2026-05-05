export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  scope: string[];
  priceRange: string;
  timeline: string;
};

export const SERVICES: Service[] = [
  {
    id: "brand-website",
    index: "S/01",
    title: "Brand Websites",
    tagline:
      "A full digital presence — designed, built, and tuned to earn trust. For brands ready to be taken seriously.",
    scope: [
      "Discovery, audience & positioning",
      "Visual identity moments — type, color, motion",
      "Custom design across every page and breakpoint",
      "Performance-tuned build on Next.js",
      "On-page SEO and analytics",
      "Launch support and a 30-day warranty",
    ],
    priceRange: "$6k – $18k",
    timeline: "4 – 8 weeks",
  },
  {
    id: "landing-page",
    index: "S/02",
    title: "Landing Pages",
    tagline:
      "A single page, sharpened for one outcome. For launches, campaigns, and waitlists where every word and frame counts.",
    scope: [
      "Messaging hierarchy & one clear conversion path",
      "Custom design and editorial layout",
      "Build with motion where it earns its place",
      "Form, payment or booking integration",
      "A/B-ready architecture",
    ],
    priceRange: "$2.5k – $6k",
    timeline: "1 – 3 weeks",
  },
];
