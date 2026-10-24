"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApplyReferral } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/profile/constants/palette";
import type { UserProfile, UserAccountProgress } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// REFERRED BY SECTION (profile hero)
//
// After the profile is complete:
//   • If the user already applied a CA referral → show the referrer's name.
//   • Otherwise → show a one-time "Referred by" code input + submit.
// Hidden entirely until the profile is complete.
// ═══════════════════════════════════════════════════════════════════

interface ReferredBySectionProps {
  userData: UserProfile | null;
  progress: UserAccountProgress | null;
  /** Refetch the account query so the referrer name shows after applying. */
  refetch: () => void;
}

const ReferralFormSchema = z.object({
  referralId: z.string().trim().min(1, "Enter a referral code").max(32, "Code is too long"),
});

type ReferralFormData = z.infer<typeof ReferralFormSchema>;

export function ReferredBySection({ userData, progress, refetch }: ReferredBySectionProps) {
  const { applyReferral, isPending } = useApplyReferral();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(ReferralFormSchema),
    defaultValues: { referralId: "" },
  });

  // Only show this on a completed profile.
  if (!progress?.isProfileComplete) return null;

  // CAs cannot apply referral codes - they ARE the referrers
  if (userData?.isCa) return null;

  const referredBy = userData?.referredBy ?? null;

  const onSubmit = async (data: ReferralFormData) => {
    if (isPending) return;
    const ok = await applyReferral(data.referralId);
    if (ok) {
      reset();
      refetch();
    }
  };

  // ── Already referred: show the referrer's name ──
  if (referredBy) {
    return (
      <div
        className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}14 0%, ${COLORS.GOLD}06 100%)`,
          border: `1px solid ${COLORS.GOLD}40`,
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
          style={{ background: `${COLORS.GOLD}22`, color: COLORS.GOLD_LIGHT }}
        >
          🤝
        </span>
        <div className="min-w-0">
          <p
            className="text-[11px] tracking-wider uppercase"
            style={{ color: `${COLORS.CREAM}70` }}
          >
            Referred by
          </p>
          <p className="truncate text-sm font-semibold" style={{ color: COLORS.GOLD_LIGHT }}>
            {referredBy}
          </p>
        </div>
      </div>
    );
  }

  // ── Not referred yet: one-time apply form ──
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 rounded-xl px-4 py-3"
      style={{
        background: `${COLORS.BG_DEEP}66`,
        border: `1px solid ${COLORS.GOLD}25`,
      }}
    >
      <p
        className="mb-2 text-[11px] tracking-wider uppercase"
        style={{ color: `${COLORS.CREAM}70` }}
      >
        Referred by a Campus Ambassador?
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Enter referral code"
          disabled={isPending}
          className="flex-1 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus:border-yellow-400/70 disabled:opacity-60"
          style={{
            background: `${COLORS.BG_DEEP}`,
            border: `1px solid ${COLORS.GOLD}30`,
            color: COLORS.CREAM,
          }}
          {...register("referralId")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
          }}
        >
          {isPending ? "Applying…" : "Apply"}
        </button>
      </div>
      {errors.referralId && (
        <p className="mt-1.5 text-xs text-red-400">{errors.referralId.message}</p>
      )}
      <p className="mt-1.5 text-[11px]" style={{ color: `${COLORS.CREAM}40` }}>
        This can only be applied once.
      </p>
    </form>
  );
}
