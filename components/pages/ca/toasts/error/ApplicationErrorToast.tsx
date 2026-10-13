"use client";

import { COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// APPLICATION ERROR TOAST / MODAL
// Shown when CA application submission fails
// ═══════════════════════════════════════════════════════════════════

interface ApplicationErrorToastProps {
  errorMessage?: string | null;
  onRetry: () => void;
  onClose: () => void;
}

export function ApplicationErrorToast({
  errorMessage,
  onRetry,
  onClose,
}: ApplicationErrorToastProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 10, 26, 0.95) 0%, rgba(20, 15, 35, 0.95) 100%)",
          border: `1px solid ${COLORS_RGBA.PINK_30}`,
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

        {/* Error Icon */}
        <div className="mb-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h3 className="mb-3 text-center text-2xl font-bold text-white">Application Failed</h3>

        {/* Message */}
        <p className="mb-4 text-center text-gray-400">
          We couldn&apos;t submit your application. Please try again.
        </p>

        {/* Error details */}
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-4">
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onRetry}
            className="flex-1 rounded-lg px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: GRADIENTS.PINK_PURPLE,
            }}
          >
            Try Again
          </button>
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
