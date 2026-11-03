"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

interface UseLoaderSequenceOptions {
  onComplete: () => void;
}

export function useLoaderSequence(
  containerRef: RefObject<HTMLDivElement | null>,
  wrapRef: RefObject<HTMLDivElement | null>,
  logoRef: RefObject<HTMLDivElement | null>,
  { onComplete }: UseLoaderSequenceOptions
) {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    const wrap = wrapRef.current;
    const logo = logoRef.current;

    if (!container || !wrap || !logo) {
      onCompleteRef.current();
      return;
    }

    let completed = false;

    const complete = () => {
      if (completed) return;

      completed = true;
      onCompleteRef.current();
    };

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (shouldReduceMotion) {
      gsap.set(container, { autoAlpha: 0 });
      complete();
      return;
    }

    const ctx = gsap.context(() => {
      const openBracket = wrap.querySelector('[data-bracket="open"]');
      const closeBracket = wrap.querySelector('[data-bracket="close"]');
      const caret = wrap.querySelector("[data-caret]");
      const logoChars = logo.querySelectorAll('[data-chars="logo"] > span');
      const logoDot = logo.querySelector("[data-dot]");

      const openChars = openBracket ? Array.from(openBracket.children) : [];

      const closeChars = closeBracket ? Array.from(closeBracket.children) : [];

      const typedSequence: Element[] = [
        ...openChars,
        ...(logoDot ? [logoDot] : []),
        ...logoChars,
        ...closeChars,
      ];

      const timeline = gsap.timeline();

      typedSequence.forEach((element, index) => {
        const isDot = element === logoDot;

        if (isDot) {
          timeline.fromTo(
            element,
            {
              opacity: 0,
              scale: 0.4,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "back.out(2.5)",
            },
            "+=0.08"
          );
        } else {
          timeline.to(
            element,
            {
              opacity: 1,
              duration: 0.07,
              ease: "none",
            },
            index === 0 ? 0 : "+=0.05"
          );
        }

        timeline.call(() => {
          if (caret) {
            element.insertAdjacentElement("afterend", caret);
          }
        });
      });

      if (caret && closeBracket) {
        timeline.call(() => {
          closeBracket.insertAdjacentElement("afterend", caret);
        });
      }

      if (caret) {
        timeline.to(
          caret,
          {
            opacity: 0,
            duration: 0.35,
            repeat: 3,
            yoyo: true,
            ease: "steps(1)",
          },
          "+=0.1"
        );
      }

      timeline.call(() => {
        window.requestAnimationFrame(() => {
          const target = document.getElementById("nav-logo");

          if (!target) {
            gsap.to(container, {
              autoAlpha: 0,
              duration: 0.3,
              onComplete: complete,
            });

            return;
          }

          const startRect = logo.getBoundingClientRect();
          const endRect = target.getBoundingClientRect();

          const scale = endRect.width / startRect.width;

          const deltaX =
            endRect.left +
            endRect.width / 2 -
            (startRect.left + startRect.width / 2);

          const deltaY =
            endRect.top +
            endRect.height / 2 -
            (startRect.top + startRect.height / 2);

          if (caret) {
            gsap.set(caret, { opacity: 0 });
          }

          gsap
            .timeline({
              onComplete: complete,
            })
            .to(
              [openBracket, closeBracket],
              {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              0
            )
            .to(
              logo,
              {
                x: deltaX,
                y: deltaY,
                scale,
                duration: 0.7,
                ease: "power3.inOut",
              },
              0
            )
            .to(
              container,
              {
                autoAlpha: 0,
                duration: 0.3,
              },
              "-=0.15"
            );
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, wrapRef, logoRef]);

  return undefined;
}
