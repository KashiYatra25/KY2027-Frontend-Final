"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMyAccount, useCaApplication, useCaInfo } from "@/lib/api/hooks";
import { AnimatedRocket } from "@/components/pages/ca/components/AnimatedRocket";
import { ProfileIncompleteToast } from "@/components/pages/ca/toasts/error/ProfileIncompleteToast";
import { ApplicationSuccessToast } from "@/components/pages/ca/toasts/success/ApplicationSuccessToast";
import { ApplicationErrorToast } from "@/components/pages/ca/toasts/error/ApplicationErrorToast";
import { CA_LOGIN_CALLBACK } from "@/components/pages/ca/config/ca.config";
import { COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";
import { IITBhuRestrictedDisplay } from "./IITBhuRestrictedDisplay";
import { AdminRestrictedDisplay } from "./AdminRestrictedDisplay";
import { ApplicationStatusDisplay } from "./ApplicationStatusDisplay";
import { LeaderboardPreview } from "./LeaderboardPreview";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// CTA SECTION
// Final call to action with custom rocket
// ═══════════════════════════════════════════════════════════════════

// CA application submit payload — the backend derives userId from the auth
// header, so there are no user-input fields (empty object by contract).
const CtaApplicationSchema = z.object({});

type CtaApplicationData = z.infer<typeof CtaApplicationSchema>;

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { status } = useSession();
  const {
    isProfileComplete,
    isLoading,
    completionPercentage,
    displayName,
    isFromIITBhu,
    userRole,
  } = useMyAccount("full");

  // CA Application Status hook - check if already applied
  const {
    hasApplied,
    applicationStatus,
    appliedAt,
    isLoading: isStatusLoading,
  } = useCaInfo("status");

  // CA Application hook - for submitting new application
  const {
    apply,
    reset: resetApplication,
    isPending: isApplying,
    isSuccess: applicationSuccess,
    isError: applicationError,
    errorMessage,
  } = useCaApplication();

  const isAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";

  // CA application form — react-hook-form + zod. Submit payload is an empty
  // object (backend derives userId from auth); modal toggles above remain
  // plain useState as they are non-field UI state.
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<CtaApplicationData>({
    resolver: zodResolver(CtaApplicationSchema),
    defaultValues: {},
  });

  // Handle application success
  useEffect(() => {
    if (applicationSuccess) {
      setShowSuccessModal(true);
    }
  }, [applicationSuccess]);

  // Handle application error
  useEffect(() => {
    if (applicationError) {
      setShowErrorModal(true);
    }
  }, [applicationError]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // rhf submit handler — runs only after guards pass. Preserves the exact
  // backend mutation call with the identical (empty) payload.
  const onApplySubmit = () => {
    // Submit application
    apply();
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      window.location.href = CA_LOGIN_CALLBACK;
      return;
    }

    if (!isProfileComplete) {
      setShowProfileModal(true);
      return;
    }

    // Guards passed — delegate to react-hook-form for validation + submit
    void handleSubmit(onApplySubmit)();
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    resetApplication();
    apply();
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    resetApplication();
  };

  const handleCloseError = () => {
    setShowErrorModal(false);
    resetApplication();
  };

  // Determine button text
  const getButtonText = () => {
    if (isLoading || isAuthLoading || isStatusLoading) return "Loading...";
    if (isApplying) return "Submitting...";
    if (!isAuthenticated) return "Sign In to Apply";
    if (!isProfileComplete) return "Complete Profile to Apply";
    return "Apply Now";
  };

  // Check if user has already applied
  const showApplicationStatus = isAuthenticated && hasApplied && applicationStatus;

  // Check if user is from IIT BHU (they cannot apply for CA)
  const showIITBhuRestricted = isAuthenticated && isFromIITBhu && !hasApplied;

  // Check if user is an admin (they cannot apply for CA - only USER role can apply)
  const isAdmin = userRole && userRole !== "USER";
  const showAdminRestricted = isAuthenticated && isAdmin && !hasApplied && !isFromIITBhu;

  return (
    <section ref={sectionRef} className="relative min-h-[700px] overflow-hidden px-4 py-24">
      {/* Centered content wrapper - TRUE CENTER */}
      <div className="cta-content relative z-20 flex w-full flex-col items-center text-center">
        {/* Custom Animated Rocket */}
        <div className="relative mb-8 inline-block">
          <div
            className="absolute inset-0 opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(ellipse, ${COLORS_RGBA.PINK_50} 0%, transparent 70%)`,
            }}
          />
          <AnimatedRocket size={100} />
        </div>

        {/* Headline */}
        <h2 className="mb-6 text-4xl font-black text-white sm:text-5xl md:text-6xl">
          {showApplicationStatus ? (
            <>
              Your <span className="ca-gradient-text">Application</span>
            </>
          ) : showAdminRestricted ? (
            <>
              Hey, <span className="ca-gradient-text">Admin</span>! 👑
            </>
          ) : showIITBhuRestricted ? (
            <>
              Hey, <span className="ca-gradient-text">IITian</span>! 👋
            </>
          ) : (
            <>
              Ready to <span className="ca-gradient-text">Lead</span>?
            </>
          )}
        </h2>

        {/* Show admin restricted message */}
        {showAdminRestricted ? (
          <>
            <AdminRestrictedDisplay />

            {/* Secondary links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="transition-colors hover:text-white">
                Learn about Kashi Yatra →
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                Have questions? Contact us →
              </Link>
            </div>

            {/* Leaderboard Preview */}
            <div className="mt-12">
              <LeaderboardPreview />
            </div>
          </>
        ) : showIITBhuRestricted ? (
          <>
            <IITBhuRestrictedDisplay />

            {/* Secondary links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="transition-colors hover:text-white">
                Learn about Kashi Yatra →
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                Have questions? Contact us →
              </Link>
            </div>

            {/* Leaderboard Preview */}
            <div className="mt-12">
              <LeaderboardPreview />
            </div>
          </>
        ) : showApplicationStatus ? (
          <>
            <ApplicationStatusDisplay status={applicationStatus} appliedAt={appliedAt} />

            {/* Secondary links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="transition-colors hover:text-white">
                Learn about Kashi Yatra →
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                Have questions? Contact us →
              </Link>
            </div>

            {/* Leaderboard Preview */}
            <div className="mt-12">
              <LeaderboardPreview />
            </div>
          </>
        ) : (
          <>
            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
              Join the elite squad of Campus Ambassadors and make your mark at{" "}
              <span className="font-semibold text-white">Kashi Yatra 2027</span>. Limited spots
              available!
            </p>

            {/* CTA Button */}
            <button
              onClick={handleApplyClick}
              disabled={isLoading || isAuthLoading || isApplying || isStatusLoading}
              className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: GRADIENTS.TRI,
                backgroundSize: "200% 200%",
                animation: "caGradientShift 4s ease infinite",
              }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: GRADIENTS.PINK_PURPLE,
                }}
              />

              <span className="relative text-white">{getButtonText()}</span>

              {isApplying ? (
                <svg
                  className="relative h-5 w-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="relative h-5 w-5 transform text-white transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              )}
            </button>

            {/* Form validation errors */}
            {errors.root && <p className="mt-4 text-sm text-red-400">{errors.root.message}</p>}

            {/* Status indicator */}
            {isAuthenticated && !isLoading && !isStatusLoading && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm">
                {isProfileComplete ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-green-400">Profile verified • Ready to apply</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-yellow-400">
                      Profile {completionPercentage}% complete
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Secondary links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="transition-colors hover:text-white">
                Learn about Kashi Yatra →
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                Have questions? Contact us →
              </Link>
            </div>

            {/* Leaderboard Preview */}
            <div className="mt-12">
              <LeaderboardPreview />
            </div>
          </>
        )}
      </div>

      {/* Profile Incomplete Modal */}
      {showProfileModal && (
        <ProfileIncompleteToast
          completionPercentage={completionPercentage}
          displayName={displayName}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Application Success Modal */}
      {showSuccessModal && <ApplicationSuccessToast onClose={handleCloseSuccess} />}

      {/* Application Error Modal */}
      {showErrorModal && (
        <ApplicationErrorToast
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onClose={handleCloseError}
        />
      )}
    </section>
  );
}
