"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  User,
  Mail,
  Ticket,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// KONFHUB INTEGRATION COMPONENT
// Shows user their ID + email for use in KonfHub registration
// ═══════════════════════════════════════════════════════════════════

// KonfHub event URL - set in .env.local as NEXT_PUBLIC_KONFHUB_EVENT_URL
const KONFHUB_EVENT_URL =
  process.env.NEXT_PUBLIC_KONFHUB_EVENT_URL || "https://konfhub.com/kashiyatra-2027";

interface KonfHubIntegrationProps {
  kyId: string;
  userEmail: string;
  userName: string;
  className?: string;
}

export function KonfHubIntegration({
  kyId,
  userEmail,
  userName,
  className = "",
}: KonfHubIntegrationProps) {
  const [copiedField, setCopiedField] = useState<"id" | "email" | null>(null);

  const handleCopy = useCallback(async (text: string, field: "id" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 p-4 backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-300">Important: Link Your Purchase</h3>
            <p className="mt-1 text-sm text-amber-200/80">
              When registering on KonfHub, use the <strong>same email</strong> you registered with
              here, or enter your <strong>Kashiyatra User ID</strong> in the custom field. This
              ensures your pass is linked to your account.
            </p>
          </div>
        </div>
      </motion.div>

      {/* User Credentials Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]"
      >
        <div className="border-b border-white/10 bg-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <h3 className="font-medium text-white">Your Registration Details</h3>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* User Name Display */}
          <div className="flex items-center gap-3 text-gray-300">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-400">Registered as:</span>
            <span className="font-medium text-white">{userName}</span>
          </div>

          {/* User ID - Copyable */}
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Your Kashiyatra User ID</span>
              </div>
              <button
                onClick={() => handleCopy(kyId, "id")}
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20"
              >
                {copiedField === "id" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <code className="block rounded bg-black/40 px-3 py-2 font-mono text-lg text-amber-300">
              {kyId}
            </code>
          </div>

          {/* Email - Copyable */}
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Your Registered Email</span>
              </div>
              <button
                onClick={() => handleCopy(userEmail, "email")}
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <code className="block rounded bg-black/40 px-3 py-2 font-mono text-base text-blue-300">
              {userEmail}
            </code>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <a
          href={KONFHUB_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 py-4 font-semibold text-black shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30"
        >
          <Sparkles className="h-5 w-5" />
          <span>Purchase Pass on KonfHub</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          <ExternalLink className="h-4 w-4 opacity-60" />
        </a>
      </motion.div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-sm text-gray-500">
          Passes are sold through our ticketing partner{" "}
          <a
            href="https://konfhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline"
          >
            KonfHub
          </a>
          . Your purchase will be automatically linked to your Kashiyatra account.
        </p>
      </motion.div>
    </div>
  );
}
