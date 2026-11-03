import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectFrame from "./ProjectFrame";
import CaseStudyHeader from "@/components/sections/CaseStudyHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject =
    projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;

  const fields = [
    {
      label: "The challenge",
      value: project.problem,
    },
    {
      label: "The approach",
      value: project.decision,
    },
    {
      label: "Implementation challenge",
      value: project.challenge,
    },
    {
      label: "What I’d improve",
      value: project.wouldChange,
    },
  ];

  return (
    <main className="min-h-screen">
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
              <section key={field.label}>
                <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-wide text-pine">
                  {field.label}
                </h2>

                <p className="max-w-135 text-[16px] leading-[1.8] text-ink-soft">
                  {field.value}
                </p>
              </section>
            ))}

            <section>
              <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-wide text-pine">
                Built with
              </h2>

              <ul className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-stone"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <ProjectFrame
            liveUrl={project.liveUrl}
            fallbackImage={project.image}
            title={project.title}
          />
        </div>

        {nextProject && (
          <nav
            aria-label="Next case study"
            className="pt-10 mt-24 border-t border-line"
          >
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-wide text-stone">
              Next case study
            </span>

            <Link
              href={`/work/${nextProject.slug}`}
              className="flex items-center justify-between gap-4 rounded-sm outline-none group focus-visible:ring-2 focus-visible:ring-pine"
            >
              <span className="text-2xl font-medium transition-colors font-display text-paper group-hover:text-pine group-focus-visible:text-pine md:text-3xl">
                {nextProject.title}
              </span>

              <span
                aria-hidden="true"
                className="font-mono text-lg text-stone transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-pine group-focus-visible:translate-x-1.5 group-focus-visible:text-pine"
              >
                →
              </span>
            </Link>
          </nav>
        )}
      </div>
    </main>
  );
}
