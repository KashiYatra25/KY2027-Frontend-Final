"use client";

import Link from "next/link";
import { COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE INCOMPLETE TOAST / MODAL
// Shown when a signed-in user tries to apply without a complete profile
// ═══════════════════════════════════════════════════════════════════

interface ProfileIncompleteToastProps {
  completionPercentage: number;
  displayName?: string | null;
  onClose: () => void;
}

export function ProfileIncompleteToast({
  completionPercentage,
  displayName,
  onClose,
}: ProfileIncompleteToastProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 10, 26, 0.95) 0%, rgba(20, 15, 35, 0.95) 100%)",
          border: `1px solid ${COLORS_RGBA.PURPLE_30}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 transition-colors hover:text-white"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 text-3xl text-yellow-500">
            ⚠️
          </div>
        </div>

        <h3 className="mb-3 text-center text-2xl font-bold text-white">Complete Your Profile</h3>

        <p className="mb-6 text-center text-gray-400">
          {displayName ? `Hey ${displayName}! ` : ""}
          You need to complete your profile verification before applying as a Campus Ambassador.
        </p>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-500">Profile Completion</span>
            <span className="font-semibold text-purple-400">{completionPercentage}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${completionPercentage}%`,
                background: GRADIENTS.PINK_PURPLE,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/complete-profile"
            className="flex-1 rounded-lg px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: GRADIENTS.PINK_PURPLE,
            }}
          >
            Complete Profile
          </Link>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-800 px-6 py-3 font-semibold text-gray-400 transition-colors hover:bg-gray-700"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
