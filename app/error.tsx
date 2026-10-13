"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Root error boundary for the App Router.
 *
 * Catches render/runtime errors thrown in any route segment that doesn't
 * define its own `error.tsx`, and in the shared layout's children. Prevents
 * the "white screen on any error" failure mode. Themed to match the
 * Kashiyatra 404 (gold / maroon / cream, Cinzel display serif).
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for observability (replace with real logger later).
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: `linear-gradient(180deg,
          #0c0810 0%,
          #150a14 30%,
          #1f0c18 60%,
          #150a14 80%,
          #0c0810 100%
        )`,
      }}
    >
      <div className="relative z-10 max-w-md text-center">
        {/* Decorative mark */}
        <p
          className="text-base text-amber-400 sm:text-lg"
          style={{ textShadow: "0 0 15px rgba(255,215,0,0.9), 0 0 30px rgba(255,165,0,0.5)" }}
        >
          ✦ 🪔 ✦
        </p>

        <h1
          className="mt-4 text-4xl font-black tracking-wide sm:text-5xl"
          style={{
            fontFamily: "var(--font-cinzel-decorative), serif",
            background:
              "linear-gradient(180deg, #FFFAF0 0%, #FFD700 20%, #DAA520 45%, #B8860B 70%, #996515 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(255,215,0,0.4))",
          }}
        >
          Something broke
        </h1>

        <p
          className="mx-auto mt-6 max-w-md text-base leading-relaxed tracking-wide sm:text-lg"
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            color: "rgba(253, 246, 227, 0.75)",
          }}
        >
          An unexpected error interrupted your journey.
          <br />
          You can try again, or return to the festival.
        </p>

        {error?.digest && (
          <p className="mt-3 text-xs tracking-widest text-amber-200/40 uppercase">
            Ref: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-500/40 px-8 py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-amber-400/70 hover:shadow-[0_0_30px_rgba(255,215,0,0.25)]"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(218,165,32,0.12) 100%)",
              color: "#FFD700",
            }}
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 px-8 py-3 text-sm font-semibold tracking-[0.2em] text-amber-200/70 uppercase transition-all duration-300 hover:border-amber-400/50 hover:text-amber-100"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
