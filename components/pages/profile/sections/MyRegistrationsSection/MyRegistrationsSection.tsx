"use client";

import { useState } from "react";
import { useMyRegistrations } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { Ticket, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "./SectionWrapper";
import { RegistrationCard } from "./RegistrationCard";

export function MyRegistrationsSection() {
  const { activeRegistrations, cancelledRegistrations, activeCount, isLoading, refetch } =
    useMyRegistrations();
  const [showCancelled, setShowCancelled] = useState(false);

  if (isLoading) {
    return (
      <SectionWrapper title="My Registrations" icon={<Ticket className="h-5 w-5" />}>
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5" />
          ))}
        </div>
      </SectionWrapper>
    );
  }

  const totalCount = activeCount + cancelledRegistrations.length;

  return (
    <SectionWrapper
      title="My Registrations"
      icon={<Ticket className="h-5 w-5" />}
      count={activeCount}
      linkHref="/events"
      linkText="Browse Events"
    >
      {totalCount === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
          <Ticket className="mx-auto mb-2 h-8 w-8 text-white/30" />
          <p className="text-sm text-white/50">You haven&apos;t registered for any events yet</p>
          <Link
            href="/events"
            className="mt-3 inline-block text-sm font-medium"
            style={{ color: COLORS.GOLD }}
          >
            Explore Events →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Active registrations */}
          {activeRegistrations.length === 0 && cancelledRegistrations.length > 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-sm text-white/50">No active registrations</p>
            </div>
          ) : (
            activeRegistrations
              .slice(0, 4)
              .map((reg) => (
                <RegistrationCard
                  key={reg.registrationId}
                  registration={reg}
                  onCancelSuccess={refetch}
                />
              ))
          )}

          {activeCount > 4 && (
            <p className="text-center text-xs text-white/40">
              +{activeCount - 4} more active registration{activeCount - 4 > 1 ? "s" : ""}
            </p>
          )}

          {/* Cancelled registrations (collapsible) */}
          {cancelledRegistrations.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <button
                onClick={() => setShowCancelled(!showCancelled)}
                className="flex w-full items-center justify-between text-xs text-white/40 transition-colors hover:text-white/60"
              >
                <span>
                  {cancelledRegistrations.length} cancelled registration
                  {cancelledRegistrations.length > 1 ? "s" : ""}
                </span>
                {showCancelled ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showCancelled && (
                <div className="mt-2 space-y-2">
                  {cancelledRegistrations.map((reg) => (
                    <RegistrationCard key={reg.registrationId} registration={reg} isCancelled />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
