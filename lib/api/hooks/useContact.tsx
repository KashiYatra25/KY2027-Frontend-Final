"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiMutation } from "wire-axon/hooks";
import {
  ContactSchema,
  type ContactSchemaType,
  type ContactResponse,
} from "@/lib/api/utils/contact.schema";
import { BACKEND_URL, API_TIMEOUT, API_RETRY } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

interface UseContactOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

export function useContact(options?: UseContactOptions) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<ContactResponse>({
    url: "/contact",
    method: "post",
    baseURL: BACKEND_URL,
    apiConfig: { timeout: API_TIMEOUT },
    bodyValidator: { bodySchema: ContactSchema },
    toastConfig: {
      successConfig: options?.successToast ? { customToast: options.successToast } : undefined,
      errorConfig: options?.errorToast ? { customToast: options.errorToast } : undefined,
    },
    mutationOptions: { retry: API_RETRY },
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
