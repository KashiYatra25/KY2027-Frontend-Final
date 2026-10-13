// ═══════════════════════════════════════════════════════════════════
// TROPHY ICON - Custom SVG icon for stats
// ═══════════════════════════════════════════════════════════════════

export const TrophyIcon = () => (
  <svg viewBox="0 0 40 40" className="h-10 w-10">
    {/* Cup */}
    <path
      d="M10,8 L10,20 Q10,28 20,28 Q30,28 30,20 L30,8 Z"
      fill="none"
      stroke="#6366f1"
      strokeWidth="2"
    />
    {/* Handles */}
    <path d="M10,12 Q2,12 2,18 Q2,22 10,22" fill="none" stroke="#6366f1" strokeWidth="2" />
    <path d="M30,12 Q38,12 38,18 Q38,22 30,22" fill="none" stroke="#6366f1" strokeWidth="2" />
    {/* Base */}
    <rect x="16" y="28" width="8" height="4" fill="#6366f1" />
    <rect x="12" y="32" width="16" height="4" rx="1" fill="#6366f1" />
    {/* Star */}
    <polygon points="20,12 22,16 26,16 23,19 24,23 20,21 16,23 17,19 14,16 18,16" fill="#6366f1" />
  </svg>
);
