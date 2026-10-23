// Custom Upload Icon - Document with upload arrow
export function UploadDocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document base */}
      <path
        d="M8 4C8 2.9 8.9 2 10 2H18L24 8V28C24 29.1 23.1 30 22 30H10C8.9 30 8 29.1 8 28V4Z"
        fill="url(#docGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />

      {/* Folded corner */}
      <path d="M18 2V8H24" fill="#134e2a" stroke="#22c55e" strokeWidth="1" />

      {/* ID photo placeholder */}
      <rect x="11" y="12" width="6" height="7" rx="1" fill="#22c55e" opacity="0.3" />

      {/* Text lines */}
      <rect x="11" y="21" width="10" height="1.5" rx="0.5" fill="#22c55e" opacity="0.5" />
      <rect x="11" y="24" width="7" height="1.5" rx="0.5" fill="#22c55e" opacity="0.4" />

      {/* Upload arrow badge */}
      <circle cx="22" cy="22" r="6" fill="#22c55e" />
      <path
        d="M22 18V25M22 18L19 21M22 18L25 21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id="docGradient"
          x1="8"
          y1="2"
          x2="24"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0d2818" />
          <stop offset="1" stopColor="#0a1a12" />
        </linearGradient>
      </defs>
    </svg>
  );
}
