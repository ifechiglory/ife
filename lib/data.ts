export type ProjectSpan = "lg" | "md" | "sm" | "wide";
export type AccentColor = "clay" | "teal" | "gold" | "slate" | "plum" | "sky" | "pine";

export interface Project {
  slug: string;
  title: string;
  span: ProjectSpan;
  accent: AccentColor;
  tagStrip: string[];
  caseStudy: string;
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
    caseStudy:
      "A broadcast-ready portfolio for a media personality and MC — home, about, a filterable credits log, and a bento-grid services page with video reels of hosting work.",
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
    caseStudy:
      "Multi-page site for an international sports consultancy — five core-competency service pages, a founder bio, and a real milestone timeline.",
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
    caseStudy:
      "Nigerian fabric e-commerce storefront — full catalog, cart, and checkout, with a full-screen pinned scroll sequence on the homepage.",
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
    caseStudy:
      "Homepage and booking flow for a UK cleaning business — service breakdown, testimonials, and a working contact form.",
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
    caseStudy:
      "Landing page for a music ministry, plus a standalone event-registration page for MMC 2026 — fully indexed with structured-data SEO.",
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
    caseStudy:
      "Full e-commerce platform — product catalog, cart, filtering, and authentication, wrapped in a glassmorphism UI.",
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
    tagStrip: ["Zustand", "APIs ×4"],
    caseStudy:
      "Travel discovery platform — destination search, weather, and photography, pulling live data from four external APIs into one interface.",
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
      "Building and maintaining production interfaces, working across the full delivery pipeline from design handoff to deployment.",
  },
  {
    role: "Frontend Tutor",
    company: "Attueyi Coding Academy",
    period: "Jul 2024 — Present",
    description:
      "Teaching frontend fundamentals to beginners, translating complex concepts into practical, project-based lessons.",
  },
  {
    role: "Frontend Tutor",
    company: "West Africa People's Institute",
    period: "Jul 2023 — Jun 2024",
    description: "Mentored early-career developers through their first real frontend builds.",
  },
  {
    role: "Frontend Developer",
    company: "Daabo Technologies",
    period: "Apr 2023 — Jul 2023",
    description: "Started my professional frontend career building client-facing interfaces.",
  },
  {
    role: "Frontend Intern",
    company: "TABI — The Ada Project",
    period: "Sep 2022 — Apr 2023",
    description:
      "Collaborated with fellow interns to build web applications, learning frontend development fundamentals hands-on.",
  },
];