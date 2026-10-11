import { IMAGES } from "@/lib/images";
import type {
  NavbarTheme,
  ThemeVisualConfig,
  DesktopLayoutConfig,
  DimensionConstraints,
} from "@/components/navbar/types/navbar.types";

// ═══════════════════════════════════════════════════════════════════
// DESKTOP NAVBAR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

// Theme-specific visual configurations (background, badge, links)
export const THEME_CONFIG: Record<NavbarTheme, ThemeVisualConfig> = {
  main: {
    getBackground: () => IMAGES.navbar.main.background,
    getBadge: () => IMAGES.navbar.main.badge,
    badgeGlow: {
      outer:
        "radial-gradient(circle, rgba(255,210,90,0.55) 0%, rgba(255,160,50,0.3) 45%, rgba(255,120,30,0) 72%)",
      inner:
        "radial-gradient(circle, rgba(255,248,220,0.7) 0%, rgba(255,215,0,0.35) 50%, transparent 75%)",
    },
    linkStyle: {
      color: "#3a1505",
      activeColor: "#3a1505",
      activeBg:
        "linear-gradient(135deg, rgba(255,215,0,0.85) 0%, rgba(255,180,0,0.75) 30%, rgba(255,230,100,0.9) 50%, rgba(255,180,0,0.75) 70%, rgba(255,215,0,0.85) 100%)",
      inactiveBg:
        "linear-gradient(135deg, rgba(255,215,0,0.28) 0%, rgba(212,168,83,0.18) 50%, rgba(184,134,11,0.28) 100%)",
      activeBorder: "2px solid rgba(255,230,100,1)",
      inactiveBorder: "1px solid rgba(255,215,0,0.55)",
      activeShadow:
        "0 0 25px rgba(255,215,0,0.9), 0 0 50px rgba(255,180,0,0.7), 0 0 80px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,255,200,0.5), 0 2px 8px rgba(0,0,0,0.3)",
      inactiveShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,245,200,0.35)",
      activeTextShadow:
        "0 0 8px rgba(255,215,0,0.8), 0 0 15px rgba(255,180,0,0.6), 0 1px 1px rgba(255,245,215,0.9)",
      inactiveTextShadow: "0 1px 1px rgba(255,245,215,0.7)",
    },
    hamburgerGradient: "linear-gradient(90deg, #8a5a1a, #d4a853)",
    mobileMenuBg:
      "radial-gradient(ellipse at 30% 20%, rgba(245,222,164,0.98) 0%, rgba(214,176,110,0.98) 45%, rgba(168,124,64,0.98) 100%)",
    mobileMenuBorder: "2px solid rgba(255,215,0,0.55)",
    mobileMenuShadow:
      "0 14px 34px rgba(0,0,0,0.55), inset 0 0 24px rgba(120,72,20,0.4), inset 0 0 2px rgba(255,240,200,0.6)",
  },
  about: {
    getBackground: () => IMAGES.navbar.about.background,
    getBadge: () => IMAGES.navbar.about.badge,
    badgeGlow: {
      outer:
        "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(99,102,241,0.3) 45%, rgba(79,70,229,0) 72%)",
      inner:
        "radial-gradient(circle, rgba(196,181,253,0.6) 0%, rgba(139,92,246,0.35) 50%, transparent 75%)",
    },
    linkStyle: {
      color: "#f5f0ff", // Light purple/white for inactive - visible on purple bg
      activeColor: "#3a1505", // Dark brown on gold active
      activeBg:
        "linear-gradient(135deg, rgba(255,215,0,0.85) 0%, rgba(255,180,0,0.75) 30%, rgba(255,230,100,0.9) 50%, rgba(255,180,0,0.75) 70%, rgba(255,215,0,0.85) 100%)",
      inactiveBg:
        "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(168,85,247,0.2) 50%, rgba(139,92,246,0.25) 100%)",
      activeBorder: "2px solid rgba(255,230,100,1)",
      inactiveBorder: "1px solid rgba(196,181,253,0.5)",
      activeShadow:
        "0 0 25px rgba(255,215,0,0.9), 0 0 50px rgba(255,180,0,0.7), 0 0 80px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,255,200,0.5), 0 2px 8px rgba(0,0,0,0.3)",
      inactiveShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
      activeTextShadow:
        "0 0 8px rgba(255,215,0,0.8), 0 0 15px rgba(255,180,0,0.6), 0 1px 1px rgba(255,245,215,0.9)",
      inactiveTextShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 10px rgba(139,92,246,0.3)",
    },
    hamburgerGradient: "linear-gradient(90deg, #8a5a1a, #d4a853)",
    mobileMenuBg:
      "radial-gradient(ellipse at 30% 20%, rgba(45,27,78,0.98) 0%, rgba(30,20,50,0.98) 45%, rgba(26,26,46,0.98) 100%)",
    mobileMenuBorder: "2px solid rgba(139,92,246,0.6)",
    mobileMenuShadow:
      "0 14px 34px rgba(0,0,0,0.7), inset 0 0 24px rgba(139,92,246,0.2), inset 0 0 2px rgba(196,181,253,0.3)",
  },
  sponsor: {
    getBackground: () => IMAGES.navbar.sponsor.background,
    getBadge: () => IMAGES.navbar.main.badge, // Use main badge (same as home/about)
    badgeGlow: {
      outer:
        "radial-gradient(circle, rgba(74,222,128,0.45) 0%, rgba(34,197,94,0.3) 45%, rgba(22,163,74,0) 72%)",
      inner:
        "radial-gradient(circle, rgba(187,247,208,0.6) 0%, rgba(74,222,128,0.35) 50%, transparent 75%)",
    },
    linkStyle: {
      color: "#1a3a1a", // Inactive: dark green
      activeColor: "#022c02", // Active: very dark green
      activeBg:
        "linear-gradient(135deg, rgba(34,197,94,0.95) 0%, rgba(22,163,74,0.9) 50%, rgba(34,197,94,0.95) 100%)",
      inactiveBg: "rgba(74,222,128,0.2)",
      activeBorder: "2px solid rgba(134,239,172,1)",
      inactiveBorder: "1px solid rgba(74,222,128,0.4)",
      activeShadow:
        "0 0 20px rgba(74,222,128,0.8), 0 0 40px rgba(34,197,94,0.5), inset 0 0 10px rgba(255,255,255,0.3)",
      inactiveShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
      activeTextShadow: "0 1px 2px rgba(0,0,0,0.2), 0 0 8px rgba(34,197,94,0.4)",
      inactiveTextShadow: "0 1px 1px rgba(255,255,255,0.3)",
    },
    backgroundFilter: "brightness(0.85) saturate(1.1)", // Reduce whiteness
    hamburgerGradient: "linear-gradient(90deg, #5c4033, #8b5a2b)", // Dark brown - visible on light bg
    mobileMenuBg:
      "radial-gradient(ellipse at 30% 20%, rgba(20,50,30,0.98) 0%, rgba(15,40,20,0.98) 45%, rgba(10,30,15,0.98) 100%)",
    mobileMenuBorder: "2px solid rgba(74,222,128,0.6)",
    mobileMenuShadow:
      "0 14px 34px rgba(0,0,0,0.6), inset 0 0 24px rgba(22,163,74,0.3), inset 0 0 2px rgba(187,247,208,0.3)",
  },
};

