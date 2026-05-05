import { Inter, Instrument_Serif } from "next/font/google";

// Body — Inter
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Italic serif accent — Instrument Serif (matches the dark-monochrome direction)
export const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});
