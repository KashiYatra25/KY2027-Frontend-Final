"use client";

import Link from "next/link";
import { COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// APPLICATION SUCCESS TOAST / MODAL
// Shown when CA application is successfully submitted
// ═══════════════════════════════════════════════════════════════════

interface ApplicationSuccessToastProps {
  onClose: () => void;
}

export function ApplicationSuccessToast({ onClose }: ApplicationSuccessToastProps) {
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
        {/* Close button */}
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

        {/* Success Icon */}
        <div className="mb-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-3xl">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h3 className="mb-3 text-center text-2xl font-bold text-white">
          Application Submitted! 🚀
        </h3>

        {/* Message */}
        <p className="mb-6 text-center text-gray-400">
          Your Campus Ambassador application has been received. Our team will review it and get back
          to you within <span className="font-semibold text-purple-400">3-5 business days</span>.
        </p>

        {/* Status indicator */}
        <div className="mb-6 rounded-lg bg-purple-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <div>
              <p className="font-medium text-white">Application Status: Pending</p>
              <p className="text-sm text-gray-500">We&apos;ll notify you via email once reviewed</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/profile"
            className="flex-1 rounded-lg px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: GRADIENTS.PINK_PURPLE,
            }}
          >
            View Profile
          </Link>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-800 px-6 py-3 font-semibold text-gray-400 transition-colors hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
