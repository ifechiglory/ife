"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

/**
 * Drives the hero terminal's typed-command sequence.
 *
 * This stays on GSAP deliberately: it's a precisely-timed, multi-phase
 * timeline (command 1 types in -> four staggered outputs -> command 2
 * types in -> its output -> command 3 types in -> its output -> caret
 * settles into an idle blink) — exactly the kind of sequenced
 * orchestration GSAP's timeline API is built for. Motion's variants/
 * stagger are the right tool for independent component reveals; they're
 * a worse fit for "this exact frame-accurate sequence across unrelated
 * DOM nodes," which is what a terminal session is.
 *
 * All other interactions in this codebase (hover, tilt, magnetic pull,
 * scroll reveals) are Motion. This is the one deliberate exception.
 */
export function useTerminalSequence(containerRef: RefObject<HTMLDivElement | null>) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      timelineRef.current = tl;

      const cmd1 = container.querySelector('[data-cmd="1"]');
      const cmd2 = container.querySelector('[data-cmd="2"]');
      const cmd3 = container.querySelector('[data-cmd="3"]');
      const outputs1 = container.querySelectorAll('[data-output^="1"]');
      const output2 = container.querySelector('[data-output="2"]');
      const output3 = container.querySelector('[data-output="3"]');
      const caret1 = container.querySelector('[data-caret="1"]');
      const caret2 = container.querySelector('[data-caret="2"]');
      const caret3 = container.querySelector('[data-caret="3"]');
      const caret4 = container.querySelector('[data-caret="4"]');

      if (cmd1) tl.to(cmd1, { opacity: 1, x: 0, duration: 0.35 }, 0);

      outputs1.forEach((el, i) => {
        tl.to(el, { opacity: 1, duration: 0.28 }, 0.5 + i * 0.22);
      });

      if (cmd2) tl.to(cmd2, { opacity: 1, x: 0, duration: 0.35 }, 1.65);
      if (output2) tl.to(output2, { opacity: 1, duration: 0.3 }, 2.1);

      if (cmd3) tl.to(cmd3, { opacity: 1, x: 0, duration: 0.35 }, 2.75);
      if (output3) tl.to(output3, { opacity: 1, duration: 0.3 }, 3.2);

      tl.call(() => {
        // idle blink settles on the final caret once the session "finishes"
        [caret1, caret2, caret3].forEach((c) => c && gsap.set(c, { opacity: 0 }));
        if (caret4) {
          gsap.set(caret4, { opacity: 1 });
          gsap.to(caret4, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)",
          });
        }
      }, undefined, 3.5);
    }, container);

    return () => ctx.revert();
  }, [containerRef]);

  return timelineRef;
}
