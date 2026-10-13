"use client";

import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
}

export const GlassmorphismCard = memo(function GlassmorphismCard({
  children,
  className = "",
  accentColor = FOOTER_COLORS.NEON_CYAN,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={`group relative ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card with glass effect */}
      <div
        className="relative h-full rounded-2xl p-6 transition-all duration-300"
        style={{
          background: "rgba(15, 10, 25, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 0 20px ${accentColor}10`,
        }}
      >
        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 h-6 w-6 rounded-tl-xl border-t-2 border-l-2 transition-all duration-300 group-hover:h-8 group-hover:w-8"
          style={{ borderColor: `${accentColor}60` }}
        />
        <div
          className="absolute top-0 right-0 h-6 w-6 rounded-tr-xl border-t-2 border-r-2 transition-all duration-300 group-hover:h-8 group-hover:w-8"
          style={{ borderColor: `${accentColor}60` }}
        />
        <div
          className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 transition-all duration-300 group-hover:h-8 group-hover:w-8"
          style={{ borderColor: `${accentColor}60` }}
        />
        <div
          className="absolute right-0 bottom-0 h-6 w-6 rounded-br-xl border-r-2 border-b-2 transition-all duration-300 group-hover:h-8 group-hover:w-8"
          style={{ borderColor: `${accentColor}60` }}
        />

        {children}
      </div>
    </motion.div>
  );
});
