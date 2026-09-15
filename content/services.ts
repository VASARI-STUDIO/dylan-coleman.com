export type ServiceStage = {
  n: string;
  title: string;
  body: string;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  scope: string[];
  timeline?: string;
  /** When true, this card renders as the open-ended "anything else?" CTA. */
  openCta?: boolean;

  // ── /services page only ──────────────────────────────────────────────────
  /** Longer framing of who this is for and what it actually produces. */
  detail?: string;
  /** How the engagement runs, start to finish. */
  stages?: ServiceStage[];
  /** Concrete things that land in your hands at the end. */
  deliverables?: string[];
  /** Honest boundaries — what this engagement is not. */
  notIncluded?: string[];
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
    detail:
      "This is the main engagement. It suits a business whose website is doing real commercial work — winning enquiries, carrying a reputation, standing in for a first meeting — rather than existing because it has to. The build runs on Next.js when the site needs to be fast, custom and owned outright, or Framer when you want to edit it yourself afterwards without booking me to change a paragraph. I will tell you which one I think fits and why, before you commit to either.",
    stages: [
      {
        n: "01",
        title: "Discovery",
        body: "Who the site is for, what it has to prove to them, and the one action it is trying to earn. Existing analytics and enquiry history get read if you have them. This is the shortest phase and the one that decides whether the rest is worth building.",
      },
      {
        n: "02",
        title: "Structure",
        body: "Page inventory, navigation, and the argument each page makes. Agreed in writing before any visual design starts, so we are not relitigating the sitemap while looking at typography.",
      },
      {
        n: "03",
        title: "Design",
        body: "Custom design across every page and every breakpoint — not a desktop layout that gets squeezed. You see real content in real layouts, not lorem ipsum in a frame.",
      },
      {
        n: "04",
        title: "Build",
        body: "Performance-tuned front-end, accessible markup and navigation, reduced-motion support, and SEO foundations set up properly rather than bolted on. Content management wired up if you need to edit it yourself.",
      },
      {
        n: "05",
        title: "Launch",
        body: "Domain, hosting, analytics and redirects handled. I stay on hand through go-live, and defects in what I built are fixed free for 30 days afterwards.",
      },
    ],
    deliverables: [
      "A live, launched website",
      "Custom design across every page and breakpoint",
      "Accessible, performance-tuned build",
      "SEO foundations and analytics configured",
      "A short handover walkthrough",
      "30 days of defect fixes after launch",
    ],
    notIncluded: [
      "Ongoing content writing, unless quoted as part of the scope",
      "Third-party licence fees — fonts, stock imagery, CMS plans, hosting",
      "Ongoing maintenance after the warranty period, which is a separate arrangement",
    ],
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
    detail:
      "Identity work built to survive contact with the real world. A wordmark still has to read on a van door and at favicon size; a palette has to hold up in print as well as on a screen. The guidelines document is the part that matters six months later, when someone else is laying out a flyer and you are not in the room.",
    stages: [
      {
        n: "01",
        title: "Positioning",
        body: "Who you are talking to, who you are standing next to, and what you need to look like in order to be taken seriously by the former and distinct from the latter.",
      },
      {
        n: "02",
        title: "Direction",
        body: "A small number of genuinely different directions, presented in context rather than as logos floating on white. You pick one; we refine it rather than averaging them together.",
      },
      {
        n: "03",
        title: "System",
        body: "Wordmark, type scale, colour, and the rules that hold them together. Everything specified in the formats you will actually use.",
      },
      {
        n: "04",
        title: "Application",
        body: "The collateral the identity was built for — decks, brochures, social, ads, signage — plus a guidelines document so it stays coherent after handover.",
      },
    ],
    deliverables: [
      "Wordmark and any supporting marks, in print and screen formats",
      "Type scale, colour specifications and usage rules",
      "A brand guidelines document",
      "Agreed marketing collateral",
      "Packaged source files on final payment",
    ],
    notIncluded: [
      "Trade mark searching or registration — that is a job for an IP attorney",
      "Printing and production costs",
      "Photography or 3D beyond the agreed art direction",
    ],
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
