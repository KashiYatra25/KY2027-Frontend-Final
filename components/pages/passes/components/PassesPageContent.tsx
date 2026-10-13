"use client";

import { PassesSection } from "@/components/pages/passes/sections/main";
import { ThemedNavbar } from "@/components/navbar";

export function PassesPageContent() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg,
          #0a0510 0%,
          #120818 10%,
          #1a0c22 25%,
          #22102c 40%,
          #2a1435 50%,
          #22102c 60%,
          #1a0c22 75%,
          #120818 90%,
          #0a0510 100%
        )`,
      }}
    >
      {/* Fixed navbar - always visible on passes page */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <PassesSection />
    </main>
  );
}
