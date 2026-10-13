"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, XCircle, AlertCircle, Package, Ticket } from "lucide-react";
import type { Purchase } from "@/lib/api/hooks";

// ═══════════════════════════════════════════════════════════════════
// STATUS CONFIG
// ═══════════════════════════════════════════════════════════════════

const STATUS_CONFIG = {
  PAID: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  FAILED: {
    label: "Failed",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  EXPIRED: {
    label: "Expired",
    icon: AlertCircle,
    color: "text-gray-400",
    bg: "bg-gray-500/10",
    border: "border-gray-500/30",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// PURCHASE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface PurchaseCardProps {
  purchase: Purchase;
  index: number;
}

export function PurchaseCard({ purchase, index }: PurchaseCardProps) {
  const statusConfig = STATUS_CONFIG[purchase.status];
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalItems = purchase.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${statusConfig.border}`}
      style={{
        background: "linear-gradient(135deg, rgba(26, 10, 32, 0.8) 0%, rgba(10, 6, 18, 0.9) 100%)",
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(212, 168, 83, 0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-500">#{purchase.orderId}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig.label}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {formatDate(purchase.paidAt || purchase.createdAt)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-200">
              ₹{purchase.totalAmount.toLocaleString()}
            </p>
            {purchase.discount > 0 && (
              <p className="text-xs text-emerald-400">-₹{purchase.discount} saved</p>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {purchase.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                  <Ticket className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{item.passName}</p>
                  <p className="text-xs text-gray-500">
                    ₹{item.unitPrice} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-300">
                ₹{(item.unitPrice * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Package className="h-3.5 w-3.5" />
            <span>
              {totalItems} {totalItems === 1 ? "pass" : "passes"}
            </span>
            {purchase.couponCode && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-emerald-400">Coupon: {purchase.couponCode}</span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500 capitalize">
            {purchase.paymentMethod.toLowerCase().replace("_", " ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
