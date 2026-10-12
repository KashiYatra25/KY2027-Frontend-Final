"use client";

import { Suspense } from "react";
import { ThemedNavbar } from "@/components/navbar";
import { AuthSuccessToastHandler } from "@/components/auth";
import { useMyAccount, useSignOut, useCaInfo } from "@/lib/api/hooks";
import {
  ProfileHero,
  DetailedInfo,
  ProfileFooter,
  ProfileLoader,
  ErrorState,
  MyTeamsSection,
  MyRegistrationsSection,
  CaStatusSection,
} from "./sections";
import { COLORS } from "./constants/palette";
import { ProfileUser } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE CONTENT
// Main container that composes all profile sections
// ═══════════════════════════════════════════════════════════════════

interface ProfilePageContentProps {
  user: ProfileUser;
}

export function ProfilePageContent({ user }: ProfilePageContentProps) {
  const { isSigningOut, handleSignOut } = useSignOut();

  // Fetch account data via GraphQL - returns profile + progress
  const { profile: userData, progress, isLoading, isError } = useMyAccount("full");

  // Fetch CA data via GraphQL - full info for profile page
  const {
    hasApplied: caHasApplied,
    applicationStatus: caStatus,
    appliedAt: caAppliedAt,
    referralId: caReferralId,
    numberOfReferrals: caReferrals,
    isApproved: isCaApproved,
    isLoading: caLoading,
  } = useCaInfo("full");

  return (
    <>
      {/* Auth success toast handler - handles success & already-logged-in toasts */}
      <Suspense fallback={null}>
        <AuthSuccessToastHandler />
      </Suspense>

      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-28 pb-12 sm:pt-32"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="mx-auto max-w-5xl 2xl:max-w-6xl">
          {isLoading || caLoading ? (
            <ProfileLoader />
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {/* Hero Section - Avatar, Name, Status, CA Badge */}
              <ProfileHero
                userData={userData}
                user={user}
                progress={progress}
                isApprovedCa={isCaApproved}
              />

              {/* CA Status Section - Only show if user has applied */}
              {caHasApplied && (
                <CaStatusSection
                  hasApplied={caHasApplied}
                  applicationStatus={caStatus}
                  appliedAt={caAppliedAt}
                  referralId={caReferralId}
                  numberOfReferrals={caReferrals}
                />
              )}

              {/* Detailed Info Section - Cards & Verification */}
              <DetailedInfo userData={userData} user={user} progress={progress} />

              {/* Teams & Registrations Grid */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <MyTeamsSection />
                <MyRegistrationsSection />
              </div>

              {/* Footer Section - Sign Out & Decorative */}
              <ProfileFooter isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
