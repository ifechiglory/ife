"use client";

import { useRef } from "react";
import { motion, useMotionTemplate } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useTilt } from "@/hooks/useTilt";
import { useTerminalSequence } from "@/hooks/useTerminalSequence";
import { useTerminalNav } from "@/hooks/useTerminalNav";
import { FlipWords } from "@/components/ui/FlipWords";
import GridBackground from "@/components/ui/GridBackground";

const flipWords = ["build interfaces.", "teach frontend.", "ship real products.", "debug at 2am."];

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null);
  useTerminalSequence(terminalRef);
  const nav = useTerminalNav();
  const inputRef = useRef<HTMLInputElement>(null);

  const primaryBtn = useMagnetic(0.35);
  const tilt = useTilt(14);
  const sheenBackground = useMotionTemplate`radial-gradient(circle 260px at ${tilt.mx} ${tilt.my}, rgba(237,234,226,0.06), transparent 70%)`;

  return (
    <section id="hero" className="relative z-2 grid min-h-screen grid-cols-1 content-center items-center gap-8 px-6 pb-8 pt-28 md:px-20 md:pb-10 md:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:pb-12">
      <GridBackground />
      <div className="max-w-160">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 flex items-center gap-3 font-mono text-[13px] text-pine"
        >
          <span className="h-px w-10 bg-pine" />
          FRONTEND DEVELOPER &amp; TUTOR
        </motion.div>

        <h1 className="font-display text-[34px] font-medium leading-[1.12] tracking-tight text-paper sm:text-[42px] lg:text-[54px]">
          <motion.span
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="inline-block"
          >
            I&nbsp;
          </motion.span>
          <FlipWords words={flipWords} duration={2600} className="text-pine" />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-2 font-display text-[19px] italic text-stone sm:text-[24px]"
        >
          Ifechukwu Max-Oti
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-4 max-w-125 text-[15px] leading-[1.7] text-ink-soft"
        >
          Five years of client sites - cleaning companies, sports consultancies,
          music ministries, e-commerce storefronts. The interesting part is figuring out what a client actually needs versus
          what they asked for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-6 flex flex-wrap items-center gap-6"
        >
          <motion.div
            ref={primaryBtn.ref}
            style={{ x: primaryBtn.x, y: primaryBtn.y }}
            onMouseMove={primaryBtn.onMouseMove}
            onMouseLeave={primaryBtn.onMouseLeave}
            className="inline-block"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2.5 rounded-[3px] border border-paper bg-paper px-6 py-3.25 font-mono text-sm text-bg transition-[color,border-color,box-shadow] duration-300 hover:border-pine hover:text-bg hover:shadow-[0_8px_24px_rgba(47,122,82,0.35)]"
            >
              <span className="absolute inset-0 -z-10 rounded-[3px] bg-pine opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              See the work
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <a
            href="#contact"
            className="border-b border-paper pb-0.5 font-mono text-sm text-paper transition-colors hover:border-pine hover:text-pine"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {["React", "TypeScript", "Tailwind CSS", "GSAP", "Motion"].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="rounded-full border border-line bg-paper/4 px-3 py-1.5 font-mono text-xs text-stone"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative lg:-translate-y-5"
        style={{ perspective: 1200 }}
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
            className="group relative overflow-hidden rounded-[10px] bg-[#181C19] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),0_0_60px_-20px_rgba(47,122,82,0.15)]"
          >
            {/* cursor sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: sheenBackground }}
            />

            <div className="flex items-center gap-2 border-b border-white/6 bg-[#232427] px-4.5 py-3.5">
              <span className="h-2.75 w-2.75 rounded-full bg-[#E5675F]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#E6B450]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#61C454]" />
              <span className="ml-2.5 font-mono text-xs text-on-dark/45">
                ife@portfolio ~ zsh
              </span>
            </div>

            <div
              onClick={() => {
                if (window.innerWidth < 768) return;
                if (!nav.active) nav.activate();
                inputRef.current?.focus();
              }}
              className={`px-6 py-6.5 pb-7.5 font-mono text-[13.5px] leading-[1.9] md:cursor-text ${
                nav.active ? "md:hidden" : ""
              }`}
            >
              <div data-cmd="1" className="flex -translate-x-1.5 opacity-0">
                <span className="mr-2.5 select-none text-pine">➜</span>
                <span className="whitespace-pre text-on-dark/90">
                  skills <span className="text-brass">--list</span>
                  <span data-caret="1" className="ml-px inline-block h-3.75 w-1.75 bg-brass align-text-bottom" />
                </span>
              </div>
              <div data-output="1a" className="pl-5.5 text-on-dark/50 opacity-0">
                core&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E6B450]">React · TypeScript · Next.js</span>
              </div>
              <div data-output="1b" className="pl-5.5 text-on-dark/50 opacity-0">
                style&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#E6B450]">Tailwind CSS · Framer Motion</span>
              </div>
              <div data-output="1c" className="pl-5.5 text-on-dark/50 opacity-0">
                motion&nbsp;&nbsp;<span className="text-[#E6B450]">GSAP · Motion</span>
              </div>
              <div data-output="1d" className="pl-5.5 text-on-dark/50 opacity-0">
                backend&nbsp;<span className="text-[#E6B450]">Node.js · Supabase · Firebase</span>
              </div>

              <div data-cmd="2" className="mt-0 flex -translate-x-1.5 opacity-0">
                <span className="mr-2.5 select-none text-pine">➜</span>
                <span className="whitespace-pre text-on-dark/90">
                  skills <span className="text-brass">--rank</span> dev
                  <span data-caret="2" className="ml-px inline-block h-3.75 w-1.75 bg-brass align-text-bottom" />
                </span>
              </div>
              <div data-output="2" className="pl-5.5 text-[#7FB88F] opacity-0">
                <span>✓ 5+ years, frontend development</span>
              </div>

              <div data-cmd="3" className="mt-0 flex -translate-x-1.5 opacity-0">
                <span className="mr-2.5 select-none text-pine">➜</span>
                <span className="whitespace-pre text-on-dark/90">
                  skills <span className="text-brass">--rank</span> teaching
                  <span data-caret="3" className="ml-px inline-block h-3.75 w-1.75 bg-brass align-text-bottom" />
                </span>
              </div>
              <div data-output="3" className="pl-5.5 text-[#7FB88F] opacity-0">
                <span>✓ 2+ years, 2 institutions</span>
                <span data-caret="4" className="ml-px inline-block h-3.75 w-1.75 bg-brass align-text-bottom opacity-0" />
              </div>
            </div>

            {/* Interactive command prompt — desktop only. Hidden until clicked,
                so the scripted intro plays uninterrupted for anyone who doesn't
                engage with it. */}
            <div
              className={`hidden px-6 py-6.5 pb-7.5 font-mono text-[13.5px] leading-[1.9] ${
                nav.active ? "md:block" : "md:hidden"
              }`}
            >
              {nav.log.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "command"
                      ? "flex text-on-dark/90"
                      : line.type === "error"
                        ? "pl-5.5 text-[#E5675F]/80"
                        : "pl-5.5 text-[#7FB88F]"
                  }
                >
                  {line.type === "command" ? (
                    <>
                      <span className="mr-2.5 select-none text-pine">➜</span>
                      <span className="whitespace-pre">{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                </div>
              ))}

              <form onSubmit={nav.handleSubmit} className="flex items-center">
                <span className="mr-2.5 select-none text-pine">➜</span>
                <input
                  ref={inputRef}
                  value={nav.value}
                  onChange={(e) => nav.setValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input — try 'help'"
                  placeholder={nav.log.length === 0 ? "try: cd projects, or help" : ""}
                  className="flex-1 bg-transparent font-mono text-[13.5px] text-on-dark/90 placeholder:text-on-dark/25 focus:outline-none"
                />
              </form>
            </div>

            <div className="flex justify-between border-t border-white/6 bg-[#232427] px-4.5 py-3 font-mono text-2.75 text-on-dark/35">
              <span>zsh · 5 years uptime</span>
              <span className="flex items-center gap-1.5 text-[#7FB88F]">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#7FB88F]" />
                open to work
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -right-4.5 -bottom-6 hidden max-w-55 rounded-lg border border-brass/25 bg-surface-raised p-[14px_16px] font-body text-[12.5px] leading-normal text-ink-soft shadow-[0_20px_45px_-10px_rgba(0,0,0,0.55)] lg:block"
          >
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-wide text-brass">
              Currently
            </span>
            Frontend Developer @ Gardeners For Africa, mentoring devs at
            Attueyi Coding Academy
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
