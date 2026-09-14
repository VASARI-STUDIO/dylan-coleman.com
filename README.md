# dylan-coleman.com

Personal brand site — portfolio + shop. Single-page Home + per-case-study `/work/[slug]` pages.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- MDX support wired up (case study pages are currently data-driven, not MDX)
- next-themes for light/dark
- Static export (`output: "export"`)

## Develop
```
npm install
npm run dev
```

## Build
```
npm run build
```
Outputs the static site to `out/`.

## Deploy
**Vercel.** Every push builds a preview deployment; `main` goes to production.
GitHub is only the code host — there is no GitHub Pages deploy. The repo's own
CI (`.github/workflows/ci.yml`) just runs lint, typecheck and build on pushes
and PRs.

Because the site is served from the domain root, there is no `basePath`. Keep
`NEXT_PUBLIC_BASE_PATH` unset for normal builds.

## Configuration
- `NEXT_PUBLIC_BASE_PATH` — escape hatch for serving from a subpath. Leave unset on Vercel.
- `NEXT_PUBLIC_FORM_ENDPOINT` — optional Formspree (or similar) endpoint for the contact form. Falls back to `mailto:` if unset.

## Content
Everything editorial lives in `content/`, one file per entry:
- `content/work/` — case studies. Add a file, then import it into `index.ts` and
  add it to `HERO_WORK` (full `/work/[slug]` page) or `RECENT_WORK` (home card
  only). `index` fields are the displayed `W/nn` numbers, so renumber the
  collection if you insert or remove an entry.
- `content/shop/` — products, same pattern via `SHOP`.
- `content/services.ts`, `content/social.ts` — services and off-site links.

## Fonts
Display is currently Fraunces (Google) as a stand-in for **PP Editorial New**. To swap:
1. Drop `.woff2` files into `public/fonts/`
2. Replace `Fraunces` import in `lib/fonts.ts` with `localFont` referencing those files (keep `--font-display` variable name).
