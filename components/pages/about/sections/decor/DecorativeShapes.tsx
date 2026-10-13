"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ShapeSVG, NEON } from "./ShapeSVG";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE SHAPES - Static positioned neon shapes for sections
// ═══════════════════════════════════════════════════════════════════

// Static decorative shapes for specific sections
export const DecorativeShapes = memo(function DecorativeShapes({
  position = "left",
  className = "",
}: {
  position?: "left" | "right" | "both";
  className?: string;
}) {
  const leftShapes = [
    { type: "triangle" as const, x: 5, y: 20, size: 40, color: NEON.CYAN, rotation: 15 },
    { type: "circle" as const, x: 8, y: 45, size: 25, color: NEON.MAGENTA, rotation: 0 },
    { type: "hexagon" as const, x: 3, y: 70, size: 35, color: NEON.LIME, rotation: 30 },
  ];

  const rightShapes = [
    { type: "square" as const, x: 92, y: 25, size: 30, color: NEON.PINK, rotation: 45 },
    { type: "star" as const, x: 95, y: 55, size: 35, color: NEON.PURPLE, rotation: 0 },
    { type: "cross" as const, x: 90, y: 80, size: 28, color: NEON.ORANGE, rotation: 22 },
  ];

  const shapes =
    position === "left"
      ? leftShapes
      : position === "right"
        ? rightShapes
        : [...leftShapes, ...rightShapes];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 10, shape.rotation - 10, shape.rotation],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}
    </div>
  );
});
