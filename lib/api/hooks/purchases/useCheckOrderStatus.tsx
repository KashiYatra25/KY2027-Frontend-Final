"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { BACKEND_URL } from "@/lib/api/constants";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface CheckStatusResponse {
  info: string;
  orderId: string;
  status: string;
  reconciled?: boolean;
  alreadyProcessed?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// TOAST COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function StatusUpdatedToast({ status }: { status: string }) {
  const isPaid = status === "PAID";
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl backdrop-blur-sm ${
        isPaid
          ? "border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 to-stone-900/95"
          : "border-amber-500/30 bg-gradient-to-r from-amber-950/95 to-stone-900/95"
      }`}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: isPaid
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))"
            : "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.3))",
          boxShadow: isPaid
            ? "0 0 20px rgba(16, 185, 129, 0.2)"
            : "0 0 20px rgba(245, 158, 11, 0.2)",
        }}
      >
        {isPaid ? (
          <CheckCircle className="h-5 w-5 text-emerald-400" />
        ) : (
          <RefreshCw className="h-5 w-5 text-amber-400" />
        )}
      </div>
      <div>
        <p className={`font-semibold ${isPaid ? "text-emerald-100" : "text-amber-100"}`}>
          {isPaid ? "Payment Confirmed!" : "Still Processing"}
        </p>
        <p className={`text-sm ${isPaid ? "text-emerald-300/70" : "text-amber-300/70"}`}>
          {isPaid ? "Your passes are ready" : "Please check again later"}
        </p>
      </div>
    </div>
  );
}

function CheckStatusErrorToast() {
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
        <p className="font-semibold text-red-100">Check Failed</p>
        <p className="text-sm text-red-300/70">Please try again later</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

export function useCheckOrderStatus() {
  const queryClient = useQueryClient();
  const [isChecking, setIsChecking] = useState<string | null>(null); // orderId being checked

  const checkStatus = useCallback(
    async (orderId: string): Promise<CheckStatusResponse | null> => {
      setIsChecking(orderId);

      try {
        const response = await fetch(`${BACKEND_URL}/user/purchases/${orderId}/check-status`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to check status");
        }

        const data: CheckStatusResponse = await response.json();

        // Show appropriate toast
        toast.custom(() => <StatusUpdatedToast status={data.status} />);

        // Invalidate purchases query to refresh the list
        queryClient.invalidateQueries({ queryKey: ["my-purchases"] });

        return data;
      } catch (error) {
        console.error("Error checking order status:", error);
        toast.custom(() => <CheckStatusErrorToast />);
        return null;
      } finally {
        setIsChecking(null);
      }
    },
    [queryClient]
  );

  return {
    checkStatus,
    isChecking,
    isCheckingOrder: (orderId: string) => isChecking === orderId,
  };
}
