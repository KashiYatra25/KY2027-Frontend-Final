// Page content components
export { EventsPageContent, CategoryPageContent } from "./sections";

// Decor & loader
export { DecorativeElements, EventsLoader } from "./sections";

// Reusable components
export { CategoryCard, PageTitle, SubEventCard, CategoryHeader } from "./components";

// Types
export type { SubEvent, EventCategory } from "@/lib/api/helper/types";

// Config (shared data - used by schedule campusMap too)
export { EVENT_CATEGORIES } from "@/lib/data/events.config";

// Constants
export { COLORS, JAZZ_COLORS, EVENT_TYPE_COLORS } from "./constants/palette";
