import { CheckCircle } from "lucide-react";

export function PaymentSuccessToast() {
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
