import { CookieStrategy } from "wire-axon/auth";

// Base URL includes the API version prefix
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
export const BACKEND_URL = `${BASE_URL}/api/v1`;

// API timeout in milliseconds (7 seconds)
export const API_TIMEOUT = 7000;

// API retry count
export const API_RETRY = 3;

export const sharedFeatureConfig = {
  withCredentials: true,
  auth: new CookieStrategy(),
};
