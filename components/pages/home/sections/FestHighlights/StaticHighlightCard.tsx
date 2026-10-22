"use client";

import { HighlightIcon } from "./sections/icons";
import type { HighlightItem } from "./data/highlights";

// Static Highlight Card for Mobile
export function StaticHighlightCard({ item }: { item: HighlightItem; index: number }) {
  return (
    <div className="highlight-card group relative overflow-hidden rounded-2xl p-4 sm:p-6">
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

      {/* Outer glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-30 blur-md"
        style={{ background: item.color }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="relative mb-3 inline-block">
          <HighlightIcon type={item.iconType} color={item.color} />
          <div
            className="absolute inset-0 -z-10 opacity-60 blur-xl"
            style={{ background: item.color }}
          />
        </div>

        {/* Title */}
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
        className="absolute top-0 left-0 h-8 w-8 opacity-50"
        style={{
          background: `radial-gradient(circle at top left, ${item.color} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-8 w-8 opacity-50"
        style={{
          background: `radial-gradient(circle at bottom right, ${item.color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
