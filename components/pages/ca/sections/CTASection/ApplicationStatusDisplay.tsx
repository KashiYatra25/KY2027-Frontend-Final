"use client";

import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════
// APPLICATION STATUS DISPLAY COMPONENT
// Shows the current application status when user has already applied
// ═══════════════════════════════════════════════════════════════════

interface ApplicationStatusDisplayProps {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string | null;
}

export function ApplicationStatusDisplay({ status, appliedAt }: ApplicationStatusDisplayProps) {
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
