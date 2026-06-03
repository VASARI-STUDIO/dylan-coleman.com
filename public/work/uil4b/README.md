# UIL4B — case-study screenshots

Drop the screenshots for the UIL4B showcase here, using the exact filenames
below. The paths are already wired into `content/work/_recent.ts` (cover, hero
and gallery), so the page fills in as soon as the files exist — no code change
needed.

Source: the live app at https://www.uil4b.com/

| File              | Used as            | Shows                                      | Recommended ratio |
| ----------------- | ------------------ | ------------------------------------------ | ----------------- |
| `01-cover.webp`   | cover + hero + W/01 | Dashboard with draggable tool cards        | ~21:9 (wide)      |
| `02-palette.webp` | gallery            | Colour palette builder & harmony modes     | 16:9 (landscape)  |
| `03-contrast.webp`| gallery            | Tint scales & WCAG contrast checker        | 16:9 (landscape)  |
| `04-gradient.webp`| gallery            | Gradient builder                           | 16:9 (landscape)  |
| `05-type.webp`    | gallery            | Modular type scale & font pairing          | 16:9 (landscape)  |
| `06-icons.webp`   | gallery            | Icon library                               | 16:9 (landscape)  |
| `07-convert.webp` | gallery            | Image converter & video-to-frames          | 16:9 (landscape)  |

Notes:
- Prefer `.webp` to match the rest of the portfolio. If you save a different
  format, update the matching `src` in `content/work/_recent.ts`.
- The cover image is reused as the home-card cover and the full-bleed case-study
  hero, so make it the strongest, widest shot.
- Capture at 2× (retina) where possible; the layout caps display width, so
  larger source images stay crisp.
