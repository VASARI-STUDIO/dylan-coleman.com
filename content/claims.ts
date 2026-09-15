// ─────────────────────────────────────────────────────────────────────────────
// CLAIMS THIS SITE MAKES ABOUT THE BUSINESS.
//
// Everything here is an assertion a visitor may rely on when deciding whether
// to hire you. They were previously scattered across Hero.tsx, About.tsx and
// Contact.tsx, where nobody could see them as a set — which is exactly how a
// site ends up quietly claiming something that stopped being true a year ago.
//
// BEFORE LAUNCH, and any time you revisit the site, read this file top to
// bottom and confirm every line is still accurate. The `verify` note on each
// entry says what would make it false.
// ─────────────────────────────────────────────────────────────────────────────

export type Claim = {
  label: string;
  value: string;
  /** What to check to confirm this is still true. */
  verify: string;
};

/** Hero spec strip — the first factual assertions a visitor reads. */
export const HERO_FACTS: Claim[] = [
  {
    label: "Discipline",
    value: "Brand & Web",
    verify: "Descriptive, not a measurable claim.",
  },
  {
    label: "Based",
    value: "Brisbane, Australia · Remote",
    verify: "Descriptive. Update if you relocate.",
  },
  {
    label: "Working with",
    value: "Founders & Studios",
    verify: "Descriptive of who you take on.",
  },
  {
    label: "Status",
    value: "Booking late 2026",
    verify:
      "TIME-SENSITIVE. Goes stale on its own — this is the line most likely to be wrong on any given day. Update it or remove it.",
  },
];

/** About section stats. */
export const ABOUT_STATS: Claim[] = [
  {
    label: "Practicing",
    value: "5+ years",
    verify: "Count from when you started taking paid work.",
  },
  {
    label: "Projects shipped",
    value: "45+",
    verify:
      "A countable claim a prospective client could ask you to substantiate. Make sure you can.",
  },
  {
    label: "Based",
    value: "Brisbane, AU",
    verify: "Descriptive.",
  },
  {
    label: "Currently",
    value: "Bar-Tech · Freelance",
    verify: "Update if the in-house role ends.",
  },
];

/** Contact panel — response and availability commitments. */
export const CONTACT_PROMISES = {
  responseTime: {
    label: "Response time",
    value: "Within two business days. If it's urgent, say so in the brief.",
    verify:
      "A promise to a stranger. The success message after a form submit repeats it, so change both together if it changes.",
  },
  availability: {
    label: "Currently booking",
    value: "Late-2026.",
    verify: "TIME-SENSITIVE. Same caveat as the hero status line.",
  },
} as const;