// Theme-specific layout adjustments for desktop
export const THEME_LAYOUT: Record<NavbarTheme, DesktopLayoutConfig> = {
  main: {
    navbarOffsetY: "0px", // Entire navbar offset
    primaryLinksY: "8%", // Primary links offset
    secondaryLinksY: "11%", // Secondary links offset
    primaryLeft: "26%",
    primaryRight: "26%",
    secondaryRight: "3.7%",
    secondaryRightAuth: "0.5%",
  },
  about: {
    navbarOffsetY: "5px",
    primaryLinksY: "1%",
    secondaryLinksY: "1%",
    primaryLeft: "28%",
    primaryRight: "28%",
    secondaryRight: "4%",
    secondaryRightAuth: "2%",
  },
  sponsor: {
    navbarOffsetY: "7px",
    primaryLinksY: "1%",
    secondaryLinksY: "1%",
    primaryLeft: "28%",
    primaryRight: "28%",
    secondaryRight: "5%",
    secondaryRightAuth: "1%",
  },
};

// Theme-specific aspect ratios based on actual image dimensions
export const THEME_ASPECT_RATIOS: Record<NavbarTheme, number> = {
  main: 2928 / 209, // ≈ 14.01
  about: 2928 / 209, // Same as main for consistency
  sponsor: 2928 / 160, // ≈ 18.3 - thinner strip for sponsor
};

// Theme-specific dimension constraints (height and width)
export const THEME_DIMENSIONS: Record<NavbarTheme, DimensionConstraints> = {
  main: { minHeight: 56, maxHeight: 85, maxWidth: 1600 },
  about: { minHeight: 46, maxHeight: 79, maxWidth: 1600 },
  sponsor: { minHeight: 50, maxHeight: 58, maxWidth: 1600 },
};

// Theme-specific top offset adjustments
export const THEME_TOP_OFFSETS: Record<NavbarTheme, number> = {
  main: 0,
  about: 0,
  sponsor: 0,
};
