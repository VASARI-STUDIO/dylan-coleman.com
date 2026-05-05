# dylan-coleman.com

Personal brand site — portfolio + shop. Single-page Home + per-case-study `/work/[slug]` pages.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- MDX for case studies
- next-themes for light/dark
- Static export (`output: "export"`) for GitHub Pages

## Develop
```
pnpm install
pnpm dev
```

## Build
```
pnpm build
```
Outputs static site to `out/`.

## Deploy
Pushes to `main` are deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Configuration
- `NEXT_PUBLIC_BASE_PATH` — override the URL prefix. Defaults to `/dylan-coleman.com` in production.
- `NEXT_PUBLIC_FORM_ENDPOINT` — optional Formspree (or similar) endpoint for the contact form. Falls back to `mailto:` if unset.

## Fonts
Display is currently Fraunces (Google) as a stand-in for **PP Editorial New**. To swap:
1. Drop `.woff2` files into `public/fonts/`
2. Replace `Fraunces` import in `lib/fonts.ts` with `localFont` referencing those files (keep `--font-display` variable name).
