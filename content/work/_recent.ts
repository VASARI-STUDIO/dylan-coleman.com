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

// Hero case studies — full /work/[slug] pages.
export const HERO_WORK: WorkItem[] = [
  {
    slug: "uil4b",
    index: "W/01",
    title: "UIL4B",
    client: "Self-published product",
    year: "2026",
    location: "Brisbane, Australia",
    summary:
      "A free browser-based design toolkit. Colour palettes, type scales, font pairing, icons, image conversion, video-frame extraction, production-ready CSS exports — no install, no signup, no subscription.",
    audience: "designers-builders",
    blurb:
      "UIL4B started as a private utility — the toolkit I kept rebuilding for every project. Eventually I shipped it. It generates colour palettes and type scales, pairs fonts, serves an icon library, converts images between formats, extracts frames from video sequences, and exports production-ready CSS. Everything happens in the browser. No install, no signup, no SaaS subscription. The same toolkit, in fact, used to extract the hero frames on the site you&apos;re reading this on.",
    role: "Product · Design · Build",
    scope: ["Product strategy", "UI", "Engineering", "Design system"],
    status: "Live · Free forever",
    duration: "Ongoing",
    photography: "Self-shot UI captures",
    salesPoints: [
      {
        heading: "For designers and small studios",
        body: "The utilities you reach for on every project — palettes, type scales, font pairing, image conversion, icons — assembled into one place, free, with nothing to install.",
      },
      {
        heading: "Browser-based, owned by you",
        body: "No accounts, no telemetry, no SaaS lock-in. Drag a file in, get an export out. Close the tab and it&apos;s gone.",
      },
      {
        heading: "Production-grade output",
        body: "Exports are clean CSS, ready to paste into a real project. Palettes ship as variables. Type scales ship as utilities. Image conversions hit current best-practice formats.",
      },
      {
        heading: "Proof on this page",
        body: "The 76 hero frames behind these words were extracted, re-encoded, and exported using UIL4B. The toolkit eats its own dogfood.",
      },
    ],
    gallery: [
      { alt: "UIL4B — overview", ratio: "wide" },
      { alt: "UIL4B — colour palettes", ratio: "landscape" },
      { alt: "UIL4B — type scales & font pairing", ratio: "landscape" },
      { alt: "UIL4B — icon library", ratio: "landscape" },
      { alt: "UIL4B — image converter & video frames", ratio: "landscape" },
    ],
  },
  {
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
  },
  {
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
  },
  {
    slug: "3d-design",
    index: "W/04",
    title: "Building Management Sales Site",
    client: "Bar-Tech Automation",
    year: "2026",
    location: "Brisbane, Australia",
    summary:
      "A sales website for a Building Management System — re-pointed at mechanical distributors and integrators rather than end users. Custom 3D, technical voice, lead-generation engineered around relationship sales.",
    audience: "b2b-tech",
    cover: "/work/3d-design/01-cover.png",
    hero: "/work/3d-design/02.webp",
    blurb:
      "A re-architected sales site for a Building Management System. The existing site sold to end-buyers; this one sells to the distributors and mechanical integrators who actually move product. The job was to translate a deeply technical product into a story that earned a quote-request, not a checkout.",
    role: "Design · Build · 3D",
    scope: ["Web", "3D modelling", "Sales narrative"],
    status: "Launched 2026",
    duration: "6 weeks",
    collaborators: ["Bar-Tech engineering"],
    salesPoints: [
      {
        heading: "For B2B & industrial SaaS",
        body: "Most product sites in the trade try to sell direct. This one was built to earn a partnership conversation — quote requests, distributor introductions, integrator demos. The whole funnel is relationship-led.",
      },
      {
        heading: "3D as a sales asset, not a flourish",
        body: "Custom Blender models render the product in operational context — so a buyer can see the system on their site without a salesperson on a call.",
      },
      {
        heading: "Technical clarity at marketing pace",
        body: "Engineered to read fluently to a mechanical engineer and a procurement lead in the same scroll. No jargon for jargon&apos;s sake; no marketing fog over the spec.",
      },
      {
        heading: "Six weeks, one designer-developer",
        body: "Strategy, design, build, 3D, copy direction — handled end-to-end on a six-week timeline. No agency overhead, no handoffs to lose meaning across.",
      },
    ],
    gallery: [
      {
        src: "/work/3d-design/01-cover.png",
        alt: "BMS sales site — hero composition",
        ratio: "wide",
      },
      {
        src: "/work/3d-design/02.webp",
        alt: "BMS sales site — 3D product render",
        ratio: "landscape",
      },
      {
        src: "/work/3d-design/03.png",
        alt: "BMS sales site — interface in context",
        ratio: "landscape",
      },
    ],
  },
];

// Recent work — Home cards only.
export const RECENT_WORK: WorkItem[] = [
  {
    slug: "",
    index: "W/05",
    title: "Campus & Site Map",
    client: "Bar-Tech Automation",
    year: "2026",
    summary:
      "An isometric 3D campus map for a Building Management System homepage. Detailed buildings for assets under monitoring, simplified white forms for facilities not yet on the system — visual proof of system reach.",
    audience: "b2b-tech",
    cover: "/work/campus/01-cover.webp",
  },
  {
    slug: "",
    index: "W/06",
    title: "Floors Restore & More",
    client: "Floors Restore",
    year: "2026",
    summary:
      "Logo and complete brand guidelines for a floor-restoration trade — repositioning a hands-on service as a craft, with type and color built to last.",
    audience: "restoration-trades",
    cover: "/work/floors/01-cover.webp",
  },
];

export const ALL_WORK: WorkItem[] = [...HERO_WORK, ...RECENT_WORK];
