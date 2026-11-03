export const NAV_ASPECT = 2928 / 209; // ≈ 14.01

export const primaryLinks = [
  { label: "HOME", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "ZONALS", href: "/zonals" },
  { label: "SCHEDULE", href: "/schedule" },
  { label: "SPONSORS", href: "/sponsors" },
  { label: "PASSES", href: "/passes" },
  { label: "CA", href: "/campus-ambassador" },
  { label: "GALLERY", href: "/gallery" },
];

// Links shown only on desktop (hidden on mobile)
export const desktopOnlyLinks = ["GALLERY"];

// Links shown only when user is authenticated
export const authLinks = [{ label: "PURCHASES", href: "/purchases" }];

export const secondaryLinks: { label: string; href: string; icon: "lotus" }[] = [
  { label: "LOGIN", href: "/login", icon: "lotus" },
];
