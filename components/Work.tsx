"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { projects, type Project } from "@/lib/data";
import { iconHover, viewportOnce } from "@/lib/motion";

/** CSSProperties doesn't type custom properties by default — this extends
 *  it for the one CSS variable we set inline per card. */
type CardStyle = CSSProperties & { "--card-accent"?: string };

const spanClasses: Record<Project["span"], string> = {
  lg: "sm:col-span-4 sm:row-span-2",
  md: "sm:col-span-2 sm:row-span-2",
  sm: "sm:col-span-3 sm:row-span-1",
  wide: "sm:col-span-3 sm:row-span-2",
};

const accentVar: Record<Project["accent"], string> = {
  clay: "var(--color-accent-clay)",
  teal: "var(--color-accent-teal)",
  gold: "var(--color-accent-gold)",
  slate: "var(--color-accent-slate)",
  plum: "var(--color-accent-plum)",
  sky: "var(--color-accent-sky)",
  pine: "var(--color-pine)",
};

/** `liveUrl` is sometimes still a "#" placeholder for projects not deployed
 *  yet (see lib/data.ts) — "#" is a truthy string, so a plain `project.liveUrl &&`
 *  check was rendering a dead link that goes nowhere. This treats "#" as
 *  "no live URL yet," same as undefined/empty. */
function hasLiveUrl(url: string | undefined): url is string {
  return Boolean(url) && url !== "#";
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accentVar[project.accent];
  const cardStyle: CardStyle = { "--card-accent": accent };

  // Screenshots are generated via `npm run shots` (scripts/screenshots) and
  // land in public/projects/<name>.png — but that's a manual/periodic step,
  // not guaranteed to have run for every project yet. Rather than checking
  // the filesystem (not possible from a client component) or hardcoding a
  // list of "which projects have real images," we just try to render the
  // real image and fall back to the gradient placeholder if it 404s.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`work-card group relative col-span-1 flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[border-color,box-shadow] duration-[450ms] hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)] ${spanClasses[project.span]}`}
      style={cardStyle}
    >

      <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised sm:aspect-auto sm:flex-1">
        {!imageFailed ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="scale-100 object-cover object-top transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0 scale-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
            style={{
              backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${accent} 18%, #14181585) 0%, #14181580 60%, var(--color-bg) 100%)`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(10,13,11,0.68)] to-[rgba(10,13,11,0)] [background-position:0_0] [background-size:100%_100%]" />

        {/* persistent title strip */}
        <div className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-medium text-on-dark">{project.title}</div>
            <div className="flex gap-2">
              {hasLiveUrl(project.liveUrl) && (
                <motion.a
                  {...iconHover}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live site"
                  className="live-link inline-flex rounded-[7px] border border-on-dark-line bg-black/25 p-1.5 text-on-dark backdrop-blur-md transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.a>
              )}
            </div>
          </div>
          <div className="mt-1 font-mono text-[10.5px] text-stone">
            {project.tagStrip.join(" · ")}
          </div>
        </div>
      </div>

      {/* case study — full overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-center bg-[rgba(10,13,11,0.78)] p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-[350ms] group-hover:pointer-events-auto group-hover:opacity-100">
        <span data-case-label className="mb-2.5 block font-mono text-[10px] uppercase tracking-wide">
          What it does
        </span>
        <div className="mb-2.5 font-display text-lg text-on-dark">{project.title}</div>
        <p className="mb-3.5 text-[13px] leading-[1.65] text-on-dark-soft">{project.caseStudy}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-on-dark-line bg-black/20 px-2.5 py-[3px] font-mono text-[10px] text-on-dark backdrop-blur-sm"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex gap-2.5">
          {hasLiveUrl(project.liveUrl) && (
            <a
              data-case-cta
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[4px] bg-paper px-3.5 py-2 font-mono text-[11px] text-bg transition-colors"
            >
              Visit site ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-on-dark-line px-3.5 py-2 font-mono text-[11px] text-on-dark transition-colors hover:text-pine"
            >
              <Github className="h-3 w-3" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-[2] border-t border-line px-6 py-24 md:px-20 md:py-36">
      <div className="mb-16 flex items-baseline gap-3 md:gap-4.5">
        <span className="font-mono text-sm text-pine">03</span>
        <h2 className="font-display text-[24px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          Some Things I&apos;ve Built
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[260px]">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="https://github.com/ifechiglory"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-paper pb-0.5 font-mono text-sm text-paper transition-colors hover:border-pine hover:text-pine"
        >
          View more on GitHub
        </a>
      </div>
    </section>
  );
}
