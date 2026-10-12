"use client";

import { useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════
// SPARKLES - Animated twinkling star decorations
// ═══════════════════════════════════════════════════════════════════

type SparkleConfig = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  hot?: boolean;
};

const SPARKLE_CONFIGS: SparkleConfig[] = [
  { left: "8%", top: "12%", size: 14, duration: 3.2, delay: 0 },
  { left: "92%", top: "18%", size: 10, duration: 2.8, delay: 1.2 },
  { left: "45%", top: "8%", size: 8, duration: 3.6, delay: 0.5 },
  { left: "15%", top: "35%", size: 12, duration: 3, delay: 2 },
  { left: "85%", top: "42%", size: 10, duration: 3.4, delay: 0.8 },
  { left: "5%", top: "55%", size: 8, duration: 2.6, delay: 1.5 },
  { left: "75%", top: "65%", size: 14, duration: 3.8, delay: 0.3, hot: true },
  { left: "25%", top: "78%", size: 10, duration: 3, delay: 2.2 },
  { left: "95%", top: "85%", size: 12, duration: 3.2, delay: 1 },
  { left: "55%", top: "92%", size: 8, duration: 2.8, delay: 1.8 },
];

export function Sparkles() {
  const sparkles = useMemo(() => SPARKLE_CONFIGS, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {sparkles.map((config, i) => (
        <Sparkle key={i} {...config} />
      ))}
    </div>
  );
}

function Sparkle({ left, top, size, duration, delay, hot }: SparkleConfig) {
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
