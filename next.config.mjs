// Hosting: Vercel. GitHub is only the code host — there is no GitHub Pages
// deploy, so the site always lives at the domain root and needs no basePath.
// NEXT_PUBLIC_BASE_PATH stays as an escape hatch in case the site is ever
// served from a subpath again; leave it unset for normal Vercel builds.
//
// NOT a static export any more: the contact form posts to a real route
// handler (app/api/contact) so an enquiry is actually delivered instead of
// being handed to the visitor's mail client. Every page is still statically
// prerendered — only the one POST endpoint runs on the server.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Security headers. The site had none.
//
// CSP notes: 'unsafe-inline' is required for both script and style here.
// Next.js injects inline bootstrap/flight scripts into every prerendered page,
// and framer-motion writes style attributes on every animated element — a
// nonce-based policy would need those to be per-request, which defeats static
// prerendering. Everything genuinely dangerous is still shut: no external
// script origins, no framing, no plugins, no arbitrary form targets.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
