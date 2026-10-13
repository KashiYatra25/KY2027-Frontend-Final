"use client";

import {
  GRADIENT_FRAME_GOLD,
  GRADIENT_FRAME_DARK,
} from "@/components/pages/passes/constants/palette";

export function RoyalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 rounded-[14px]"
        style={{ background: GRADIENT_FRAME_GOLD, padding: "3px" }}
      >
        <div
          className="h-full w-full rounded-[11px]"
          style={{ background: GRADIENT_FRAME_DARK, padding: "2px" }}
        >
          <div
            className="h-full w-full rounded-[9px]"
            style={{ background: GRADIENT_FRAME_GOLD, padding: "2px" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[7px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
