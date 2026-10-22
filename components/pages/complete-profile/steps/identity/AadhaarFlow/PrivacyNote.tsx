import { Shield } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

export function PrivacyNote() {
  return (
    <div
      className="mx-auto flex max-w-md items-start gap-3 rounded-xl p-4"
      style={{ background: `${COLORS.GOLD}08`, border: `1px solid ${COLORS.GOLD}20` }}
    >
      <Shield className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLORS.GOLD }} />
      <div>
        <p className="mb-1 text-sm font-medium" style={{ color: COLORS.GOLD }}>
          Your privacy is protected
        </p>
        <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
          Your Aadhaar image is processed securely and deleted immediately after verification. We
          only store the last 4 digits of your Aadhaar number.
        </p>
      </div>
    </div>
  );
}
