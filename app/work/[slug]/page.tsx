import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectFrame from './ProjectFrame'
import CaseStudyHeader from "@/components/sections/CaseStudyHeader";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.problem,
  };
}

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const fields = [
    { label: "The problem", value: project.problem },
    { label: "What I decided", value: project.decision },
    { label: "What was hard", value: project.challenge },
    { label: "What I'd change", value: project.wouldChange },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <CaseStudyHeader
        title={project.title}
        tags={project.tagStrip}
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
      />

      <div className="px-6 py-14 md:px-20 md:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-10">
            {fields.map((field) => (
              <div key={field.label}>
                <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-wide text-pine">
                  {field.label}
                </span>
                <p className="max-w-135 text-[16px] leading-[1.8] text-ink-soft">
                  {field.value}
                </p>
              </div>
            ))}

            <div>
              <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-wide text-pine">
                Built with
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-stone"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ProjectFrame
            liveUrl={project.liveUrl}
            fallbackImage={project.image}
            title={project.title}
          />
        </div>

        <div className="mt-24 border-t border-line pt-10">
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-wide text-stone">
            Next up
          </span>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <span className="font-display text-2xl font-medium text-paper transition-colors group-hover:text-pine md:text-3xl">
              {nextProject.title}
            </span>
            <span
              className="font-mono text-lg text-stone transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-pine"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
