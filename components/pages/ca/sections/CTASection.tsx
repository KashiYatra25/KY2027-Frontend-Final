"use client";

import { useRef, useEffect, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// IIT BHU USER RESTRICTED DISPLAY
// Shows message when IIT BHU student tries to access CA application
// ═══════════════════════════════════════════════════════════════════

function IITBhuRestrictedDisplay() {
  return (
    <div className="relative mx-auto max-w-lg rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-8 backdrop-blur-sm">
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-4 text-5xl">🏛️</div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-blue-400">
        You&apos;re Already Part of the Team!
      </h3>

      {/* Description */}
      <p className="mb-4 text-gray-300">
        As an IIT BHU student, you&apos;re already part of the Kashi Yatra family! The Campus
        Ambassador program is designed to help students from other colleges spread the word about
        our fest.
      </p>

      {/* Additional info */}
      <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-sm text-blue-300">
          💡 Want to contribute? Join one of our organizing teams or volunteer during the fest!
        </p>
      </div>

      {/* Link to teams page */}
      <Link
        href="/teams"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.2))",
          border: "1px solid rgba(59, 130, 246, 0.4)",
          color: "#60a5fa",
        }}
      >
        Explore Teams
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN USER RESTRICTED DISPLAY
// Shows message when admin tries to access CA application
// ═══════════════════════════════════════════════════════════════════

function AdminRestrictedDisplay() {
  return (
    <div className="relative mx-auto max-w-lg rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-sm">
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-4 text-5xl">👑</div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-purple-400">You&apos;re Already an Admin!</h3>

      {/* Description */}
      <p className="mb-4 text-gray-300">
        As an admin of Kashi Yatra, you&apos;re already part of the core team! The Campus Ambassador
        program is designed for students who want to promote the fest at their colleges.
      </p>

      {/* Additional info */}
      <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-500/10 p-4">
        <p className="text-sm text-purple-300">
          🎯 Head to the admin dashboard to manage CA applications and more!
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APPLICATION STATUS DISPLAY COMPONENT
// Shows the current application status when user has already applied
// ═══════════════════════════════════════════════════════════════════

interface ApplicationStatusDisplayProps {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string | null;
}

function ApplicationStatusDisplay({ status, appliedAt }: ApplicationStatusDisplayProps) {
  const statusConfig = {
    PENDING: {
      icon: "⏳",
      title: "Application Under Review",
      description:
        "Your Campus Ambassador application has been submitted and is being reviewed by our team.",
      color: "yellow",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
    },
    ACCEPTED: {
      icon: "🎉",
      title: "Welcome, Campus Ambassador!",
      description:
        "Congratulations! Your application has been approved. You are now officially a Kashi Yatra 2027 Campus Ambassador.",
      color: "green",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
    },
    REJECTED: {
      icon: "😔",
      title: "Application Not Selected",
      description: "Unfortunately, your application was not selected this time.",
      color: "red",
      bgGradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`relative mx-auto max-w-lg rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-sm ${config.bgGradient} ${config.borderColor}`}
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{
          background:
            status === "PENDING"
              ? "radial-gradient(circle, rgba(234, 179, 8, 0.3), transparent)"
              : status === "ACCEPTED"
                ? "radial-gradient(circle, rgba(34, 197, 94, 0.3), transparent)"
                : "radial-gradient(circle, rgba(239, 68, 68, 0.3), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-4 text-5xl">{config.icon}</div>

      {/* Title */}
      <h3 className={`mb-3 text-2xl font-bold ${config.textColor}`}>{config.title}</h3>

      {/* Description */}
      <p className="mb-4 text-gray-300">{config.description}</p>

      {/* Applied date */}
      {appliedAt && (
        <p className="text-sm text-gray-500">
          Applied on{" "}
          {new Date(appliedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      {/* Additional info for approved */}
      {status === "ACCEPTED" && (
        <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm text-green-300">
            🚀 Check your email for next steps and your unique referral code!
          </p>
        </div>
      )}

      {/* View Details button for REJECTED */}
      {status === "REJECTED" && (
        <Link
          href="/campus-ambassador/application"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(236, 72, 153, 0.1))",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
          }}
        >
          View Rejection Details
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CTA SECTION
// Final call to action with custom rocket
// ═══════════════════════════════════════════════════════════════════

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

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      window.location.href = CA_LOGIN_CALLBACK;
      return;
    }

    if (!isProfileComplete) {
      setShowProfileModal(true);
      return;
    }

    // Submit application
    apply();
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
