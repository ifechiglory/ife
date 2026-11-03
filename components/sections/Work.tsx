"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { revealUp, viewportOnce } from "@/lib/motion";

type CardStyle = CSSProperties & {
  "--card-accent"?: string;
};

const spanClasses: Record<Project["span"], string> = {
  lg: "sm:col-span-4 sm:row-span-2",
  md: "sm:col-span-2 sm:row-span-2",
  sm: "sm:col-span-3 sm:row-span-1",
  wide: "sm:col-span-3 sm:row-span-2",
};

const imageSizes: Record<Project["span"], string> = {
  lg: "(min-width: 1280px) 58vw, (min-width: 640px) 66vw, 100vw",
  md: "(min-width: 1280px) 30vw, (min-width: 640px) 33vw, 100vw",
  sm: "(min-width: 1280px) 45vw, (min-width: 640px) 50vw, 100vw",
  wide: "(min-width: 1280px) 45vw, (min-width: 640px) 50vw, 100vw",
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

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const accent = accentVar[project.accent];

  const cardStyle: CardStyle = {
    "--card-accent": accent,
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className={`work-card group relative col-span-1 flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[transform,border-color,box-shadow] duration-450 hover:-translate-y-1 focus-within:-translate-y-1 hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)] ${
        spanClasses[project.span]
      }`}
      style={cardStyle}
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
        className="flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pine"
      >
        <div className="relative overflow-hidden aspect-4/3 bg-surface-raised sm:aspect-auto sm:flex-1">
          {!imageFailed ? (
            <Image
              src={project.image}
              alt={`Screenshot of the ${project.title} website`}
              fill
              sizes={imageSizes[project.span]}
              className="object-cover object-top transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              style={{
                backgroundImage: `linear-gradient(
                  135deg,
                  color-mix(in srgb, ${accent} 18%, var(--color-surface)) 0%,
                  var(--color-surface-raised) 60%,
                  var(--color-bg) 100%
                )`,
              }}
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(10,13,11,0.68)] to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium font-display text-on-dark">
                {project.title}
              </h3>

              <span
                aria-hidden="true"
                className="inline-flex rounded-[7px] border border-on-dark-line bg-black/25 p-1.5 text-on-dark backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>

            <p className="mt-1 font-mono text-[10.5px] text-stone">
              {project.tagStrip.join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-wide text-stone transition-colors group-hover:text-paper group-focus-within:text-paper">
          Read the case study
          <span aria-hidden="true">→</span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 border-t z-2 border-line md:px-20 md:py-36"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
        className="mb-16 flex items-baseline gap-3 md:gap-4.5"
      >
        <span className="font-mono text-sm text-pine">04</span>

        <h2 className="font-display text-[26px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          Some Things I&apos;ve Built
        </h2>

        <span aria-hidden="true" className="flex-1 h-px mt-1 bg-line" />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-65">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="text-center mt-14">
        <a
          href="https://github.com/ifechiglory"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border-b border-paper pb-0.5 font-mono text-sm text-paper outline-none transition-colors hover:border-pine hover:text-pine focus-visible:border-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine/60"
        >
          View more on GitHub
        </a>
      </div>
    </section>
  );
}