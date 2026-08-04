export default function GridBackground({
  maskPosition = "30% 10%",
}: {
  maskPosition?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[1]"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: `radial-gradient(ellipse 70% 70% at ${maskPosition}, black 0%, transparent 75%)`,
        WebkitMaskImage: `radial-gradient(ellipse 70% 70% at ${maskPosition}, black 0%, transparent 75%)`,
      }}
    />
  );
}
