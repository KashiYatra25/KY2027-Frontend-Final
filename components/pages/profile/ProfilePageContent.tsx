"use client";

import { Suspense } from "react";
import { ThemedNavbar } from "@/components/navbar/ThemedNavbar";
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
  ZonalPassesSection,
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
  const { profile: userData, progress, isLoading, isError, accountStatus } = useMyAccount("full");

  // Only fetch CA info if profile is complete (CA features require complete profile)
  const isProfileComplete = progress?.isProfileComplete ?? false;

  const {
    hasApplied: caHasApplied,
    applicationStatus: caStatus,
    appliedAt: caAppliedAt,
    referralId: caReferralId,
    numberOfReferrals: caReferrals,
    isApproved: isCaApproved,
    isLoading: caLoading,
  } = useCaInfo("full", { skip: !isProfileComplete });

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
          {isLoading ? (
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

              {/* Account Suspension Warning */}
              {accountStatus === "SUSPENDED" && (
                <div
                  className="mx-auto mb-8 max-w-2xl rounded-xl border p-4 text-center"
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    borderColor: "rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <p className="text-sm font-medium text-red-300">
                    ⚠️ Your account has been suspended
                  </p>
                  <p className="mt-1 text-xs text-red-400/70">
                    Some features are restricted. Please{" "}
                    <a href="/contact" className="underline hover:text-red-300">
                      contact support
                    </a>{" "}
                    for assistance.
                  </p>
                </div>
              )}

              {/* CA Status Section - Only show if user has applied and profile is complete */}
              {isProfileComplete && caHasApplied && !caLoading && (
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

              {/* Zonal Passes Section - Only shows if user has passes */}
              <ZonalPassesSection />

              {/* Footer Section - Sign Out & Decorative */}
              <ProfileFooter isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
