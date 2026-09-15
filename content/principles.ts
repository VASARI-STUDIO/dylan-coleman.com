// The three working principles, shared by the homepage About section and the
// /about page. They were duplicated in both files and had already drifted into
// two different sets of words for the same three ideas.
//
// `short` is the homepage version — one line under a heading in a three-up
// grid. `long` is the /about version, which has room to actually make the case.
export type Principle = {
  n: string;
  title: string;
  short: string;
  long: string;
};

export const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: "Audience first",
    short:
      "Every project starts with the person it's meant to win over. Design follows.",
    long: "Every project starts with the person it is meant to win over — what they already believe, what would make them trust you, and what would make them leave. Design follows that, not the other way around.",
  },
  {
    n: "02",
    title: "Edit hard",
    short:
      "Restraint is the most premium signal there is. Cut until what remains is unarguable.",
    long: "Restraint is the most premium signal there is. The work is cutting until what remains is unarguable, which is slower and less fun than adding, and it is the difference between a site that looks considered and one that looks busy.",
  },
  {
    n: "03",
    title: "Build it once",
    short:
      "Performance, accessibility and craft aren't passes — they're the floor.",
    long: "Performance, accessibility and craft are not a polish pass at the end. They are the floor. A site that is fast, works with a keyboard and respects reduced-motion settings is not a premium extra — it is what finished looks like.",
  },
];
