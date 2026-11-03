import Image from "next/image";
import { hasLiveUrl } from "@/lib/data";

type ProjectFrameProps = {
  liveUrl?: string;
  fallbackImage: string;
  title: string;
};

export default function ProjectFrame({
  liveUrl,
  fallbackImage,
  title,
}: ProjectFrameProps) {
  const canVisitSite = hasLiveUrl(liveUrl);

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-xl border border-line bg-surface-raised shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-browser-chrome">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-window-close"
          />

          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-window-minimize"
          />

          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-window-maximize"
          />

          {canVisitSite && (
            <span className="ml-2 truncate font-mono text-[11px] text-on-dark/45">
              {liveUrl.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>

        <div className="relative w-full aspect-4/3 sm:aspect-16/11">
          <Image
            src={fallbackImage}
            alt={`Screenshot of the ${title} website`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {canVisitSite && (
        <p className="mt-3 font-mono text-[11px] text-stone">
          Static preview shown above. Open the live site to explore the full
          experience.
        </p>
      )}
    </div>
  );
}
``