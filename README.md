# dylan-coleman.com

Personal brand site. Single-page Home, deeper `/services` and `/about`
pages, per-case-study `/work/[slug]` pages, and `/privacy` + `/terms`.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Resend for contact-form delivery (`app/api/contact`)
- Dark-only palette (no theme switcher)

## Develop
```
npm install
npm run dev
```

## Build
```
npm run build
```
Every page is statically prerendered. The one exception is
`app/api/contact`, which runs on the server so enquiries are actually
delivered rather than handed to the visitor's mail client.

## Deploy
**Vercel.** Every push builds a preview deployment; `main` goes to production.
GitHub is only the code host — there is no GitHub Pages deploy. The repo's own
CI (`.github/workflows/ci.yml`) just runs lint, typecheck and build on pushes
and PRs.

Because the site is served from the domain root, there is no `basePath`. Keep
`NEXT_PUBLIC_BASE_PATH` unset for normal builds.

## Configuration
See `.env.example`. Set these in the Vercel project, not in the repo:
- `RESEND_API_KEY` — contact-form delivery. Without it the form returns a
  clear error and offers the direct email address; it never silently drops
  an enquiry.
- `CONTACT_TO_EMAIL` — where enquiries land. Defaults to `BUSINESS.email`.
- `CONTACT_FROM_EMAIL` — sender, on a domain verified in Resend.
- `NEXT_PUBLIC_BASE_PATH` — escape hatch for subpath hosting. Leave unset on Vercel.

## Before going live
`content/legal.ts` drives /privacy and /terms. `abn` and `gstRegistered`
are `null` and render as omitted rather than invented — fill them in.

## Content
Everything editorial lives in `content/`, one file per entry:
- `content/work/` — case studies. Add a file, then import it into `index.ts` and
  add it to `HERO_WORK` (full `/work/[slug]` page) or `RECENT_WORK` (home card
  only). `index` fields are the displayed `W/nn` numbers, so renumber the
  collection if you insert or remove an entry.
- `content/services.ts` — the packaged offerings, and the process detail /services renders.
- `content/social.ts` — off-site links, shared by nav, hero and footer.
- `content/legal.ts` — business details behind /privacy and /terms.

## Fonts
Display is currently Fraunces (Google) as a stand-in for **PP Editorial New**. To swap:
1. Drop `.woff2` files into `public/fonts/`
2. Replace `Fraunces` import in `lib/fonts.ts` with `localFont` referencing those files (keep `--font-display` variable name).
