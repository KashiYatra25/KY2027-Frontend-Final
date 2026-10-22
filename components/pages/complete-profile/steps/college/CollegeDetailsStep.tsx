"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
} from "./sections";
import { isIITBhuCollege } from "@/lib/api/helper/functions/college.functions";
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
// FORM SCHEMA
// ═══════════════════════════════════════════════════════════════════

const CollegeFormSchema = z
  .object({
    // Which entry mode the user is in. Drives which value becomes the payload.
    isManualMode: z.boolean(),
    // Autocomplete query (also used as a fallback submitted value in search mode).
    searchQuery: z.string(),
    // The college selected from the search dropdown.
    selectedCollege: z.custom<College | null>().nullable(),
    // Manually typed college name.
    manualCollege: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.isManualMode) {
      const trimmed = data.manualCollege.trim();
      if (trimmed.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["manualCollege"],
          message: "Please enter your full college name (at least 3 characters)",
        });
        return;
      }
      if (isIITBhuCollege(trimmed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["manualCollege"],
          message:
            "IIT BHU students are verified via their institute email. Please sign in with your @itbhu.ac.in or @iitbhu.ac.in email instead.",
        });
      }
    } else {
      const collegeName = data.selectedCollege?.name || data.searchQuery;
      if (!data.selectedCollege && data.searchQuery.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["searchQuery"],
          message: "Please search and select your college (at least 3 characters)",
        });
        return;
      }
      if (isIITBhuCollege(collegeName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["searchQuery"],
          message:
            "IIT BHU students are verified via their institute email. Please sign in with your @itbhu.ac.in or @iitbhu.ac.in email instead.",
        });
      }
    }
  });

type CollegeFormData = z.infer<typeof CollegeFormSchema>;

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function CollegeDetailsStep({ refetchProgress }: CollegeDetailsStepProps) {
  const { data: session } = useSession();

  // Form state (genuine submitted fields) managed via react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CollegeFormData>({
    resolver: zodResolver(CollegeFormSchema),
    mode: "onChange",
    defaultValues: {
      isManualMode: false,
      searchQuery: "",
      selectedCollege: null,
      manualCollege: "",
    },
  });

  // Register non-input-backed fields so they participate in validation
  register("isManualMode");
  register("selectedCollege");

  const isManualMode = watch("isManualMode");
  const searchQuery = watch("searchQuery");
  const selectedCollege = watch("selectedCollege");
  const manualCollege = watch("manualCollege");

  // Pure UI / non-field state stays as useState
  const [isManualInputValid, setIsManualInputValid] = useState(true);
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
  const handleSelectCollege = useCallback(
    (college: College) => {
      setValue("selectedCollege", college, { shouldValidate: true });
      setValue("searchQuery", college.name, { shouldValidate: true });
      setIsDropdownOpen(false);
    },
    [setValue]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setValue("searchQuery", value, { shouldValidate: true });
      setValue("selectedCollege", null, { shouldValidate: true });
      setIsDropdownOpen(true);
    },
    [setValue]
  );

  const handleClearSearch = useCallback(() => {
    setValue("searchQuery", "", { shouldValidate: true });
    setValue("selectedCollege", null, { shouldValidate: true });
  }, [setValue]);

  const handleToggleManualMode = useCallback(() => {
    setValue("isManualMode", true, { shouldValidate: true });
    setValue("selectedCollege", null, { shouldValidate: true });
    setValue("searchQuery", "", { shouldValidate: true });
    setValue("manualCollege", "", { shouldValidate: true });
    setIsManualInputValid(true);
  }, [setValue]);

  const handleManualValidationChange = useCallback((isValid: boolean) => {
    setIsManualInputValid(isValid);
  }, []);

  const onSubmit = useCallback(
    (data: CollegeFormData) => {
      const collegeName = data.isManualMode
        ? data.manualCollege
        : data.selectedCollege?.name || data.searchQuery;

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
    },
    [updateCollege, refetchProgress]
  );

  const handleRetry = useCallback(() => {
    setShowError(false);
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const handleSearchAgain = useCallback(() => {
    setShowError(false);
    setValue("searchQuery", "", { shouldValidate: true });
    setValue("selectedCollege", null, { shouldValidate: true });
    setValue("manualCollege", "", { shouldValidate: true });
    setIsManualInputValid(true);
  }, [setValue]);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
        onSearchMode={() => setValue("isManualMode", false, { shouldValidate: true })}
        onManualMode={() => setValue("isManualMode", true, { shouldValidate: true })}
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

          {errors.searchQuery && (
            <span className="mt-2 block text-xs text-red-400">{errors.searchQuery.message}</span>
          )}

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
        <div>
          <ManualInput
            value={manualCollege}
            onChange={(value) => setValue("manualCollege", value, { shouldValidate: true })}
            onValidationChange={handleManualValidationChange}
          />
          {errors.manualCollege && (
            <span className="mt-2 block text-xs text-red-400">{errors.manualCollege.message}</span>
          )}
        </div>
      )}

      {/* Action Button */}
      <div className="pt-4">
        <button
          type="submit"
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
    </form>
  );
}
