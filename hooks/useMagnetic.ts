"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { magneticSpring } from "@/lib/motion";

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, magneticSpring);
  const y = useSpring(rawY, magneticSpring);

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || strength === 0) return;

    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const relativeX = event.clientX - rect.left - rect.width / 2;

    const relativeY = event.clientY - rect.top - rect.height / 2;

    rawX.set(relativeX * strength);
    rawY.set(relativeY * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return {
    ref,
    x,
    y,
    onMouseMove,
    onMouseLeave,
  };
}
