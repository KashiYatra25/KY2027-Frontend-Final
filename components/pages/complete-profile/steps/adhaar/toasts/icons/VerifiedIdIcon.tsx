// Custom Verified ID Icon - ID card with checkmark
export function VerifiedIdIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card body */}
      <rect
        x="3"
        y="6"
        width="22"
        height="16"
        rx="2"
        fill="url(#cardGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />

      {/* Photo area */}
      <rect x="6" y="9" width="6" height="7" rx="1" fill="#22c55e" opacity="0.4" />

      {/* Person silhouette in photo */}
      <circle cx="9" cy="11.5" r="1.5" fill="#22c55e" opacity="0.6" />
      <path d="M6.5 16C6.5 14 7.5 13 9 13C10.5 13 11.5 14 11.5 16" fill="#22c55e" opacity="0.6" />

      {/* Text lines */}
      <rect x="14" y="9" width="8" height="1.5" rx="0.5" fill="#22c55e" opacity="0.6" />
      <rect x="14" y="12" width="6" height="1.5" rx="0.5" fill="#22c55e" opacity="0.4" />
      <rect x="14" y="15" width="7" height="1.5" rx="0.5" fill="#22c55e" opacity="0.3" />

      {/* Aadhaar-style pattern at bottom */}
      <rect x="6" y="19" width="16" height="1" rx="0.5" fill="#22c55e" opacity="0.2" />

      {/* Verification badge */}
      <circle cx="24" cy="20" r="7" fill="#22c55e" />
      <path
        d="M20.5 20L23 22.5L27.5 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shine effect */}
      <path d="M5 8L7 6" stroke="#4ade80" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />

      <defs>
        <linearGradient
          id="cardGradient"
          x1="3"
          y1="6"
          x2="25"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#134e2a" />
          <stop offset="1" stopColor="#0a2d18" />
        </linearGradient>
      </defs>
    </svg>
  );
}
