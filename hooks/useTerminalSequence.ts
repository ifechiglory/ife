"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

export function useTerminalSequence(
  containerRef: RefObject<HTMLDivElement | null>
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const commandNodes = container.querySelectorAll("[data-cmd]");
      const outputNodes = container.querySelectorAll("[data-output]");
      const earlyCarets = container.querySelectorAll(
        '[data-caret="1"], [data-caret="2"], [data-caret="3"]'
      );
      const finalCaret = container.querySelector('[data-caret="4"]');

      if (shouldReduceMotion) {
        gsap.set([...commandNodes, ...outputNodes], {
          opacity: 1,
          x: 0,
        });

        gsap.set(earlyCarets, {
          opacity: 0,
        });

        if (finalCaret) {
          gsap.set(finalCaret, {
            opacity: 1,
          });
        }

        return;
      }

      const commandOne = container.querySelector('[data-cmd="1"]');
      const commandTwo = container.querySelector('[data-cmd="2"]');
      const commandThree = container.querySelector('[data-cmd="3"]');

      const firstOutputs = container.querySelectorAll('[data-output^="1"]');

      const secondOutput = container.querySelector('[data-output="2"]');

      const thirdOutput = container.querySelector('[data-output="3"]');

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timelineRef.current = timeline;

      if (commandOne) {
        timeline.to(
          commandOne,
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
          },
          0
        );
      }

      firstOutputs.forEach((element, index) => {
        timeline.to(
          element,
          {
            opacity: 1,
            duration: 0.28,
          },
          0.5 + index * 0.22
        );
      });

      if (commandTwo) {
        timeline.to(
          commandTwo,
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
          },
          1.65
        );
      }

      if (secondOutput) {
        timeline.to(
          secondOutput,
          {
            opacity: 1,
            duration: 0.3,
          },
          2.1
        );
      }

      if (commandThree) {
        timeline.to(
          commandThree,
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
          },
          2.75
        );
      }

      if (thirdOutput) {
        timeline.to(
          thirdOutput,
          {
            opacity: 1,
            duration: 0.3,
          },
          3.2
        );
      }

      timeline.call(
        () => {
          gsap.set(earlyCarets, {
            opacity: 0,
          });

          if (finalCaret) {
            gsap.set(finalCaret, {
              opacity: 1,
            });

            gsap.to(finalCaret, {
              opacity: 0,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)",
            });
          }
        },
        undefined,
        3.5
      );
    }, container);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [containerRef]);

  return timelineRef;
}
