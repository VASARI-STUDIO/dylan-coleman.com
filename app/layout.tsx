import type { Metadata } from "next";
import { sans, serif } from "@/lib/fonts";
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
      className={`dark ${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <Nav />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
