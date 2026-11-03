import Link from "next/link";
import { hasLiveUrl } from "@/lib/data";

type CaseStudyHeaderProps = {
  title: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export default function CaseStudyHeader({
  title,
  tags,
  liveUrl,
  githubUrl,
}: CaseStudyHeaderProps) {
  return (
    <header className="relative px-6 pb-10 overflow-hidden border-b border-line bg-paper/95 pt-18 md:px-20 md:pb-14">
      <Link
        href="/#projects"
        className="relative mb-8 inline-flex items-center gap-2 rounded-sm font-mono text-[13px] text-stone outline-none transition-colors hover:text-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine/60"
      >
        <span aria-hidden="true">←</span>
        Back to work
      </Link>

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-pine">
            Case study · {tags.join(" · ")}
          </p>

          <h1 className="font-display text-[32px] font-medium tracking-tight text-bg md:text-[46px]">
            {title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {hasLiveUrl(liveUrl) && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm bg-bg px-4 py-2.5 font-mono text-[12px] text-paper outline-none transition-colors hover:bg-pine focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Visit site
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-pine-dim px-4 py-2.5 font-mono text-[12px] text-paper outline-none transition-colors hover:bg-pine hover:text-bg focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              View code
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
