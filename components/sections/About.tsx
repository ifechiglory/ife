"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { slideFromLeft, slideFromRight, viewportOnce } from "@/lib/motion";

const stackItems = [
  "JavaScript (ES6+)",
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP / Motion",
  "Supabase / Firebase",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 border-t z-2 border-line md:px-20 md:py-36"
    >
      <div className="mb-16 flex items-baseline gap-4.5">
        <span className="font-mono text-sm text-pine">01</span>

        <h2 className="whitespace-nowrap font-display text-[30px] font-medium tracking-tight text-paper md:text-[42px]">
          About me
        </h2>

        <span aria-hidden="true" className="flex-1 h-px mt-1 bg-line" />
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-18">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromLeft}
        >
          <Image
            src="/images/about-me.svg"
            alt=""
            aria-hidden="true"
            width={500}
            height={500}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromRight}
        >
          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            Hello, I&apos;m Ife—a frontend developer who turns ideas into clear,
            usable interfaces. I started learning web development by taking
            websites apart: understanding how they worked and what shaped each
            interaction.
          </p>

          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            Today, I work primarily as a{" "}
            <strong className="font-medium text-paper">
              frontend developer
            </strong>
            , building responsive, user-focused web applications with React,
            Next.js, and Tailwind CSS. My work ranges from landing pages to full
            e-commerce experiences with cart flows, authentication, and real
            deployment constraints.
          </p>

          <p className="mb-5 max-w-155 text-[16.5px] leading-[1.8] text-ink-soft">
            Beyond building, I also{" "}
            <strong className="font-medium text-paper">
              teach frontend development
            </strong>
            , helping curious developers move from “How does this work?” to
            confidently building projects of their own.
          </p>

          <ul className="mt-9 grid grid-cols-2 gap-x-7 gap-y-2.5">
            {stackItems.map((item) => (
              <li key={item}>
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="flex items-center gap-2.5 font-mono text-[13px] text-stone before:content-['▹'] before:text-pine"
                >
                  {item}
                </motion.span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
