import type { NavbarTheme, BadgeStyleConfig } from "@/components/navbar/types/navbar.types";

// ═══════════════════════════════════════════════════════════════════
// BADGE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

// Theme-specific badge positioning and sizing
export const BADGE_STYLES: Record<NavbarTheme, BadgeStyleConfig> = {
  main: {
    position: "left-[14.8%] top-[47.3%]",
    size: "h-[250%] sm:h-[320%]",
  },
  about: {
    position: "left-[14%] top-[38%]",
    size: "h-[250%] sm:h-[386%]",
  },
  sponsor: {
    position: "left-[16%] top-[52%]",
    size: "h-[206%] sm:h-[295%]",
  },
};
