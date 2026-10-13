"use client";

import { useMemo } from "react";
import type { College } from "@/components/pages/complete-profile/steps/college/data/config";
import { smartSearch } from "@/lib/api/helper/functions/college.functions";

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for searching colleges using smart search on local JSON data
 * @param search - Search query (min 2 characters to trigger search)
 * @param limit - Max results to return (default 15)
 */
export function useCollegeSearch(search: string, limit: number = 15) {
  const colleges = useMemo(() => {
    if (search.length < 2) return [];
    return smartSearch(search, limit);
  }, [search, limit]);

  return {
    colleges,
    count: colleges.length,
    isLoading: false,
  };
}
