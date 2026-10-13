"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { useApiQuery, useApiMutation } from "wire-axon/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL, sharedFeatureConfig, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { CreateTeamSchema } from "@/lib/api/utils/team.schema";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface TeamMember {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  googleAvatarUrl: string | null;
  candidatePhotoUrl: string | null;
  isYou: boolean;
}

export interface Team {
  teamId: string;
  name: string;
  createdBy: string;
  isCreator: boolean;
  memberCount: number;
  members: TeamMember[];
  createdAt: string;
}

interface TeamsApiResponse {
  statusCode: number;
  message: string;
  info: string;
  teams: Team[];
  count: number;
}

interface CreateTeamResponse {
  statusCode: number;
  message: string;
  info: string;
  teamId: string;
  name: string;
  memberCount: number;
  members: Array<{
    userId: string;
    name: string | null;
    email: string;
  }>;
}

// User search types
export interface SearchedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  slugName: string | null;
  googleAvatarUrl: string | null;
  candidatePhotoUrl: string | null;
  college: string | null;
}

interface UserSearchApiResponse {
  statusCode: number;
  message: string;
  info: string;
  users: SearchedUser[];
  count: number;
}

// ═══════════════════════════════════════════════════════════════════
// useMyTeams - Get all teams for current user
// ═══════════════════════════════════════════════════════════════════

export function useMyTeams() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<TeamsApiResponse>({
    queryKey: ["my-teams"],
    url: "/teams/my",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: API_RETRY,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch teams");
    }
    return null;
  }, [error]);

  // Filter teams by size (useful for event registration)
  const getTeamsForSize = useCallback(
    (minSize: number, maxSize: number) => {
      if (!data?.teams) return [];
      return data.teams.filter(
        (team) => team.memberCount >= minSize && team.memberCount <= maxSize
      );
    },
    [data]
  );

  // Get duo teams (exactly 2 members)
  const duoTeams = useMemo(() => getTeamsForSize(2, 2), [getTeamsForSize]);

  return {
    teams: data?.teams ?? [],
    count: data?.count ?? 0,
    duoTeams,
    getTeamsForSize,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useCreateTeam - Create a new team
// ═══════════════════════════════════════════════════════════════════

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useApiMutation<CreateTeamResponse>({
      url: "/teams",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      method: "post",
      apiConfig: { timeout: API_TIMEOUT },
      bodyValidator: { bodySchema: CreateTeamSchema },
      mutationOptions: {
        retry: API_RETRY,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["my-teams"] });
        },
      },
    });

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to create team"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const createTeam = useCallback(
    (name: string, memberIds: string[]) => {
      mutate({ name, members: memberIds });
    },
    [mutate]
  );

  return {
    createTeam,
    isCreating: isPending,
    isSuccess,
    isError,
    errorMessage,
    data: data?.data ?? null,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════════
// useUserSearch - Search for paid users (for team creation)
// ═══════════════════════════════════════════════════════════════════

export function useUserSearch(query: string, options?: { enabled?: boolean }) {
  const trimmedQuery = query.trim();
  const enabled = (options?.enabled ?? true) && trimmedQuery.length >= 2;

  const { data, isLoading, isError, error, refetch } = useApiQuery<UserSearchApiResponse>({
    queryKey: ["user-search", trimmedQuery],
    url: `/user/search?searchQuery=${encodeURIComponent(trimmedQuery)}&limit=10`,
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    apiConfig: { timeout: API_TIMEOUT },
    queryOptions: {
      enabled,
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: API_RETRY, // Don't retry search much
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to search users");
    }
    return null;
  }, [error]);

  return {
    users: data?.users ?? [],
    count: data?.count ?? 0,
    isLoading: enabled && isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
