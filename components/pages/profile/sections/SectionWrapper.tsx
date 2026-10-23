"use client";

import { COLORS } from "@/components/pages/profile/constants/palette";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Wrapper component for consistent section styling
export function SectionWrapper({
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
