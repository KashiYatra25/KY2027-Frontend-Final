import type { NavbarTheme } from "@/components/navbar/types/navbar.types";

/**
 * Theme-aware four-point sparkle that shines beside each nav link.
 */

const THEME_GRADIENTS = {
  main: {
    id: "shineGradMain",
    stops: [
      { offset: "0%", color: "#FFF6D5" },
      { offset: "45%", color: "#FFD700" },
      { offset: "100%", color: "#C8891F" },
    ],
    center: "#FFFBEA",
  },
  about: {
    id: "shineGradAbout",
    stops: [
      { offset: "0%", color: "#E9D5FF" },
      { offset: "45%", color: "#A855F7" },
      { offset: "100%", color: "#6D28D9" },
    ],
    center: "#F3E8FF",
  },
  sponsor: {
    id: "shineGradSponsor",
    stops: [
      { offset: "0%", color: "#DCFCE7" },
      { offset: "45%", color: "#4ADE80" },
      { offset: "100%", color: "#166534" },
    ],
    center: "#F0FDF4",
  },
};

export function ShineIcon({ theme = "main" }: { theme?: NavbarTheme }) {
  const gradient = THEME_GRADIENTS[theme];

  return (
    <span
      aria-hidden
      className="nav-shine relative inline-block shrink-0"
      style={{
        width: "clamp(9px, 0.85vw, 14px)",
        height: "clamp(9px, 0.85vw, 14px)",
      }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <defs>
          <radialGradient id={gradient.id} cx="50%" cy="50%" r="50%">
            {gradient.stops.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </radialGradient>
        </defs>
        <path
          d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
          fill={`url(#${gradient.id})`}
        />
        <circle cx="12" cy="12" r="2.2" fill={gradient.center} />
      </svg>
    </span>
  );
}
