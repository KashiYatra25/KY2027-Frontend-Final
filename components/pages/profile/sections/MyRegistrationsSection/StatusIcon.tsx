import { Ticket, Check, Clock, X } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";

export function StatusIcon({ status }: { status: string }) {
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
    case "cancelled":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20">
          <X className={iconClass} style={{ color: "#f87171" }} />
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
