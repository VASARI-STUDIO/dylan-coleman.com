import { Inter, Instrument_Serif } from "next/font/google";

// Body — Inter
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Italic serif accent — Instrument Serif (matches the dark-monochrome direction).
// Italic ONLY: the sole consumer of --font-serif is `.serif-italic` in
// globals.css, which sets font-style: italic. Requesting "normal" as well made
// next/font emit and preload a second face that nothing on the site renders.
export const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});
