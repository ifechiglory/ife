"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSkillsOrbit } from "@/hooks/useSkillsOrbit";
import { skillCategoryMeta, type SkillCategoryId } from "@/lib/data";

const legendOrder: SkillCategoryId[] = ["core", "style", "motion", "tools"];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltip = useSkillsOrbit(containerRef, svgRef);

  return (
    <section id="skills" className="relative z-[2] border-t border-line px-6 py-24 md:px-20 md:py-36">
      <div className="mb-10 flex items-baseline gap-4.5">
        <span className="font-mono text-sm text-pine">02</span>
        <h2 className="whitespace-nowrap font-display text-[30px] font-medium tracking-tight text-paper md:text-[42px]">
          Skills
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto flex aspect-[900/620] max-h-[640px] w-full max-w-[1400px] items-center justify-center sm:max-h-[560px] sm:aspect-[480/620]"
      >
        <svg ref={svgRef} viewBox="0 0 900 620" className="h-full w-full overflow-visible">
          <g data-connections />
          <g data-nodes />
          <g data-center />
        </svg>

        <AnimatePresence>
          {tooltip.visible && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: -12 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute z-10 max-w-[240px] -translate-x-1/2 rounded-lg border border-line bg-surface-raised px-3.5 py-2.5 text-[12.5px] text-ink-soft shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <span className="mb-0.5 block font-mono text-[11px] text-paper">{tooltip.name}</span>
              <span className="font-mono text-[10px]" style={{ color: tooltip.color }}>
                {tooltip.level}% proficiency · {tooltip.category}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-5">
        {legendOrder.map((id) => (
          <div key={id} className="flex items-center gap-2 font-mono text-[11px] text-stone">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: skillCategoryMeta[id].color }}
            />
            {skillCategoryMeta[id].label}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-[11px] text-stone/70">
        hover a node to see proficiency and highlight its category · related
        skills connect as you explore
      </p>
    </section>
  );
}
