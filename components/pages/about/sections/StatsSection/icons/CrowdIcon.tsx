// ═══════════════════════════════════════════════════════════════════
// CROWD ICON - Custom SVG icon for stats
// ═══════════════════════════════════════════════════════════════════

export const CrowdIcon = () => (
  <svg viewBox="0 0 40 40" className="h-10 w-10">
    {/* People silhouettes */}
    <circle cx="10" cy="12" r="4" fill="#6366f1" />
    <path d="M4,28 Q4,20 10,20 Q16,20 16,28" fill="#6366f1" />
    <circle cx="20" cy="10" r="5" fill="#8b5cf6" />
    <path d="M12,28 Q12,18 20,18 Q28,18 28,28" fill="#8b5cf6" />
    <circle cx="30" cy="12" r="4" fill="#6366f1" />
    <path d="M24,28 Q24,20 30,20 Q36,20 36,28" fill="#6366f1" />
    {/* Raised hands */}
    <line x1="8" y1="20" x2="6" y2="14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="18" x2="18" y2="10" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="18" x2="22" y2="10" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="20" x2="34" y2="14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
