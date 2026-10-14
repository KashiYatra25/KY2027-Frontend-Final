"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type PaymentStatus = "loading" | "success" | "failed" | "pending";

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
  const [pollCount, setPollCount] = useState(0);

  const orderId = searchParams.get("order_id");

  const checkPaymentStatus = useCallback(async () => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/purchases`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch purchases");
      }

      const data = await response.json();
      const purchases = data.purchases || [];

      // Check if this order exists and is paid
      const thisPurchase = purchases.find(
        (p: { orderId: string; status: string }) => p.orderId === orderId
      );

      if (thisPurchase) {
        if (thisPurchase.status === "PAID") {
          setStatus("success");
          toast.custom(() => <PaymentSuccessToast />);
          // Redirect to purchases after short delay
          setTimeout(() => {
            router.push("/purchases");
          }, 2000);
        } else if (thisPurchase.status === "FAILED" || thisPurchase.status === "EXPIRED") {
          setStatus("failed");
          toast.custom(() => <PaymentFailedToast />);
          setTimeout(() => {
            router.push("/cart");
          }, 3000);
        } else {
          // Still pending - keep polling
          setStatus("pending");
        }
      } else {
        // Order not found yet - might still be processing
        setStatus("pending");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      // On error, still try to redirect - the webhook might have processed it
      setStatus("pending");
    }
  }, [orderId, router]);

  useEffect(() => {
    // Initial check
    checkPaymentStatus();

    // Poll every 2 seconds for up to 30 seconds (15 attempts)
    const interval = setInterval(() => {
      setPollCount((prev) => {
        if (prev >= 15) {
          clearInterval(interval);
          // After max polls, redirect to purchases anyway
          router.push("/purchases");
          return prev;
        }
        if (status !== "success" && status !== "failed") {
          checkPaymentStatus();
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [checkPaymentStatus, router, status]);

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
