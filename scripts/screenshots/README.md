# Portfolio Hero Screenshots

Generates cropped "hero" screenshots (viewport-only, not full-page scroll)
from every project's `liveUrl` in `lib/data.ts` — for use as the Work
section's card thumbnails.

Reads straight from `lib/data.ts` rather than keeping a second URL list —
add or update a project's `liveUrl` once, in that file, and this script
picks it up automatically. Projects still on the `"#"` placeholder URL are
skipped (with a console note) rather than erroring.

## Setup

From the project root:

```bash
npm install
```

(`puppeteer` and `tsx` are dev dependencies of the main project's
`package.json` — no separate install needed.)

## Run

```bash
npm run shots
```

Each screenshot is written to `public/projects/<name>.webp`, matching the
filename already referenced in that project's `image` field in
`lib/data.ts` (Puppeteer captures directly in WebP — smaller file size
than JPEG at equal visual quality, with universal browser support) — so
no manual renaming or path-updating is needed. Restart `next dev` (or
rebuild) afterward to pick up the new images.

## Notes / tweaks

(All in `scripts/screenshots/screenshot.ts`.)

- **`IMAGE_QUALITY`** — WebP compression quality, 0–100. 82 is a solid
  default balance of size vs. visual fidelity for a card thumbnail; push
  it down toward 70 if file size matters more than crispness at this
  display size.
- **`VIEWPORT`** — change `width`/`height` to match the card aspect ratio.
  1440×900 is a common "hero crop" size; drop to 1280×720 for a tighter
  16:9.
- **`WAIT_AFTER_LOAD_MS`** — bump this up if a site's entrance animation
  (a GSAP loader, a fade-in) takes longer than 2.5s to finish before the
  hero looks "settled."
- **`fullPage: false`** — this is what keeps the screenshot to just the
  hero/viewport instead of the entire scrolling page. Set to `true` if you
  ever want full-page captures for a case-study view instead.
- **Automation** — wire this into a GitHub Action or cron job so
  thumbnails regenerate automatically whenever a project redeploys, keeping
  the grid in sync with the live sites without manual re-screenshotting.
- **If a site refuses to load** (rare, but some hosts have bot detection),
  try adding a realistic `userAgent` via `page.setUserAgent(...)` before
  `page.goto`.

## Alternative: no-code option

If you'd rather not run a script at all, screenshot-as-a-service APIs work
as a drop-in `<img src="...">` (though with less control over crop height
and animation timing):

```html
<img src="https://api.microlink.io/?url=https://yoursite.com&screenshot=true&meta=false&embed=screenshot.url" />
```
