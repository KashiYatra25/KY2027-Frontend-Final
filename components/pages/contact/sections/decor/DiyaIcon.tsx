"use client";

/**
 * DiyaIcon
 *
 * Shared decorative diya SVG used by the contact toasts. Gradient ids are
 * suffixed with a unique `id` prop so multiple instances can safely coexist
 * on the same page without clashing `<defs>` ids.
 */
export function DiyaIcon({ className, id = "default" }: { className?: string; id?: string }) {
  const flameId = `diyaFlameGradient-${id}`;
  const bowlId = `diyaBowlGradient-${id}`;
  const baseId = `diyaBaseGradient-${id}`;

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <path
        d="M12 2C12 2 9 5 9 7.5C9 9.5 10.5 11 12 11C13.5 11 15 9.5 15 7.5C15 5 12 2 12 2Z"
        fill={`url(#${flameId})`}
      />
      {/* Inner flame */}
      <path
        d="M12 4C12 4 10.5 6 10.5 7.5C10.5 8.5 11.2 9.5 12 9.5C12.8 9.5 13.5 8.5 13.5 7.5C13.5 6 12 4 12 4Z"
        fill="#FFF3B0"
      />
      {/* Diya bowl */}
      <path
        d="M6 14C6 12.5 8 11 12 11C16 11 18 12.5 18 14C18 15.5 16 17 12 17C8 17 6 15.5 6 14Z"
        fill={`url(#${bowlId})`}
      />
      {/* Base */}
      <path d="M8 17L7 20C7 21 9 22 12 22C15 22 17 21 17 20L16 17" fill={`url(#${baseId})`} />

      <defs>
        <linearGradient id={flameId} x1="12" y1="2" x2="12" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF6B35" />
        </linearGradient>
        <linearGradient id={bowlId} x1="6" y1="11" x2="18" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CD7F32" />
          <stop offset="0.5" stopColor="#B8860B" />
          <stop offset="1" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id={baseId} x1="7" y1="17" x2="17" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CD7F32" />
          <stop offset="1" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}
