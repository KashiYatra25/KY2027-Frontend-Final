"use client";

// ═══════════════════════════════════════════════════════════════════
// SPARKLE - Single animated twinkling star
// ═══════════════════════════════════════════════════════════════════

export type SparkleConfig = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  hot?: boolean;
};

export function Sparkle({ left, top, size, duration, delay, hot }: SparkleConfig) {
  return (
    <i
      className={`sparkle-star absolute opacity-20 ${hot ? "sparkle-hot" : ""}`}
      style={{
        left,
        top,
        width: size,
        height: size,
        background: hot ? "#ffe9b0" : "#f6d98f",
        clipPath: "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
