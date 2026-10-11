// ═══════════════════════════════════════════════════════════════════
// NAVBAR TYPES
// ═══════════════════════════════════════════════════════════════════

export type NavbarTheme = "main" | "about" | "sponsor";

export type NavPositionType = "fixed" | "sticky" | "relative" | "absolute";

// Link style configuration
export type LinkStyle = {
  color: string;
  activeColor: string;
  activeBg: string;
  inactiveBg: string;
  activeBorder: string;
  inactiveBorder: string;
  activeShadow: string;
  inactiveShadow: string;
  activeTextShadow: string;
  inactiveTextShadow: string;
};

// Badge glow configuration
export type BadgeGlow = {
  outer: string;
  inner: string;
};

// Theme visual configuration
export type ThemeVisualConfig = {
  getBackground: () => string;
  getBadge: () => string;
  badgeGlow: BadgeGlow;
  linkStyle: LinkStyle;
  backgroundFilter?: string; // CSS filter for background image
  hamburgerGradient: string;
  mobileMenuBg: string;
  mobileMenuBorder: string;
  mobileMenuShadow: string;
};

// Desktop layout configuration
export type DesktopLayoutConfig = {
  navbarOffsetY: string; // Translate entire navbar vertically
  primaryLinksY: string; // Translate primary links vertically
  secondaryLinksY: string; // Translate secondary links vertically
  primaryLeft: string;
  primaryRight: string;
  secondaryRight: string;
  secondaryRightAuth: string; // Position when user is authenticated (avatar shown)
};

// Height and width constraints
export type DimensionConstraints = {
  minHeight: number;
  maxHeight: number;
  maxWidth: number; // Max width of navbar container
};

// Badge style configuration
export type BadgeStyleConfig = {
  position: string;
  size: string;
};

// Mobile theme style configuration
export type MobileThemeStyle = {
  hamburgerGradient: string;
  hamburgerShadow: string; // Glow/shadow effect for hamburger lines
  hamburgerTop: string; // Vertical position of hamburger (e.g., "58%", "50%")
  // Mobile navbar dimensions
  navbarOffsetY: string; // Translate entire navbar vertically on mobile
  minHeight: number;
  maxHeight: number;
  maxWidth: number;
  panelBg: string;
  panelBorder: string;
  panelShadow: string;
  textColor: string;
  textColorSecondary: string;
  textColorInactive: string;
  dividerColor: string;
  accentGold: string;
  accentBronze: string;
  activeGradient: string;
  activeShadow: string;
  activeTextShadow: string;
  inactiveTextShadow: string;
  headerGradient: string;
  mandalaStroke: string;
};

// Dropdown trigger style
export type DropdownTriggerStyle = {
  background: string;
  border: string;
  boxShadow: string;
};

// Dropdown style configuration
export type DropdownThemeConfig = {
  trigger: DropdownTriggerStyle;
  avatarRing: {
    background: string;
    boxShadow: string;
  };
  avatarBg: string;
  textColor: string;
  initialsColor: string;
  textShadow: string;
  dropdown: {
    background: string;
    border: string;
    boxShadow: string;
  };
  nameColor: string;
  emailColor: string;
  separatorColor: string;
  menuItemHover: string;
  iconColor: string;
  itemColor: string;
};

// Nav link configuration
export type NavLink = {
  label: string;
  href: string;
  icon?: "lotus";
};
