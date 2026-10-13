// ═══════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════════

export { useContact } from "./useContact";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdateCollege } from "./profile/useProfile";
export type { UpdateCollegeData } from "@/lib/api/helper/types/profile.types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Aadhaar Verification
// ═══════════════════════════════════════════════════════════════════

export { useAadhaarUpload, useAadhaarVerify } from "./profile/useAadhaar";
export type { AadhaarExtractedData } from "@/lib/api/helper/types/aadhaar.types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - Phone Update
// ═══════════════════════════════════════════════════════════════════

export { useUpdatePhone } from "./usePhoneUpdate";

// ═══════════════════════════════════════════════════════════════════
// PROFILE - College Search
// ═══════════════════════════════════════════════════════════════════

export { useCollegeSearch } from "./profile/useCollegeSearch";
export type { College } from "@/components/pages/complete-profile/steps/college/data/config";

// ═══════════════════════════════════════════════════════════════════
// AUTH - Sign In / Sign Out
// ═══════════════════════════════════════════════════════════════════

export { useSignIn } from "./profile/useGoogleSignIn";
export { useSignOut } from "./profile/useSessionSignOut";

// ═══════════════════════════════════════════════════════════════════
// GRAPHQL HOOKS - Account & Profile Queries
// ═══════════════════════════════════════════════════════════════════

// Unified account hook - use query type to specify what data you need:
//   useMyAccount("full")     - Full profile + progress (dashboard, settings)
//   useMyAccount("navbar")   - Avatar + completion % (navbar, greeting)
//   useMyAccount("access")   - Just isProfileComplete (feature gating)
//   useMyAccount("progress") - Progress with step details (wizard)
export { useMyAccount } from "./profile/useMyAccount";

// ═══════════════════════════════════════════════════════════════════
// PASSES
// ═══════════════════════════════════════════════════════════════════

export { usePasses } from "./passes/usePasses";
export type { Pass, PassBenefit, PassDetail } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════════

export {
  useEvents,
  useEvent,
  useEventsByCategory,
  CATEGORY_METADATA,
  type Event,
  type EventDetails,
  type EventCategorySlug,
  type EventCategory,
  type ParticipationType,
  type EventsQueryParams,
} from "./events/useEvents";

// ═══════════════════════════════════════════════════════════════════
// REGISTRATIONS
// ═══════════════════════════════════════════════════════════════════

export {
  useMyRegistrations,
  useEventRegisterIndividual,
  useEventRegisterTeam,
  type Registration,
} from "./registrations/useRegistrations";

// ═══════════════════════════════════════════════════════════════════
// TEAMS
// ═══════════════════════════════════════════════════════════════════

export {
  useMyTeams,
  useCreateTeam,
  useUserSearch,
  type Team,
  type TeamMember,
  type SearchedUser,
} from "./teams/useTeams";

// ═══════════════════════════════════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════════════════════════════════

export { usePaymentStatus } from "./payment/usePaymentStatus";

// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR
// ═══════════════════════════════════════════════════════════════════

export { useCaApplication } from "./ca/useCaApplication";
export { useCaInfo } from "./ca/useCaInfo";
export type {
  CAApplicationStatus,
  CaApplication,
  CaApplicationApiResponse,
  FullCaInfo,
  CaApplicationGql,
  CaProfileGql,
} from "@/lib/api/helper/types/ca.types";

// ═══════════════════════════════════════════════════════════════════
// CART
// ═══════════════════════════════════════════════════════════════════

export { useGetMyCart } from "./cart/useGetMyCart";
export { useAddToMyCart } from "./cart/useAddToMyCart";
export { useRemoveFromMyCart } from "./cart/useRemoveFromMyCart";
export { useClearMyCart } from "./cart/useClearMyCart";
export { useUpdateCartQuantity } from "./cart/useUpdateCartQuantity";
export type {
  CartItem,
  CartApiResponse,
  AddToCartRequest,
  RemoveFromCartRequest,
  CartItemWithDetails,
} from "@/lib/api/helper/types/cart.types";
