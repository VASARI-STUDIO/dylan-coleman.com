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
      // schema.org expects a bare address here, not a mailto: URI.
      email: BUSINESS.email,
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
      // LocalBusiness rather than ProfessionalService: schema.org marks the
      // latter superseded, and LocalBusiness is what search engines consume.
      "@type": "LocalBusiness",
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
      currenciesAccepted: "AUD",
      // Spans the full set of bands the contact form offers, including the
      // lowest one — an understated floor here would contradict the form.
      priceRange: "A$0 – A$20,000+",
      email: BUSINESS.email,
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
