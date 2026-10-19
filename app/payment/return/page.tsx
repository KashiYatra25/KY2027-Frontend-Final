"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════

type PaymentStatus = "loading" | "success" | "failed" | "pending";

// Exponential backoff config
const INITIAL_DELAY_MS = 1000; // Start with 1s
const MAX_BACKOFF_MS = 30000; // Max 30s between retries
const FAILURE_TIMEOUT_MS = 20000; // Redirect after 20s if still pending

// ═══════════════════════════════════════════════════════════════════
// TOAST COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function PaymentSuccessToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
        }}
      >
        <CheckCircle className="h-5 w-5 text-emerald-400" />
      </div>
      <div>
        <p className="font-semibold text-emerald-100">Payment Successful!</p>
        <p className="text-sm text-emerald-300/70">Your passes are ready</p>
      </div>
    </div>
  );
}

function PaymentFailedToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-red-100">Payment Failed</p>
        <p className="text-sm text-red-300/70">Please try again</p>
      </div>
    </div>
  );
}

function PaymentPendingToast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/95 to-stone-900/95 px-5 py-4 shadow-2xl backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.3))",
          boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
        }}
      >
        <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
      </div>
      <div>
        <p className="font-semibold text-amber-100">Payment Processing</p>
        <p className="text-sm text-amber-300/70">Check status in My Purchases</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOADING FALLBACK
