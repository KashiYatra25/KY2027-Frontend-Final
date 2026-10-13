"use client";

import { useMyRegistrations } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { Ticket, Check, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export function MyRegistrationsSection() {
  const { registrations, count, isLoading } = useMyRegistrations();

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

  return (
    <SectionWrapper
      title="My Registrations"
      icon={<Ticket className="h-5 w-5" />}
      count={count}
      linkHref="/events"
      linkText="Browse Events"
    >
      {count === 0 ? (
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
          {registrations.slice(0, 4).map((reg) => (
            <div
              key={reg.registrationId}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <StatusIcon status={reg.status} />
                <div>
                  <p className="font-medium text-white">{reg.event?.name ?? reg.eventSlug}</p>
                  <p className="text-xs text-white/50">
                    {reg.participationType === "individual" ? (
                      "Individual"
                    ) : (
                      <>Team: {reg.team?.name ?? "Unknown"}</>
                    )}
                    {reg.event?.category && (
                      <span className="ml-2 text-white/30">• {reg.event.category}</span>
                    )}
                  </p>
                </div>
              </div>
              <StatusBadge status={reg.status} />
            </div>
          ))}
          {count > 4 && (
            <p className="text-center text-xs text-white/40">
              +{count - 4} more registration{count - 4 > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}

function StatusIcon({ status }: { status: string }) {
  const iconClass = "h-4 w-4";

  switch (status) {
    case "confirmed":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/20">
          <Check className={iconClass} style={{ color: COLORS.SUCCESS }} />
        </div>
      );
    case "pending":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20">
          <Clock className={iconClass} style={{ color: COLORS.WARNING }} />
        </div>
      );
    default:
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          <Ticket className={iconClass} style={{ color: "white" }} />
        </div>
      );
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: "bg-green-500/20", text: "text-green-400" },
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    cancelled: { bg: "bg-red-500/20", text: "text-red-400" },
    waitlisted: { bg: "bg-blue-500/20", text: "text-blue-400" },
  };

  const style = styles[status] ?? { bg: "bg-white/10", text: "text-white/60" };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${style.bg} ${style.text}`}>
      {status}
    </span>
  );
}

// Wrapper component for consistent section styling
function SectionWrapper({
  title,
  icon,
  count,
  linkHref,
  linkText,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  linkHref?: string;
  linkText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: COLORS.GOLD }}>{icon}</span>
          <h3 className="font-semibold text-white">{title}</h3>
          {count !== undefined && count > 0 && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
              {count}
            </span>
          )}
        </div>
        {linkHref && (
          <Link
            href={linkHref}
            className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white/80"
          >
            {linkText} <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
