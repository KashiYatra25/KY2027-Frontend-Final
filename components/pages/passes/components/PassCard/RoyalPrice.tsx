"use client";

import {
  COLORS,
  GRADIENT_LINE_GOLD_LEFT,
  GRADIENT_LINE_GOLD_RIGHT,
  GRADIENT_TEXT_GOLD_VERTICAL,
} from "@/components/pages/passes/constants/palette";
import { hexToRgb } from "./hexToRgb";

// ============================================
// RoyalPrice Component
// ============================================
export function RoyalPrice({ price }: { price: number }) {
  return (
    <div className="relative inline-flex items-center">
      <span className="mr-2 h-[1px] w-8" style={{ background: GRADIENT_LINE_GOLD_LEFT }} />
      <div
        className="flex flex-row items-center gap-2 rounded-lg px-4 py-2"
        style={{
          background: `linear-gradient(180deg, rgba(${hexToRgb(COLORS.GOLD)}, 0.15) 0%, rgba(${hexToRgb(COLORS.GOLD_BROWN)}, 0.08) 100%)`,
          border: `1px solid rgba(${hexToRgb(COLORS.GOLD)}, 0.4)`,
          boxShadow: `0 2px 10px rgba(${hexToRgb(COLORS.GOLD)}, 0.2)`,
        }}
      >
        <span className="text-sm font-semibold tracking-wide" style={{ color: COLORS.GOLD }}>
          Price
        </span>
        <span className="font-light" style={{ color: COLORS.BRIGHT_GOLD }}>
          :
        </span>
        <span className="text-2xl font-bold" style={GRADIENT_TEXT_GOLD_VERTICAL}>
          ₹{price.toLocaleString("en-IN")}
        </span>
      </div>
      <span className="ml-2 h-[1px] w-8" style={{ background: GRADIENT_LINE_GOLD_RIGHT }} />
    </div>
  );
}
