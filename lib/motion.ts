import type { Variants } from "motion/react";

/**
 * Shared Motion variants and interaction primitives.
 *
 * Ownership split (per the plan agreed with the client):
 * - Motion owns every component-level interaction here: hover, tap, reveal,
 *   stagger, layout, cursor-tilt. These are real Motion primitives
 *   (whileHover / whileInView / useMotionValue+useSpring), not hand-rolled
 *   transition/transform CSS reimplementing what Motion already does.
 * - GSAP is scoped separately (see hooks/useTerminalSequence.ts and
 *   hooks/useScrollProgress.ts) to timeline-based orchestration and
 *   ScrollTrigger-driven scrub effects — the two things GSAP is genuinely
 *   better at than Motion.
 */

/** Standard up-reveal for section content entering on scroll. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Directional slide-in for two-column layouts (About, Teaching). */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent wrapper for staggered children (stat rail, skill cards, stack pills). */
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Word-level reveal for the hero headline — used with a mapped array of words. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * whileHover props for a magnetic button. Consumers attach a mousemove
 * handler that feeds x/y into useMotionValue + useSpring (see
 * hooks/useMagnetic.ts) — this just defines the spring feel.
 */
export const magneticSpring = { stiffness: 150, damping: 15, mass: 0.1 };

/** whileHover/whileTap for standard card lift (work cards, skill cards). */
export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

/** whileHover for icon links (github/live-site buttons) — spring pop. */
export const iconHover = {
  whileHover: { scale: 1.15, y: -2, transition: { type: "spring" as const, stiffness: 400, damping: 12 } },
  whileTap: { scale: 0.95 },
};

/** Standard viewport config for whileInView triggers — fires once, a bit before fully in view. */
export const viewportOnce = { once: true, margin: "-15% 0px -15% 0px" } as const;
