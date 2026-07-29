"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";

interface UseLoaderSequenceOptions {
  onComplete: () => void;
}

/**
 * Drives the full-screen loader: types `<`, then the dot+"Ife" logo mark,
 * then `/>`, holds briefly, then measures the real nav logo's on-screen
 * position/size (via `#nav-logo`, rendered underneath the loader the whole
 * time, just invisible) and animates *only the logo-mark element* — not
 * the surrounding code-bracket decoration — from its centered, large
 * starting state to land exactly on top of it. The brackets fade out
 * independently during the same move, since the real nav logo doesn't
 * have them; only content that exists in both places actually travels.
 *
 * Kept on GSAP for the same reason as useTerminalSequence: precisely-timed,
 * multi-phase sequence driven by real layout measurement — naturally
 * imperative, a poor fit for Motion's declarative variants.
 */
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

    // The global CSS reduced-motion rule only affects CSS transitions/
    // animations — it doesn't reach GSAP's own inline-style tweens. A
    // loader gating the whole page is exactly the case that should skip
    // straight to done for anyone with this preference set.
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

      // Build one flat, ordered list of every element the caret should
      // trail as it's revealed: open-bracket chars, the dot, each "Ife"
      // letter, then close-bracket chars. Moving the caret to sit right
      // after each one (via insertAdjacentElement, since it's a real DOM
      // node, not a CSS-only cursor) is what makes it visually type along
      // instead of appearing all at once at the end.
      const openChars = openBracket ? Array.from(openBracket.children) : [];
      const closeChars = closeBracket ? Array.from(closeBracket.children) : [];
      const typedSequence: Element[] = [...openChars, ...(logoDot ? [logoDot] : []), ...logoChars, ...closeChars];

      const tl = gsap.timeline();

      typedSequence.forEach((el, i) => {
        const isDot = el === logoDot;

        // Reveal the character first, THEN move the caret to sit after it —
        // doing this in the opposite order (caret moves, then char reveals)
        // makes the caret visually jump ahead of whatever's actually on
        // screen, since it'd be sitting after a still-invisible character
        // while the previous one is the last visible one. This order keeps
        // the caret always trailing the most recently revealed character.
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

        // caret snaps to trail this character the instant it finishes
        // revealing — no gap, so it never visibly lags or leads
        tl.call(() => {
          if (caret) el.insertAdjacentElement("afterend", caret);
        });
      });

      // return the caret to a stable position (directly after the closing
      // bracket, as a direct child of `wrap`) before it blinks and before
      // the morph measures `logo`'s bounding box — it may currently be
      // nested inside the logo subtree from the last character it trailed
      // during typing, which would otherwise skew that measurement
      if (caret && closeBracket) {
        tl.call(() => {
          closeBracket.insertAdjacentElement("afterend", caret);
        });
      }

      // caret blinks a couple of times once typing is done
      if (caret) {
        tl.to(caret, { opacity: 0, duration: 0.35, repeat: 3, yoyo: true, ease: "steps(1)" }, "+=0.1");
      }

      // hold the finished tag briefly, then morph the logo mark to the
      // real nav logo's measured position while the brackets fade away
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per mount by design
  }, []);
}
