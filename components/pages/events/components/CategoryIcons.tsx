"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// NATRAJ - Dance (elegant classical dancer pose)
// ═══════════════════════════════════════════════════════════════════
export const NatrajIcon = memo(function NatrajIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="32" cy="10" r="5" fill={color} />
      {/* Body */}
      <path
        d="M32 15C32 15 30 22 30 28C30 32 31 36 32 40"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right arm raised */}
      <path d="M32 20C36 18 42 14 46 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left arm extended */}
      <path d="M32 22C28 24 22 28 16 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right leg bent */}
      <path d="M32 40C34 44 38 48 42 54" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leg extended */}
      <path d="M32 40C30 46 26 52 20 58" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Decorative swirl - dance motion */}
      <path
        d="M46 10C48 8 50 10 48 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M16 30C12 32 12 36 16 36"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CROSSWINDZ - Music (electric guitar)
// ═══════════════════════════════════════════════════════════════════
export const CrosswindzIcon = memo(function CrosswindzIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Guitar body */}
      <path
        d="M20 36C16 36 12 40 12 46C12 52 16 56 22 56C26 56 30 54 32 50C34 54 38 56 42 56C48 56 52 52 52 46C52 40 48 36 44 36C40 36 38 38 36 40L32 44L28 40C26 38 24 36 20 36Z"
        fill={color}
        opacity="0.9"
      />
      {/* Sound hole */}
      <circle cx="26" cy="46" r="4" fill="black" opacity="0.2" />
      <circle cx="38" cy="46" r="4" fill="black" opacity="0.2" />
      {/* Neck */}
      <rect x="30" y="8" width="4" height="32" rx="1" fill={color} />
      {/* Headstock */}
      <path d="M28 8L36 8L38 4L26 4L28 8Z" fill={color} />
      {/* Tuning pegs */}
      <circle cx="28" cy="6" r="1.5" fill={color} opacity="0.7" />
      <circle cx="36" cy="6" r="1.5" fill={color} opacity="0.7" />
      {/* Strings */}
      <line x1="30" y1="12" x2="30" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="32" y1="12" x2="32" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="12" x2="34" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// BANDISH - Classical Music (tabla/sitar fusion)
// ═══════════════════════════════════════════════════════════════════
export const BandishIcon = memo(function BandishIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tabla - left drum */}
      <ellipse cx="20" cy="50" rx="12" ry="6" fill={color} opacity="0.9" />
      <path d="M8 50L8 36C8 32 13 28 20 28C27 28 32 32 32 36L32 50" fill={color} opacity="0.8" />
      <ellipse cx="20" cy="36" rx="12" ry="5" fill={color} />
      <circle cx="20" cy="36" r="5" fill="black" opacity="0.2" />
      {/* Tabla - right drum (smaller) */}
      <ellipse cx="46" cy="52" rx="10" ry="5" fill={color} opacity="0.9" />
      <path d="M36 52L36 40C36 36 40 33 46 33C52 33 56 36 56 40L56 52" fill={color} opacity="0.7" />
      <ellipse cx="46" cy="40" rx="10" ry="4" fill={color} opacity="0.8" />
      <circle cx="46" cy="40" r="4" fill="black" opacity="0.15" />
      {/* Musical notes floating */}
      <path
        d="M14 20C14 16 18 14 18 18L18 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="16" cy="24" r="2" fill={color} opacity="0.5" />
      <path
        d="M50 14C50 10 54 8 54 12L54 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="52" cy="20" r="2" fill={color} opacity="0.5" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// ABHINAY - Theatre (comedy/tragedy masks)
// ═══════════════════════════════════════════════════════════════════
export const AbhinayIcon = memo(function AbhinayIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Happy mask - front */}
      <path
        d="M10 18C10 12 18 8 26 8C34 8 42 12 42 18L42 34C42 42 34 48 26 48C18 48 10 42 10 34L10 18Z"
        fill={color}
        opacity="0.95"
      />
      {/* Happy eyes */}
      <path
        d="M18 22C18 20 20 18 22 20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M30 22C30 20 32 18 34 20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* Happy smile */}
      <path
        d="M18 34C22 40 30 40 34 34"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      {/* Sad mask - behind */}
      <path
        d="M22 24C22 18 30 14 38 14C46 14 54 18 54 24L54 40C54 48 46 54 38 54C30 54 22 48 22 40L22 24Z"
        fill={color}
        opacity="0.5"
      />
      {/* Sad eyes */}
      <path
        d="M32 30C32 32 34 34 36 32"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M44 30C44 32 46 34 48 32"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      {/* Sad frown */}
      <path
        d="M32 46C36 42 44 42 48 46"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MIRAGE - Fashion (elegant dress silhouette)
// ═══════════════════════════════════════════════════════════════════
export const MirageIcon = memo(function MirageIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dress form / mannequin */}
      <circle cx="32" cy="10" r="5" fill={color} />
      {/* Neckline */}
      <path
        d="M26 16L32 20L38 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bodice */}
      <path d="M24 18C24 18 26 28 28 32L36 32C38 28 40 18 40 18" fill={color} opacity="0.9" />
      {/* Flowing skirt */}
      <path
        d="M28 32C24 40 18 52 14 58L50 58C46 52 40 40 36 32L28 32Z"
        fill={color}
        opacity="0.85"
      />
      {/* Skirt details */}
      <path d="M24 42L22 58" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M32 32L32 58" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M40 42L42 58" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Sparkle accents */}
      <circle cx="30" cy="26" r="1" fill={color} opacity="0.5" />
      <circle cx="34" cy="28" r="1" fill={color} opacity="0.5" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// TOOLIKA - Art (paintbrush with palette)
