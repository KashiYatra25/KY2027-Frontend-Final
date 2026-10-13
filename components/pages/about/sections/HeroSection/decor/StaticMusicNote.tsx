// Static Music Note (no animation)
export const StaticMusicNote = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <g>
      <circle cx="20" cy="70" r="8" fill="#6366f1" />
      <rect x="26" y="30" width="3" height="42" fill="#6366f1" />
      <path
        d="M29,30 Q50,20 45,45"
        fill="none"
        stroke="#6366f1"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
    <g>
      <circle cx="65" cy="60" r="6" fill="#8b5cf6" />
      <rect x="69" y="30" width="3" height="32" fill="#8b5cf6" />
    </g>
  </svg>
);
