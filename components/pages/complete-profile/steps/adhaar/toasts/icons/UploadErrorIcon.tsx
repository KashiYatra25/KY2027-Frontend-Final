// Custom Upload Error Icon - Document with X
export function UploadErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document base */}
      <path
        d="M8 4C8 2.9 8.9 2 10 2H18L24 8V28C24 29.1 23.1 30 22 30H10C8.9 30 8 29.1 8 28V4Z"
        fill="url(#docErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />

      {/* Folded corner */}
      <path d="M18 2V8H24" fill="#2d0a12" stroke="#ef4444" strokeWidth="1" />

      {/* Broken/dashed lines */}
      <rect x="11" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="16" y="12" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.4" />
      <rect x="11" y="16" width="4" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />
      <rect x="11" y="20" width="6" height="1.5" rx="0.5" fill="#ef4444" opacity="0.3" />

      {/* Error badge */}
      <circle cx="22" cy="22" r="6" fill="#ef4444" />
      <path
        d="M19.5 19.5L24.5 24.5M24.5 19.5L19.5 24.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient
          id="docErrorGradient"
          x1="8"
          y1="2"
          x2="24"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2d0a12" />
          <stop offset="1" stopColor="#1a0a0e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
