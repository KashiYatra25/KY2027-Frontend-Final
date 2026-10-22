import { COLORS } from "@/components/pages/complete-profile/constants/palette";

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: `${COLORS.CREAM}60` }}>{label}</span>
      <span className="font-medium" style={{ color: COLORS.CREAM }}>
        {value}
      </span>
    </div>
  );
}
