import type { WorkItem } from "./types";

export const finishLine: WorkItem = {
  slug: "finish-line",
  index: "W/03",
  title: "Finish Line Car Detailing",
  client: "Self-founded",
  year: "2020 — 2023",
  location: "Brisbane, Australia",
  summary:
    "A mobile detailing business I founded at 17, branded, and ran in Brisbane for three years. The visual identity earned premium pricing in a category where most competitors look like they were last touched in 2008.",
  audience: "local-service",
  cover: "/work/finish-line/01-cover.webp",
  hero: "/work/finish-line/01-cover.webp",
  blurb:
    "Finish Line was my own business — a mobile detailing service I started at seventeen and ran for three years. I built every piece of it: the brand, the website, the booking flow, the photography direction, the day-to-day operations. The visual identity carried it from a teenager&apos;s side-job to a service that justified premium pricing in a category most people consider a commodity.",
  role: "Founder · Brand · Web · Operations",
  scope: ["Brand", "Web", "Marketing", "Operations"],
  status: "Sold-on / Wound down 2023",
  duration: "3 years",
  photography: "In-house",
  salesPoints: [
    {
      heading: "For local service operators",
      body: "Your website is the first quote you give every prospect. This one closed the right clients before they ever picked up the phone — premium-feeling, booking-led, calm.",
    },
    {
      heading: "Premium positioning, no agency",
      body: "Every piece of the brand was built single-handedly. Proof you can read as a serious operator without an in-house creative team or an agency retainer.",
    },
    {
      heading: "Designed to qualify, not capture",
      body: "Engineered to attract clients with bigger jobs and to quietly turn away the price-shoppers. Higher tickets, fewer junk inquiries.",
    },
    {
      heading: "Three years of operating proof",
      body: "Built, ran, and shipped the entire operation from age 17 onward — brand strategy, customer service, scheduling, repeat-client retention. The website was downstream of real business decisions.",
    },
  ],
  gallery: [
    {
      src: "/work/finish-line/01-cover.webp",
      alt: "Finish Line — brand identity",
      ratio: "wide",
    },
    {
      src: "/work/finish-line/02.webp",
      alt: "Finish Line — service in context",
      ratio: "landscape",
    },
    {
      src: "/work/finish-line/03.jpg",
      alt: "Finish Line — environment",
      ratio: "landscape",
    },
  ],
};
