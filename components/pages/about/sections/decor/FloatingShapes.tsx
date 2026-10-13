"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { ShapeSVG, generateShapes } from "./ShapeSVG";

// ═══════════════════════════════════════════════════════════════════
// FLOATING SHAPES - Geometric neon shapes floating around
// ═══════════════════════════════════════════════════════════════════

export const FloatingShapes = memo(function FloatingShapes({
  count = 15,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const { shouldAnimate } = useAnimationPolicy();
  const shapes = generateShapes(count);

  // Don't render floating shapes if animations should be reduced
  if (!shouldAnimate) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          initial={{
            opacity: 0,
            rotate: shape.rotation,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [0, 1, 1, 0],
            x: [0, 30, -20, 0],
            y: [0, -50, -100, -150],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}
    </div>
  );
});
