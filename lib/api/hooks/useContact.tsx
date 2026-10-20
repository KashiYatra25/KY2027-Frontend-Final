"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { CheckCircle, XCircle } from "lucide-react";
import {
  ContactSchema,
  type ContactSchemaType,
  type ContactResponse,
} from "@/lib/api/utils/contact.schema";
import { BACKEND_URL, API_TIMEOUT, shouldRetryOnNetworkError } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

interface UseContactOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

function DefaultContactSuccessToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Message sent</p>
        <p className="text-sm text-neutral-400">We&apos;ll get back to you soon</p>
      </div>
    </div>
  );
}

function DefaultContactErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Couldn&apos;t send message</p>
        <p className="text-sm text-neutral-400">Please try again later</p>
      </div>
    </div>
  );
}

export function useContact(options?: UseContactOptions) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<ContactResponse>({
    url: "/contact",
    method: "post",
    baseURL: BACKEND_URL,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: ContactSchema },
    toastConfig: {
      successConfig: { customToast: options?.successToast ?? <DefaultContactSuccessToast /> },
      errorConfig: { customToast: options?.errorToast ?? <DefaultContactErrorToast /> },
    },
    mutationOptions: { retry: shouldRetryOnNetworkError },
  });

  const submitContact = useCallback(
    (contactData: ContactSchemaType) => {
      mutate(contactData);
    },
    [mutate]
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to submit contact form"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return {
    submitContact,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
}
