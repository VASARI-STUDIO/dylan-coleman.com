// Single source of truth for the business details used by /privacy and /terms.
//
// ─────────────────────────────────────────────────────────────────────────────
// BEFORE THESE PAGES GO LIVE, fill in the fields marked TODO below.
// Anything left as `null` is OMITTED from the rendered page rather than guessed
// at — no placeholder ABN or invented GST status will ever be published.
// These pages are a starting draft, not legal advice. Have them reviewed by
// someone qualified before relying on them.
// ─────────────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  /** Name you trade under. */
  tradingName: "Dylan Coleman",

  /** Legal entity. A sole trader's legal name is their own name. */
  legalName: "Dylan Coleman",

  /** TODO: your ABN, e.g. "12 345 678 901". Left null = the ABN line is hidden. */
  abn: null as string | null,

  /**
   * TODO: set true or false once confirmed.
   * GST registration is compulsory in Australia once annual turnover reaches
   * $75,000 (ATO). `null` = the pages stay neutral and defer to the quote.
   */
  gstRegistered: null as boolean | null,

  /** Contact address for privacy requests and notices. */
  email: "contact@dylan-coleman.com",

  location: "Brisbane, Queensland, Australia",

  /** Governs the terms, and names the state whose courts have jurisdiction. */
  state: "Queensland",

  /** Shown as "Last updated" on both pages. Bump when you change them. */
  lastUpdated: "15 September 2026",
} as const;

/**
 * Third parties that can receive a visitor's information, and where they are.
 * Australian Privacy Principle 8 concerns cross-border disclosure, so the
 * country matters and is listed explicitly.
 */
export const DATA_RECIPIENTS = [
  {
    name: "Vercel Inc.",
    country: "United States",
    role: "Hosting. Serves the site and keeps standard server logs, which include IP addresses and browser user-agent strings.",
  },
  {
    name: "Resend (Plus Five Five, Inc.)",
    country: "United States",
    role: "Delivers contact-form enquiries to my inbox. It processes the name, email address and message you submit solely to send that one email — it is a delivery service, not a mailing list.",
  },
] as const;
