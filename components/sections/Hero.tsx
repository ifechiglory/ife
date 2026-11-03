"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useTilt } from "@/hooks/useTilt";
import { useTerminalSequence } from "@/hooks/useTerminalSequence";
import { motionEase } from "@/lib/motion";

const headlineWords = ["Frontend", "Developer", "and", "Tutor"];

const technologies = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Next.js",
  "Motion",
];

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useTerminalSequence(terminalRef);

  const primaryButton = useMagnetic(0.35);
  const tilt = useTilt(14);

  return (
    <section
      id="hero"
      className="relative z-2 grid min-h-[calc(100vh-88px)] grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 md:px-20 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="max-w-160">
        <h1 className="font-display text-[42px] font-medium leading-[1.05] tracking-tight text-paper sm:text-[56px] lg:text-[74px]">
          {headlineWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{
                opacity: 0,
                y: 10,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.6,
                ease: motionEase,
                delay: 0.35 + index * 0.045,
              }}
              className="inline-block"
            >
              {word}
              {index < headlineWords.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.75,
          }}
          className="mt-2 font-display text-[20px] italic text-stone sm:text-[28px]"
        >
          Ifechukwu Max-Oti
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.85,
          }}
          className="mt-6 max-w-120 text-[17px] leading-[1.65] text-ink-soft"
        >
          Four years building client websites—from music ministries to sports
          consultancies—and just as long helping beginners get from
          &quot;HTML looks scary&quot; to confidently shipping their own
          projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1,
          }}
          className="flex flex-wrap items-center gap-6 mt-10"
        >
          <motion.div
            ref={primaryButton.ref}
            style={{
              x: primaryButton.x,
              y: primaryButton.y,
            }}
            onMouseMove={primaryButton.onMouseMove}
            onMouseLeave={primaryButton.onMouseLeave}
            className="inline-block"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 rounded-[3px] border border-paper bg-paper px-6.5 py-3.75 font-mono text-sm text-bg outline-none transition-[color,border-color,box-shadow] duration-300 hover:border-pine hover:shadow-[0_8px_24px_rgb(108_99_255/0.35)] focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-[3px] bg-pine opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              See the work

              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          <a
            href="#contact"
            className="rounded-sm border-b border-paper pb-0.5 font-mono text-sm text-paper outline-none transition-colors hover:border-pine hover:text-pine focus-visible:border-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine/60"
          >
            Get in touch
          </a>
        </motion.div>

        <ul
          aria-label="Core technologies"
          className="mt-14 flex flex-wrap gap-2.5"
        >
          {technologies.map((technology) => (
            <li key={technology}>
              <motion.span
                whileHover={{ x: 4 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="inline-block rounded-full border border-line bg-paper/4 px-3 py-1.5 font-mono text-xs text-stone"
              >
                {technology}
              </motion.span>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.5,
        }}
        className="relative"
        style={{
          perspective: 1200,
        }}
      >
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={terminalRef}
            className="group relative overflow-hidden rounded-[10px]"
          >
            <Image
              src="/images/hero-image.svg"
              alt=""
              aria-hidden="true"
              width={500}
              height={500}
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}