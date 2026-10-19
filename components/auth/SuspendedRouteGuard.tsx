"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { useAccountStatus } from "@/lib/api/hooks";

// ═══════════════════════════════════════════════════════════════════
// SUSPENDED ROUTE GUARD
//
// When a signed-in user's account is SUSPENDED, every page is locked
// behind a blurred overlay EXCEPT the allowlisted public pages below.
// Suspension status comes straight from the session (useAccountStatus).
// ═══════════════════════════════════════════════════════════════════

/**
 * Routes a suspended user may still browse freely.
 * Everything else is covered by the lock overlay.
 */
const ALLOWED_PREFIXES = [
  "/schedule", // schedule + /schedule/[venue]
  "/contact", // needed so the "Contact Admin" button works
  "/login",
];

/** Exact routes (not prefix) that are always allowed. */
const ALLOWED_EXACT = ["/"];

function isAllowedPath(pathname: string): boolean {
  if (ALLOWED_EXACT.includes(pathname)) return true;
  return ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function SuspendedRouteGuard() {
  const pathname = usePathname();
  const { isAuthenticated, isSuspended, isLoading } = useAccountStatus();

  // Don't gate while the session is still resolving, when not signed in,
  // when the account is active, or on an allowlisted page.
  if (isLoading || !isAuthenticated || !isSuspended) return null;
  if (isAllowedPath(pathname)) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Account suspended"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(10, 8, 16, 0.72)",
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border px-8 py-10 text-center"
        style={{
          background: "linear-gradient(160deg, #1a0a14 0%, #2d0a18 60%, #1a0a14 100%)",
          borderColor: "rgba(220, 38, 38, 0.35)",
          boxShadow: "0 0 60px rgba(220, 38, 38, 0.2)",
        }}
      >
        {/* Lock icon */}
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.2), rgba(127,29,29,0.35))",
            border: "1px solid rgba(220, 38, 38, 0.4)",
            boxShadow: "0 0 30px rgba(220, 38, 38, 0.25)",
          }}
        >
          <Lock className="h-9 w-9" style={{ color: "#fca5a5" }} aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1
          className="text-2xl font-bold tracking-wide sm:text-3xl"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            background: "linear-gradient(180deg, #fecaca 0%, #f87171 60%, #dc2626 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Account Suspended
        </h1>

        {/* Message */}
        <p
          className="mx-auto mt-4 max-w-sm text-sm leading-relaxed sm:text-base"
          style={{ color: "rgba(253, 246, 227, 0.75)" }}
        >
          Your account has been suspended. Please contact the admin to resolve this and regain
          access to the festival.
        </p>

        {/* Contact button */}
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            color: "#fff5f5",
            boxShadow: "0 4px 20px rgba(220, 38, 38, 0.35)",
          }}
        >
          Contact Admin
        </Link>

        {/* Secondary: back to home */}
        <div className="mt-4">
          <Link
            href="/"
            className="text-xs tracking-widest text-amber-200/50 uppercase transition-colors hover:text-amber-100/80"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
