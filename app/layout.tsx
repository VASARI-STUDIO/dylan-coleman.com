import type { Metadata } from "next";
import { sans, serif } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReset } from "@/components/ScrollReset";
import { Preloader } from "@/components/Preloader";
import { StructuredData } from "@/components/StructuredData";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dylan Coleman — Designer & Developer, Brisbane",
    template: "%s · Dylan Coleman",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_AU",
    url: SITE_URL,
    title: "Dylan Coleman — Designer & Developer, Brisbane",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Coleman — Designer & Developer, Brisbane",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`dark ${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <StructuredData />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <ScrollReset />
        <Nav />
        <main id="main" className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