// ═══════════════════════════════════════════════════════════════════

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-amber-400" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN CONTENT COMPONENT
// ═══════════════════════════════════════════════════════════════════

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [attemptCount, setAttemptCount] = useState(0);

  const orderId = searchParams.get("order_id");

  // Refs to track state across renders
  const isPollingRef = useRef(false);
  const isResolvedRef = useRef(false);
  const startTimeRef = useRef<number>(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const checkPaymentStatus = useCallback(async (): Promise<"success" | "failed" | "pending"> => {
    try {
      console.log(`[Payment] Checking status for order: ${orderId}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/purchases`, {
        credentials: "include",
      });

      if (!response.ok) {
        console.error(`[Payment] API returned ${response.status}`);
        return "pending";
      }

      const data = await response.json();
      const purchases = data.purchases || [];

      const thisPurchase = purchases.find(
        (p: { konfhubBookingId?: string; status: string }) => p.konfhubBookingId === orderId
      );

      if (thisPurchase) {
        console.log(`[Payment] Found order with status: ${thisPurchase.status}`);
        if (thisPurchase.status === "VERIFIED" || thisPurchase.status === "CHECKED_IN") {
          return "success";
        } else if (thisPurchase.status === "CANCELLED" || thisPurchase.status === "REJECTED") {
          return "failed";
        }
      } else {
        console.log(`[Payment] Order not found in purchases yet`);
      }
      return "pending";
    } catch (error) {
      console.error("[Payment] Error checking status:", error);
      return "pending";
    }
  }, [orderId]);

  const handleResolved = useCallback(
    (result: "success" | "failed" | "pending") => {
      if (isResolvedRef.current) return;
      isResolvedRef.current = true;
      isPollingRef.current = false;

      // Clear all timers
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (failureTimeoutIdRef.current) {
        clearTimeout(failureTimeoutIdRef.current);
        failureTimeoutIdRef.current = null;
      }

      if (result === "success") {
        setStatus("success");
        toast.custom(() => <PaymentSuccessToast />);
        setTimeout(() => router.push("/purchases"), 2000);
      } else if (result === "failed") {
        setStatus("failed");
        toast.custom(() => <PaymentFailedToast />);
        setTimeout(() => router.push("/cart"), 3000);
      } else {
        // Pending - timeout reached
        setStatus("pending");
        toast.custom(() => <PaymentPendingToast />);
        router.push("/purchases");
      }
    },
    [router]
  );

  useEffect(() => {
    // Prevent double initialization
    if (isPollingRef.current) {
      console.log("[Payment] Polling already started, skipping");
      return;
    }

    if (!orderId) {
      console.log("[Payment] No order ID");
      setStatus("failed");
      return;
    }

    isPollingRef.current = true;
    startTimeRef.current = Date.now();
    console.log(`[Payment] Starting polling for order: ${orderId}`);

    // Set up hard failure timeout - redirect after 20s no matter what
    failureTimeoutIdRef.current = setTimeout(() => {
      console.log("[Payment] 20s timeout reached, redirecting to purchases");
      if (!isResolvedRef.current) {
        handleResolved("pending");
      }
    }, FAILURE_TIMEOUT_MS);

    // Exponential backoff polling
    const poll = async (attempt: number, delay: number) => {
      if (isResolvedRef.current) {
        console.log("[Payment] Already resolved, stopping poll");
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      console.log(
        `[Payment] Poll attempt ${attempt + 1}, elapsed: ${elapsed}ms, delay: ${delay}ms`
      );

      // Check if we've exceeded max time
      if (elapsed >= MAX_BACKOFF_MS) {
        console.log("[Payment] Max backoff time reached");
        handleResolved("pending");
        return;
      }

      setAttemptCount(attempt + 1);
      const result = await checkPaymentStatus();

      if (result === "success" || result === "failed") {
        handleResolved(result);
        return;
      }

      // Still pending - schedule next poll with exponential backoff
      const nextDelay = Math.min(delay * 2, MAX_BACKOFF_MS - elapsed);

      if (nextDelay > 0 && !isResolvedRef.current) {
        console.log(`[Payment] Scheduling next poll in ${nextDelay}ms`);
        timeoutIdRef.current = setTimeout(() => {
          poll(attempt + 1, delay * 2);
        }, nextDelay);
      }
    };

    // Start immediately with first check
    poll(0, INITIAL_DELAY_MS);

    // Cleanup
    return () => {
      console.log("[Payment] Cleanup called");
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (failureTimeoutIdRef.current) {
        clearTimeout(failureTimeoutIdRef.current);
      }
    };
  }, [orderId, checkPaymentStatus, handleResolved]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              status === "success"
                ? "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)"
                : status === "failed"
                  ? "radial-gradient(circle, rgba(239, 68, 68, 0.15), transparent 70%)"
                  : "radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              status === "success"
                ? "radial-gradient(circle, rgba(5, 150, 105, 0.1), transparent 70%)"
                : status === "failed"
                  ? "radial-gradient(circle, rgba(185, 28, 28, 0.1), transparent 70%)"
                  : "radial-gradient(circle, rgba(180, 140, 45, 0.1), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 mx-4 max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background:
              status === "success"
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))"
                : status === "failed"
                  ? "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))"
                  : "linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(180, 140, 45, 0.3))",
            boxShadow:
              status === "success"
                ? "0 0 40px rgba(16, 185, 129, 0.3)"
                : status === "failed"
                  ? "0 0 40px rgba(239, 68, 68, 0.3)"
                  : "0 0 40px rgba(212, 175, 55, 0.3)",
          }}
        >
          {status === "loading" || status === "pending" ? (
            <Loader2 className="h-12 w-12 animate-spin text-amber-400" />
          ) : status === "success" ? (
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          ) : (
            <XCircle className="h-12 w-12 text-red-400" />
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-3 text-3xl font-bold"
          style={{
            color: status === "success" ? "#6ee7b7" : status === "failed" ? "#fca5a5" : "#fcd34d",
          }}
        >
          {status === "loading" || status === "pending"
            ? "Processing Payment..."
            : status === "success"
              ? "Payment Successful!"
              : "Payment Failed"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-gray-400"
        >
          {status === "loading" || status === "pending" ? (
            <>
              Please wait while we confirm your payment
              <br />
              <span className="text-sm text-gray-500">
                Checking status... (attempt {attemptCount})
              </span>
            </>
          ) : status === "success" ? (
            <>
              <Sparkles className="mr-2 inline h-4 w-4 text-amber-400" />
              Your passes have been added to your account
              <br />
              <span className="text-sm text-gray-500">Redirecting to your purchases...</span>
            </>
          ) : (
            <>
              Something went wrong with your payment
              <br />
              <span className="text-sm text-gray-500">Redirecting back to cart...</span>
            </>
          )}
        </motion.p>

        {/* Order ID */}
        {orderId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-500"
          >
            Order ID: <span className="font-mono text-gray-400">{orderId}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE EXPORT WITH SUSPENSE
// ═══════════════════════════════════════════════════════════════════

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentReturnContent />
    </Suspense>
  );
}
