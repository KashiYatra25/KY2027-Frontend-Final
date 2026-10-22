"use client";

import { motion } from "framer-motion";
import { HighlightIcon } from "./sections/icons";
import type { HighlightItem } from "./data/highlights";

// Animated Highlight Card for Desktop - Uses CSS animations that respect MotionZone pausing
export function AnimatedHighlightCard({ item, index }: { item: HighlightItem; index: number }) {
  return (
    <motion.div
      className="highlight-card group relative cursor-pointer overflow-hidden rounded-2xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Static gradient background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${item.color}30 0%, rgba(0,0,0,0.8) 50%, ${item.color}20 100%)`,
        }}
      />

      {/* Glowing border effect */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: "2px",
          background: `linear-gradient(135deg, ${item.color}, ${item.color}40, ${item.color})`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Outer glow - static with hover transition */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-80"
        style={{ background: item.color }}
      />

      {/* Inner shine effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${item.color}40 0%, transparent 60%)`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {/* Icon - static, no floating animation */}
        <div className="relative mb-3 inline-block">
          <HighlightIcon type={item.iconType} color={item.color} />
          {/* Icon glow underneath */}
          <div
            className="absolute inset-0 -z-10 opacity-60 blur-xl"
            style={{ background: item.color }}
          />
        </div>

        {/* Title with text glow */}
        <h4
          className="mb-1 text-sm font-black tracking-wider uppercase sm:text-lg"
          style={{
            color: item.color,
            textShadow: `0 0 20px ${item.color}, 0 0 40px ${item.color}60`,
          }}
        >
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-xs font-medium text-gray-300 sm:text-sm">{item.desc}</p>
      </div>

      {/* Static corner accents */}
      <div
        className="absolute top-0 left-0 h-8 w-8 opacity-60"
        style={{
          background: `radial-gradient(circle at top left, ${item.color} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-8 w-8 opacity-60"
        style={{
          background: `radial-gradient(circle at bottom right, ${item.color} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
