import type { NavbarTheme, DropdownThemeConfig } from "@/components/navbar/types/navbar.types";

// ═══════════════════════════════════════════════════════════════════
// DROPDOWN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

export const DROPDOWN_THEMES: Record<NavbarTheme, DropdownThemeConfig> = {
  main: {
    trigger: {
      background:
        "linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(212,168,83,0.2) 50%, rgba(184,134,11,0.25) 100%)",
      border: "2px solid rgba(255,215,0,0.6)",
      boxShadow:
        "0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,180,0,0.2), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,245,200,0.4)",
    },
    avatarRing: {
      background: "linear-gradient(135deg, #ffd700 0%, #d4a853 50%, #8b6914 100%)",
      boxShadow: "0 0 12px rgba(255,215,0,0.6), 0 0 20px rgba(255,180,0,0.3)",
    },
    avatarBg: "linear-gradient(135deg, #d4a853 0%, #b8860b 50%, #8b6914 100%)",
    textColor: "#3a1505",
    initialsColor: "#1a0a05",
    textShadow: "0 1px 1px rgba(255,245,215,0.7)",
    dropdown: {
      background: "linear-gradient(145deg, #1a0a05 0%, #2d1810 50%, #1a0a05 100%)",
      border: "1px solid rgba(255,215,0,0.4)",
      boxShadow: "0 0 30px rgba(255,215,0,0.2), 0 10px 40px rgba(0,0,0,0.5)",
    },
    nameColor: "#d4a853",
    emailColor: "rgba(255,245,215,0.6)",
    separatorColor: "rgba(255,215,0,0.2)",
    menuItemHover: "rgba(255,215,0,0.1)",
    iconColor: "#d4a853",
    itemColor: "rgba(255,245,215,0.9)",
  },
  about: {
    trigger: {
      background:
        "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(168,85,247,0.25) 50%, rgba(139,92,246,0.3) 100%)",
      border: "2px solid rgba(196,181,253,0.6)",
      boxShadow:
        "0 0 15px rgba(139,92,246,0.4), 0 0 30px rgba(168,85,247,0.2), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
    },
    avatarRing: {
      background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #8b5cf6 100%)",
      boxShadow: "0 0 12px rgba(139,92,246,0.6), 0 0 20px rgba(168,85,247,0.3)",
    },
    avatarBg: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
    textColor: "#f5f0ff",
    initialsColor: "#1a0a2e",
    textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 10px rgba(139,92,246,0.3)",
    dropdown: {
      background: "linear-gradient(145deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)",
      border: "1px solid rgba(139,92,246,0.4)",
      boxShadow: "0 0 30px rgba(139,92,246,0.2), 0 10px 40px rgba(0,0,0,0.5)",
    },
    nameColor: "#c4b5fd",
    emailColor: "rgba(196,181,253,0.6)",
    separatorColor: "rgba(139,92,246,0.3)",
    menuItemHover: "rgba(139,92,246,0.15)",
    iconColor: "#a78bfa",
    itemColor: "rgba(233,213,255,0.9)",
  },
  sponsor: {
    trigger: {
      background:
        "linear-gradient(135deg, rgba(15,60,30,0.9) 0%, rgba(20,80,40,0.85) 50%, rgba(15,60,30,0.9) 100%)",
      border: "2px solid rgba(74,222,128,0.7)",
      boxShadow:
        "0 0 15px rgba(74,222,128,0.5), 0 0 30px rgba(34,197,94,0.3), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(187,247,208,0.2)",
    },
    avatarRing: {
      background: "linear-gradient(135deg, #86efac 0%, #4ade80 50%, #22c55e 100%)",
      boxShadow: "0 0 12px rgba(74,222,128,0.6), 0 0 20px rgba(34,197,94,0.3)",
    },
    avatarBg: "linear-gradient(135deg, #86efac 0%, #4ade80 50%, #22c55e 100%)",
    textColor: "#bbf7d0",
    initialsColor: "#052e05",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
    dropdown: {
      background: "linear-gradient(145deg, #052e05 0%, #0a3d0a 50%, #052e05 100%)",
      border: "1px solid rgba(74,222,128,0.4)",
      boxShadow: "0 0 30px rgba(74,222,128,0.2), 0 10px 40px rgba(0,0,0,0.5)",
    },
    nameColor: "#86efac",
    emailColor: "rgba(187,247,208,0.6)",
    separatorColor: "rgba(74,222,128,0.3)",
    menuItemHover: "rgba(74,222,128,0.15)",
    iconColor: "#4ade80",
    itemColor: "rgba(220,252,231,0.9)",
  },
};
