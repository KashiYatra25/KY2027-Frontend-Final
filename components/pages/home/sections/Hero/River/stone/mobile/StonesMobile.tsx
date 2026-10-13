"use client";

import { memo } from "react";
import { useSession } from "next-auth/react";
import { Z_HERO, POS_STONES, SIZE_STONES } from "@/components/pages/home/constants";
import { SteppingStone } from "@/components/pages/home/sections/Hero/River/stone/SteppingStone";

/**
 * Mobile stones - shown only on mobile (< 640px)
 * Uses mobile positions and sizes from constants
 */
export const StonesMobile = memo(function StonesMobile() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  return (
    <>
      {/* Schedule - left side */}
      <div
        className="pointer-events-auto absolute sm:pointer-events-none sm:opacity-0"
        style={{
          zIndex: Z_HERO.STONE_SCHEDULE,
          bottom: POS_STONES.SCHEDULE.mobile.bottom,
          left: POS_STONES.SCHEDULE.mobile.left,
        }}
      >
        <SteppingStone
          label="Schedule"
          href="/schedule"
          size={SIZE_STONES.SCHEDULE.mobile}
          phase={0}
        />
      </div>

      {/* Events - left-center */}
      <div
        className="pointer-events-auto absolute sm:pointer-events-none sm:opacity-0"
        style={{
          zIndex: Z_HERO.STONE_EVENTS,
          bottom: POS_STONES.EVENTS.mobile.bottom,
          left: POS_STONES.EVENTS.mobile.left,
        }}
      >
        <SteppingStone
          label="Events"
          href="/events"
          size={SIZE_STONES.EVENTS.mobile}
          phase={-0.8}
        />
      </div>

      {/* Register/Profile - center (main CTA) */}
      <div
        className="pointer-events-auto absolute sm:pointer-events-none sm:opacity-0"
        style={{
          zIndex: Z_HERO.STONE_REGISTER,
          bottom: POS_STONES.REGISTER.mobile.bottom,
          left: POS_STONES.REGISTER.mobile.left,
          transform: POS_STONES.REGISTER.mobile.transform,
        }}
      >
        <SteppingStone
          label={isLoading ? undefined : isLoggedIn ? "Profile" : "Register"}
          href={isLoggedIn ? "/profile" : "/login"}
          size={SIZE_STONES.REGISTER.mobile}
          phase={-1.6}
          loadingSpinner={isLoading}
        />
      </div>

      {/* Gallery - right-center */}
      <div
        className="pointer-events-auto absolute sm:pointer-events-none sm:opacity-0"
        style={{
          zIndex: Z_HERO.STONE_GALLERY,
          bottom: POS_STONES.GALLERY.mobile.bottom,
          right: POS_STONES.GALLERY.mobile.right,
        }}
      >
        <SteppingStone
          label="Gallery"
          href="/gallery"
          size={SIZE_STONES.GALLERY.mobile}
          phase={-0.4}
        />
      </div>

      {/* About - right side */}
      <div
        className="pointer-events-auto absolute sm:pointer-events-none sm:opacity-0"
        style={{
          zIndex: Z_HERO.STONE_ABOUT,
          bottom: POS_STONES.ABOUT.mobile.bottom,
          right: POS_STONES.ABOUT.mobile.right,
        }}
      >
        <SteppingStone label="About" href="/about" size={SIZE_STONES.ABOUT.mobile} phase={-1.2} />
      </div>
    </>
  );
});
