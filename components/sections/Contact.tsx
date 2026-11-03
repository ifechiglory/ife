"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { viewportOnce } from "@/lib/motion";

export default function Contact() {
  const magnetic = useMagnetic(0.3);

  return (
    <section
      id="contact"
      className="relative px-6 py-24 text-center border-t z-2 border-line md:px-20 md:py-36"
    >
      <motion.div
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
        }}
      >
        <p className="mb-5 font-mono text-sm text-pine">
          06. What&apos;s next?
        </p>

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
          <Image
            src="/images/email.svg"
            alt=""
            aria-hidden="true"
            width={200}
            height={200}
          />

          <div>
            <h2 className="mb-5 font-display text-[34px] font-medium text-paper sm:text-[58px]">
              Get in touch
            </h2>

            <p className="mx-auto mb-8 max-w-120 text-base leading-[1.7] text-ink-soft">
              I&apos;m currently open to new opportunities—whether that&apos;s
              a frontend role, a client project, or a conversation about the
              web.
            </p>

            <a
              href="mailto:ifechiglory@gmail.com"
              className="font-mono text-xs underline transition-colors outline-none text-stone decoration-stone/50 underline-offset-4 hover:text-paper focus-visible:text-paper focus-visible:ring-2 focus-visible:ring-pine"
            >
              ifechiglory@gmail.com
            </a>
          </div>

          <motion.div
            ref={magnetic.ref}
            style={{
              x: magnetic.x,
              y: magnetic.y,
            }}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            className="inline-block"
          >
            <a
              href="mailto:ifechiglory@gmail.com?subject=Portfolio%20enquiry"
              className="inline-block rounded border border-paper bg-paper px-8.5 py-4.5 font-mono text-[15px] text-bg outline-none transition-colors hover:border-pine hover:bg-pine focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Say hello
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}