"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { experience } from "@/lib/data";
import { useTimelineProgress } from "@/hooks/useTimelineProgress";
import { viewportOnce } from "@/lib/motion";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useTimelineProgress(containerRef, progressRef);

  return (
    <section id="work" className="relative z-2 border-t border-line px-6 py-24 md:px-20 md:py-36">
      <div className="mb-16 flex items-baseline gap-3 md:gap-4.5">
        <span className="font-mono text-sm text-pine">02</span>
        <h2 className="font-display text-[26px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          Where I&apos;ve Worked
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </div>

      <div ref={containerRef} className="relative ml-1.5 max-w-190">
        <div className="absolute inset-y-1.5 left-0 w-px bg-line" />
        <div
          ref={progressRef}
          className="absolute left-0 top-1.5 h-0 w-px bg-linear-to-b from-pine to-brass shadow-[0_0_12px_rgba(47,122,82,0.5)]"
        />

        {experience.map((item, i) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            data-timeline-item
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            whileHover={{ x: 6 }}
            className="group/item relative pb-16 pl-10 last:pb-0 sm:pb-14 [&.is-active_.timeline-dot]:border-pine [&.is-active_.timeline-dot]:bg-pine [&.is-active_.timeline-dot]:shadow-[0_0_0_4px_rgba(47,122,82,0.15)]"
          >
            <span className="timeline-dot absolute left-[-4.5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-stone bg-bg transition-[border-color,background,box-shadow] duration-400" />

            <div className="font-display text-[19px] font-medium leading-[1.3] text-paper transition-colors duration-300 group-hover/item:text-pine-dim sm:text-[22px]">
              {item.role} <span className="text-pine">@ {item.company}</span>
            </div>
            <div className="mt-1 font-mono text-[12.5px] text-stone">{item.period}</div>
            <p className="mt-3.5 max-w-140 text-[15px] leading-[1.7] text-ink-soft">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
