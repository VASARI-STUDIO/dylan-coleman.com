import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        rule: "var(--color-rule)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale, ~1.25 ratio on a 16px base
        "caption": ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0.08em" }],
        "label": ["0.8125rem", { lineHeight: "1.2rem", letterSpacing: "0.04em" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "lede": ["1.375rem", { lineHeight: "1.45" }],
        "h6": ["1.125rem", { lineHeight: "1.3" }],
        "h5": ["1.375rem", { lineHeight: "1.25" }],
        "h4": ["1.75rem", { lineHeight: "1.2" }],
        "h3": ["2.25rem", { lineHeight: "1.15" }],
        "h2": ["3rem", { lineHeight: "1.05" }],
        "h1": ["4.5rem", { lineHeight: "1.0" }],
        "display": ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        smallcaps: "0.12em",
      },
      maxWidth: {
        prose: "68ch",
        page: "1280px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
