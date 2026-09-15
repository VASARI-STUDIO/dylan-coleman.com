// ─────────────────────────────────────────────────────────────────────────────
// CLIENT TESTIMONIALS.
//
// Empty on purpose. The section that renders these returns null while this
// array is empty, so nothing ships until there is something real to ship —
// no placeholder quotes, no "Client Name, CEO" filler.
//
// This is the single highest-value thing missing from the site. Everything
// else here is you describing your own work; a testimonial is somebody else
// doing it, which is the only kind of proof a sceptical visitor weighs
// heavily. One real quote from Bar-Tech or Floors Restore would do more for
// conversion than any further design work.
//
// What makes one worth publishing:
//   - A full name and a real role/company. An initial and a job title reads
//     as invented, which is worse than having none.
//   - Something specific. "Great to work with" is noise; "the enquiries we
//     got after launch were from people who'd already decided" is evidence.
//   - Permission. Ask before you publish, in writing.
//
// Add an entry and the section appears. No other change needed.
// ─────────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  /** The quote itself. One or two sentences beats a paragraph. */
  quote: string;
  /** Full name — not an initial. */
  name: string;
  /** Role and company, e.g. "Operations Manager, Bar-Tech Automation". */
  role: string;
  /** Optional: slug of the related case study, e.g. "3d-design". */
  project?: string;
};

export const TESTIMONIALS: Testimonial[] = [];