// ═══════════════════════════════════════════════════════════════════
export const ToolikaIcon = memo(function ToolikaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Palette */}
      <path
        d="M12 36C12 28 20 22 32 22C44 22 52 28 52 36C52 44 44 52 32 52C20 52 12 44 12 36Z"
        fill={color}
        opacity="0.8"
      />
      {/* Thumb hole */}
      <ellipse cx="22" cy="40" rx="5" ry="4" fill="black" opacity="0.15" />
      {/* Paint dots */}
      <circle cx="32" cy="30" r="4" fill={color} opacity="0.5" />
      <circle cx="42" cy="34" r="3" fill={color} opacity="0.4" />
      <circle cx="38" cy="44" r="3.5" fill={color} opacity="0.45" />
      <circle cx="26" cy="46" r="3" fill={color} opacity="0.4" />
      {/* Paintbrush */}
      <rect x="40" y="4" width="4" height="24" rx="1" fill={color} transform="rotate(30 42 16)" />
      {/* Brush tip */}
      <path d="M52 8L58 4L56 12L52 8Z" fill={color} opacity="0.9" />
      {/* Ferrule */}
      <rect
        x="48"
        y="8"
        width="5"
        height="3"
        rx="0.5"
        fill={color}
        opacity="0.7"
        transform="rotate(30 50 9)"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// ENQUIZTA - Quiz (lightbulb with question mark)
// ═══════════════════════════════════════════════════════════════════
export const EnquiztaIcon = memo(function EnquiztaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightbulb glass */}
      <path
        d="M32 6C22 6 14 14 14 24C14 32 20 38 24 42L24 48L40 48L40 42C44 38 50 32 50 24C50 14 42 6 32 6Z"
        fill={color}
        opacity="0.9"
      />
      {/* Bulb base */}
      <rect x="24" y="48" width="16" height="4" rx="1" fill={color} />
      <rect x="26" y="52" width="12" height="3" rx="1" fill={color} opacity="0.8" />
      <rect x="28" y="55" width="8" height="3" rx="1" fill={color} opacity="0.6" />
      {/* Question mark inside */}
      <path
        d="M28 22C28 18 32 16 36 18C40 20 38 26 34 28L34 32"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="34" cy="38" r="2" fill="black" opacity="0.25" />
      {/* Glow rays */}
      <path d="M32 2L32 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M48 10L52 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 10L12 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M54 24L58 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M10 24L6 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// SAMWAAD - Literary (open book with quill)
// ═══════════════════════════════════════════════════════════════════
export const SamwaadIcon = memo(function SamwaadIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open book - left page */}
      <path
        d="M32 16C32 16 24 14 12 14L12 52C24 52 32 50 32 50L32 16Z"
        fill={color}
        opacity="0.85"
      />
      {/* Open book - right page */}
      <path
        d="M32 16C32 16 40 14 52 14L52 52C40 52 32 50 32 50L32 16Z"
        fill={color}
        opacity="0.9"
      />
      {/* Book spine */}
      <path d="M32 16L32 50" stroke={color} strokeWidth="2" />
      {/* Text lines - left */}
      <line x1="16" y1="24" x2="28" y2="24" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="30" x2="26" y2="30" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="36" x2="28" y2="36" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="42" x2="24" y2="42" stroke="black" strokeWidth="1" opacity="0.15" />
      {/* Text lines - right */}
      <line x1="36" y1="24" x2="48" y2="24" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="36" y1="30" x2="46" y2="30" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="36" y1="36" x2="48" y2="36" stroke="black" strokeWidth="1" opacity="0.15" />
      {/* Quill pen */}
      <path
        d="M48 8C48 8 52 4 56 2C56 6 54 10 50 14L46 18L44 16L48 8Z"
        fill={color}
        opacity="0.7"
      />
      <path d="M44 16L38 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// ZAIKA - Culinary (chef hat with steam)
// ═══════════════════════════════════════════════════════════════════
export const ZaikaIcon = memo(function ZaikaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chef hat top (toque) */}
      <path
        d="M16 28C12 28 10 24 10 20C10 14 16 10 20 10C22 6 26 4 32 4C38 4 42 6 44 10C48 10 54 14 54 20C54 24 52 28 48 28L16 28Z"
        fill={color}
        opacity="0.9"
      />
      {/* Hat band */}
      <rect x="14" y="28" width="36" height="6" rx="1" fill={color} />
      {/* Hat body pleats */}
      <path d="M20 10L22 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M28 6L28 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M36 6L36 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M44 10L42 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Plate */}
      <ellipse cx="32" cy="54" rx="20" ry="6" fill={color} opacity="0.7" />
      <ellipse cx="32" cy="52" rx="14" ry="4" fill={color} opacity="0.5" />
      {/* Steam wisps */}
      <path
        d="M24 40C24 38 26 36 26 38C26 40 24 42 24 40Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M32 38C32 36 34 34 34 36C34 38 32 40 32 38Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M40 40C40 38 42 36 42 38C42 40 40 42 40 40Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// ICON MAP
// ═══════════════════════════════════════════════════════════════════

export const CATEGORY_ICONS: Record<string, React.FC<CategoryIconProps>> = {
  NATRAJ: NatrajIcon,
  CROSSWINDZ: CrosswindzIcon,
  BANDISH: BandishIcon,
  ABHINAY: AbhinayIcon,
  MIRAGE: MirageIcon,
  TOOLIKA: ToolikaIcon,
  ENQUIZTA: EnquiztaIcon,
  SAMWAAD: SamwaadIcon,
  ZAIKA: ZaikaIcon,
};

// Helper to get icon by category slug
export function getCategoryIcon(categorySlug: string): React.FC<CategoryIconProps> | null {
  if (!categorySlug) return null;
  return CATEGORY_ICONS[categorySlug.toUpperCase()] || null;
}
