import { Fraunces, Inter } from "next/font/google";

// Fraunces is a temporary stand-in for PP Editorial New.
// To swap: replace this with `localFont` loading the .woff2 files
// dropped into /public/fonts/, keeping the CSS variable name --font-display.
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
});
