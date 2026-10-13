import { query, types, optional } from "typed-graphqlify";
import { gql } from "@apollo/client/core";

// ═══════════════════════════════════════════════════════════════════
// QUERY 1: FULL CA INFO
// Returns complete CA data - application status + profile
// Use for: CA dashboard, full CA page load, profile page CA section
// ═══════════════════════════════════════════════════════════════════

export const fullCaInfoQueryDef = query("GetFullCaInfo", {
  myCaInfo: {
    hasApplied: types.boolean,
    application: optional({
      id: types.string,
      status: types.constant<"PENDING" | "ACCEPTED" | "REJECTED">("PENDING"),
      rejectionReason: optional(types.string),
      appliedAt: types.string,
      updatedAt: types.string,
    }),
    profile: optional({
      id: types.string,
      referralId: types.string,
      numberOfReferrals: types.number,
      approvedAt: types.string,
    }),
  },
});

// ═══════════════════════════════════════════════════════════════════
// QUERY 2: CA APPLICATION STATUS
// Returns only application status - lightweight check
// Use for: Quick status check, application status badge, CA page header
// ═══════════════════════════════════════════════════════════════════

export const caApplicationStatusQueryDef = query("GetCaApplicationStatus", {
  myCaInfo: {
    hasApplied: types.boolean,
    application: optional({
      status: types.constant<"PENDING" | "ACCEPTED" | "REJECTED">("PENDING"),
      rejectionReason: optional(types.string),
      appliedAt: types.string,
    }),
  },
});

// ═══════════════════════════════════════════════════════════════════
// QUERY 3: CA PROFILE
// Returns only CA profile data - for approved CAs
// Use for: Referral dashboard, CA stats display
// ═══════════════════════════════════════════════════════════════════

export const caProfileQueryDef = query("GetCaProfile", {
  myCaInfo: {
    profile: optional({
      referralId: types.string,
      numberOfReferrals: types.number,
      approvedAt: types.string,
    }),
  },
});

// ═══════════════════════════════════════════════════════════════════
// EXPORTED GQL QUERIES
// ═══════════════════════════════════════════════════════════════════

/** Full CA info with application + profile - for CA dashboard */
export const FULL_CA_INFO_QUERY = gql`
  ${fullCaInfoQueryDef.toString()}
`;

/** CA application status only - for quick status checks */
export const CA_APPLICATION_STATUS_QUERY = gql`
  ${caApplicationStatusQueryDef.toString()}
`;

/** CA profile only - for referral stats display */
export const CA_PROFILE_QUERY = gql`
  ${caProfileQueryDef.toString()}
`;
