"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserProfile, UserAccountProgress, ProfileUser } from "@/lib/api/helper/types";
import { AvatarSection } from "./AvatarSection";
import { UserInfoSection } from "./UserInfoSection";

// ═══════════════════════════════════════════════════════════════════
// PROFILE HERO SECTION
// Main profile card with avatar, name, and quick actions
// ═══════════════════════════════════════════════════════════════════

interface ProfileHeroProps {
  userData: UserProfile | null;
  user: ProfileUser;
  progress: UserAccountProgress | null;
  isApprovedCa?: boolean;
}

export function ProfileHero({ userData, user, progress, isApprovedCa }: ProfileHeroProps) {
  const initials =
    (userData?.firstName || user.name)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-3xl"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG_WINE}80 0%, ${COLORS.BG_ROYAL}90 50%, ${COLORS.BG_WINE}80 100%)`,
        border: `2px solid ${COLORS.GOLD}30`,
        boxShadow: `
          0 0 80px ${COLORS.GOLD}10, 
          0 0 120px ${COLORS.GOLD}05,
          0 25px 50px rgba(0,0,0,0.4),
          inset 0 1px 0 ${COLORS.GOLD}20
        `,
      }}
    >
      {/* Ornate Top Border */}
      <div className="relative h-2 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: progress?.isProfileComplete
              ? `linear-gradient(90deg, transparent, ${COLORS.SUCCESS}60, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}60, transparent)`
              : `linear-gradient(90deg, transparent, ${COLORS.GOLD_DARK}, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, transparent)`,
          }}
        />
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.GOLD_SHIMMER}80 50%, transparent 100%)`,
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Mandala Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50' stroke='%23d4a853' stroke-width='0.3'/%3E%3Cpath d='M50 10 L90 50 L50 90 L10 50 Z' stroke='%23d4a853' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Diya Decoration */}
      <div className="absolute top-6 right-16 h-10 w-10 animate-pulse opacity-40">
        <Image
          src={IMAGES.contact.floatingDiya}
          alt=""
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="relative px-8 py-12 sm:px-12">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
          {/* Avatar Section */}
          <AvatarSection userData={userData} user={user} progress={progress} initials={initials} />

          {/* Decorative Divider */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2 lg:self-stretch lg:py-4">
            <div
              className="h-full w-px"
              style={{
                background: `linear-gradient(180deg, transparent, ${COLORS.GOLD}50, ${COLORS.GOLD}, ${COLORS.GOLD}50, transparent)`,
              }}
            />
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${COLORS.BG_DEEP}, ${COLORS.BG_ROYAL})`,
                border: `1.5px solid ${COLORS.GOLD}60`,
                boxShadow: `0 0 15px ${COLORS.GOLD}30`,
              }}
            >
              <span style={{ color: COLORS.GOLD, fontSize: "14px" }}>✦</span>
            </div>
            <div
              className="h-full w-px"
              style={{
                background: `linear-gradient(180deg, transparent, ${COLORS.GOLD}50, ${COLORS.GOLD}, ${COLORS.GOLD}50, transparent)`,
              }}
            />
          </div>

          {/* User Info Section */}
          <UserInfoSection
            userData={userData}
            user={user}
            progress={progress}
            isApprovedCa={isApprovedCa}
          />
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40, ${COLORS.GOLD}60, ${COLORS.GOLD}40, transparent)`,
        }}
      />
    </div>
  );
}
