"use client";

import { COLORS, COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CA LOADER
// Ethereal cosmic spinner using the Campus Ambassador palette
// ═══════════════════════════════════════════════════════════════════

interface CALoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { ring: "w-4 h-4", text: "text-xs" },
  md: { ring: "w-6 h-6", text: "text-sm" },
  lg: { ring: "w-8 h-8", text: "text-base" },
};

export function CALoader({ text = "Loading…", size = "md" }: CALoaderProps) {
  const sizeStyles = sizeConfig[size];

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Spinning tri-color cosmic ring */}
      <div className={`relative ${sizeStyles.ring}`}>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: COLORS.PINK,
            borderRightColor: COLORS.PURPLE,
            borderBottomColor: COLORS.CYAN,
            animation: "caLoaderSpin 0.9s linear infinite",
            boxShadow: `0 0 12px ${COLORS_RGBA.PURPLE_50}`,
          }}
        />
      </div>

      {text && (
        <span
          className={sizeStyles.text}
          style={{
            background: GRADIENTS.TRI_90,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text}
        </span>
      )}

      <style jsx>{`
        @keyframes caLoaderSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
