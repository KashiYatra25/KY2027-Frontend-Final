"use client";

import { useEffect } from "react";

/**
 * Global error boundary — the last line of defense.
 *
 * Catches errors thrown in the root layout itself (where the normal
 * `app/error.tsx` cannot render). Next.js requires this file to render its
 * own <html> and <body>. Styling is fully inline because the app's global
 * CSS / fonts may not have loaded when this renders.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fatal application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          textAlign: "center",
          fontFamily: "Georgia, 'Times New Roman', serif",
          background: "linear-gradient(180deg, #0c0810 0%, #1f0c18 60%, #0c0810 100%)",
          color: "rgba(253, 246, 227, 0.85)",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              fontSize: "1.25rem",
              color: "#FFD700",
              textShadow: "0 0 15px rgba(255,215,0,0.6)",
            }}
          >
            ✦ 🪔 ✦
          </div>
          <h1
            style={{
              marginTop: "1rem",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              color: "#FFD700",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "rgba(253, 246, 227, 0.7)",
            }}
          >
            A critical error prevented the page from loading. Please try again.
          </p>
          {error?.digest && (
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255, 215, 0, 0.35)",
              }}
            >
              Ref: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              borderRadius: 9999,
              border: "1px solid rgba(255,215,0,0.4)",
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(218,165,32,0.12) 100%)",
              color: "#FFD700",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
