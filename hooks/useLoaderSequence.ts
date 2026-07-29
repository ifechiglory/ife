"use client";

import { useEffect, type RefObject } from "react";
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
  useEffect(() => {
    const container = containerRef.current;
    const wrap = wrapRef.current;
    const logo = logoRef.current;
    if (!container || !wrap || !logo) return;


    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
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
      const typedSequence: Element[] = [...openChars, ...(logoDot ? [logoDot] : []), ...logoChars, ...closeChars];

      const tl = gsap.timeline();

      typedSequence.forEach((el, i) => {
        const isDot = el === logoDot;

        if (isDot) {
          tl.fromTo(
            el,
            { opacity: 0, scale: 0.4 },
            { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
            "+=0.08"
          );
        } else {
          tl.to(el, { opacity: 1, duration: 0.07, ease: "none" }, i === 0 ? 0 : "+=0.05");
        }

        tl.call(() => {
          if (caret) el.insertAdjacentElement("afterend", caret);
        });
      });

      if (caret && closeBracket) {
        tl.call(() => {
          closeBracket.insertAdjacentElement("afterend", caret);
        });
      }

      // caret blinks a couple of times once typing is done
      if (caret) {
        tl.to(caret, { opacity: 0, duration: 0.35, repeat: 3, yoyo: true, ease: "steps(1)" }, "+=0.1");
      }

      tl.call(() => {
        const target = document.getElementById("nav-logo");
        if (!target) {
          // fallback: if for any reason the logo isn't in the DOM, just fade out
          gsap.to(container, { opacity: 0, duration: 0.5, onComplete });
          return;
        }

        const startRect = logo.getBoundingClientRect();
        const endRect = target.getBoundingClientRect();

        const scale = endRect.width / startRect.width;
        const startCenterX = startRect.left + startRect.width / 2;
        const startCenterY = startRect.top + startRect.height / 2;
        const endCenterX = endRect.left + endRect.width / 2;
        const endCenterY = endRect.top + endRect.height / 2;
        const deltaX = endCenterX - startCenterX;
        const deltaY = endCenterY - startCenterY;

        if (caret) gsap.set(caret, { opacity: 0 });

        const morphTl = gsap.timeline({ onComplete });

        morphTl
          .to([openBracket, closeBracket], { opacity: 0, duration: 0.3, ease: "power2.out" }, 0)
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
          .to(container, { opacity: 0, duration: 0.3 }, "-=0.15");
      });
    }, container);

    return () => ctx.revert();

  }, []);
}
