"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useState, type MouseEvent } from "react";
import { slideFromLeft, slideFromRight, viewportOnce } from "@/lib/motion";

const chatSequence = [
  { delay: 0.1, type: "student" as const, text: "honestly HTML still looks like a foreign language to me 😩" },
  { delay: 0.6, type: "typing" as const },
  { delay: 1.75, type: "mentor" as const, text: "it's just labeled boxes. let's build one button together and I'll show you." },
  { delay: 2.2, type: "student" as const, text: "wait... that actually made sense" },
];

function TypingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
          className="h-1.25 w-1.25 rounded-full bg-pine"
        />
      ))}
    </div>
  );
}

export default function Teaching() {
  const mx = useMotionValue("50%");
  const my = useMotionValue("30%");
  const glowBg = useMotionTemplate`radial-gradient(circle 260px at ${mx} ${my}, color-mix(in srgb, var(--color-brass) 8%, transparent), transparent 70%)`;

  const [started, setStarted] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(`${((e.clientX - rect.left) / rect.width) * 100}%`);
    my.set(`${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section id="teaching" className="relative z-2 border-t border-line px-6 py-24 md:px-20 md:py-36">
      <div className="mb-16 flex items-baseline gap-3 md:gap-4.5">
        <span className="font-mono text-sm text-pine">04</span>
        <h2 className="font-display text-[26px] font-medium tracking-tight text-paper md:whitespace-nowrap md:text-[42px]">
          Teaching
        </h2>
        <span className="mt-1 h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideFromLeft}
          onViewportEnter={() => setStarted(true)}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-xl border border-line bg-surface p-8 transition-[border-color,box-shadow] duration-400 hover:border-brass/25 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]"
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glowBg }} />

          <span className="relative mb-4.5 block font-mono text-[11px] uppercase tracking-wide text-brass">
            Real conversation, paraphrased
          </span>

          <div className="relative flex flex-col gap-4">
            {chatSequence.map((msg, i) => {
              if (!started) return null;

              if (msg.type === "typing") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: "auto", marginBottom: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      // height/marginBottom collapse in step with the final
                      // opacity fade (the last keyframe, at times[3]) so the
                      // indicator actually leaves flex-column flow once it's
                      // done — without this it stays invisible but still
                      // reserves its full height + the gap-4 around it
                      // forever, which is what left a persistent empty gap
                      // between the first message and the mentor reply.
                      height: ["auto", "auto", "auto", 0],
                      marginBottom: [0, 0, 0, -16],
                    }}
                    transition={{
                      duration: 1.15,
                      delay: msg.delay,
                      times: [0, 0.15, 0.85, 1],
                      ease: "easeInOut",
                    }}
                    style={{ overflow: "hidden" }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-pine-dim font-mono text-[10px] text-on-dark">
                      Ife
                    </div>
                    <div className="flex gap-1 rounded-lg border border-pine/20 bg-pine/10 px-3.5 py-3">
                      <TypingDots />
                    </div>
                  </motion.div>
                );
              }

              const isMentor = msg.type === "mentor";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: msg.delay, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ x: isMentor ? 0 : 3 }}
                  className="flex items-start gap-2.5"
                >
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${
                      isMentor ? "bg-pine-dim text-on-dark" : "bg-surface-raised text-stone"
                    }`}
                  >
                    {isMentor ? "Ife" : "S"}
                  </motion.div>
                  <div
                    className={`max-w-[320px] rounded-lg px-3.5 py-2.5 text-[13px] leading-normal ${
                      isMentor
                        ? "border border-pine/20 bg-pine/10 text-paper"
                        : "bg-surface-raised text-ink-soft"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideFromRight}>
          <h3 className="mb-5 font-display text-[26px] font-medium leading-tight text-paper sm:text-[34px]">
            I explain the <em className="italic text-pine">why</em>, not
            just the <em className="italic text-pine">how</em>.
          </h3>
          <p className="mb-6 max-w-120 text-[15.5px] leading-[1.75] text-ink-soft">
            Since 2023 I&apos;ve mentored beginner developers at West Africa
            People&apos;s Institute and, currently, Attueyi Coding Academy -
            breaking down complex frontend concepts into practical,
            project-based lessons that actually stick.
          </p>
          <p className="mb-6 max-w-120 text-[15.5px] leading-[1.75] text-ink-soft">
            Teaching sharpens the way I build. Explaining a concept clearly
            to someone new means I understand it more deeply myself — which
            shows up in cleaner components and more maintainable code.
          </p>

          <div className="flex gap-10">
            <div>
              <div className="font-display text-[30px] text-paper">
                <span className="text-brass">2</span>+
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase text-stone">Years teaching</div>
            </div>
            <div>
              <div className="font-display text-[30px] text-paper">
                <span className="text-brass">2</span>
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase text-stone">Institutions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
