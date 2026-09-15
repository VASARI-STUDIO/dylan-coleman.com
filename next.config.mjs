// Hosting: Vercel. GitHub is only the code host — there is no GitHub Pages
// deploy, so the site always lives at the domain root and needs no basePath.
// NEXT_PUBLIC_BASE_PATH stays as an escape hatch in case the site is ever
// served from a subpath again; leave it unset for normal Vercel builds.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
