"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { GraduationCap, Loader2 } from "lucide-react";
import { useCollegeSearch, useUpdateCollege, type College } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import {
  ModeToggle,
  CollegeSearchInput,
  CollegeDropdown,
  SelectedCollegeCard,
  ManualInput,
  isIITBhuCollege,
} from "./sections";
import { useDebounce } from "@/hooks/useDebounce";
import { CollegeLoader } from "./loader/CollegeLoader";
import { CollegeErrorState } from "./error/CollegeErrorState";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface CollegeDetailsStepProps {
  refetchProgress: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function CollegeDetailsStep({ refetchProgress }: CollegeDetailsStepProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [manualCollege, setManualCollege] = useState("");
  const [isManualInputValid, setIsManualInputValid] = useState(true);

  // If the person's college is not in our dataset , then he have to enter it manually.
  const [isManualMode, setIsManualMode] = useState(false);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // College search hook
  const { colleges, isLoading: isSearching } = useCollegeSearch(
    isManualMode ? "" : debouncedSearch,
    15
  );

  // Update college hook
  const {
    updateCollege,
    isPending: isUpdating,
    errorMessage,
  } = useUpdateCollege(session?.user?.id);

  // Error state
  const [showError, setShowError] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleSelectCollege = useCallback((college: College) => {
    setSelectedCollege(college);
    setSearchQuery(college.name);
    setIsDropdownOpen(false);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setSelectedCollege(null);
    setIsDropdownOpen(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedCollege(null);
  }, []);

  const handleToggleManualMode = useCallback(() => {
    setIsManualMode(true);
    setSelectedCollege(null);
    setSearchQuery("");
    setManualCollege("");
    setIsManualInputValid(true);
  }, []);

  const handleManualValidationChange = useCallback((isValid: boolean) => {
    setIsManualInputValid(isValid);
  }, []);

  const handleSubmit = useCallback(() => {
    const collegeName = isManualMode ? manualCollege : selectedCollege?.name || searchQuery;

    if (!collegeName.trim()) return;

    // Double-check IIT BHU validation before submitting
    if (isIITBhuCollege(collegeName)) {
      setShowError(true);
      return;
    }

    updateCollege(
      { college: collegeName },
      {
        onSuccess: () => {
          setShowError(false);
          refetchProgress();
        },
        onError: () => {
          // Hook derives a user-friendly errorMessage; just surface the error state
          setShowError(true);
        },
      }
    );
  }, [isManualMode, manualCollege, selectedCollege, searchQuery, updateCollege, refetchProgress]);

  const handleRetry = useCallback(() => {
    setShowError(false);
    handleSubmit();
  }, [handleSubmit]);

  const handleSearchAgain = useCallback(() => {
    setShowError(false);
    setSearchQuery("");
    setSelectedCollege(null);
    setManualCollege("");
    setIsManualInputValid(true);
  }, []);

  // Check if selected college from search is IIT BHU (shouldn't happen via normal search but safety check)
  const isSearchCollegeValid = !selectedCollege || !isIITBhuCollege(selectedCollege.name);
  const isSearchQueryValid = searchQuery.length < 3 || !isIITBhuCollege(searchQuery);

  const isValid = isManualMode
    ? manualCollege.trim().length >= 3 && isManualInputValid
    : (selectedCollege !== null || searchQuery.trim().length >= 3) &&
      isSearchCollegeValid &&
      isSearchQueryValid;

  // Show loader when updating
  if (isUpdating) {
    return <CollegeLoader />;
  }

  // Show error state
  if (showError) {
    return (
      <CollegeErrorState
        message={errorMessage ?? "Something went wrong. Please try again."}
        onRetry={handleRetry}
        onSearchAgain={handleSearchAgain}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <GraduationCap className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: COLORS.CREAM }}>
          Your College Details
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          Search and select your college from our database
        </p>
      </div>

      {/* Mode Toggle */}
      <ModeToggle
        isManualMode={isManualMode}
        onSearchMode={() => setIsManualMode(false)}
        onManualMode={() => setIsManualMode(true)}
      />

      {/* College Search or Manual Input */}
      {!isManualMode ? (
        <div className="relative">
          <CollegeSearchInput
            ref={inputRef}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            onClear={handleClearSearch}
            isDropdownOpen={isDropdownOpen}
          />

          {isDropdownOpen && searchQuery.length >= 2 && (
            <CollegeDropdown
              ref={dropdownRef}
              colleges={colleges}
              isSearching={isSearching}
              onSelect={handleSelectCollege}
              onManualMode={handleToggleManualMode}
            />
          )}

          {selectedCollege && <SelectedCollegeCard college={selectedCollege} />}
        </div>
      ) : (
        <ManualInput
          value={manualCollege}
          onChange={setManualCollege}
          onValidationChange={handleManualValidationChange}
        />
      )}

      {/* Action Button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid || isUpdating}
          className={`w-full rounded-xl py-3 text-lg font-semibold transition-all duration-300 ${
            isValid && !isUpdating
              ? "hover:scale-[1.02] hover:shadow-lg"
              : "cursor-not-allowed opacity-50"
          }`}
          style={{
            background: isValid
              ? `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`
              : `${COLORS.GOLD}30`,
            color: isValid ? COLORS.BG_DEEP : `${COLORS.CREAM}50`,
            boxShadow: isValid ? `0 10px 40px ${COLORS.GOLD}30` : "none",
          }}
        >
          {isUpdating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
