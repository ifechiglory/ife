# Ifechukwu Max-Oti — Portfolio

My personal portfolio: a single-page site introducing me as a frontend
developer and tutor, walking through my background, skills, work history,
projects, and teaching — built as a showcase of both what I say I can do
and how the site itself is put together.

**Live site:** [Live Site](https://ife-dev.netlify.app/)

---

## Tech stack

| | |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Motion](https://motion.dev/) + [GSAP](https://gsap.com/) |
| Icons | [Lucide](https://lucide.dev/) |

### Why two animation libraries

Motion and GSAP are deliberately split by what each is actually good at,
not used interchangeably:

- **Motion** owns every component-level interaction: hover and tap states,
  scroll-triggered reveals, the magnetic-pull buttons. These are all real Motion
  primitives (`useMotionValue`, `useSpring`,  `whileInView`) — not hand-rolled spring math.
- **GSAP** is scoped to the handful of things it's genuinely better at:
  precisely-timed, multi-phase timelines driven by real DOM measurement.
  Specifically: the full-screen intro loader's character-by-character
  type-in and logo morph and the experience timeline's scroll-scrubbed progress line
  (`hooks/useTimelineProgress.ts`).

Every GSAP hook has a comment explaining specifically why that effect
stays off Motion — the short version is: Motion's declarative variants are
the right tool for independent component reveals, and a worse fit for "run
this exact frame-accurate sequence across a dozen unrelated DOM nodes," a type-in loader actually is.

### Why Tailwind v4

Config lives entirely in `app/globals.css` via the `@theme` block — colors,
fonts, and animation keyframes are declared as CSS custom properties, and
Tailwind auto-generates the matching utility classes (`--color-pine` →
`bg-pine`, `text-pine`, `border-pine`, etc). No `tailwind.config.js`
anywhere in the project
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
- **Screenshots with graceful fallback** — project card images live as
  static files in `public/projects/`, and fall back to a gradient
  placeholder via `<Image onError>` if a file is ever missing (a typo in
  the path, a new project added before its image exists) — so a missing
  asset never breaks the layout.
- **`liveUrl` placeholder handling** — a project not yet deployed can hold
  `liveUrl: "#"` as a placeholder in the data. Every place that reads
  `liveUrl` treats `"#"` the same as "not set" (via a `hasLiveUrl()` type
  guard), so an unfinished project never renders a dead link. All seven
  current projects have real URLs; this only matters again if a new one
  is added before its site is live.
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

---

## Status / open items

- Futura is not yet licensed; see the typography note above.
- The display/heading typeface (currently Fraunces) is still open to
  change.
