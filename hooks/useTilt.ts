"use client";

import { useRef, type MouseEvent } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export function useTilt(maxTilt = 14) {
  const ref = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateXRaw = useTransform(py, [0, 1], [maxTilt / 2, -maxTilt / 2]);

  const rotateYRaw = useTransform(px, [0, 1], [-maxTilt / 2, maxTilt / 2]);

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 200,
    damping: 20,
  });

  const rotateY = useSpring(rotateYRaw, {
    stiffness: 200,
    damping: 20,
  });

  const mx = useTransform(px, [0, 1], ["0%", "100%"]);
  const my = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || maxTilt === 0) return;

    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return {
    ref,
    rotateX,
    rotateY,
    mx,
    my,
    onMouseMove,
    onMouseLeave,
  };
}
