// Industry taxonomy. Each project is tagged with one industry; the tag is
// rendered as a small-caps label and ties projects to audience-specific framing.
export const INDUSTRIES = {
  "local-service": {
    label: "Local Service Businesses",
    short: "Local Service",
  },
  "b2b-tech": {
    label: "B2B Tech & Industrial",
    short: "B2B / Industrial",
  },
  "creative-brand": {
    label: "Creative & Design-led Brands",
    short: "Creative",
  },
  "restoration-trades": {
    label: "Restoration & Trades",
    short: "Restoration",
  },
} as const;

export type IndustryKey = keyof typeof INDUSTRIES;

export function industry(key: IndustryKey) {
  return INDUSTRIES[key];
}
