// Custom Verify Error Icon - ID card with warning
export function VerifyErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card body */}
      <rect
        x="3"
        y="6"
        width="22"
        height="16"
        rx="2"
        fill="url(#cardErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />

      {/* Photo area with question mark */}
      <rect x="6" y="9" width="6" height="7" rx="1" fill="#ef4444" opacity="0.2" />
      <text
        x="9"
        y="14"
        textAnchor="middle"
        fill="#ef4444"
        fontSize="6"
        fontWeight="bold"
        opacity="0.6"
      >
        ?
      </text>

      {/* Broken text lines */}
      <rect x="14" y="9" width="4" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="19" y="9" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="14" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="14" y="15" width="5" height="1.5" rx="0.5" fill="#ef4444" opacity="0.2" />

      {/* Warning badge */}
      <circle cx="24" cy="20" r="7" fill="#ef4444" />
      <path d="M24 16V20M24 23V23.01" stroke="white" strokeWidth="2" strokeLinecap="round" />

      <defs>
        <linearGradient
          id="cardErrorGradient"
          x1="3"
          y1="6"
          x2="25"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4e1a1a" />
          <stop offset="1" stopColor="#2d0a12" />
        </linearGradient>
      </defs>
    </svg>
  );
}
