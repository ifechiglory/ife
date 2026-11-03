import type { Variants } from "motion/react";

export const motionEase = [0.16, 1, 0.3, 1] as const;

export const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: motionEase,
    },
  },
};

export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -70,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: motionEase,
    },
  },
};

export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 70,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: motionEase,
    },
  },
};

export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0
): Variants {
  return {
    hidden: {},

    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: motionEase,
    },
  },
};

export const magneticSpring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export const viewportOnce = {
  once: true,
  margin: "0px 0px -5% 0px",
} as const;
