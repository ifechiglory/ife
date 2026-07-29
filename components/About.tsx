"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { slideFromLeft, slideFromRight, viewportOnce } from "@/lib/motion";

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

const stats = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 5, suffix: "", label: "Companies" },
  { value: 17, suffix: "+", label: "Technologies" },
];

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <motion.div ref={ref} whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
      <div className="font-display text-[44px] font-medium leading-none text-paper">
        <span className="text-pine">{display}</span>
        {suffix}
      </div>
      <div className="mt-1.5 font-mono text-xs uppercase tracking-wide text-stone">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-[2] border-t border-line px-6 py-24 md:px-20 md:py-36">
      <div className="mb-16 flex items-baseline gap-3 md:gap-4.5">
        <span className="font-mono text-sm text-pine">01</span>
        <h2 className="font-display text-[26px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          About Me
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-18">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromLeft}
        >
          <p className="mb-5 max-w-[620px] text-[16.5px] leading-[1.8] text-ink-soft">
            Hello! I&apos;m Ife, a frontend developer who loves turning ideas
            into clean, usable interfaces that actually make sense to
            humans. My journey into web development started with curiosity
            — and a lot of breaking things in the browser, which taught me
            more than any tutorial could.
          </p>
          <p className="mb-5 max-w-[620px] text-[16.5px] leading-[1.8] text-ink-soft">
            Today I work primarily as a{" "}
            <strong className="font-medium text-paper">frontend developer</strong>,
            building responsive, user-focused web applications with React,
            Next.js, and Tailwind. I&apos;ve shipped everything from music
            ministry landing pages to full e-commerce storefronts with cart
            flows, authentication, and real deployment constraints.
          </p>
          <p className="mb-5 max-w-[620px] text-[16.5px] leading-[1.8] text-ink-soft">
            Beyond building, I also{" "}
            <strong className="font-medium text-paper">teach frontend development</strong>{" "}
            — breaking complex concepts into practical, beginner-friendly
            lessons. Helping students go from &quot;HTML looks scary&quot;
            to confidently shipping projects is one of the most rewarding
            parts of what I do.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-x-7 gap-y-2.5">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromRight}
          className="flex flex-col gap-9 border-l border-line pl-9 md:flex-row md:flex-wrap md:border-l-0 md:border-t md:pl-0 md:pt-7 lg:flex-col lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0"
        >
          {stats.map((stat) => (
            <CountUpStat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
