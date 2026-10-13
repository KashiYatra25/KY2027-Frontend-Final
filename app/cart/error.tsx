"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Error boundary for the /cart segment. Keeps the rest of the app alive
 * if the cart fails to render (e.g. a data/checkout error).
 */
export default function CartError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Cart error:", error);
  }, [error]);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
      style={{
        background: "linear-gradient(180deg, #0c0810 0%, #1f0c18 60%, #0c0810 100%)",
      }}
    >
      <div className="relative z-10 max-w-md">
        <p
          className="text-lg text-amber-400"
          style={{ textShadow: "0 0 15px rgba(255,215,0,0.7)" }}
        >
          ✦ 🛒 ✦
        </p>
        <h1
          className="mt-4 text-3xl font-black tracking-wide sm:text-4xl"
          style={{
            fontFamily: "var(--font-cinzel-decorative), serif",
            background: "linear-gradient(180deg, #FFFAF0 0%, #FFD700 30%, #B8860B 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your cart hit a snag
        </h1>
        <p
          className="mx-auto mt-5 max-w-sm text-base leading-relaxed"
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            color: "rgba(253,246,227,0.72)",
          }}
        >
          We couldn&apos;t load your cart right now. Your items are safe — please try again.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-full border border-amber-500/40 px-8 py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-amber-400/70 hover:shadow-[0_0_30px_rgba(255,215,0,0.25)]"
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
            href="/passes"
            className="rounded-full border border-amber-500/20 px-8 py-3 text-sm font-semibold tracking-[0.2em] text-amber-200/70 uppercase transition-all duration-300 hover:border-amber-400/50 hover:text-amber-100"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Browse Passes
          </Link>
        </div>
      </div>
    </main>
  );
}
