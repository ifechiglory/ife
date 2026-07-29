"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useTimelineProgress(
  containerRef: RefObject<HTMLDivElement | null>,
  progressRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!container || !progress) return;

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });

      const items = container.querySelectorAll("[data-timeline-item]");
      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => item.classList.add("is-active"),
          onLeaveBack: () => item.classList.remove("is-active"),
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, progressRef]);
}
