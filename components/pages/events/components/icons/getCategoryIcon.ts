import { NatrajIcon } from "./NatrajIcon";
import { CrosswindzIcon } from "./CrosswindzIcon";
import { BandishIcon } from "./BandishIcon";
import { AbhinayIcon } from "./AbhinayIcon";
import { MirageIcon } from "./MirageIcon";
import { ToolikaIcon } from "./ToolikaIcon";
import { EnquiztaIcon } from "./EnquiztaIcon";
import { SamwaadIcon } from "./SamwaadIcon";
import { ZaikaIcon } from "./ZaikaIcon";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// ICON MAP
// ═══════════════════════════════════════════════════════════════════

export const CATEGORY_ICONS: Record<string, React.FC<CategoryIconProps>> = {
  NATRAJ: NatrajIcon,
  CROSSWINDZ: CrosswindzIcon,
  BANDISH: BandishIcon,
  ABHINAY: AbhinayIcon,
  MIRAGE: MirageIcon,
  TOOLIKA: ToolikaIcon,
  ENQUIZTA: EnquiztaIcon,
  SAMWAAD: SamwaadIcon,
  ZAIKA: ZaikaIcon,
};

// Helper to get icon by category slug
export function getCategoryIcon(categorySlug: string): React.FC<CategoryIconProps> | null {
  if (!categorySlug) return null;
  return CATEGORY_ICONS[categorySlug.toUpperCase()] || null;
}
