"use client";

import { COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// NAV BUTTON - Previous/Next navigation
// ═══════════════════════════════════════════════════════════════════

type NavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
};

export function NavButton({ direction, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-xl transition-colors hover:bg-[#e5337c] sm:h-11 sm:w-11"
      style={{
        background: "rgba(246,236,220,0.12)",
        color: COLORS.TEXT,
      }}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}
