import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absolute } from "@/lib/site";
import { BUSINESS } from "@/content/legal";
import { SOCIALS } from "@/content/social";

/**
 * JSON-LD for the site owner and the practice.
 *
 * Everything asserted here is checkable against the rest of the site — no
 * ratings, review counts or client lists that don't exist. The price range
 * mirrors the budget bands the contact form actually offers.
 */
export function StructuredData() {
  // Same trailing-slash form the canonicals use, so the entity URLs and the
  // pages they describe are literally the same string.
  const home = absolute("/");
  const personId = `${SITE_URL}/#person`;
  const businessId = `${SITE_URL}/#practice`;

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      url: home,
      jobTitle: "Designer & Developer",
      email: `mailto:${BUSINESS.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brisbane",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      sameAs: SOCIALS.map((s) => s.href),
      knowsAbout: [
        "Brand identity design",
        "Web design",
        "Front-end development",
        "Next.js",
        "Design systems",
        "3D and motion design",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: BUSINESS.tradingName,
      description: SITE_DESCRIPTION,
      url: home,
      image: `${SITE_URL}/opengraph-image.png`,
      founder: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brisbane",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      areaServed: { "@type": "Country", name: "Australia" },
      availableLanguage: "en-AU",
      currenciesAccepted: "AUD",
      priceRange: "A$3,000 – A$20,000+",
      ...(BUSINESS.abn ? { taxID: BUSINESS.abn } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: home,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": personId },
      inLanguage: "en-AU",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled object — no user input reaches this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
