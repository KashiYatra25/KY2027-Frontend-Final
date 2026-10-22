"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, CheckCircle, XCircle, ArrowLeft, Mail, Copy, Rocket } from "lucide-react";
import { useState } from "react";
import { ThemedNavbar } from "@/components/navbar/ThemedNavbar";
import { useCaInfo } from "@/lib/api/hooks";
import { COLORS, COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";
import { GridBackground, FloatingElements } from "@/components/pages/ca/sections/decor";

// ═══════════════════════════════════════════════════════════════════
// CA APPLICATION PAGE
// Shows detailed application status and rejection reason if applicable
// ═══════════════════════════════════════════════════════════════════

export function CaApplicationPageContent() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const {
    hasApplied,
    applicationStatus,
    rejectionReason,
    appliedAt,
    updatedAt,
    referralId,
    numberOfReferrals,
    isLoading,
    isAuthenticated,
    isAuthLoading,
  } = useCaInfo("full");

  // Copy referral ID to clipboard
  const copyReferralId = async () => {
    if (referralId) {
      await navigator.clipboard.writeText(referralId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Redirect to CA page if not applied
  if (!isLoading && !isAuthLoading && isAuthenticated && !hasApplied) {
    router.push("/campus-ambassador");
    return null;
  }

  // Loading state
  if (isLoading || isAuthLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: COLORS.BG_DEEP }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: `${COLORS_RGBA.PINK_50}`, borderTopColor: "transparent" }}
          />
          <p className="text-gray-400">Loading application status...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: COLORS.BG_DEEP }}
      >
        <div className="text-center">
          <p className="text-xl text-gray-400">Please sign in to view your application</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-full px-6 py-3 text-white"
            style={{ background: GRADIENTS.TRI }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    PENDING: {
      icon: Clock,
      title: "Application Under Review",
      description:
        "Your application is currently being reviewed by our team. We'll notify you once a decision has been made.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      textColor: "text-yellow-400",
      glowColor: "rgba(234, 179, 8, 0.3)",
    },
    ACCEPTED: {
      icon: CheckCircle,
      title: "Application Approved! 🎉",
      description: "Congratulations! You are now officially a Kashi Yatra 2027 Campus Ambassador.",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      textColor: "text-green-400",
      glowColor: "rgba(34, 197, 94, 0.3)",
    },
    REJECTED: {
      icon: XCircle,
      title: "Application Not Selected",
      description:
        "We appreciate your interest in becoming a Campus Ambassador. Unfortunately, your application was not selected this time.",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      iconBg: "bg-gradient-to-br from-red-500 to-pink-500",
      textColor: "text-red-400",
      glowColor: "rgba(239, 68, 68, 0.3)",
    },
  };

  const config = applicationStatus ? statusConfig[applicationStatus] : statusConfig.PENDING;
  const StatusIcon = config.icon;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: COLORS.BG_DEEP }}
    >
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="about" />
      </div>

      {/* Background effects */}
      <GridBackground />
      <FloatingElements />

      {/* Main content */}
      <main className="relative z-10 px-4 pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-2xl 2xl:max-w-3xl">
          {/* Back button */}
          <Link
            href="/campus-ambassador"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CA Page
          </Link>

          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)",
              }}
            >
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Your CA Application</h1>
            <p className="mt-2 text-gray-400">Campus Ambassador Program - Kashi Yatra 2027</p>
          </div>

          {/* Status Card */}
          <div
            className={`rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm ${config.gradient} ${config.borderColor}`}
            style={{
              boxShadow: `0 0 40px ${config.glowColor}`,
            }}
          >
            {/* Status Header */}
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}
              >
                <StatusIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h2>
                <p className="mt-1 text-gray-300">{config.description}</p>
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {appliedAt && (
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-gray-500">Applied On</p>
                  <p className="mt-1 font-medium text-white">
                    {new Date(appliedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
              {updatedAt && (
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="mt-1 font-medium text-white">
                    {new Date(updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rejection Reason - Only for REJECTED */}
          {applicationStatus === "REJECTED" && rejectionReason && (
            <div
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-6"
              style={{
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.1)",
              }}
            >
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
                <XCircle className="h-5 w-5" />
                Reason for Rejection
              </h3>
              <p className="leading-relaxed text-gray-300">{rejectionReason}</p>
            </div>
          )}

          {/* CA Profile Info - Only for ACCEPTED */}
          {applicationStatus === "ACCEPTED" && referralId && (
            <div className="mt-6 space-y-4">
              {/* Referral ID */}
              <div
                className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6"
                style={{
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.1)",
                }}
              >
                <h3 className="mb-4 text-lg font-semibold text-green-400">Your CA Profile</h3>

                <div className="space-y-4">
                  {/* Referral ID */}
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                    <div>
                      <p className="text-xs text-gray-500">Referral ID</p>
                      <p className="mt-1 font-mono text-xl font-bold text-green-400">
                        {referralId}
                      </p>
                    </div>
                    <button
                      onClick={copyReferralId}
                      className="flex items-center gap-2 rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:bg-green-500/30"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-gray-500">Total Referrals</p>
                    <p className="mt-1 text-3xl font-bold text-white">{numberOfReferrals ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Have questions about your application?</p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: COLORS_RGBA.PINK_50 }}
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
