"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ProjectFrame({
  liveUrl,
  fallbackImage,
  title,
}: {
  liveUrl?: string;
  fallbackImage: string;
  title: string;
}) {
  const [frameFailed, setFrameFailed] = useState(!liveUrl);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!liveUrl) return;
    timeoutRef.current = setTimeout(() => {
      if (!loaded) setFrameFailed(true);
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [liveUrl, loaded]);

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-line bg-[#181C19] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5675F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E6B450]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
          {liveUrl && !frameFailed && (
            <span className="ml-2 truncate font-mono text-[11px] text-on-dark/45">
              {liveUrl.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>

        <div className="relative aspect-4/3 w-full sm:aspect-16/11">
          {!frameFailed && liveUrl ? (
            <iframe
              src={liveUrl}
              title={`${title} — live preview`}
              onLoad={() => setLoaded(true)}
              onError={() => setFrameFailed(true)}
              className="h-full w-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <Image
              src={fallbackImage}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          )}
        </div>
      </div>

      {liveUrl && (
        <p className="mt-3 font-mono text-[11px] text-stone">
          {frameFailed
            ? "Live preview unavailable here — the site link above opens it directly."
            : "Live preview — some interactions may behave differently than the real site."}
        </p>
      )}
    </div>
  );
}
