"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { projects, type Project } from "@/lib/data";
import { revealUp, viewportOnce } from "@/lib/motion";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accentVar[project.accent];
  const cardStyle: CardStyle = { "--card-accent": accent };

  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`work-card group relative col-span-1 flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[border-color,box-shadow] duration-450 hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)] ${spanClasses[project.span]}`}
      style={cardStyle}
    >
      <Link href={`/work/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-4/3 overflow-hidden bg-surface-raised sm:aspect-auto sm:flex-1">
          {!imageFailed ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="scale-100 object-cover object-top transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              className="absolute inset-0 scale-100 transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              style={{
                backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${accent} 18%, #14181585) 0%, #14181580 60%, var(--color-bg) 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(10,13,11,0.68)] to-[rgba(10,13,11,0)] bg-position-[0_0] bg-size-[100%_100%]" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-medium text-on-dark">{project.title}</div>
              <span className="inline-flex rounded-[7px] border border-on-dark-line bg-black/25 p-1.5 text-on-dark backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="mt-1 font-mono text-[10.5px] text-stone">
              {project.tagStrip.join(" · ")}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-wide text-stone transition-colors group-hover:text-paper">
          Read the case study
          <span aria-hidden="true">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="projects" className="relative z-2 border-t border-line px-6 py-24 md:px-20 md:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
        className="mb-16 flex items-baseline gap-3 md:gap-4.5"
      >
        <span className="font-mono text-sm text-pine">03</span>
        <h2 className="font-display text-[24px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          Some Things I&apos;ve Built
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-65">
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
