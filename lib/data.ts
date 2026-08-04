export type ProjectSpan = "lg" | "md" | "sm" | "wide";
export type AccentColor = "clay" | "teal" | "gold" | "slate" | "plum" | "sky" | "pine";

export interface Project {
  slug: string;
  title: string;
  span: ProjectSpan;
  accent: AccentColor;
  tagStrip: string[];
  problem: string;
  decision: string;
  challenge: string;
  wouldChange: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "toyosi-olosunde",
    title: "Toyosi Olosunde",
    span: "lg",
    accent: "clay",
    tagStrip: ["Next.js", "Motion", "GSAP"],
    problem:
      "Toyosi is a broadcaster and MC, so the site had to work as both a portfolio and a pitch deck - bookers judge credibility fast. The early version was a client-rendered SPA, which looked right but meant search engines and link previews saw almost nothing on first load. For someone whose work depends on being found and shared, that's a real gap, not a nice-to-have fix.",
    decision:
      "Migrated the whole project to Next.js App Router mid-build, not because the design needed to change but because the SEO problem couldn't be solved without server rendering. That meant redoing routing, metadata, and image handling - a real cost, taken on because a site that looks great and gets found by nobody isn't finished.",
    challenge:
      "The credits log needed to be filterable without turning into a spreadsheet, so it became tabs (Radix UI, for keyboard accessibility out of the box) over a bento grid of video reels. The reels were the hard part - autoplaying muted video without killing performance meant gating playback behind an IntersectionObserver so nothing plays until it's actually on screen.",
    wouldChange:
      "I'd build the loader animation later in the process. The stroke-draw monogram intro came together early and looked good, but locking in a signature animation before the content structure was finalized meant later layout changes had to work around it instead of the other way round.",
    tools: ["Next.js App Router", "Motion", "GSAP", "Radix UI"],
    liveUrl: "https://toyosee.netlify.app/",
    image: "/projects/toyosi-preview.webp",
  },
  {
    slug: "dgrace-sports",
    title: "D-Grace Sports",
    span: "md",
    accent: "teal",
    tagStrip: ["React Router", "Tailwind"],
    problem:
      "This one had a plot twist. The original brief described a three-discipline consultancy - boardroom advisory, business management, and sports management - and I built a full design system around that split identity. Then the client sent their real materials, and the actual business was sports-only. Everything I'd built was for a company that, on paper, didn't exist.",
    decision:
      "Rebuilt around the real content instead of trying to bend the old structure to fit - five actual core competencies (governing bodies, government, venues, athletes, brands), a real founder bio, and a real milestone timeline including a Rio 2016 Olympics credit. First briefs are rarely the last word, and a design system should be able to survive finding that out.",
    challenge:
      "The navbar: a floating glass pill that morphs from a full-width transparent bar over the dark hero into a contracted pill on scroll - width, radius, background, and text color all changing together. The first version had visible timing drift between those properties. Fixed it by driving everything off one shared transition object instead of four separately-tuned animations.",
    wouldChange:
      "I'd ask for the real business materials before writing a single line of the design system. It cost real time to build a convincing identity for a company that turned out not to match reality - better to lose a day up front than a week mid-build.",
    tools: ["React Router v6", "Tailwind CSS"],
    liveUrl: "https://dgraceinternational.netlify.app/",
    image: "/projects/dgrace-preview.webp",
  },
  {
    slug: "bensamstores",
    title: "BensamStores",
    span: "sm",
    accent: "gold",
    tagStrip: ["GSAP", "Vite"],
    problem:
      "The client wanted a homepage that felt like a fashion drop, not a fabric catalog - the reference was OVO's full-screen pinned scroll, where each section takes over the whole viewport before releasing to the next. Copying that visually is one thing. Getting the scroll physics, the timing, and the handoff between sections to feel as smooth as the reference is a different problem entirely.",
    decision:
      "Built the sequence with GSAP and ScrollTrigger, pinning each full-screen section and wiping it away as the next one covers it. Disabled the whole scroll-jacking effect on mobile rather than trying to force it to work on small screens - a pinned-scroll effect that fights a phone's native scroll behavior does more harm than good.",
    challenge:
      "Two bugs stand out. Pinned panels kept intercepting clicks meant for the panel wiping over them, since the DOM elements were still there even after being visually covered - fixed by toggling pointer-events off once a panel's coverage hit 100%. A video with pillarboxed black bars needed cropping - turned out the bars were baked into the source file, not a CSS issue, so I went frame-by-frame in ffmpeg to get the crop right.",
    wouldChange:
      "I'd test the mobile fallback earlier. The desktop scroll sequence took priority for most of the build, and disabling it cleanly for mobile ended up being its own late-stage task rather than something designed in from the start.",
    tools: ["Vite", "Tailwind v4", "GSAP"],
    liveUrl: "https://bensamstores.netlify.app/",
    image: "/projects/bensamstores-preview.webp",
  },
  {
    slug: "haumart-cleaning",
    title: "Haumart Cleaning",
    span: "sm",
    accent: "slate",
    tagStrip: ["React", "Motion"],
    problem:
      "A cleaning company's website only matters if it converts visits into bookings and shows up when people search for cleaners nearby. This one was live but invisible - completely absent from Google search results, with a contact form that didn't actually deliver messages anywhere reliable.",
    decision:
      "Built a real backend for the contact form - a Cloudflare Pages Function with Resend for email delivery and KV for status tracking - instead of leaving it as a form that just looked functional. For the SEO problem, I traced it to structured data that used invalid JSON syntax, silently discarded by Google's parser, plus the site never having been submitted to Search Console in the first place.",
    challenge:
      "Performance was the win. Two hero images were being served unoptimized at over 700KB and 3MB. Converting everything to WebP and adding proper responsive srcset variants took the mobile PageSpeed score from 77 to 82 and desktop from 97 to 99 - the kind of work that never shows up in a screenshot but is the difference between a visitor waiting and a visitor leaving.",
    wouldChange:
      "I'd set up Search Console and sitemap submission on day one of any client project going forward. Finding out months later that a live site was invisible to Google is an expensive mistake.",
    tools: ["React", "Framer Motion", "Cloudflare"],
    liveUrl: "https://haumartcleaningservices.co.uk/",
    image: "/projects/haumart-preview.webp",
  },
  {
    slug: "aroma-worshippers",
    title: "Aroma Worshippers",
    span: "wide",
    accent: "plum",
    tagStrip: ["React", "Vite"],
    problem:
      "A music ministry landing page needed to do two different jobs at once - represent the ministry year-round, and drive registrations for a specific event (Music Ministers' Conference) during a limited window. Cramming both into one page dilutes each; a separate registration flow needed to exist without fragmenting the site's SEO.",
    decision:
      "Split it into the main landing page and a standalone static registration entry point, both properly indexed with structured data rather than treating the event page as an afterthought route. Getting the JSON-LD rich-results markup to validate took more back-and-forth than expected, but it's what makes the event listing eligible to show up properly in search.",
    challenge:
      "Getting Google Search Console set up correctly at the domain level, not just for a subpath, so both the main site and the event page were covered by one verified property instead of fighting for separate indexing.",
    wouldChange:
      "I'd build the structured data validation into the process earlier rather than troubleshooting it after the fact - rich-results markup is easy to get subtly wrong, and subtle wrong is worse than obviously broken because nothing throws an error.",
    tools: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://www.aromaworshippers.com/",
    githubUrl: "https://github.com/Aroma-Worshippers/aw-landing-page",
    image: "/projects/aroma-preview.webp",
  },
  {
    slug: "haven",
    title: "Haven",
    span: "sm",
    accent: "pine",
    tagStrip: ["Redux", "Vite"],
    problem:
      "A personal project to prove out a full e-commerce flow beyond what client work usually calls for - catalog, cart, filtering, and authentication together, not just a storefront skin.",
    decision:
      "Used Redux Toolkit for cart and auth state rather than reaching for Context, since cart logic touches enough different components that a global store was worth the extra setup.",
    challenge:
      "Getting the glassmorphism UI to stay legible over varied product photography - translucent panels look good over a controlled background and fall apart over busy images if the blur and contrast aren't tuned per section rather than applied as one global style.",
    wouldChange:
      "I'd scope the filtering logic more tightly from the start. It grew organically as features were added, and a cleaner initial data shape would have saved some later refactoring.",
    tools: ["React", "Redux Toolkit", "Framer Motion"],
    liveUrl: "https://haven-bay.netlify.app/",
    githubUrl: "https://github.com/ifechiglory/haven",
    image: "/projects/haven-preview.webp",
  },
  {
    slug: "pathfinder",
    title: "Pathfinder",
    span: "sm",
    accent: "sky",
    tagStrip: ["Zustand", "APIs *4"],
    problem:
      "Travel discovery pulls from a lot of disconnected sources by nature - destination info, weather, photography aren't usually in one place. The challenge was combining four separate external APIs into something that reads as one coherent interface rather than four widgets bolted together.",
    decision:
      "Used Zustand for shared state instead of something heavier, since the state here - selected destination, active filters - didn't need the ceremony of a full store setup, and TanStack Query to handle the actual API fetching, caching, and loading states across four different data sources.",
    challenge:
      "Keeping the interface responsive when any one of four APIs could be slow or fail independently - the app needed to degrade gracefully rather than block the whole page waiting on the slowest response.",
    wouldChange:
      "I'd add more deliberate fallback states for when an individual API fails, rather than letting each section handle its own failure case slightly differently.",
    tools: ["React", "Zustand", "TanStack Query"],
    liveUrl: "https://pathfinder-j.netlify.app/",
    githubUrl: "https://github.com/ifechiglory/pathfinder",
    image: "/projects/pathfinder-preview.webp",
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Gardeners For Africa",
    period: "Sep 2025 — Present",
    description:
      "Joined as the frontend developer turning design handoffs into interfaces that actually ship, not prototypes. The main shift I brought was treating deployment as part of the design conversation from day one, instead of a problem for later.",
  },
  {
    role: "Frontend Tutor",
    company: "Attueyi Coding Academy",
    period: "Jul 2024 — Present",
    description:
      "Teaching frontend fundamentals to people who've mostly only seen tutorials, not real projects. My focus has been closing that gap — getting students from \"I followed the steps\" to \"I understand why the steps work.\"",
  },
  {
    role: "Frontend Tutor",
    company: "West Africa People's Institute",
    period: "Jul 2023 — Jun 2024",
    description:
      "Mentored early-career developers through their first real builds — the ones with actual bugs, not curated tutorial bugs. Watching someone go from panicking at a console error to calmly reading the stack trace never got old.",
  },
  {
    role: "Frontend Developer",
    company: "Daabo Technologies",
    period: "Apr 2023 — Jul 2023",
    description:
      "My first professional frontend role — client-facing interfaces, real deadlines, real feedback from people who weren't grading an assignment. This is where I learned \"it works on my machine\" isn't an answer anyone wants to hear.",
  },
  {
    role: "Frontend Intern",
    company: "TABI — The Ada Project",
    period: "Sep 2022 — Apr 2023",
    description:
      "Internship, learning frontend fundamentals alongside other interns. Less about what I shipped, more about learning to work inside someone else's codebase and conventions instead of always starting from a blank file.",
  },
];