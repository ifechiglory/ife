"use client";

import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { viewportOnce } from "@/lib/motion";

export default function Contact() {
  const magnetic = useMagnetic(0.3);

  return (
    <section id="contact" className="relative z-[2] border-t border-line px-6 py-24 pb-24 text-center md:px-20 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-5 font-mono text-sm text-pine">05. What&apos;s Next?</div>
        <h2 className="mb-5 font-display text-[34px] font-medium text-paper sm:text-[58px]">
          Get In Touch
        </h2>
        <p className="mx-auto mb-11 max-w-[480px] text-base leading-[1.7] text-ink-soft">
          I&apos;m currently open to new opportunities — whether that&apos;s
          a frontend role, a client project, or just a conversation about
          the web. My inbox is always open.
        </p>

        <motion.div
          ref={magnetic.ref}
          style={{ x: magnetic.x, y: magnetic.y }}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          className="inline-block"
        >
          <a
            href="mailto:ifechiglory@gmail.com?subject=Hello%20from%20your%20portfolio!&body=Hi%20there%2C%20I%20just%20saw%20your%20portfolio%20and%20wanted%20to%20reach%20out..."
            className="inline-block rounded border border-paper bg-paper px-[34px] py-[18px] font-mono text-[15px] text-bg"
          >
            Say Hello
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
