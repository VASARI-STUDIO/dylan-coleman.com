import createMDX from "@next/mdx";

// Static export, served from two places:
//   • GitHub Pages → site lives at /<repo-name>/, so we need a basePath.
//   • Vercel (preview + prod) → site lives at the domain root, so NO basePath.
// Vercel sets the `VERCEL` env var automatically during its builds, so we detect
// it and drop the prefix there. An explicit NEXT_PUBLIC_BASE_PATH always wins
// (e.g. set it to "" once a custom apex domain is wired up on Pages).
const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isVercel ? "" : isProd ? "/dylan-coleman.com" : "");

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
