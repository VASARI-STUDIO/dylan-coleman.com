import createMDX from "@next/mdx";

// Static export for GitHub Pages.
// On Pages the site is served from /<repo-name>/, so we set basePath/assetPrefix.
// Override with NEXT_PUBLIC_BASE_PATH (e.g. "" for a custom apex domain later).
const isProd = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/dylan-coleman.com" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

const withMDX = createMDX({ extension: /\.mdx?$/ });

export default withMDX(nextConfig);
