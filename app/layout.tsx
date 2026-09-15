import type { Metadata } from "next";
import { sans, serif } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReset } from "@/components/ScrollReset";
import { Preloader } from "@/components/Preloader";
import { StructuredData } from "@/components/StructuredData";
import { MotionProvider } from "@/components/MotionProvider";
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
  // No title/description here. Next replaces a child's openGraph object
  // wholesale rather than merging field by field, so hardcoding them at the
  // root meant every page that didn't declare its own openGraph shared the
  // homepage's. Omitting them lets Next fall back to each page's own
  // title/description instead.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_AU",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
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
        <MotionProvider>
          <Preloader />
          <SmoothScroll />
          <ScrollReset />
          <Nav />
          {/* tabIndex=-1 so the skip link reliably moves focus, not just scroll. */}
          <main id="main" tabIndex={-1} className="pt-20 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
