// ═══════════════════════════════════════════════════════════════════
// STAGE ICON - Custom SVG icon for stats
// ═══════════════════════════════════════════════════════════════════

export const StageIcon = () => (
  <svg viewBox="0 0 40 40" className="h-10 w-10">
    {/* Stage platform */}
    <rect
      x="2"
      y="28"
      width="36"
      height="10"
      rx="2"
      fill="#1a1a2e"
      stroke="#6366f1"
      strokeWidth="2"
    />
    {/* Spotlights */}
    <circle cx="10" cy="8" r="4" fill="#6366f1" />
    <path d="M10,12 L5,28 L15,28 Z" fill="#6366f1" opacity="0.3" />
    <circle cx="30" cy="8" r="4" fill="#8b5cf6" />
    <path d="M30,12 L25,28 L35,28 Z" fill="#8b5cf6" opacity="0.3" />
    {/* Center mic */}
    <rect x="18" y="18" width="4" height="12" rx="1" fill="#6366f1" />
    <circle cx="20" cy="16" r="4" fill="none" stroke="#6366f1" strokeWidth="2" />
  </svg>
);
