import type { NavbarTheme } from "@/components/navbar/types/navbar.types";

/**
 * Theme-aware spiritual / ethereal glyph beside secondary links.
 */

const THEME_COLORS = {
  main: {
    lotusId: "lotusGold",
    lotusStops: [
      { offset: "0%", color: "#FFF3C4" },
      { offset: "50%", color: "#FFD700" },
      { offset: "100%", color: "#C8891F" },
    ],
    strokeColor: "#FFE9A8",
  },
  about: {
    lotusId: "lotusPurple",
    lotusStops: [
      { offset: "0%", color: "#E9D5FF" },
      { offset: "50%", color: "#A855F7" },
      { offset: "100%", color: "#6D28D9" },
    ],
    strokeColor: "#C4B5FD",
  },
  sponsor: {
    lotusId: "lotusGreen",
    lotusStops: [
      { offset: "0%", color: "#DCFCE7" },
      { offset: "50%", color: "#4ADE80" },
      { offset: "100%", color: "#166534" },
    ],
    strokeColor: "#BBF7D0",
  },
};

export function SpiritualIcon({
  theme = "main",
  className = "",
}: {
  kind?: "lotus";
  theme?: NavbarTheme;
  className?: string;
}) {
  const colors = THEME_COLORS[theme];

  return (
    <span
      aria-hidden
      className={`spirit-icon relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: "clamp(15px, 1.3vw, 22px)",
        height: "clamp(15px, 1.3vw, 22px)",
      }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <defs>
          <linearGradient id={colors.lotusId} x1="0%" y1="0%" x2="0%" y2="100%">
            {colors.lotusStops.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
        <path
          d="M12 3 C13.6 8 13.6 13 12 17 C10.4 13 10.4 8 12 3 Z"
          fill={`url(#${colors.lotusId})`}
        />
        <path
          d="M12 17 C9 13 6.5 10.5 4 9.5 C5 13 8 16 12 17 Z"
          fill={`url(#${colors.lotusId})`}
          opacity="0.92"
        />
        <path
          d="M12 17 C15 13 17.5 10.5 20 9.5 C19 13 16 16 12 17 Z"
          fill={`url(#${colors.lotusId})`}
          opacity="0.92"
        />
        <path
          d="M12 17 C7 15 3.5 13.5 1.5 12.5 C3 16 7 18 12 18 Z"
          fill={`url(#${colors.lotusId})`}
          opacity="0.8"
        />
        <path
          d="M12 17 C17 15 20.5 13.5 22.5 12.5 C21 16 17 18 12 18 Z"
          fill={`url(#${colors.lotusId})`}
          opacity="0.8"
        />
        <path
          d="M3 19 Q12 21 21 19"
          stroke={colors.strokeColor}
          strokeWidth="0.8"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>
    </span>
  );
}
