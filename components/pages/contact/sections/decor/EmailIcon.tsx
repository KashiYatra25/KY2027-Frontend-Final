import { COLORS } from "@/components/pages/contact/constants/palette";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: COLORS.BRIGHT_GOLD,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function EmailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6l9 6 9-6" />
    </svg>
  );
}
