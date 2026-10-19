"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Upload, Shield, CheckCircle, FileImage, X, Lock } from "lucide-react";
import { Dropzone, useDropzoneState } from "@/components/ui/dropzone";
import { useAadhaarUpload, useAadhaarVerify } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════

type AadhaarStep = "upload" | "verify" | "success";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

interface AadhaarFlowProps {
  refetchProgress: () => void;
  /** Reports to the parent when a backend request is in flight. */
  onBusyChange?: (busy: boolean) => void;
  /** When true, the flow is a non-interactive preview (shows a lock chip). */
  locked?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function AadhaarFlow({ refetchProgress, onBusyChange, locked = false }: AadhaarFlowProps) {
  const { data: session } = useSession();
  const [step, setStep] = useState<AadhaarStep>("upload");

  // Dropzone state
  const {
    file,
    preview,
    error: dropzoneError,
    handleFilesSelected,
    handleFilesRejected,
    reset: resetDropzone,
  } = useDropzoneState();

  // Aadhaar hooks
  const {
    uploadAadhaar,
    isLoading: isUploading,
    isUploaded,
    errorMessage: uploadError,
    reset: resetUpload,
  } = useAadhaarUpload(session?.user?.id);

  const {
    verifyAadhaar,
    isLoading: isVerifying,
    isVerified,
    errorMessage: verifyError,
    extractedData,
    reset: resetVerify,
  } = useAadhaarVerify(session?.user?.id);

  // Report busy state (any in-flight request) up so the method toggle locks.
  useEffect(() => {
    onBusyChange?.(isUploading || isVerifying);
  }, [isUploading, isVerifying, onBusyChange]);

  // ─── Handlers ──────────────────────────────────────────────────────

  const handleRemoveFile = useCallback(() => {
    resetDropzone();
    resetUpload();
    resetVerify();
    setStep("upload");
  }, [resetDropzone, resetUpload, resetVerify]);

  const handleUpload = useCallback(async () => {
    if (!file) return;
    const success = await uploadAadhaar(file);
    if (success) {
      setStep("verify");
    }
  }, [file, uploadAadhaar]);

  const handleVerify = useCallback(async () => {
    const success = await verifyAadhaar();
    if (success) {
      setStep("success");
    }
  }, [verifyAadhaar]);

  const handleComplete = useCallback(() => {
    refetchProgress();
  }, [refetchProgress]);

  // ─── Render: Success ───────────────────────────────────────────────

  if (step === "success" && isVerified && extractedData) {
    return (
      <div className="space-y-6">
        <div
          className="mx-auto max-w-md rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.SUCCESS}10 0%, ${COLORS.SUCCESS}05 100%)`,
            border: `1px solid ${COLORS.SUCCESS}30`,
          }}
        >
          <div className="mb-4 flex items-center justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: `${COLORS.SUCCESS}20` }}
            >
              <CheckCircle className="h-8 w-8" style={{ color: COLORS.SUCCESS }} />
            </div>
          </div>
          <h3 className="mb-4 text-center text-lg font-bold" style={{ color: COLORS.CREAM }}>
            Identity Verified Successfully!
          </h3>
          <div className="space-y-2 text-sm">
            <InfoRow label="Name" value={extractedData.data.name} />
            <InfoRow label="Gender" value={extractedData.data.gender} />
            <InfoRow label="Date of Birth" value={extractedData.data.dateOfBirth} />
            <InfoRow label="Aadhaar" value={`XXXX XXXX ${extractedData.data.aadhaarLast4}`} />
          </div>
        </div>
        <div className="flex justify-center">
          <ActionButton onClick={handleComplete} loading={false}>
            Continue to Next Step
          </ActionButton>
        </div>
      </div>
    );
  }

  // ─── Render: Verify Step ───────────────────────────────────────────

  if (step === "verify" && isUploaded) {
    return (
      <div className="space-y-6">
        <div
          className="mx-auto max-w-md rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5" style={{ color: COLORS.SUCCESS }} />
            <span className="font-medium" style={{ color: COLORS.CREAM }}>
              Aadhaar image uploaded
            </span>
          </div>
          <p className="text-sm" style={{ color: `${COLORS.CREAM}60` }}>
            Click the button below to start AI-powered verification. We&apos;ll extract your name,
            date of birth, and gender from the image.
          </p>
        </div>

        {verifyError && <ErrorMessage message={verifyError} />}

        <div className="flex justify-center gap-3">
          <button
            onClick={handleRemoveFile}
            className="rounded-xl px-6 py-3 text-sm font-medium transition-colors"
            style={{
              background: `${COLORS.CREAM}10`,
              color: COLORS.CREAM,
              border: `1px solid ${COLORS.CREAM}20`,
            }}
          >
            Upload Different
          </button>
          <ActionButton
            onClick={handleVerify}
            loading={isVerifying}
            icon={<Shield className="h-5 w-5" />}
          >
            Verify Now
          </ActionButton>
        </div>
      </div>
    );
  }

  // ─── Render: Upload Step ───────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Dropzone or Preview */}
      {!file ? (
        <div className="relative mx-auto max-w-md">
          {locked && <LockChip />}
          <Dropzone
            accept={ACCEPTED_TYPES}
            maxSize={MAX_FILE_SIZE}
            multiple={false}
            onFilesSelected={handleFilesSelected}
            onFilesRejected={handleFilesRejected}
            className="rounded-2xl p-8"
            style={{
              background: `linear-gradient(145deg, ${COLORS.BG_DEEP}50 0%, ${COLORS.BG_ROYAL}50 100%)`,
              borderColor: `${COLORS.GOLD}40`,
            }}
          >
            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}15 0%, ${COLORS.GOLD_DARK}10 100%)`,
                  border: `2px solid ${COLORS.GOLD}30`,
                }}
              >
                <Upload className="h-8 w-8" style={{ color: COLORS.GOLD }} />
              </div>
              <p className="mb-2 font-medium" style={{ color: COLORS.CREAM }}>
                Drag and drop your Aadhaar image
              </p>
              <p style={{ color: `${COLORS.CREAM}50` }}>
                or{" "}
                <span className="cursor-pointer underline" style={{ color: COLORS.GOLD }}>
                  browse files
                </span>
              </p>
              <div
                className="mt-4 flex items-center justify-center gap-4 text-xs"
                style={{ color: `${COLORS.CREAM}40` }}
              >
                <span>JPG, PNG</span>
                <span className="h-1 w-1 rounded-full bg-current" />
                <span>Max 5MB</span>
              </div>
            </div>
          </Dropzone>
        </div>
      ) : (
        <div
          className="mx-auto max-w-md overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <div className="relative flex aspect-[16/10] max-h-[300px] items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Aadhaar Preview"
                className="max-h-full max-w-full object-contain p-4"
              />
            ) : (
              <FileImage className="h-12 w-12" style={{ color: `${COLORS.GOLD}50` }} />
            )}
            <button
              onClick={handleRemoveFile}
              className="absolute top-4 right-4 rounded-full p-2 transition-all hover:scale-110"
              style={{ background: `${COLORS.ERROR}20`, border: `1px solid ${COLORS.ERROR}40` }}
            >
              <X className="h-5 w-5" style={{ color: COLORS.ERROR }} />
            </button>
          </div>
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ background: COLORS.BG_ROYAL, borderTop: `1px solid ${COLORS.GOLD}20` }}
          >
            <div className="flex items-center gap-3">
              <FileImage className="h-5 w-5" style={{ color: COLORS.GOLD }} />
              <div>
                <p
                  className="max-w-[200px] truncate text-sm font-medium"
                  style={{ color: COLORS.CREAM }}
                >
                  {file.name}
                </p>
                <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ background: `${COLORS.SUCCESS}20`, border: `1px solid ${COLORS.SUCCESS}40` }}
            >
              <div className="h-2 w-2 rounded-full" style={{ background: COLORS.SUCCESS }} />
              <span className="text-xs font-medium" style={{ color: COLORS.SUCCESS }}>
                Ready
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Errors */}
      {(dropzoneError || uploadError) && (
        <ErrorMessage message={dropzoneError || uploadError || ""} />
      )}

      {/* Privacy Note */}
      <PrivacyNote />

      {/* Upload Button */}
      <div className="flex justify-center">
        <ActionButton
          onClick={handleUpload}
          loading={isUploading}
          disabled={!file}
          icon={<Upload className="h-5 w-5" />}
        >
          Upload Aadhaar
        </ActionButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: `${COLORS.CREAM}60` }}>{label}</span>
      <span className="font-medium" style={{ color: COLORS.CREAM }}>
        {value}
      </span>
    </div>
  );
}

// Lock chip pinned to the top-right of a box to mark it as not-yet-usable.
function LockChip() {
  return (
    <div className="pointer-events-none absolute -top-2 -right-2 z-10">
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg"
        style={{
          background: COLORS.BG_DEEP,
          border: `1px solid ${COLORS.GOLD}50`,
        }}
      >
        <Lock className="h-3.5 w-3.5" style={{ color: COLORS.GOLD }} />
        <span className="text-xs font-semibold" style={{ color: COLORS.CREAM }}>
          Locked
        </span>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="mx-auto flex max-w-md items-center gap-3 rounded-xl p-4"
      style={{ background: `${COLORS.ERROR}10`, border: `1px solid ${COLORS.ERROR}25` }}
    >
      <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLORS.ERROR }} />
      <p className="text-sm" style={{ color: COLORS.ERROR }}>
        {message}
      </p>
    </div>
  );
}

function PrivacyNote() {
  return (
    <div
      className="mx-auto flex max-w-md items-start gap-3 rounded-xl p-4"
      style={{ background: `${COLORS.GOLD}08`, border: `1px solid ${COLORS.GOLD}20` }}
    >
      <Shield className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLORS.GOLD }} />
      <div>
        <p className="mb-1 text-sm font-medium" style={{ color: COLORS.GOLD }}>
          Your privacy is protected
        </p>
        <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
          Your Aadhaar image is processed securely and deleted immediately after verification. We
          only store the last 4 digits of your Aadhaar number.
        </p>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function ActionButton({ onClick, loading, disabled, icon, children }: ActionButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 ${
        isDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-[1.02] active:scale-[0.98]"
      }`}
      style={{
        background: isDisabled
          ? `${COLORS.GOLD}20`
          : `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
        color: isDisabled ? `${COLORS.CREAM}40` : COLORS.BG_DEEP,
        boxShadow: isDisabled ? "none" : `0 8px 24px ${COLORS.GOLD}40`,
      }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          icon
        )}
        {children}
      </span>
    </button>
  );
}
