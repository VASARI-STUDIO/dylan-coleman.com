import { HERO_WORK } from "@/content/work";

/** Canonical origin. Every absolute URL on the site derives from this. */
export const SITE_URL = "https://dylan-coleman.com";

export const SITE_NAME = "Dylan Coleman";

export const SITE_DESCRIPTION =
  "Brand identities and websites for businesses that need to be taken seriously. Designer and developer based in Brisbane, Australia.";

/**
 * Every static route.
 *
 * `dated: true` means the route has a real, tracked last-changed date that the
 * sitemap can state honestly. The rest carry no lastmod at all — it is the one
 * sitemap field search engines actually consume, and stamping every URL with
 * the build timestamp tells them /terms changed on a deploy that only touched
 * a Tailwind class. Once that signal is shown to be unreliable it gets ignored
 * entirely, including on the day something really does change.
 */
export const STATIC_ROUTES = [
  { path: "/", priority: 1.0, dated: false },
  { path: "/services", priority: 0.9, dated: false },
  { path: "/about", priority: 0.8, dated: false },
  { path: "/privacy", priority: 0.3, dated: true },
  { path: "/terms", priority: 0.3, dated: true },
] as const;

/** Case-study routes, derived from the work collection so they can't drift. */
export function workRoutes() {
  return HERO_WORK.filter((w) => w.slug).map((w) => `/work/${w.slug}`);
}

/**
 * Absolute URL for a route, WITH a trailing slash.
 *
 * next.config sets trailingSlash: true, so "/services" 308-redirects to
 * "/services/" and the canonical tag emits the slashed form. A sitemap listing
 * the unslashed URLs points every crawler at a redirect and disagrees with the
 * canonical on every page — so the slash is not cosmetic here.
 */
export const absolute = (path: string) => {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
};
