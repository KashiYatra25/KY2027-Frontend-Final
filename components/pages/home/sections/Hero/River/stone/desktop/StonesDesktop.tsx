"use client";

import { memo } from "react";
import { useSession } from "next-auth/react";
import { Z_HERO, POS_STONES, SIZE_STONES } from "@/components/pages/home/constants";
import { SteppingStone } from "@/components/pages/home/sections/Hero/River/stone/SteppingStone";

/**
 * Desktop stones - shown only on sm+ (>= 640px)
 * Uses sm positions and desktop sizes from constants
 */
export const StonesDesktop = memo(function StonesDesktop() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  return (
    <>
      {/* Schedule - left side */}
      <div
        className="pointer-events-auto absolute opacity-0 sm:opacity-100"
        style={{
          zIndex: Z_HERO.STONE_SCHEDULE,
          bottom: POS_STONES.SCHEDULE.sm.bottom,
          left: POS_STONES.SCHEDULE.sm.left,
        }}
      >
        <SteppingStone
          label="Schedule"
          href="/schedule"
          size={SIZE_STONES.SCHEDULE.desktop}
          phase={0}
        />
      </div>

      {/* Events - left-center */}
      <div
        className="pointer-events-auto absolute opacity-0 sm:opacity-100"
        style={{
          zIndex: Z_HERO.STONE_EVENTS,
          bottom: POS_STONES.EVENTS.sm.bottom,
          left: POS_STONES.EVENTS.sm.left,
        }}
      >
        <SteppingStone
          label="Events"
          href="/events"
          size={SIZE_STONES.EVENTS.desktop}
          phase={-0.8}
        />
      </div>

      {/* Register/Profile - center (main CTA) */}
      <div
        className="pointer-events-auto absolute opacity-0 sm:opacity-100"
        style={{
          zIndex: Z_HERO.STONE_REGISTER,
          bottom: POS_STONES.REGISTER.sm.bottom,
          left: POS_STONES.REGISTER.sm.left,
          transform: POS_STONES.REGISTER.sm.transform,
        }}
      >
        <SteppingStone
          label={isLoading ? undefined : isLoggedIn ? "Profile" : "Register"}
          href={isLoggedIn ? "/profile" : "/login"}
          size={SIZE_STONES.REGISTER.desktop}
          phase={-1.6}
          loadingSpinner={isLoading}
        />
      </div>

      {/* Gallery - right-center */}
      <div
        className="pointer-events-auto absolute opacity-0 sm:opacity-100"
        style={{
          zIndex: Z_HERO.STONE_GALLERY,
          bottom: POS_STONES.GALLERY.sm.bottom,
          left: POS_STONES.GALLERY.sm.left,
        }}
      >
        <SteppingStone
          label="Gallery"
          href="/gallery"
          size={SIZE_STONES.GALLERY.desktop}
          phase={-0.4}
        />
      </div>

      {/* About - right side */}
      <div
        className="pointer-events-auto absolute opacity-0 sm:opacity-100"
        style={{
          zIndex: Z_HERO.STONE_ABOUT,
          bottom: POS_STONES.ABOUT.sm.bottom,
          left: POS_STONES.ABOUT.sm.left,
        }}
      >
        <SteppingStone label="About" href="/about" size={SIZE_STONES.ABOUT.desktop} phase={-1.2} />
      </div>
    </>
  );
});
