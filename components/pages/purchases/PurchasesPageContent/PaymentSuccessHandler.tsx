"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PaymentSuccessToast } from "@/components/pages/purchases/toasts/success/PaymentSuccessToast";

// ═══════════════════════════════════════════════════════════════════
// PAYMENT SUCCESS HANDLER
// Handles ?payment=success query param from Cashfree redirect
// ═══════════════════════════════════════════════════════════════════

export function PaymentSuccessHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");

    if (paymentStatus === "success" && !shown) {
      setShown(true);

      // Show success toast
      toast.custom((t) => <PaymentSuccessToast onClose={() => toast.dismiss(t)} />, {
        duration: 6000,
        position: "top-center",
      });

      // Clean up URL
      router.replace("/purchases", { scroll: false });
    }
  }, [searchParams, router, shown]);

  return null;
}
