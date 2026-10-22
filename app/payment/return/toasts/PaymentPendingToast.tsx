import { Loader2 } from "lucide-react";

export function PaymentPendingToast() {
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
