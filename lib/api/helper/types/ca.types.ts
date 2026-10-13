// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR TYPES
// Types for CA application API & GraphQL queries
// ═══════════════════════════════════════════════════════════════════

export type CAApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

// ═══════════════════════════════════════════════════════════════════
// REST API TYPES
// ═══════════════════════════════════════════════════════════════════

export interface CaApplication {
  id: string;
  userId: string;
  status: CAApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CaApplicationApiResponse {
  statusCode: number;
  message: string;
  info: string;
  application: CaApplication;
}

// ═══════════════════════════════════════════════════════════════════
// GRAPHQL TYPES - Full CA Info Query
// ═══════════════════════════════════════════════════════════════════

export interface CaApplicationGql {
  id: string;
  status: CAApplicationStatus;
  rejectionReason: string | null;
  appliedAt: string;
  updatedAt: string;
}

export interface CaProfileGql {
  id: string;
  referralId: string;
  numberOfReferrals: number;
  approvedAt: string;
}

export interface FullCaInfo {
  hasApplied: boolean;
  application: CaApplicationGql | null;
  profile: CaProfileGql | null;
}

export interface FullCaInfoQueryResponse {
  myCaInfo: FullCaInfo;
}

// ═══════════════════════════════════════════════════════════════════
// GRAPHQL TYPES - CA Application Status Query (Lightweight)
// ═══════════════════════════════════════════════════════════════════

export interface CaApplicationStatusOnly {
  status: CAApplicationStatus;
  rejectionReason: string | null;
  appliedAt: string;
}

export interface CaApplicationStatusInfo {
  hasApplied: boolean;
  application: CaApplicationStatusOnly | null;
}

export interface CaApplicationStatusQueryResponse {
  myCaInfo: CaApplicationStatusInfo;
}

// ═══════════════════════════════════════════════════════════════════
// GRAPHQL TYPES - CA Profile Query
// ═══════════════════════════════════════════════════════════════════

export interface CaProfileOnly {
  referralId: string;
  numberOfReferrals: number;
  approvedAt: string;
}

export interface CaProfileInfo {
  profile: CaProfileOnly | null;
}

export interface CaProfileQueryResponse {
  myCaInfo: CaProfileInfo;
}
