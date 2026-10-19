import { memo } from "react";

/**
 * Kashi Yatra text with year
 * Mobile only - displayed below the diya
 */
export const KashiYatraText = memo(function KashiYatraText() {
  return (
    <div className="mt-4 flex flex-col items-center">
      <span
        className="text-[24px] font-black tracking-wide"
        style={{
          fontFamily: "var(--font-ethereal), 'Noto Sans Devanagari', serif",
          color: "#FFD700",
          textShadow: "0 0 20px rgba(255,200,50,0.8), 0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Kashi Yatra
      </span>
      <span
        className="mt-1 text-[16px] font-bold tracking-[0.3em]"
        style={{
          fontFamily: "var(--font-ethereal), 'Noto Sans Devanagari', serif",
          color: "#DAA520",
          textShadow: "0 0 15px rgba(218,165,32,0.7), 0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        2027
      </span>
    </div>
  );
});
