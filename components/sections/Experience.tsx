"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { experience, type ExperienceItem } from "@/lib/data";
import { viewportOnce } from "@/lib/motion";

type TimelineItemProps = {
  item: ExperienceItem;
  index: number;
};

function TimelineItem({ item, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);

  const isActive = useInView(itemRef, {
    margin: "-35% 0px -35% 0px",
  });

  return (
    <motion.li
      ref={itemRef}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={viewportOnce}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
      }}
      whileHover={{
        x: 6,
        y: -2,
      }}
      className="relative pl-10 group/item pb-14 last:pb-0"
    >
      <motion.span
        aria-hidden="true"
        animate={{
          backgroundColor: isActive ? "var(--color-pine)" : "var(--color-bg)",
          borderColor: isActive ? "var(--color-pine)" : "var(--color-stone)",
          boxShadow: isActive
            ? "0 0 0 4px rgb(108 99 255 / 0.18)"
            : "0 0 0 0 rgb(108 99 255 / 0)",
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="absolute left-[-4.5px] top-1 h-2.5 w-2.5 rounded-full border-2"
      />

      <h3 className="font-display text-[22px] font-medium text-paper transition-colors duration-300 group-hover/item:text-paper">
        {item.role} <span className="text-pine">@ {item.company}</span>
      </h3>

      <p className="mt-1 font-mono text-[12.5px] text-stone">{item.period}</p>

      <p className="mt-3.5 max-w-140 text-[15px] leading-[1.7] text-ink-soft">
        {item.description}
      </p>
    </motion.li>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.25,
  });

  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative px-6 py-24 border-t z-2 border-line md:px-20 md:py-36"
    >
      <div className="mb-16 flex items-baseline gap-4.5">
        <span className="font-mono text-sm text-pine">03</span>

        <h2 className="whitespace-nowrap font-display text-[30px] font-medium tracking-tight text-paper md:text-[42px]">
          Where I&apos;ve worked
        </h2>

        <span aria-hidden="true" className="flex-1 h-px mt-1 bg-line" />
      </div>

      <div className="flex flex-col items-center justify-between md:flex-row">
        <ol ref={containerRef} className="relative ml-1.5 max-w-190">
          <div
            aria-hidden="true"
            className="absolute inset-y-1.5 left-0 w-px bg-line"
          />

          <motion.div
            aria-hidden="true"
            style={{
              scaleY,
              transformOrigin: "top",
            }}
            className="absolute inset-y-1.5 left-0 w-px bg-linear-to-b from-pine to-brass shadow-[0_0_12px_rgb(108_99_255/0.5)]"
          />

          {experience.map((item, index) => (
            <TimelineItem
              key={`${item.company}-${item.period}`}
              item={item}
              index={index}
            />
          ))}
        </ol>

        <Image
          src="/images/work.svg"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="mt-12 md:mt-0"
        />
      </div>
    </section>
  );
}
