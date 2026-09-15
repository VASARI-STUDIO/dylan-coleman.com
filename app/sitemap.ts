import type { MetadataRoute } from "next";
import { SITE_URL, STATIC_ROUTES, workRoutes, absolute } from "@/lib/site";

// Emitted as /sitemap.xml at build time. Routes are derived from the same
// sources the navigation uses, so adding a case study updates the sitemap
// without anyone remembering to.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: absolute(r.path),
      lastModified,
      changeFrequency: (r.priority >= 0.8 ? "monthly" : "yearly") as
        | "monthly"
        | "yearly",
      priority: r.priority,
    })),
    ...workRoutes().map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
