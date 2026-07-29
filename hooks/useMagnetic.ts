"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { magneticSpring } from "@/lib/motion";

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, magneticSpring);
  const y = useSpring(rawY, magneticSpring);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    rawX.set(relX * strength);
    rawY.set(relY * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave };
}
