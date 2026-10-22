import { memo } from "react";
import type { IconType } from "@/components/pages/home/sections/TheExperience/data/experiences.config";
import { CrowdIcon } from "./CrowdIcon";
import { StageIcon } from "./StageIcon";
import { ArtistsIcon } from "./ArtistsIcon";
import { NightsIcon } from "./NightsIcon";
import { EventsIcon } from "./EventsIcon";
import { FoodIcon } from "./FoodIcon";

// Icon lookup map
const ICON_MAP: Record<IconType, React.FC<{ color: string }>> = {
  crowd: CrowdIcon,
  stage: StageIcon,
  artists: ArtistsIcon,
  nights: NightsIcon,
  events: EventsIcon,
  food: FoodIcon,
};

export const JazzIcon = memo(function JazzIcon({ type, color }: { type: IconType; color: string }) {
  const IconComponent = ICON_MAP[type];
  return <IconComponent color={color} />;
});
