import type { IconType } from "react-icons";
import {
  SiCss,
  SiFirebase,
  SiGatsby,
  SiGit,
  SiGreensock,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import { SiFramer } from "react-icons/si";

export type ProjectSpan = "lg" | "md" | "sm" | "wide";
export type AccentColor =
  | "clay"
  | "teal"
  | "gold"
  | "slate"
  | "plum"
  | "sky"
  | "pine";

  export interface Project {
    slug: string;
    title: string;
    span: ProjectSpan;
    accent: AccentColor;
    tagStrip: string[];
    about: string;
    summary: string;
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
      title: "Toyosi",
      span: "wide",
      accent: "plum",
      tagStrip: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
      about:
        "A portfolio and pitch-deck site for Toyosi, a broadcaster and MC. Built to present her work clearly, strengthen discoverability, and support future content growth.",

      summary:
        "A multi-page portfolio and pitch-deck site for broadcaster and MC Toyosi, rebuilt with Next.js for stronger content structure and search visibility.",

      problem:
        "Toyosi is a broadcaster and MC who needed a digital presence that could work as both a professional portfolio and a concise pitch deck. The site needed to introduce her personality and experience quickly, showcase her work without overwhelming visitors, and make it easy for event organisers, producers, and potential collaborators to understand what she offers.",

      decision:
        "I moved the project from a client-rendered single-page application to a multi-page Next.js App Router build midway through development. This gave the work clearer page structure, shareable routes, stronger metadata support, optimised image delivery, and a better foundation for search visibility. Visually, I used the landing-page video as the starting point for the colour palette, creating an interface that felt polished, energetic, and aligned with Toyosi's on-screen presence.",

      challenge:
        "The biggest challenge was changing the technical direction without losing momentum or compromising the visual system already in place. Moving from an SPA to an MPA meant revisiting routing, content structure, rendering choices, image optimisation, and the balance between server- and client-rendered features. I also had to keep supporting content, such as production credits, accessible without making the site feel dense or administrative.",

      wouldChange:
        "If I were starting the project again, I would define the content architecture, route structure, and SEO requirements during discovery rather than after the first interface had been built. For a personal-brand portfolio, discoverability is part of the product—not an enhancement to add later—so I would choose Next.js from the outset and plan page-level metadata, sharing behaviour, and scalable content sections before development begins.",

      tools: ["Next.js", "TypeScript", "React", "Tailwind CSS", "next/image"],
      liveUrl: "https://toyosee.netlify.app/",
      githubUrl: "https://github.com/ifechiglory/toyosi-olosunde",
      image: "/projects/toyosi-preview.webp",
    },
    {
      slug: "dgrace-sports",
      title: "Dgrace Sports Consultancy",
      span: "wide",
      accent: "sky",
      tagStrip: [
        "Sports management",
        "Responsive design",
        "Motion",
        "Design system",
      ],

      about:
        "A sports-management consultancy site rebuilt around the client's real business focus, combining a flexible content system with a scroll-responsive glass navigation experience.",

      summary:
        "A sports-management consultancy website rebuilt around validated business content, with a modular content structure and a scroll-responsive navigation system.",

      problem:
        "The project began with a brief that described a consultancy operating across boardroom advisory, business management, and sports management. After reviewing the client's materials, I identified that the business was focused exclusively on sports management. The site needed a revised content model and visual direction that reflected its actual services and audience.",

      decision:
        "I restructured the site around five core client segments: governing bodies, government, venues, athletes, and brands. The revised architecture made the consultancy's expertise easier to scan, while the founder biography and milestone timeline—including a Rio 2016 Olympics credit—provided concrete evidence of experience and credibility.",

      challenge:
        "The navigation required a coordinated transition from a full-width transparent hero bar into a compact glass pill on scroll. Width, border radius, background, and text colour all changed during the interaction. The first implementation produced timing drift because each property was animated independently. I consolidated the transition into a shared configuration, ensuring the properties moved as one cohesive state change.",

      wouldChange:
        "I would establish a content-validation step before beginning design or development. Reviewing the client's real services, audience, and source materials upfront would have reduced rework and allowed the design system to be built around accurate business information from the start.",

      tools: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],

      liveUrl: "https://dgraceinternational.netlify.app/",
      githubUrl: "https://github.com/ifechiglory/dgi",

      image: "/projects/dgrace-preview.webp",
    },
    {
      slug: "bensamstores",
      title: "BensamStores",
      span: "sm",
      accent: "gold",

      tagStrip: ["GSAP", "Vite"],

      about:
        "A fashion-focused storefront experience built around full-screen, scroll-driven product storytelling, with a mobile-first fallback for native touch scrolling.",

      summary:
        "A fashion storefront with a GSAP-powered full-screen scroll sequence, designed to create a campaign-style browsing experience without compromising mobile usability.",

      problem:
        "The client wanted the homepage to feel more like a fashion campaign than a conventional fabric catalogue. The visual reference used full-screen scroll sections, where each scene holds the viewport before transitioning into the next. The challenge was to translate that direction into an experience with controlled pacing, natural scroll behaviour, and seamless handoffs between panels.",

      decision:
        "I built the desktop sequence with GSAP and ScrollTrigger, pinning each full-screen panel and using layered transitions to introduce the next section. On smaller screens, I removed the pinned-scroll interaction entirely and returned to standard document flow. This preserved the content and visual hierarchy without forcing a desktop interaction pattern onto touch devices.",

      challenge:
        "The main implementation issue was interaction handling across layered pinned panels. A panel could be visually covered while remaining present in the DOM, causing it to intercept clicks intended for the section above it. I resolved this by disabling pointer events once a panel was fully covered. I also needed to crop a video with black pillarbox bars baked into the source file, which required frame-by-frame adjustments in FFmpeg rather than a CSS-only fix.",

      wouldChange:
        "I would build and test the mobile fallback alongside the desktop scroll sequence rather than treating it as a later adaptation. Establishing the non-pinned mobile experience early would make the responsive behaviour part of the design system from the beginning.",

      tools: ["Vite", "Tailwind CSS v4", "GSAP", "ScrollTrigger", "FFmpeg"],

      liveUrl: "https://bensamstores.netlify.app/",

      image: "/projects/bensamstores-preview.webp",
    },
    {
      slug: "haumart-cleaning",
      title: "Haumart Cleaning",
      span: "sm",
      accent: "slate",

      tagStrip: ["React", "Motion"],

      about:
        "A service-business website improved with reliable lead delivery, search-indexing fixes, and image-performance optimisation.",

      summary:
        "A cleaning-services website rebuilt to support reliable form delivery, correct search indexing, and faster image loading across mobile and desktop.",

      problem:
        "The site needed to support two core business goals: help potential customers find the company through search and convert visits into enquiries. Although the website was live, it was not appearing in Google results, and its contact form did not reliably send messages. Both issues limited the site’s ability to generate leads.",

      decision:
        "I replaced the non-functional contact flow with a Cloudflare Pages Function, using Resend for email delivery and Cloudflare KV for status tracking. For search visibility, I investigated the site’s technical SEO setup and found invalid JSON syntax in the structured data, which meant Google could not process it. I corrected the markup and submitted the site through Google Search Console.",

      challenge:
        "Image delivery was the most measurable performance issue. Two hero images were being served at more than 700 KB and 3 MB without optimisation. I converted the assets to WebP and added responsive `srcset` variants, increasing the mobile PageSpeed score from 77 to 82 and the desktop score from 97 to 99. This work is largely invisible in the interface, but it directly affects how quickly visitors can access the site.",

      wouldChange:
        "I would set up Google Search Console, sitemap submission, and structured-data validation at the beginning of every client project. These checks should be part of launch preparation rather than something discovered after a site has already been live.",

      tools: [
        "React",
        "Framer Motion",
        "Cloudflare Pages",
        "Cloudflare Pages Functions",
        "Cloudflare KV",
        "Resend",
      ],

      liveUrl: "https://haumartcleaningservices.co.uk/",

      image: "/projects/haumart-preview.webp",
    },
    {
      slug: "aroma-worshippers",
      title: "Aroma Worshippers",
      span: "wide",
      accent: "plum",

      tagStrip: ["React", "Vite"],

      about:
        "A music-ministry website with a dedicated conference-registration route, structured to support both year-round representation and event discovery.",

      summary:
        "A music-ministry website that combines a permanent brand presence with a dedicated, search-ready registration experience for a time-bound conference.",

      problem:
        "The site needed to serve two related but distinct purposes. It had to represent Aroma Worshippers as a music ministry throughout the year, while also directing visitors to register for the Music Ministers’ Conference during a limited event period. Combining both goals in one page risked weakening the main ministry message and making the event journey harder to find.",

      decision:
        "I created a main landing page for the ministry and a separate static registration entry point for the conference. Both routes were structured for search visibility, with metadata and JSON-LD structured data added so the event could be understood as a distinct, indexable page rather than a secondary section of the main site.",

      challenge:
        "The key technical challenge was setting up search visibility at the correct level. I configured Google Search Console for the domain rather than only a subpath, allowing both the main site and event registration page to sit under one verified property. I also iterated on the JSON-LD implementation until the rich-results markup validated correctly.",

      wouldChange:
        "I would include structured-data planning and validation earlier in the workflow. JSON-LD can fail silently when a property, type, or syntax detail is incorrect, so validating it during development is more reliable than leaving it until the site is ready to launch.",

      tools: [
        "React",
        "Vite",
        "Tailwind CSS",
        "JSON-LD",
        "Google Search Console",
      ],

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

      about:
        "A personal e-commerce project built to explore a complete storefront flow, including product discovery, cart management, filtering, and authentication.",

      summary:
        "A full e-commerce frontend exploring shared cart and authentication state, product filtering, and a glassmorphism interface that remains readable across varied imagery.",

      problem:
        "Haven was a personal project created to explore a complete e-commerce flow beyond the smaller storefront experiences often required in client work. The goal was to connect product browsing, filtering, cart behaviour, and authentication within one coherent application rather than treating each feature as an isolated interface.",

      decision:
        "I used Redux Toolkit to manage cart and authentication state. Those features affect multiple areas of the application, including the product catalogue, cart, account-related interactions, and checkout flow, so a central store provided a clearer structure than passing state through several component layers or relying on a lighter Context setup.",

      challenge:
        "The visual challenge was keeping the glassmorphism interface readable over a range of product photography. Translucent surfaces can work well over controlled backgrounds but lose contrast quickly over busy imagery. I adjusted blur, opacity, contrast, and surface treatment by section instead of applying one global glass style across the entire application.",

      wouldChange:
        "I would define the filtering data model earlier in the build. As filtering features expanded, the logic grew organically and required later refactoring. A clearer initial structure for categories, attributes, and filter relationships would have made that feature easier to extend.",

      tools: ["React", "Redux Toolkit", "Framer Motion", "Vite"],

      liveUrl: "https://haven-bay.netlify.app/",

      githubUrl: "https://github.com/ifechiglory/haven",

      image: "/projects/haven-preview.webp",
    },
    {
      slug: "pathfinder",
      title: "Pathfinder",
      span: "sm",
      accent: "sky",

      tagStrip: ["Zustand", "APIs ×4"],

      about:
        "A travel-discovery interface that combines destination, weather, and visual data from four external APIs into one unified browsing experience.",

      summary:
        "A travel-discovery application that combines four external data sources with lightweight shared state, caching, and graceful handling for slow or unavailable APIs.",

      problem:
        "Travel discovery depends on information that is usually spread across separate services: destination details, current conditions, imagery, and related location data. The challenge was to combine four external APIs into one interface that felt cohesive and intentional, rather than presenting visitors with several disconnected data widgets.",

      decision:
        "I used Zustand for lightweight shared interface state, including the selected destination and active filters. TanStack Query handled data fetching, caching, loading states, and request management across the four external services. This separated client-side interface state from server-state concerns and kept the data layer manageable as the number of sources increased.",

      challenge:
        "Each API could respond at a different speed or fail independently, so the interface could not depend on every request succeeding before it became usable. I designed the application to render available content without blocking the whole experience behind the slowest request, while keeping each data area responsible for its own loading and error state.",

      wouldChange:
        "I would define a more consistent fallback system for failed requests from the outset. The current approach handles failure within individual sections, but a shared pattern for empty, loading, and unavailable data states would make the experience more predictable and easier to maintain.",

      tools: ["React", "Zustand", "TanStack Query", "Vite", "External APIs"],

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
    company: "Attueyi Coding Academy",
    period: "Aug 2026 — Present",
    description:
      "Maintaining and improving the academy website and LMS, with a focus on reliable content updates and a clear learner experience.",
  },
  {
    role: "Frontend Tutor",
    company: "Attueyi Coding Academy",
    period: "Jul 2024 — Present",
    description:
      "Teaching frontend fundamentals to beginners and translating complex concepts into practical, project-based lessons.",
  },
  {
    role: "Frontend Developer",
    company: "Gardeners For Africa",
    period: "Sep 2025 — Sep 2026",
    description:
      "Built responsive school-portal dashboards with role-based login experiences.",
  },
  {
    role: "Frontend Tutor",
    company: "West Africa People’s Institute",
    period: "Jul 2023 — Jun 2024",
    description:
      "Mentored early-career developers through their first practical frontend projects.",
  },
  {
    role: "Frontend Developer",
    company: "Daabo Technologies",
    period: "Apr 2023 — Jul 2023",
    description:
      "Started my professional frontend career by building client-facing interfaces.",
  },
];

