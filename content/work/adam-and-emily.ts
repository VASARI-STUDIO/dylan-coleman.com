import type { WorkItem } from "./types";

export const adamAndEmily: WorkItem = {
  slug: "adam-and-emily",
  index: "W/02",
  title: "Adam & Emily",
  client: "Self-published template",
  year: "2026",
  location: "Tuscany, Italy (demo)",
  summary:
    "An editorial wedding-invitation template designed for a destination wedding in Tuscany — and now sold as a Framer template for couples who want a site that matches the day.",
  audience: "weddings",
  cover: "/work/adam-and-emily/01.webp",
  hero: "/work/adam-and-emily/01.webp",
  blurb:
    "Adam &amp; Emily started as a private commission for a destination wedding at Villa Cetinale, Tuscany — black tie, autumn, an editorial palette of cream and deep black. The brief was specific enough that it became a template by accident: every part of a premium wedding-invitation site was already there. So I shipped it as one.",
  role: "Design · Build · Template",
  scope: ["Web", "Identity moments", "Editorial direction"],
  status: "Live · Available as a Framer template",
  duration: "Ongoing",
  photography: "Demo only — couples bring their own",
  salesPoints: [
    {
      heading: "For couples planning a premium wedding",
      body: "Send your guests a website that matches the day. Editorial-grade, calm, and not a single stock-template cliché in sight.",
    },
    {
      heading: "Born from a real brief",
      body: "Built for an actual destination wedding in Tuscany. Everything you&apos;d need is already shaped — RSVP, schedule, accommodation, travel, dress code.",
    },
    {
      heading: "Edit, don&apos;t redesign",
      body: "Type, layout and motion already considered. Drop in your own copy, photos and dates, and the system stays coherent without you having to think about hierarchy.",
    },
    {
      heading: "Hosted by Framer, owned by you",
      body: "Ships as a Framer template. Domain, hosting and updates run on Framer&apos;s plan — no separate bills, no DevOps, no surprises.",
    },
  ],
  gallery: [
    { src: "/work/adam-and-emily/01.webp", alt: "Adam & Emily — hero", ratio: "wide" },
    { src: "/work/adam-and-emily/02.webp", alt: "Adam & Emily — story spread", ratio: "landscape" },
    { src: "/work/adam-and-emily/03.webp", alt: "Adam & Emily — venue, Villa Cetinale", ratio: "landscape" },
    { src: "/work/adam-and-emily/04.webp", alt: "Adam & Emily — schedule of events", ratio: "landscape" },
    { src: "/work/adam-and-emily/05.webp", alt: "Adam & Emily — accommodation", ratio: "landscape" },
    { src: "/work/adam-and-emily/06.webp", alt: "Adam & Emily — travel & logistics", ratio: "landscape" },
    { src: "/work/adam-and-emily/07.webp", alt: "Adam & Emily — closing spread", ratio: "landscape" },
  ],
};
