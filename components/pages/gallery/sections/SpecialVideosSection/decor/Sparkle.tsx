"use client";

// ═══════════════════════════════════════════════════════════════════
// SPARKLE
// ═══════════════════════════════════════════════════════════════════

export function Sparkle({
  style,
  delay,
  duration,
  hot,
}: {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  hot?: boolean;
}) {
  return (
    <i
      className={`sparkle absolute ${hot ? "hot" : ""}`}
      style={{
        ...style,
        background: hot ? "#ffe9b0" : "#f6d98f",
        clipPath: "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    />
  );
}
