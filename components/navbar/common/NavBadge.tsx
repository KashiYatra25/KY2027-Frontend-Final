import Image from "next/image";
import Link from "next/link";
import type { NavbarTheme } from "@/components/navbar/types/navbar.types";
import { THEME_CONFIG } from "@/components/navbar/config/desktop.config";
import { BADGE_STYLES } from "@/components/navbar/config/badge.config";

/**
 * Theme-aware IIT BHU Badge
 */
export function NavBadge({ theme = "main" }: { theme?: NavbarTheme }) {
  const config = THEME_CONFIG[theme];
  const badgeStyle = BADGE_STYLES[theme];

  return (
    <Link
      href="/"
      aria-label="Kashi Yatra — Home"
      className={`absolute ${badgeStyle.position} z-10 aspect-square ${badgeStyle.size} -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105`}
    >
      <Image
        src={config.getBadge()}
        alt="IIT BHU"
        fill
        priority
        sizes="120px"
        className="relative object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      />
    </Link>
  );
}
