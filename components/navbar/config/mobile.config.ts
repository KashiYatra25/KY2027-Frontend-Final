import type { NavbarTheme, MobileThemeStyle } from "@/components/navbar/types/navbar.types";

// ═══════════════════════════════════════════════════════════════════
// MOBILE NAVBAR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

export const MOBILE_THEME_STYLES: Record<NavbarTheme, MobileThemeStyle> = {
  main: {
    hamburgerGradient: "linear-gradient(90deg, #3d2814, #5c3d1a, #4a3015)", // Dark brown - high contrast
    hamburgerShadow: "0 0 8px rgba(0,0,0,0.6), 0 0 4px rgba(58,21,5,0.8)", // Dark shadow for visibility
    hamburgerTop: "58%",
    // Mobile navbar dimensions
    navbarOffsetY: "0px",
    minHeight: 48,
    maxHeight: 65,
    maxWidth: 1600,
    panelBg:
      "radial-gradient(ellipse at 30% 20%, rgba(245,222,164,0.98) 0%, rgba(214,176,110,0.98) 45%, rgba(168,124,64,0.98) 100%)",
    panelBorder: "2px solid rgba(255,215,0,0.55)",
    panelShadow:
      "0 14px 34px rgba(0,0,0,0.55), inset 0 0 24px rgba(120,72,20,0.4), inset 0 0 2px rgba(255,240,200,0.6)",
    textColor: "#3a1505",
    textColorSecondary: "#6b3f14",
    textColorInactive: "#3d1e0a",
    dividerColor: "#8a5a1a",
    accentGold: "#FFD700",
    accentBronze: "#b8860b",
    activeGradient:
      "linear-gradient(135deg, rgba(255,215,0,0.7) 0%, rgba(255,230,100,0.8) 50%, rgba(255,215,0,0.7) 100%)",
    activeShadow:
      "0 0 25px rgba(255,215,0,0.8), 0 0 50px rgba(255,180,0,0.5), inset 0 0 15px rgba(255,255,200,0.6)",
    activeTextShadow:
      "0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,180,0,0.6), 0 1px 1px rgba(255,245,215,0.8)",
    inactiveTextShadow: "0 1px 1px rgba(255,245,215,0.6)",
    headerGradient: "linear-gradient(135deg, #FFF3C4, #FFD700 45%, #B8860B)",
    mandalaStroke: "%235a3410",
  },
  about: {
    hamburgerGradient: "linear-gradient(90deg, #8a5a1a, #d4a853)",
    hamburgerShadow: "0 0 4px rgba(138,90,26,0.5)",
    hamburgerTop: "50%", // Slightly higher position for about theme
    // Mobile navbar dimensions
    navbarOffsetY: "0px",
    minHeight: 48,
    maxHeight: 65,
    maxWidth: 1600,
    panelBg:
      "radial-gradient(ellipse at 30% 20%, rgba(45,27,78,0.98) 0%, rgba(30,20,50,0.98) 45%, rgba(26,26,46,0.98) 100%)",
    panelBorder: "2px solid rgba(139,92,246,0.6)",
    panelShadow:
      "0 14px 34px rgba(0,0,0,0.7), inset 0 0 24px rgba(139,92,246,0.2), inset 0 0 2px rgba(196,181,253,0.3)",
    textColor: "#e9d5ff",
    textColorSecondary: "#c4b5fd",
    textColorInactive: "#d8b4fe",
    dividerColor: "#8b5cf6",
    accentGold: "#a855f7",
    accentBronze: "#7c3aed",
    activeGradient:
      "linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(168,85,247,0.9) 50%, rgba(139,92,246,0.8) 100%)",
    activeShadow:
      "0 0 25px rgba(139,92,246,0.8), 0 0 50px rgba(168,85,247,0.5), inset 0 0 15px rgba(196,181,253,0.5)",
    activeTextShadow: "0 0 10px rgba(139,92,246,0.9), 0 0 20px rgba(168,85,247,0.7)",
    inactiveTextShadow: "0 1px 2px rgba(0,0,0,0.5)",
    headerGradient: "linear-gradient(135deg, #E9D5FF, #A855F7 45%, #6D28D9)",
    mandalaStroke: "%238b5cf6",
  },
  sponsor: {
    hamburgerGradient: "linear-gradient(90deg, #1a5a1a, #2d7a2d)", // Dark green
    hamburgerShadow: "0 0 8px rgba(74,222,128,0.9), 0 0 16px rgba(34,197,94,0.6)", // Strong green glow
    hamburgerTop: "58%",
    // Mobile navbar dimensions
    navbarOffsetY: "0px",
    minHeight: 42,
    maxHeight: 55,
    maxWidth: 1600,
    panelBg:
      "radial-gradient(ellipse at 30% 20%, rgba(15,35,20,0.98) 0%, rgba(20,50,25,0.98) 45%, rgba(10,30,15,0.98) 100%)",
    panelBorder: "2px solid rgba(74,222,128,0.6)",
    panelShadow:
      "0 14px 34px rgba(0,0,0,0.6), inset 0 0 24px rgba(22,163,74,0.3), inset 0 0 2px rgba(187,247,208,0.3)",
    textColor: "#dcfce7",
    textColorSecondary: "#bbf7d0",
    textColorInactive: "#a7f3d0",
    dividerColor: "#22c55e",
    accentGold: "#4ade80",
    accentBronze: "#16a34a",
    activeGradient:
      "linear-gradient(135deg, rgba(74,222,128,0.8) 0%, rgba(134,239,172,0.9) 50%, rgba(74,222,128,0.8) 100%)",
    activeShadow:
      "0 0 25px rgba(74,222,128,0.8), 0 0 50px rgba(34,197,94,0.5), inset 0 0 15px rgba(187,247,208,0.5)",
    activeTextShadow: "0 0 10px rgba(74,222,128,0.9), 0 0 20px rgba(34,197,94,0.7)",
    inactiveTextShadow: "0 1px 2px rgba(0,0,0,0.5)",
    headerGradient: "linear-gradient(135deg, #DCFCE7, #4ADE80 45%, #166534)",
    mandalaStroke: "%2322c55e",
  },
};
