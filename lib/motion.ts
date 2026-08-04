import type { Variants } from "motion/react";

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

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const magneticSpring = { stiffness: 150, damping: 15, mass: 0.1 };

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export const iconHover = {
  whileHover: { scale: 1.15, y: -2, transition: { type: "spring" as const, stiffness: 400, damping: 12 } },
  whileTap: { scale: 0.95 },
};

export const viewportOnce = { once: true, margin: "0px 0px -5% 0px" } as const;
