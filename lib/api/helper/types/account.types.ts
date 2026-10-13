// ═══════════════════════════════════════════════════════════════════
// ACCOUNT TYPES
// Derived from the user account query definitions in
// graphql/queries/user.queries.ts.
// ═══════════════════════════════════════════════════════════════════

import type {
  fullAccountQueryDef,
  accountProgressWithStepsQueryDef,
  userNavbarDisplayQueryDef,
  accountAccessStatusQueryDef,
} from "../../graphql/queries/user.queries";

// ═══════════════════════════════════════════════════════════════════
// Full Account
// ═══════════════════════════════════════════════════════════════════

export type FullAccountQueryResponse = typeof fullAccountQueryDef.data;
export type FullAccountData = NonNullable<FullAccountQueryResponse["myAccount"]>;
export type UserProfile = FullAccountData["profile"];
export type UserAccountProgress = FullAccountData["progress"];

// ═══════════════════════════════════════════════════════════════════
// Account Progress With Steps
// ═══════════════════════════════════════════════════════════════════

export type AccountProgressWithStepsQueryResponse = typeof accountProgressWithStepsQueryDef.data;
export type AccountProgressWithStepsData = NonNullable<
  AccountProgressWithStepsQueryResponse["myAccount"]
>;
export type ProgressSteps = AccountProgressWithStepsData["progress"]["steps"];

// ═══════════════════════════════════════════════════════════════════
// User Navbar Display
// ═══════════════════════════════════════════════════════════════════

export type UserNavbarDisplayQueryResponse = typeof userNavbarDisplayQueryDef.data;
export type UserNavbarDisplayData = NonNullable<UserNavbarDisplayQueryResponse["myAccount"]>;

// ═══════════════════════════════════════════════════════════════════
// Account Access Status
// ═══════════════════════════════════════════════════════════════════

export type AccountAccessStatusQueryResponse = typeof accountAccessStatusQueryDef.data;
export type AccountAccessStatusData = NonNullable<AccountAccessStatusQueryResponse["myAccount"]>;
