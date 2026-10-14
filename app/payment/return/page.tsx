"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════

type PaymentStatus = "loading" | "success" | "failed" | "pending";

// Exponential backoff delays (in ms): immediate, 3s, 6s, 10s = max 4 requests over ~19s
const POLL_DELAYS = [0, 3000, 6000, 10000];

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

  const orderId = searchParams.get("order_id");

  // Refs to prevent duplicate operations
  const hasStartedRef = useRef(false);
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    // Prevent running twice (React Strict Mode)
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    if (!orderId) {
      setStatus("failed");
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;
    let isAborted = false;

    const checkPaymentStatus = async (): Promise<"success" | "failed" | "pending"> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/purchases`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch purchases");
        }

        const data = await response.json();
        const purchases = data.purchases || [];

        const thisPurchase = purchases.find(
          (p: { orderId: string; status: string }) => p.orderId === orderId
        );

        if (thisPurchase) {
          if (thisPurchase.status === "PAID") {
            return "success";
          } else if (thisPurchase.status === "FAILED" || thisPurchase.status === "EXPIRED") {
            return "failed";
          }
        }
        return "pending";
      } catch (error) {
        console.error("Error checking payment status:", error);
        return "pending";
      }
    };

    const handleResult = (result: "success" | "failed" | "pending", isLastAttempt: boolean) => {
      if (isAborted) return;

      if (result === "success") {
        setStatus("success");
        if (!hasShownToastRef.current) {
          hasShownToastRef.current = true;
          toast.custom(() => <PaymentSuccessToast />);
        }
        setTimeout(() => router.push("/purchases"), 2000);
        return true; // Stop polling
      }

      if (result === "failed") {
        setStatus("failed");
        if (!hasShownToastRef.current) {
          hasShownToastRef.current = true;
          toast.custom(() => <PaymentFailedToast />);
        }
        setTimeout(() => router.push("/cart"), 3000);
        return true; // Stop polling
      }

      // Still pending
      setStatus("pending");

      if (isLastAttempt) {
        // After all retries, redirect to purchases - user can check status there
        // Webhook will update it eventually
        router.push("/purchases");
        return true;
      }

      return false; // Continue polling
    };

    // Recursive polling with exponential backoff
    const poll = async (attemptIndex: number) => {
      if (isAborted || attemptIndex >= POLL_DELAYS.length) {
        if (!isAborted) {
          router.push("/purchases");
        }
        return;
      }

      const delay = POLL_DELAYS[attemptIndex];
      const isLastAttempt = attemptIndex === POLL_DELAYS.length - 1;

      // Wait for delay (0 for first attempt)
      if (delay > 0) {
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(resolve, delay);
        });
      }

      if (isAborted) return;

      const result = await checkPaymentStatus();
      const shouldStop = handleResult(result, isLastAttempt);

      if (!shouldStop && !isAborted) {
        poll(attemptIndex + 1);
      }
    };

    poll(0);

    return () => {
      isAborted = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <span className="text-sm text-gray-500">This may take a few seconds...</span>
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