export type SkillCategoryId = "core" | "style" | "motion" | "tools";
export type SkillNode = {
  name: string;
  level: number;
  category: SkillCategoryId;
  color: string;
  description: string;
  icon: IconType;
};

export const skillNodes: SkillNode[] = [
  {
    name: "React / Next.js",
    level: 92,
    category: "core",
    color: "var(--color-pine)",
    icon: SiReact,
    description:
      "Building fast, accessible component-driven applications with React and Next.js.",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "core",
    color: "var(--color-pine)",
    icon: SiTypescript,
    description:
      "Writing safer, maintainable frontend code with clear types and reusable interfaces.",
  },
  {
    name: "JavaScript (ES6+)",
    level: 95,
    category: "core",
    color: "var(--color-pine)",
    icon: SiJavascript,
    description:
      "Creating interactive interfaces with modern JavaScript, browser APIs, and clean logic.",
  },
  {
    name: "Gatsby",
    level: 76,
    category: "core",
    color: "var(--color-pine)",
    icon: SiGatsby,
    description:
      "Developing performant static websites and content-focused web experiences.",
  },
  {
    name: "Tailwind CSS",
    level: 94,
    category: "style",
    color: "var(--color-accent-sky)",
    icon: SiTailwindcss,
    description:
      "Building responsive, consistent interfaces quickly with utility-first styling.",
  },
  {
    name: "CSS / Design Systems",
    level: 85,
    category: "style",
    color: "var(--color-accent-sky)",
    icon: SiCss,
    description:
      "Creating responsive layouts, reusable patterns, and scalable visual systems.",
  },
  {
    name: "GSAP",
    level: 82,
    category: "motion",
    color: "var(--color-accent-plum)",
    icon: SiGreensock,
    description:
      "Creating polished timeline-based animations and expressive page interactions.",
  },
  {
    name: "Responsive UI",
    level: 90,
    category: "style",
    color: "var(--color-accent-sky)",
    icon: SiCss,
    description:
      "Designing interfaces that feel intentional and usable at every screen size.",
  },
  {
    name: "Motion",
    level: 85,
    category: "motion",
    color: "var(--color-accent-plum)",
    icon: SiFramer,
    description:
      "Adding meaningful micro-interactions, transitions, and React-based animations.",
  },
  {
    name: "Supabase / Firebase",
    level: 78,
    category: "tools",
    color: "var(--color-accent-gold)",
    icon: SiSupabase,
    description:
      "Integrating authentication, databases, and backend services into frontend products.",
  },
  {
    name: "Git / Version Control",
    level: 88,
    category: "tools",
    color: "var(--color-accent-gold)",
    icon: SiGit,
    description:
      "Managing source code, branches, collaboration, and dependable project workflows.",
  },
  {
    name: "Vite",
    level: 84,
    category: "tools",
    color: "var(--color-accent-gold)",
    icon: SiVite,
    description:
      "Using a fast local development environment and efficient modern build tooling.",
  },
];

export const skillCategoryMeta: Record<
  SkillCategoryId,
  { label: string; color: string }
> = {
  core: {
    label: "Core",
    color: "var(--color-accent-slate)",
  },

  style: {
    label: "Styling",
    color: "var(--color-accent-sky)",
  },

  motion: {
    label: "Motion",
    color: "var(--color-accent-plum)",
  },

  tools: {
    label: "Tools",
    color: "var(--color-accent-gold)",
  },
};


/** Relationship pairs (by index into skillNodes) drawn as connecting lines
 *  between nodes, on top of the standard center-to-node spokes. Editorial
 *  choice about which skills genuinely pair together in practice. */

export function hasLiveUrl(url?: string): url is string {
  return Boolean(url && url !== "#");
}