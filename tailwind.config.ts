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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "hero-subtitle": "hsl(var(--hero-subtitle))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0.12em" }],
        label: ["0.8125rem", { lineHeight: "1.2rem", letterSpacing: "0.04em" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        lede: ["1.375rem", { lineHeight: "1.45" }],
        h6: ["1.125rem", { lineHeight: "1.3" }],
        h5: ["1.375rem", { lineHeight: "1.25" }],
        h4: ["1.75rem", { lineHeight: "1.2" }],
        h3: ["2.25rem", { lineHeight: "1.1" }],
        h2: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.05" }],
        h1: ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.0" }],
        display: [
          "clamp(3rem, 8.5vw, 7.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.025em" },
        ],
      },
      letterSpacing: {
        smallcaps: "0.18em",
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
