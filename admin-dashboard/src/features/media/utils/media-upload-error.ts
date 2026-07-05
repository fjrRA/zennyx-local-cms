// src/features/media/utils/
// media-upload-error.ts

import {
  getApiErrorMessage,
  isApiError,
} from "../../../lib/api";

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function getFirstString(
  value: unknown,
): string | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const firstMessage =
    value.find(
      (item) =>
        typeof item === "string" &&
        item.trim().length > 0,
    );

  return typeof firstMessage === "string"
    ? firstMessage
    : null;
}

export function getMediaUploadErrorMessage(
  error: unknown,
): string {
  if (
    isApiError(error) &&
    isRecord(error.data)
  ) {
    const errors =
      error.data.errors;

    if (isRecord(errors)) {
      const fieldErrors =
        errors.fieldErrors;

      if (isRecord(fieldErrors)) {
        const fileMessage =
          getFirstString(
            fieldErrors.file,
          );

        if (fileMessage) {
          return fileMessage;
        }
      }

      const formMessage =
        getFirstString(
          errors.formErrors,
        );

      if (formMessage) {
        return formMessage;
      }
    }
  }

  return getApiErrorMessage(error);
}