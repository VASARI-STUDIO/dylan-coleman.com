import type { Metadata } from "next";
import { display, sans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dylan-coleman.com"),
  title: {
    default: "Dylan Coleman — Designer & Developer",
    template: "%s · Dylan Coleman",
  },
  description:
    "Considered, premium digital identities and websites for ambitious brands.",
  openGraph: {
    type: "website",
    siteName: "Dylan Coleman",
    title: "Dylan Coleman — Designer & Developer",
    description:
      "Considered, premium digital identities and websites for ambitious brands.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-paper text-ink antialiased">
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
