import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import type { IconType } from "@/components/pages/home/sections/TheExperience/data/experiences.config";

// ═══════════════════════════════════════════════════════════════════
// CUSTOM SVG ICONS - Jazzy, ornate style
// ═══════════════════════════════════════════════════════════════════

const CrowdIcon = memo(function CrowdIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="crowdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={JAZZ_COLORS.GOLD} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="18" r="8" fill="url(#crowdGrad)" opacity="0.9" />
      <circle cx="44" cy="18" r="8" fill="url(#crowdGrad)" opacity="0.9" />
      <circle cx="32" cy="22" r="9" fill="url(#crowdGrad)" />
      <path d="M8 54 Q20 35 32 38 Q44 35 56 54" fill="url(#crowdGrad)" opacity="0.7" />
      <path d="M14 58 Q23 42 32 45 Q41 42 50 58" fill="url(#crowdGrad)" opacity="0.85" />
      <path
        d="M18 30 L16 22 M22 28 L24 20 M42 28 L40 20 M46 30 L48 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
});

const StageIcon = memo(function StageIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="stageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="14" rx="8" ry="10" fill="url(#stageGrad)" />
      <rect x="30" y="24" width="4" height="20" fill={color} />
      <ellipse cx="32" cy="48" rx="12" ry="4" fill={color} opacity="0.5" />
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1="26"
          y1={8 + i * 3}
          x2="38"
          y2={8 + i * 3}
          stroke={JAZZ_COLORS.BG_DEEP}
          strokeWidth="1.5"
          opacity="0.4"
        />
      ))}
      <path d="M18 14 Q14 14 14 20" stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M12 10 Q6 14 6 24" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M46 14 Q50 14 50 20" stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M52 10 Q58 14 58 24" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
});

const ArtistsIcon = memo(function ArtistsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="guitarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={JAZZ_COLORS.DEEP_MAGENTA} />
        </linearGradient>
      </defs>
      <ellipse cx="42" cy="44" rx="14" ry="16" fill="url(#guitarGrad)" />
      <ellipse cx="42" cy="44" rx="4" ry="5" fill={JAZZ_COLORS.BG_DEEP} />
      <rect x="22" y="8" width="6" height="32" rx="2" fill={color} />
      <rect x="20" y="4" width="10" height="8" rx="2" fill={color} />
      <circle cx="22" cy="6" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="22" cy="10" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="28" cy="6" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="28" cy="10" r="2" fill={JAZZ_COLORS.GOLD} />
      <line
        x1="25"
        y1="14"
        x2="42"
        y2="44"
        stroke={JAZZ_COLORS.GOLD}
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
});

const NightsIcon = memo(function NightsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d="M38 8 A20 20 0 1 1 38 56 A15 15 0 1 0 38 8" fill="url(#moonGrad)" />
      <polygon
        points="14,20 16,24 20,24 17,27 18,32 14,29 10,32 11,27 8,24 12,24"
        fill={JAZZ_COLORS.GOLD}
        opacity="0.8"
      />
      <polygon
        points="52,36 53,38 56,38 54,40 55,43 52,41 49,43 50,40 48,38 51,38"
        fill={JAZZ_COLORS.GOLD}
        opacity="0.6"
      />
      <circle cx="20" cy="42" r="1.5" fill={JAZZ_COLORS.GOLD} opacity="0.5" />
      <circle cx="48" cy="18" r="1" fill={JAZZ_COLORS.GOLD} opacity="0.4" />
    </svg>
  );
});

const EventsIcon = memo(function EventsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor={JAZZ_COLORS.DEEP_MAGENTA} />
          <stop offset="100%" stopColor={JAZZ_COLORS.GOLD} />
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="28" rx="14" ry="18" fill="url(#maskGrad)" />
      <ellipse cx="16" cy="24" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <ellipse cx="28" cy="24" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <path d="M14 36 Q22 44 30 36" stroke={JAZZ_COLORS.BG_DEEP} strokeWidth="2.5" fill="none" />
      <ellipse cx="42" cy="36" rx="14" ry="18" fill={color} opacity="0.6" />
      <ellipse cx="36" cy="32" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <ellipse cx="48" cy="32" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <path d="M34 46 Q42 40 50 46" stroke={JAZZ_COLORS.BG_DEEP} strokeWidth="2" fill="none" />
      <path
        d="M8 50 Q12 45 18 48"
        stroke={JAZZ_COLORS.GOLD}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
});

const FoodIcon = memo(function FoodIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="44" rx="22" ry="10" fill="url(#bowlGrad)" />
      <path d="M10 44 Q10 58 32 58 Q54 58 54 44" fill={color} />
      <ellipse cx="32" cy="40" rx="18" ry="6" fill={JAZZ_COLORS.AMBER} opacity="0.8" />
      <line x1="38" y1="20" x2="48" y2="38" stroke={JAZZ_COLORS.GOLD} strokeWidth="2" />
      <line x1="42" y1="18" x2="50" y2="36" stroke={JAZZ_COLORS.GOLD_DARK} strokeWidth="2" />
      <path
        d="M24 30 Q22 24 26 20 Q24 16 28 12"
        stroke={JAZZ_COLORS.CREAM}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          dur="2s"
          repeatCount="indefinite"
          values="M24 30 Q22 24 26 20 Q24 16 28 12;M24 30 Q26 24 22 20 Q26 16 24 12;M24 30 Q22 24 26 20 Q24 16 28 12"
        />
      </path>
      <path
        d="M32 28 Q30 22 34 18 Q32 14 36 10"
        stroke={JAZZ_COLORS.CREAM}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      >
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M32 28 Q30 22 34 18 Q32 14 36 10;M32 28 Q34 22 30 18 Q34 14 32 10;M32 28 Q30 22 34 18 Q32 14 36 10"
        />
      </path>
    </svg>
  );
});

// Icon lookup map
const ICON_MAP: Record<IconType, React.FC<{ color: string }>> = {
  crowd: CrowdIcon,
  stage: StageIcon,
  artists: ArtistsIcon,
  nights: NightsIcon,
  events: EventsIcon,
  food: FoodIcon,
};

export const JazzIcon = memo(function JazzIcon({ type, color }: { type: IconType; color: string }) {
  const IconComponent = ICON_MAP[type];
  return <IconComponent color={color} />;
});
