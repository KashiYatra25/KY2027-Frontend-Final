"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Animated sound-wave visualizer bars (pure SVG). */
export function SoundWave({
  bars = 28,
  color,
  width = 320,
  height = 72,
}: {
  bars?: number;
  color: string;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const barWidth = width / (bars * 1.8);
  const gap = (width - bars * barWidth) / (bars - 1);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const x = i * (barWidth + gap);
        const base = 6 + (Math.sin(i * 1.3) * 0.5 + 0.5) * (height - 10);
        return (
          <motion.rect
            key={i}
            x={x}
            width={barWidth}
            rx={barWidth / 2}
            fill={color}
            initial={{ height: base, y: (height - base) / 2 }}
            animate={
              reduce
                ? { height: base, y: (height - base) / 2 }
                : {
                    height: [base * 0.3, base, base * 0.5, base * 0.9, base * 0.3],
                    y: [
                      (height - base * 0.3) / 2,
                      (height - base) / 2,
                      (height - base * 0.5) / 2,
                      (height - base * 0.9) / 2,
                      (height - base * 0.3) / 2,
                    ],
                  }
            }
            transition={{
              duration: 1.1 + (i % 5) * 0.18,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.04,
            }}
          />
        );
      })}
    </svg>
  );
}
