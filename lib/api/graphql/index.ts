// Apollo Client
export { apolloClient } from "./apollo";

// ═══════════════════════════════════════════════════════════════════
// QUERIES - User Account
// ═══════════════════════════════════════════════════════════════════

export {
  FULL_ACCOUNT_QUERY,
  ACCOUNT_PROGRESS_WITH_STEPS_QUERY,
  USER_NAVBAR_DISPLAY_QUERY,
  ACCOUNT_ACCESS_STATUS_QUERY,
} from "./queries/user.queries";

// ═══════════════════════════════════════════════════════════════════
// QUERIES - Campus Ambassador (CA)
// ═══════════════════════════════════════════════════════════════════

export {
  FULL_CA_INFO_QUERY,
  CA_APPLICATION_STATUS_QUERY,
  CA_PROFILE_QUERY,
} from "./queries/ca.queries";

// ═══════════════════════════════════════════════════════════════════
// TYPES - User Account
// ═══════════════════════════════════════════════════════════════════

export type {
  // Full Account
  FullAccountQueryResponse,
  FullAccountData,
  UserProfile,
  UserAccountProgress,
  // Account Progress With Steps
  AccountProgressWithStepsQueryResponse,
  AccountProgressWithStepsData,
  ProgressSteps,
  // User Navbar Display
  UserNavbarDisplayQueryResponse,
  UserNavbarDisplayData,
  // Account Access Status
  AccountAccessStatusQueryResponse,
  AccountAccessStatusData,
} from "../helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES - Campus Ambassador (CA)
// ═══════════════════════════════════════════════════════════════════

export type {
  // Full CA Info
  FullCaInfoQueryResponse,
  FullCaInfo,
  CaApplicationGql,
  CaProfileGql,
  // CA Application Status
  CaApplicationStatusQueryResponse,
  CaApplicationStatusInfo,
  CaApplicationStatusOnly,
  // CA Profile
  CaProfileQueryResponse,
  CaProfileInfo,
  CaProfileOnly,
} from "../helper/types";
