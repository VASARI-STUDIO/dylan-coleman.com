import type { MetadataRoute } from "next";
import { STATIC_ROUTES, workRoutes, absolute } from "@/lib/site";
import { BUSINESS } from "@/content/legal";

// Emitted as /sitemap.xml at build time. Routes are derived from the same
// sources the navigation uses, so adding a case study updates the sitemap
// without anyone remembering to.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // The only date on this site that tracks a real content change.
  const legalUpdated = new Date(BUSINESS.lastUpdated);
  const hasLegalDate = !Number.isNaN(legalUpdated.getTime());

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: absolute(r.path),
      ...(r.dated && hasLegalDate ? { lastModified: legalUpdated } : {}),
      changeFrequency: (r.priority >= 0.8 ? "monthly" : "yearly") as
        | "monthly"
        | "yearly",
      priority: r.priority,
    })),
    ...workRoutes().map((path) => ({
      url: absolute(path),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
