"use client";

import { Suspense } from "react";
import { LoadingFallback } from "./loader/LoadingFallback";
import { PaymentReturnContent } from "./PaymentReturnContent";

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
