import type { NavbarTheme, BadgeStyleConfig } from "@/components/navbar/types/navbar.types";

// ═══════════════════════════════════════════════════════════════════
// BADGE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

// Theme-specific badge positioning and sizing
export const BADGE_STYLES: Record<NavbarTheme, BadgeStyleConfig> = {
  main: {
    position: "left-[15.7%] top-[59%]",
    size: "h-[195%] sm:h-[175%]",
  },
  about: {
    position: "left-[16%] top-[52%]",
    size: "h-[196%] sm:h-[180%]",
  },
  sponsor: {
    position: "left-[16%] top-[52%]",
    size: "h-[206%] sm:h-[230%]",
  },
};
