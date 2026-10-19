"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Ticket,
  LogOut,
  Download,
  ExternalLink,
} from "lucide-react";
import type { Purchase, PurchaseStatus } from "@/lib/api/hooks/purchases";

// ═══════════════════════════════════════════════════════════════════
// STATUS CONFIG — matches backend PurchaseStatus values
// ═══════════════════════════════════════════════════════════════════

const STATUS_CONFIG: Record<
  PurchaseStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: string;
    bg: string;
    border: string;
  }
> = {
  VERIFIED: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  CHECKED_IN: {
    label: "Checked In",
    icon: CheckCircle2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  CHECKED_OUT: {
    label: "Checked Out",
    icon: LogOut,
    color: "text-gray-400",
    bg: "bg-gray-500/10",
    border: "border-gray-500/30",
  },
  PENDING_VERIFICATION: {
    label: "Pending Verification",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  REJECTED: {
    label: "Rejected",
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
};

// ═══════════════════════════════════════════════════════════════════
// PURCHASE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface PurchaseCardProps {
  purchase: Purchase;
  index: number;
}

export function PurchaseCard({ purchase, index }: PurchaseCardProps) {
  // Fall back gracefully for any unexpected status value.
  const statusConfig = STATUS_CONFIG[purchase.status] ?? STATUS_CONFIG.PENDING_VERIFICATION;
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const displayDate = purchase.verifiedAt || purchase.createdAt;
  const isRejected = purchase.status === "REJECTED";

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
              {purchase.konfhubBookingId && (
                <span className="font-mono text-xs text-gray-500">
                  #{purchase.konfhubBookingId}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig.label}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {formatDate(displayDate)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-200">
              ₹{(purchase.amountPaid ?? 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 capitalize">{purchase.source.replace("_", " ")}</p>
          </div>
        </div>

        {/* Pass */}
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Ticket className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">{purchase.passType}</p>
              {purchase.konfhubTicketName && purchase.konfhubTicketName !== purchase.passType && (
                <p className="text-xs text-gray-500">{purchase.konfhubTicketName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rejection reason */}
        {isRejected && purchase.rejectionReason && (
          <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
            <p className="text-xs text-red-300">
              <span className="font-medium">Reason:</span> {purchase.rejectionReason}
            </p>
          </div>
        )}

        {/* Ticket / Invoice links (KonfHub) */}
        {(purchase.ticketUrl || purchase.invoiceUrl) && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-3">
            {purchase.ticketUrl && (
              <a
                href={purchase.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition-all hover:bg-amber-500/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Ticket
              </a>
            )}
            {purchase.invoiceUrl && (
              <a
                href={purchase.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all hover:bg-white/10"
              >
                <Download className="h-3.5 w-3.5" />
                Invoice
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
