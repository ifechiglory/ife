"use client";

import { useEffect, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { skillNodes, skillRelations } from "@/lib/data";

const SVG_NS = "http://www.w3.org/2000/svg";

export interface TooltipState {
  name: string;
  level: number;
  category: string;
  color: string;
  x: number;
  y: number;
  visible: boolean;
}

const EMPTY_TOOLTIP: TooltipState = { name: "", level: 0, category: "", color: "", x: 0, y: 0, visible: false };

/**
 * Builds and animates the skills constellation entirely via GSAP + direct
 * SVG DOM manipulation, the same way useTerminalSequence owns the hero
 * terminal. This stays off Motion deliberately: the visualization involves
 * dozens of dynamically-created SVG elements (nodes, spokes, relation
 * lines, pulse dots) whose positions depend on trig math and a
 * mobile/desktop responsive branch — expressing that declaratively as JSX
 * would mean either a huge conditional render tree or fighting React's
 * reconciliation for what is fundamentally an imperative drawing routine.
 * GSAP timelines + gsap.context() (for clean teardown on unmount) are the
 * right tool here, same reasoning as the terminal sequence.
 *
 * Tooltip state is owned internally (returned, not taken as a callback
 * prop) — building the SVG is a one-time effect that should only ever run
 * once per mount, and taking an external callback would either need the
 * caller to memoize it perfectly or risk the effect re-running (and
 * rebuilding the whole constellation) on every tooltip update.
 */
export function useSkillsOrbit(
  containerRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>
) {
  const [tooltip, setTooltip] = useState<TooltipState>(EMPTY_TOOLTIP);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      const VIEWBOX = isMobile ? { w: 480, h: 620 } : { w: 900, h: 620 };
      const CX = VIEWBOX.w / 2;
      const CY = 300;
      const RING_R = isMobile ? { 1: 105, 2: 175 } : { 1: 150, 2: 250 };
      const NODE_R = isMobile ? { 1: 13, 2: 10 } : { 1: 15, 2: 11 };
      const LABEL_FONT_SIZE = isMobile ? 15 : 11;
      const LABEL_LINE_HEIGHT = isMobile ? 17 : 13;
      const CENTER_R = isMobile ? 38 : 46;
      const CENTER_FONT_SIZE = isMobile ? 15 : 11;
      const CENTER_SUBLABEL_FONT_SIZE = isMobile ? 12 : 9;

      svg.setAttribute("viewBox", `0 0 ${VIEWBOX.w} ${VIEWBOX.h}`);

      function polar(cx: number, cy: number, r: number, angleDeg: number) {
        const rad = ((angleDeg - 90) * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
      }

      // Evenly distribute every skill around the full 360°, based on array
      // index — not grouped by ring or category — so the constellation
      // stays balanced regardless of how many skills exist.
      const ANGLE_STEP = 360 / skillNodes.length;
      const angles = skillNodes.map((_, i) => i * ANGLE_STEP);
      const positions = skillNodes.map((s, i) => polar(CX, CY, RING_R[s.ring], angles[i]));

      const connectionsG = svg.querySelector<SVGGElement>("[data-connections]")!;
      const nodesG = svg.querySelector<SVGGElement>("[data-nodes]")!;
      const centerG = svg.querySelector<SVGGElement>("[data-center]")!;

      // ---- center node ----
      const centerCircle = document.createElementNS(SVG_NS, "circle");
      centerCircle.setAttribute("cx", String(CX));
      centerCircle.setAttribute("cy", String(CY));
      centerCircle.setAttribute("r", String(CENTER_R));
      centerCircle.setAttribute("fill", "var(--color-surface-raised)");
      centerCircle.setAttribute("stroke", "var(--color-pine)");
      centerCircle.setAttribute("stroke-width", "1.5");
      centerG.appendChild(centerCircle);

      const centerLabel = document.createElementNS(SVG_NS, "text");
      centerLabel.setAttribute("x", String(CX));
      centerLabel.setAttribute("y", String(CY));
      centerLabel.setAttribute("text-anchor", "middle");
      centerLabel.setAttribute("dominant-baseline", "middle");
      centerLabel.setAttribute("font-size", String(CENTER_FONT_SIZE));
      centerLabel.setAttribute("fill", "var(--color-paper)");
      centerLabel.style.fontFamily = "var(--font-mono)";

      const centerTspan1 = document.createElementNS(SVG_NS, "tspan");
      centerTspan1.setAttribute("x", String(CX));
      centerTspan1.setAttribute("dy", "-6");
      centerTspan1.textContent = "Ife";
      centerLabel.appendChild(centerTspan1);

      const centerTspan2 = document.createElementNS(SVG_NS, "tspan");
      centerTspan2.setAttribute("x", String(CX));
      centerTspan2.setAttribute("dy", "16");
      centerTspan2.setAttribute("font-size", String(CENTER_SUBLABEL_FONT_SIZE));
      centerTspan2.setAttribute("fill", "var(--color-stone)");
      centerTspan2.textContent = "stack";
      centerLabel.appendChild(centerTspan2);

      centerG.appendChild(centerLabel);

      // ---- spokes (center -> node) + pulse dots ----
      const pulseDots: { dot: SVGCircleElement; to: { x: number; y: number }; color: string }[] = [];

      skillNodes.forEach((s, i) => {
        const p = positions[i];
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("class", "connection-line");
        line.setAttribute("x1", String(CX));
        line.setAttribute("y1", String(CY));
        line.setAttribute("x2", String(p.x));
        line.setAttribute("y2", String(p.y));
        line.setAttribute("data-from", "center");
        line.setAttribute("data-to", String(i));
        connectionsG.appendChild(line);

        const dot = document.createElementNS(SVG_NS, "circle") as SVGCircleElement;
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", s.color);
        dot.setAttribute("cx", String(CX));
        dot.setAttribute("cy", String(CY));
        dot.setAttribute("opacity", "0");
        dot.style.filter = "drop-shadow(0 0 4px currentColor)";
        dot.style.pointerEvents = "none";
        connectionsG.appendChild(dot);
        pulseDots.push({ dot, to: p, color: s.color });
      });

      // ---- relation lines (skill <-> skill) ----
      skillRelations.forEach(([a, b]) => {
        const pa = positions[a];
        const pb = positions[b];
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("class", "connection-line");
        line.setAttribute("x1", String(pa.x));
        line.setAttribute("y1", String(pa.y));
        line.setAttribute("x2", String(pb.x));
        line.setAttribute("y2", String(pb.y));
        line.setAttribute("data-from", String(a));
        line.setAttribute("data-to", String(b));
        connectionsG.appendChild(line);
      });

      // style the connection lines via a shared class (defined in globals.css)
      connectionsG.querySelectorAll<SVGLineElement>(".connection-line").forEach((line) => {
        line.setAttribute("stroke", "var(--color-line)");
        line.setAttribute("stroke-width", "1");
        line.setAttribute("fill", "none");
        line.style.opacity = "0.5";
        line.style.transition = "stroke 0.3s ease, opacity 0.3s ease, stroke-width 0.3s ease";
      });

      // ---- skill nodes ----
      const breatheTweens: gsap.core.Tween[] = [];

      skillNodes.forEach((s, i) => {
        const p = positions[i];
        const baseR = NODE_R[s.ring] + (s.level / 100) * 4;

        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("data-index", String(i));
        g.setAttribute("data-category", s.category);
        g.style.cursor = "pointer";

        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("cx", String(p.x));
        circle.setAttribute("cy", String(p.y));
        circle.setAttribute("r", String(baseR));
        circle.setAttribute("fill", "var(--color-surface)");
        circle.setAttribute("stroke", s.color);
        circle.setAttribute("stroke-width", "1.5");
        circle.style.transition = "filter 0.3s ease";
        g.appendChild(circle);

        const label = document.createElementNS(SVG_NS, "text");
        label.setAttribute("x", String(p.x));
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", String(LABEL_FONT_SIZE));
        label.setAttribute("fill", "var(--color-ink-soft)");
        label.style.fontFamily = "var(--font-mono)";
        label.style.opacity = "0.85";
        label.style.transition = "fill 0.3s ease, opacity 0.3s ease";
        label.style.pointerEvents = "none";

        const breakPoint = s.name.includes(" / ") ? " / " : " ";
        const parts = s.name.split(breakPoint);
        const line1 = parts[0] + (breakPoint === " / " ? " /" : "");
        const line2 = parts.slice(1).join(breakPoint === " / " ? " / " : " ");
        const lineY = p.y + baseR + (isMobile ? 20 : 16);

        const tspan1 = document.createElementNS(SVG_NS, "tspan");
        tspan1.setAttribute("x", String(p.x));
        tspan1.setAttribute("y", String(lineY));
        tspan1.textContent = line1;
        label.appendChild(tspan1);

        if (line2) {
          const tspan2 = document.createElementNS(SVG_NS, "tspan");
          tspan2.setAttribute("x", String(p.x));
          tspan2.setAttribute("y", String(lineY + LABEL_LINE_HEIGHT));
          tspan2.textContent = line2;
          label.appendChild(tspan2);
        }

        g.appendChild(label);
        nodesG.appendChild(g);

        // idle breathing pulse — delayed so it doesn't fight the entrance animation
        const tween = gsap.to(circle, {
          attr: { r: baseR + 1.5 },
          duration: 2.4 + (i % 4) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.3 + i * 0.15,
        });
        breatheTweens[i] = tween;

        // hover: pop node, glow it + category siblings, light connections, show tooltip
        function handleEnter() {
          g.classList.add("is-active");
          breatheTweens[i].pause();
          gsap.to(circle, { attr: { r: baseR * 1.35 }, duration: 0.3, ease: "back.out(2)" });
          gsap.to(circle, { filter: `drop-shadow(0 0 8px ${s.color})`, duration: 0.3 });
          label.style.fill = "var(--color-paper)";
          label.style.opacity = "1";

          connectionsG
            .querySelectorAll<SVGLineElement>(
              `[data-from="${i}"], [data-to="${i}"], [data-from="center"][data-to="${i}"]`
            )
            .forEach((line) => {
              line.setAttribute("stroke", "var(--color-pine)");
              line.style.opacity = "0.9";
              line.setAttribute("stroke-width", "1.4");
            });

          nodesG.querySelectorAll<SVGGElement>(`[data-category="${s.category}"]`).forEach((node) => {
            if (node === g) return;
            const sibCircle = node.querySelector("circle")!;
            const sibLabel = node.querySelector("text")!;
            gsap.to(sibCircle, { filter: `drop-shadow(0 0 4px ${s.color})`, duration: 0.3 });
            sibCircle.setAttribute("stroke-width", "2.25");
            sibLabel.style.fill = "var(--color-paper)";
            sibLabel.style.opacity = "1";
            node.classList.add("is-category-lit");
          });

          const svgRect = svg.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const scaleX = svgRect.width / VIEWBOX.w;
          const scaleY = svgRect.height / VIEWBOX.h;

          setTooltip({
            name: s.name,
            level: s.level,
            category: s.category,
            color: s.color,
            x: svgRect.left - containerRect.left + p.x * scaleX,
            y: svgRect.top - containerRect.top + (p.y - baseR - 12) * scaleY,
            visible: true,
          });
        }

        function handleLeave() {
          g.classList.remove("is-active");
          gsap.to(circle, {
            attr: { r: baseR },
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => breatheTweens[i].resume(),
          });
          gsap.to(circle, { filter: "none", duration: 0.3 });
          label.style.fill = "var(--color-ink-soft)";
          label.style.opacity = "0.85";

          connectionsG.querySelectorAll<SVGLineElement>(".connection-line").forEach((line) => {
            line.setAttribute("stroke", "var(--color-line)");
            line.style.opacity = "0.5";
            line.setAttribute("stroke-width", "1");
          });

          nodesG.querySelectorAll<SVGGElement>(".is-category-lit").forEach((node) => {
            node.classList.remove("is-category-lit");
            const sibCircle = node.querySelector("circle")!;
            const sibLabel = node.querySelector("text")!;
            gsap.to(sibCircle, { filter: "none", duration: 0.3 });
            sibCircle.setAttribute("stroke-width", "1.5");
            sibLabel.style.fill = "var(--color-ink-soft)";
            sibLabel.style.opacity = "0.85";
          });

          setTooltip(EMPTY_TOOLTIP);
        }

        g.addEventListener("mouseenter", handleEnter);
        g.addEventListener("mouseleave", handleLeave);
      });

      // ---- signal pulse: a dot travels from center to each node in turn, looping ----
      function firePulse(p: (typeof pulseDots)[number]) {
        gsap.set(p.dot, { attr: { cx: CX, cy: CY }, opacity: 0 });
        gsap
          .timeline()
          .to(p.dot, { opacity: 1, duration: 0.15 })
          .to(p.dot, { attr: { cx: p.to.x, cy: p.to.y }, duration: 0.9, ease: "power1.inOut" }, 0)
          .to(p.dot, { opacity: 0, duration: 0.25 }, "-=0.25");
      }

      const PULSE_CYCLE = 4.5;
      const pulseDelayedCalls: gsap.core.Tween[] = [];
      pulseDots.forEach((p, i) => {
        const start = 1.6 + i * (PULSE_CYCLE / pulseDots.length);
        function loop() {
          firePulse(p);
          pulseDelayedCalls.push(gsap.delayedCall(PULSE_CYCLE, loop));
        }
        pulseDelayedCalls.push(gsap.delayedCall(start, loop));
      });

      // ---- ambient connection-line opacity drift ----
      connectionsG.querySelectorAll<SVGLineElement>(".connection-line").forEach((line, i) => {
        gsap.to(line, {
          opacity: 0.15,
          duration: 3 + (i % 5) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (i % 7) * 0.3,
        });
      });

      // ---- entrance ----
      gsap.set([nodesG, connectionsG], { opacity: 0 });
      gsap.set(centerG, { opacity: 0, scale: 0.8, svgOrigin: `${CX} ${CY}` });
      gsap
        .timeline({ delay: 0.2 })
        .to(centerG, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" })
        .to(connectionsG, { opacity: 1, duration: 0.8 }, 0.3)
        .to(nodesG, { opacity: 1, duration: 0.8 }, 0.4)
        .from(
          nodesG.querySelectorAll("circle"),
          { scale: 0, duration: 0.5, stagger: 0.04, ease: "back.out(2)", transformOrigin: "center" },
          0.5
        );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- containerRef/svgRef are stable refs; this should run exactly once per mount, which is the point (see hook doc comment above)
  }, []);

  return tooltip;
}
