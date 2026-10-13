"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks";
import { NavbarDesktop } from "@/components/navbar/desktop";
import { NavbarMobile } from "@/components/navbar/mobile";
import { NavBadge } from "@/components/navbar/common/NavBadge";
import { NavbarProvider } from "@/components/navbar/config/NavbarContext";
import type { NavbarTheme, NavPositionType } from "@/components/navbar/types/navbar.types";
import {
  THEME_CONFIG,
  THEME_ASPECT_RATIOS,
  THEME_DIMENSIONS,
  THEME_TOP_OFFSETS,
  THEME_LAYOUT,
} from "@/components/navbar/config/desktop.config";
import { MOBILE_THEME_STYLES } from "@/components/navbar/config/mobile.config";

type ThemedNavbarProps = {
  className?: string;
  position?: NavPositionType;
  topOffset?: number;
  theme?: NavbarTheme;
};

/**
 * ThemedNavbar - Main navbar component with theme support
 *
 * Themes:
 *   - main: Golden/cream theme (default, for home and most pages)
 *   - about: Purple theme with gold links
 *   - sponsor: Green/nature theme
 */
export function ThemedNavbar({
  className = "",
  position = "fixed",
  topOffset = 0,
  theme = "main",
}: ThemedNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile(640);

  const config = THEME_CONFIG[theme];
  const aspectRatio = THEME_ASPECT_RATIOS[theme];
  const desktopDimensions = THEME_DIMENSIONS[theme];
  const mobileDimensions = MOBILE_THEME_STYLES[theme];
  const layout = THEME_LAYOUT[theme];
  const themeOffset = THEME_TOP_OFFSETS[theme];
  const finalTopOffset = topOffset + themeOffset;

  // Use mobile dimensions on small screens
  const dimensions = isMobile
    ? {
        minHeight: mobileDimensions.minHeight,
        maxHeight: mobileDimensions.maxHeight,
        maxWidth: mobileDimensions.maxWidth,
      }
    : desktopDimensions;

  const navbarOffsetY = isMobile ? mobileDimensions.navbarOffsetY : layout.navbarOffsetY;

  useEffect(() => {
    if (position !== "fixed") return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [position]);

  const edgePinned = position === "fixed" || position === "absolute";

  return (
    <NavbarProvider theme={theme}>
      <header
        className={`${position} ${edgePinned ? "right-0 left-0" : ""} z-[200] transition-all duration-500 ${className}`}
        style={{
          top: position === "relative" ? undefined : finalTopOffset,
          marginTop: position === "relative" ? finalTopOffset : undefined,
          filter: scrolled
            ? "drop-shadow(0 8px 24px rgba(0,0,0,0.55))"
            : "drop-shadow(0 4px 16px rgba(0,0,0,0.35))",
        }}
      >
        {/* Wrapper keeps the bar centered and constrained on large screens */}
        <div
          className="relative mx-auto w-full px-2 pt-2 sm:px-3"
          style={{ maxWidth: dimensions.maxWidth }}
        >
          {/* The ornate bar — its height is driven by width to preserve aspect */}
          <div
            className="relative w-full"
            style={{
              aspectRatio: `${aspectRatio}`,
              minHeight: dimensions.minHeight,
              maxHeight: dimensions.maxHeight,
              transform: `translateY(${navbarOffsetY})`,
            }}
          >
            {/* Background carved bar */}
            <Image
              src={config.getBackground()}
              alt=""
              fill
              priority
              className="pointer-events-none object-fill select-none"
              style={config.backgroundFilter ? { filter: config.backgroundFilter } : undefined}
            />

            {/* IIT BHU Badge */}
            <NavBadge theme={theme} />

            {/* Desktop Navigation */}
            <NavbarDesktop theme={theme} />

            {/* Mobile Navigation */}
            <NavbarMobile theme={theme} />
          </div>
        </div>
      </header>
    </NavbarProvider>
  );
}
