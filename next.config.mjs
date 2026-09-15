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
};

export default nextConfig;
