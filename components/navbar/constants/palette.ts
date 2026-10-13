// ═══════════════════════════════════════════════════════════════════
// NAVBAR COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════
// Centralized color tokens for the navbar. These values were previously
// hardcoded across the desktop/mobile configs and components. Keeping them
// here makes theming consistent and easy to adjust.

import type { NavbarTheme } from "@/components/navbar/types/navbar.types";

/**
 * Core brand colors used across navbar themes.
 */
export const NAVBAR_COLORS = {
  // Gold / main theme
  gold: "#FFD700",
  goldSoft: "#FFB400",
  goldLight: "#FFE664",
  goldPale: "#FFF6D5",
  goldDeep: "#C8891F",
  cream: "#FFFBEA",
  brownDark: "#3a1505",
  bronze: "#d4a853",
  bronzeDark: "#8a5a1a",

  // About / purple theme
  purple: "#A855F7",
  purpleSoft: "#8B5CF6",
  purpleLight: "#E9D5FF",
  purpleDeep: "#6D28D9",
  purplePale: "#F3E8FF",
  purpleText: "#f5f0ff",

  // Sponsor / green theme
  green: "#4ADE80",
  greenSoft: "#22C55E",
  greenLight: "#DCFCE7",
  greenDeep: "#166534",
  greenPale: "#F0FDF4",
  greenText: "#1a3a1a",
  greenTextDeep: "#022c02",
  brownOlive: "#5c4033",
  brownOliveLight: "#8b5a2b",
} as const;

/**
 * Core RGB glow values (used inside rgba(...) expressions) keyed by theme.
 * Centralizes the "accent glow" color that drives active-link drop shadows.
 */
export const THEME_ACCENT_GLOW_RGB: Record<NavbarTheme, string> = {
  main: "255,120,50",
  about: "139,92,246",
  sponsor: "74,222,128",
};

/**
 * Returns the active-link drop-shadow filter for a given theme.
 */
export const getActiveLinkGlow = (theme: NavbarTheme): string =>
  `drop-shadow(0 0 6px rgba(${THEME_ACCENT_GLOW_RGB[theme]},0.6))`;
