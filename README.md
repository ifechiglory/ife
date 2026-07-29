# Ifechukwu Max-Oti — Portfolio

My personal portfolio: a single-page site introducing me as a frontend
developer and tutor, walking through my background, skills, work history,
projects, and teaching — built as a showcase of both what I say I can do
and how the site itself is put together.

**Live site:** _add URL once deployed_

---

## Tech stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config via `@theme`, no `tailwind.config.js` |
| Animation | [Motion](https://motion.dev/) (Framer Motion's successor) + [GSAP](https://gsap.com/) |
| Icons | [Lucide](https://lucide.dev/) |
| Screenshot tooling | [Puppeteer](https://pptr.dev/) via a custom script (see below) |

### Why two animation libraries

Motion and GSAP are deliberately split by what each is actually good at,
not used interchangeably:

- **Motion** owns every component-level interaction: hover and tap states,
  scroll-triggered reveals, the magnetic-pull buttons, the terminal card's
  cursor-tilt, animated count-up stats. These are all real Motion
  primitives (`useMotionValue`, `useSpring`, `useTransform`, `whileHover`,
  `whileInView`) — not hand-rolled spring math.
- **GSAP** is scoped to the handful of things it's genuinely better at:
  precisely-timed, multi-phase timelines driven by real DOM measurement.
  Specifically: the full-screen intro loader's character-by-character
  type-in and logo morph (`hooks/useLoaderSequence.ts`), the hero
  terminal's typed-command sequence (`hooks/useTerminalSequence.ts`), and
  the experience timeline's scroll-scrubbed progress line
  (`hooks/useTimelineProgress.ts`).

Every GSAP hook has a comment explaining specifically why that effect
stays off Motion — the short version is: Motion's declarative variants are
the right tool for independent component reveals, and a worse fit for "run
this exact frame-accurate sequence across a dozen unrelated DOM nodes,"
which is what a terminal session or a type-in loader actually is.

### Why Tailwind v4

Config lives entirely in `app/globals.css` via the `@theme` block — colors,
fonts, and animation keyframes are declared as CSS custom properties, and
Tailwind auto-generates the matching utility classes (`--color-pine` →
`bg-pine`, `text-pine`, `border-pine`, etc). No `tailwind.config.js`
anywhere in the project.

---

## Design system

- **Palette** — a cool white/paper background with a muted pine-green and
  brass accent pair, plus six additional accent hues (clay, slate, plum,
  gold, teal, sky) used to give each project card in the Work section its
  own identity. All colors are defined once as tokens and referenced
  everywhere via `var(--color-*)`, including inside dynamically-generated
  inline styles (gradients, glows) — nothing is a hardcoded hex outside of
  `globals.css` except where content is deliberately theme-independent
  (see below).
- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  for display/headings, [Jost](https://fonts.google.com/specimen/Jost) for
  body copy, [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for
  anything code-flavored (the terminal, tags, labels). All three load via
  `next/font/google` in `app/layout.tsx`.

  > Jost is a stand-in for **Futura**, which was the original brief but is
  > a licensed commercial typeface (Monotype) unavailable through
  > `next/font`. Jost shares Futura's geometric letterforms (circular O,
  > geometric M) closely enough to hold the look until Futura is licensed
  > and self-hosted.

- **Dark UI surfaces** — the hero terminal and the project cards' hover
  overlays are intentionally dark regardless of the site's own (light)
  theme — the same way a code editor or a photo caption stays dark under a
  light OS theme. These use a separate `--color-on-dark` token trio,
  decoupled from the main text/background tokens, so they can't
  accidentally go illegible if the site's overall theme changes.

---

## Structure

```
app/
  globals.css       Tailwind v4 @theme tokens, base styles
  layout.tsx         Font loading, page metadata
  page.tsx            Section assembly

components/
  PageShell.tsx      Owns the one-time intro loader's mount/unmount + scroll lock
  Loader.tsx          Full-screen intro: types out "<Ife/>", morphs into the nav logo
  Nav.tsx              Floating pill nav, shrinks on scroll, mobile menu
  Hero.tsx             Headline, bio line, CTAs, the terminal card
  About.tsx            Bio copy, stat counters (years / companies / technologies)
  Experience.tsx       Scroll-progress timeline of work history
  Work.tsx              Bento-grid project showcase with hover case studies
  Teaching.tsx          Mentoring background, animated chat-bubble example
  Contact.tsx            Closing CTA
  Footer.tsx              Credits, social links
  GridBackground.tsx      Faint grid-line texture behind the hero

hooks/
  useLoaderSequence.ts    GSAP: intro loader's type-in + logo morph
  useTerminalSequence.ts  GSAP: hero terminal's typed-command sequence
  useTimelineProgress.ts  GSAP: experience section's scroll-scrubbed line
  useMagnetic.ts          Motion: magnetic-pull effect for buttons
  useTilt.ts              Motion: cursor-following 3D tilt (terminal card)

lib/
  data.ts    All real content — projects, work history — as typed data,
             not hardcoded into components
  motion.ts  Shared Motion variants (reveal/slide-in animations, viewport
             trigger config) reused across sections

scripts/
  screenshots/    Puppeteer script that captures live screenshots of each
                  project for the Work section — see its own README
```

### Content lives in `lib/data.ts`, not in components

Projects and work history are typed data (`Project[]`, `ExperienceItem[]`),
not JSX hardcoded into their respective components. Adding a role or a
project means editing one array in one file — the section components map
over it and stay unchanged.

---

## Notable implementation details

- **Bento grid (Work section)** — project cards use a small set of named
  spans (`sm`, `md`, `wide`, `lg`) mapped to explicit Tailwind grid-span
  classes, chosen so the grid tiles with zero empty cells at the current
  project count rather than relying on `grid-auto-flow: dense` (which
  doesn't reliably close gaps when no later item happens to fit the exact
  leftover space).
- **Live screenshots with graceful fallback** — project card images try to
  load the real screenshot (`public/projects/*.webp`, generated by
  `npm run shots`) and fall back to a gradient placeholder via `<Image
  onError>` if one hasn't been captured yet for that project — so the site
  never breaks waiting on a manual step.
- **`liveUrl` placeholder handling** — projects not yet deployed hold
  `liveUrl: "#"` as a placeholder in the data. Every place that reads
  `liveUrl` treats `"#"` the same as "not set" (via a `hasLiveUrl()` type
  guard), so an unfinished project never renders a dead link.
- **Reduced motion** — the intro loader checks `prefers-reduced-motion`
  and skips straight to its end state for anyone with that preference set
  (gating the whole page behind an animation is exactly the case that
  shouldn't play out for them), rather than relying only on the global CSS
  reduced-motion rule, which doesn't reach GSAP's inline-style tweens.

---

## Getting started

```bash
npm install
npm run dev
```

Requires Node 18.18+ (Next 15 / React 19 minimum).

### Generating project screenshots

```bash
npm run shots
```

Reads every project's `liveUrl` straight from `lib/data.ts` (skipping any
still on the `"#"` placeholder), captures a cropped hero screenshot of each
live site via Puppeteer, and writes WebP files to `public/projects/`. See
`scripts/screenshots/README.md` for tuning viewport size, capture timing,
image quality, etc.

---

## Status / open items

- All seven projects now have real `liveUrl`s in `lib/data.ts` — run
  `npm run shots` to (re-)capture current screenshots for all of them.
- Futura is not yet licensed; see the typography note above.
- The display/heading typeface (currently Fraunces) is still open to
  change.
