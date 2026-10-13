"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// SHAPE SVG - Geometric neon shape primitive used by floating decor
// ═══════════════════════════════════════════════════════════════════

export const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
  PURPLE: "#8B5CF6",
  ORANGE: "#FF6B00",
};

export type ShapeType = "triangle" | "circle" | "square" | "hexagon" | "star" | "cross";

export interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  duration: number;
  delay: number;
}

export const generateShapes = (count: number): Shape[] => {
  const types: ShapeType[] = ["triangle", "circle", "square", "hexagon", "star", "cross"];
  const colors = [NEON.CYAN, NEON.MAGENTA, NEON.LIME, NEON.PINK, NEON.PURPLE, NEON.ORANGE];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[i % types.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 15 + Math.random() * 25,
    color: colors[i % colors.length],
    rotation: Math.random() * 360,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
  }));
};

// Shape SVG components
export const ShapeSVG = memo(function ShapeSVG({
  type,
  size,
  color,
}: {
  type: ShapeType;
  size: number;
  color: string;
}) {
  const strokeWidth = 1.5;

  switch (type) {
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <polygon
            points="12,2 22,20 2,20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <polygon
            points="12,2 21,7 21,17 12,22 3,17 3,7"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <polygon
            points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2v20M2 12h20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      );
    default:
      return null;
  }
});
