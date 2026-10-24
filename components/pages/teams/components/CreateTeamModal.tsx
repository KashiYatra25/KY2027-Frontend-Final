"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTeam, useUserSearch, useMyAccount, type SearchedUser } from "@/lib/api/hooks";
import { TEAMS_COLORS } from "@/components/pages/teams/constants/palette";
import { X, Search, UserPlus, Trash2, Users, Loader2, Crown } from "lucide-react";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { useModalA11y } from "@/hooks/useModalA11y";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTeamSchema = z.object({
  teamName: z.string().trim().min(1, "Team name is required").max(50, "Team name is too long"),
});

type CreateTeamFormData = z.infer<typeof CreateTeamSchema>;

export function CreateTeamModal({ isOpen, onClose, onSuccess }: CreateTeamModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<SearchedUser[]>([]);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: { teamName: "" },
  });

  const { profile, progress } = useMyAccount("full");
  const account = profile && progress ? { profile, progress } : null;
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { users, isLoading: isSearching } = useUserSearch(debouncedSearch);
  const { createTeam, isCreating, isSuccess, isError, errorMessage, reset } = useCreateTeam();

  const modalRef = useModalA11y<HTMLDivElement>(isOpen, onClose);

  // Current user as creator (non-removable)
  const creator: SearchedUser | null = useMemo(() => {
    if (!account?.profile) return null;
    return {
      id: account.profile.id,
      firstName: account.profile.firstName ?? null,
      lastName: account.profile.lastName ?? null,
      email: account.profile.email,
      slugName: account.profile.slugName ?? null,
      googleAvatarUrl: account.profile.googleAvatarUrl ?? null,
      candidatePhotoUrl: account.profile.candidatePhotoUrl ?? null,
      college: account.profile.college ?? null,
    };
  }, [account]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setSearchQuery("");
      setSelectedMembers([]);
      reset();
    }
  }, [isOpen, reset, resetForm]);

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const handleAddMember = useCallback(
    (user: SearchedUser) => {
      if (!selectedMembers.find((m) => m.id === user.id)) {
        setSelectedMembers((prev) => [...prev, user]);
      }
      setSearchQuery("");
    },
    [selectedMembers]
  );

  const handleRemoveMember = useCallback((userId: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== userId));
  }, []);

  const onSubmit = useCallback(
    (data: CreateTeamFormData) => {
      if (selectedMembers.length === 0) return; // Need at least 1 other member
      // Only send other members - backend adds creator automatically
      const memberIds = selectedMembers.map((m) => m.id);
      createTeam(data.teamName.trim(), memberIds);
    },
    [selectedMembers, createTeam]
  );

  // Filter out already selected users AND creator from search results
  const filteredUsers = users.filter(
    (user) => !selectedMembers.find((m) => m.id === user.id) && user.id !== creator?.id
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-team-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-xl border shadow-2xl"
        style={{
          background: TEAMS_COLORS.BG_ROYAL,
          borderColor: TEAMS_COLORS.BORDER_SUBTLE,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: TEAMS_COLORS.BORDER_SUBTLE }}
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5" style={{ color: TEAMS_COLORS.GOLD }} />
            <h2 id="create-team-modal-title" className="text-lg font-semibold text-white">
              Create Team
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">
          {/* Team Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Team Name</label>
            <input
              type="text"
              {...register("teamName")}
              placeholder="Enter team name..."
              className="w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder-white/40 transition-colors outline-none focus:border-[#D4A853]/50"
              style={{ borderColor: TEAMS_COLORS.BORDER_SUBTLE }}
              maxLength={50}
            />
            {errors.teamName && (
              <p className="mt-1.5 text-sm text-red-400">{errors.teamName.message}</p>
            )}
          </div>

          {/* Member Search */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Add Members</label>
            <p className="mb-2 text-xs text-white/50">Only paid users can be added to teams</p>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-lg border bg-white/5 py-2.5 pr-4 pl-10 text-white placeholder-white/40 transition-colors outline-none focus:border-[#D4A853]/50"
                style={{ borderColor: TEAMS_COLORS.BORDER_SUBTLE }}
              />
              {isSearching && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-white/40" />
              )}
            </div>

            {/* Search Results */}
            {searchQuery.length >= 2 && (
              <div
                className="mt-2 max-h-48 overflow-y-auto rounded-lg border"
                style={{
                  background: TEAMS_COLORS.BG_CARD,
                  borderColor: TEAMS_COLORS.BORDER_SUBTLE,
                }}
              >
                {filteredUsers.length === 0 ? (
                  <p className="p-3 text-center text-sm text-white/50">
                    {isSearching ? "Searching..." : "No users found"}
                  </p>
                ) : (
                  filteredUsers.map((user) => {
                    const isUnpaid = user.isPaidUser === false;
                    return (
                      <button
                        key={user.id}
                        onClick={() => !isUnpaid && handleAddMember(user)}
                        disabled={isUnpaid}
                        className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                          isUnpaid ? "cursor-not-allowed opacity-60" : "hover:bg-white/5"
                        }`}
                        title={isUnpaid ? "This user hasn't purchased a pass yet" : undefined}
                      >
                        {/* Avatar */}
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                          {user.candidatePhotoUrl || user.googleAvatarUrl ? (
                            <Image
                              src={user.candidatePhotoUrl ?? user.googleAvatarUrl ?? ""}
                              alt={user.firstName ?? "User"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white/60">
                              {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-white">
                            {user.firstName ?? ""} {user.lastName ?? ""}
                          </p>
                          <p className="truncate text-xs text-white/50">{user.email}</p>
                        </div>
                        {isUnpaid ? (
                          <span className="shrink-0 rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400">
                            Unpaid
                          </span>
                        ) : (
                          <UserPlus className="h-4 w-4 flex-shrink-0 text-white/40" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Selected Members */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Team Members ({1 + selectedMembers.length})
            </label>
            <div className="space-y-2">
              {/* Creator (non-removable) */}
              {creator && (
                <div
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                  style={{
                    background: TEAMS_COLORS.GOLD_DIM,
                    borderColor: TEAMS_COLORS.GOLD,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white/10">
                      {creator.candidatePhotoUrl || creator.googleAvatarUrl ? (
                        <Image
                          src={creator.candidatePhotoUrl ?? creator.googleAvatarUrl ?? ""}
                          alt={creator.firstName ?? "You"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white/60">
                          {(creator.firstName?.[0] ?? creator.email[0]).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white">
                          {creator.firstName ?? ""} {creator.lastName ?? ""} (You)
                        </p>
                        <Crown className="h-3.5 w-3.5" style={{ color: TEAMS_COLORS.GOLD }} />
                      </div>
                      <p className="text-xs text-white/50">{creator.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/40">Creator</span>
                </div>
              )}

              {/* Other members */}
              {selectedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                  style={{
                    background: TEAMS_COLORS.GOLD_DIM,
                    borderColor: TEAMS_COLORS.BORDER_ACCENT,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white/10">
                      {member.candidatePhotoUrl || member.googleAvatarUrl ? (
                        <Image
                          src={member.candidatePhotoUrl ?? member.googleAvatarUrl ?? ""}
                          alt={member.firstName ?? "User"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white/60">
                          {(member.firstName?.[0] ?? member.email[0]).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        {member.firstName ?? ""} {member.lastName ?? ""}
                      </p>
                      <p className="text-xs text-white/50">{member.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    aria-label="Remove member"
                    className="rounded p-1 text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {isError && <p className="text-sm text-red-400">{errorMessage}</p>}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 border-t px-5 py-4"
          style={{ borderColor: TEAMS_COLORS.BORDER_SUBTLE }}
        >
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={selectedMembers.length === 0 || isSubmitting || isCreating}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${TEAMS_COLORS.GOLD} 0%, ${TEAMS_COLORS.GOLD_LIGHT} 100%)`,
              color: TEAMS_COLORS.BG_DEEP,
            }}
          >
            {(isSubmitting || isCreating) && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
