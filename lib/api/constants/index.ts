import { CookieStrategy } from "wire-axon/auth";

// Base URL includes the API version prefix
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
export const BACKEND_URL = `${BASE_URL}/api/v1`;

// API timeout in milliseconds (10 seconds)
export const API_TIMEOUT = 10000;

// Maximum retry attempts for network errors
const MAX_NETWORK_RETRIES = 2;

/**
 * Type guard for Axios errors (without importing axios directly to avoid SSR issues)
 */
function isAxiosError(error: unknown): error is {
  isAxiosError: true;
  response?: { status: number };
  request?: unknown;
  code?: string;
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as { isAxiosError: unknown }).isAxiosError === true
  );
}

/**
 * Smart retry function for TanStack Query.
 *
 * Only retries on NETWORK errors (connection refused, timeout, DNS failure, etc.)
 * Does NOT retry on HTTP error responses (4xx, 5xx) - the server has responded,
 * retrying won't help and just makes UX worse.
 *
 * @param failureCount - Number of times the query has failed
 * @param error - The error that caused the failure
 * @returns true if should retry, false otherwise
 */
export function shouldRetryOnNetworkError(failureCount: number, error: Error): boolean {
  // Don't retry beyond max attempts
  if (failureCount >= MAX_NETWORK_RETRIES) {
    return false;
  }

  // If it's an Axios error, check if server responded
  if (isAxiosError(error)) {
    // error.response exists = server responded with 4xx/5xx - don't retry
    if (error.response) {
      return false;
    }

    // error.request exists but no response = network error - retry
    // This covers: connection refused, timeout, DNS failure, CORS preflight failure, etc.
    if (error.request) {
      return true;
    }

    // Error setting up request (rare) - could retry
    return true;
  }

  // For non-Axios errors (unlikely in our setup), don't retry
  return false;
}

export const sharedFeatureConfig = {
  withCredentials: true,
  auth: new CookieStrategy(),
};
