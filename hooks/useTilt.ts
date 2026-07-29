"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

export function useTilt(maxTilt = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateXRaw = useTransform(py, [0, 1], [maxTilt / 2, -maxTilt / 2]);
  const rotateYRaw = useTransform(px, [0, 1], [-maxTilt / 2, maxTilt / 2]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  // cursor position as percentages, for a CSS custom-property-driven sheen
  const mx = useTransform(px, [0, 1], ["0%", "100%"]);
  const my = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return { ref, rotateX, rotateY, mx, my, onMouseMove, onMouseLeave };
}
