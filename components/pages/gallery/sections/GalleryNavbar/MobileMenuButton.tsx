"use client";

import { COLORS } from "@/components/pages/gallery/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// MOBILE MENU BUTTON
// ═══════════════════════════════════════════════════════════════════

export function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="relative z-20 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[2px] w-5 rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${COLORS.MARIGOLD}, ${COLORS.RANI})`,
            boxShadow: `0 0 4px ${COLORS.MARIGOLD}60`,
            transform:
              i === 0
                ? open
                  ? "translateY(7px) rotate(45deg)"
                  : "none"
                : i === 2
                  ? open
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none"
                  : "none",
            opacity: i === 1 && open ? 0 : 1,
          }}
        />
      ))}
    </button>
  );
}
