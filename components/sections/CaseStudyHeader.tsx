import GridBackground from "@/components/ui/GridBackground";
import Link from "next/link";

export default function CaseStudyHeader({
  title,
  tags,
  liveUrl,
  githubUrl,
}: {
  title: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}) {
  return (
    <div className="relative border-b bg-paper border-line px-6 pb-10 pt-18 md:px-20 md:pb-14 ">
      <GridBackground maskPosition="20% 0%" />

      <Link
        href="/#projects"
        className="relative mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-stone transition-colors hover:text-pine"
      >
        ← Back to work
      </Link>

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-pine">
            {tags.join(" · ")}
          </div>
          <h1 className="font-display text-[32px] font-medium tracking-tight text-bg md:text-[46px]">
           Case Study: {title}
          </h1>
        </div>

        <div className="flex gap-2.5">
          {liveUrl && liveUrl !== "#" && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm bg-bg px-4 py-2.5 font-mono text-[12px] text-paper transition-colors"
            >
              Visit site ↗
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-line px-4 py-2.5 font-mono text-[12px] text-paper transition-colors hover:text-pine"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
