/**
 * Faint grid-line texture for the hero background, masked to fade outward
 * from the upper-left. Kept as its own component (not bundled with any
 * glow/wash effects) so it can be reasoned about and adjusted independently
 * — an earlier combined Spotlight component's glow washes were the actual
 * cause of the page reading as "muted"; this grid alone, at low opacity,
 * is just a quiet structural texture.
 *
 * Rendered inside Hero.tsx's <section> (which is `relative overflow-hidden`),
 * not at the page root — `absolute inset-0` here is contained by and scoped
 * to that section, rather than `fixed` (viewport-relative), which would
 * decouple the mask's fade position from the hero's actual bounds and keep
 * painting behind every section for the rest of the scroll.
 *
 * Server component (no interactivity, no motion) — safe to render without
 * pulling in "use client".
 */
export default function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[1]"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 70% at 30% 10%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 70% at 30% 10%, black 0%, transparent 75%)",
      }}
    />
  );
}
