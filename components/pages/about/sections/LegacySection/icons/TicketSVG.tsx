// ═══════════════════════════════════════════════════════════════════
// TICKET SVG - Decorative VIP ticket graphic
// ═══════════════════════════════════════════════════════════════════

export const TicketSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 60" className={className}>
    <path
      d="M10,0 L110,0 L110,20 Q100,25 100,30 Q100,35 110,40 L110,60 L10,60 L10,40 Q20,35 20,30 Q20,25 10,20 Z"
      fill="#1a1a2e"
      stroke="#6366f1"
      strokeWidth="2"
    />
    {/* Dashed line */}
    <line
      x1="35"
      y1="5"
      x2="35"
      y2="55"
      stroke="#6366f1"
      strokeWidth="1"
      strokeDasharray="4,4"
      opacity="0.5"
    />
    {/* Text */}
    <text x="70" y="25" textAnchor="middle" fill="#6366f1" fontSize="8" fontWeight="bold">
      KASHI YATRA
    </text>
    <text x="70" y="38" textAnchor="middle" fill="#fff" fontSize="6">
      SINCE 2010
    </text>
    <text x="22" y="35" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="bold">
      VIP
    </text>
  </svg>
);
