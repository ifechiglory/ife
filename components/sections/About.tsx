"use client";

import { motion } from "motion/react";
import { revealUp, slideFromLeft, slideFromRight, viewportOnce } from "@/lib/motion";

const stackItems = [
  "JavaScript (ES6+)",
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP / Motion",
  "Node.js",
  "Supabase / Firebase",
  "GraphQL",
];

export default function About() {
  return (
    <section id="about" className="relative z-2 border-t border-line px-6 py-24 md:px-20 md:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
        className="mb-16 flex items-baseline gap-3 md:gap-4.5"
      >
        <span className="font-mono text-sm text-pine">01</span>
        <h2 className="font-display text-[26px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          About Me
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-18">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromLeft}
        >
          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            I didn&apos;t get into frontend because I wanted to use the
            latest framework or chase every new trend. I got into it
            because I enjoy taking ideas — sometimes messy ones — and
            turning them into websites that are simple, intuitive, and
            useful.
          </p>
          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            Somewhere along the way, I discovered that I enjoy{" "}
            <strong className="font-medium text-paper">teaching</strong>{" "}
            almost as much as I enjoy building. As a frontend tutor,
            I&apos;ve had the opportunity to help beginners write their
            first HTML tags, understand JavaScript, and build projects
            they never thought they could. Watching someone go from
            &quot;I don&apos;t get this&quot; to &quot;I built this&quot;
            is still one of the most rewarding parts of what I do.
          </p>
          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            When I&apos;m working on a project, I try to keep things simple.
            Fancy animations and trendy libraries are great when they serve
            a purpose, but I believe good{" "}
            <strong className="font-medium text-paper">frontend development</strong>{" "}
            starts with solving real problems for real people.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromRight}
          className="flex flex-col gap-9 border-l border-line pl-9 md:flex-row md:flex-wrap md:border-l-0 md:border-t md:pl-0 md:pt-7 lg:flex-col lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0"
        >
          <div className="grid grid-cols-2 gap-x-7 gap-y-2.5 lg:grid-cols-1">
            {stackItems.map((item) => (
              <motion.span
                key={item}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center gap-2.5 font-mono text-[13px] text-stone before:content-['▹'] before:text-pine"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
