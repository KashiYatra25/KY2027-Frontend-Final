"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserProfile, UserAccountProgress, ProfileUser } from "@/lib/api/helper/types";
import { AdminRoleBadge } from "./AdminRoleBadge";
import { CaBadge } from "./CaBadge";
import { IITBhuBadge } from "./IITBhuBadge";

// ═══════════════════════════════════════════════════════════════════
// USER INFO SECTION
// ═══════════════════════════════════════════════════════════════════
interface UserInfoSectionProps {
  userData: UserProfile | null;
  user: ProfileUser;
  progress: UserAccountProgress | null;
  isApprovedCa?: boolean;
}

export function UserInfoSection({ userData, user, isApprovedCa }: UserInfoSectionProps) {
  const roleLevel = userData?.role?.level;
  const isAdmin = roleLevel && roleLevel !== "USER";
  const isFromIITBhu = userData?.isFromIITBhu;

  return (
    <div className="flex-1 text-center lg:text-left">
      {/* Decorative Title Line */}
      <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a853]" />
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: `${COLORS.GOLD}80` }}>
          Yatri Profile
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a853]" />
      </div>

      <h1
        className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl"
        style={{
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 30%, ${COLORS.GOLD} 60%, ${COLORS.GOLD_LIGHT} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: `0 0 60px ${COLORS.GOLD}30`,
          fontFamily: "var(--font-ethereal), serif",
        }}
      >
        {userData?.firstName || user.name || "Traveler"}
      </h1>

      {/* Badges Row */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        {/* Admin Role Badge - Only show for non-USER roles */}
        {isAdmin && <AdminRoleBadge role={roleLevel as "MASTER_ADMIN" | "MANAGER" | "OPERATOR"} />}

        {/* IIT BHU Badge - Show for verified IIT BHU students */}
        {isFromIITBhu && <IITBhuBadge />}

        {/* CA Badge - Only show for approved Campus Ambassadors */}
        {isApprovedCa && <CaBadge />}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 lg:justify-start">
        {/* My Cart Button */}
        <Link href="/cart">
          <button
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}10, ${COLORS.GOLD}05)`,
              color: COLORS.GOLD,
              border: `1.5px solid ${COLORS.GOLD}35`,
              boxShadow: `0 0 15px ${COLORS.GOLD}08, 0 4px 12px rgba(0,0,0,0.25)`,
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>My Cart</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
