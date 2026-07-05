// src/features/games/form/validation/
// game-api-validation.guard.ts

import type {
  GameValidationErrorResponse,
} from "../../game.types";

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(
  value: unknown,
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => typeof item === "string",
    )
  );
}

function isFieldErrors(
  value: unknown,
): value is GameValidationErrorResponse[
"errors"
]["fieldErrors"] {
  if (!isRecord(value)) {
    return false;
  }

  return Object.values(value).every(
    (messages) =>
      messages === undefined ||
      isStringArray(messages),
  );
}

export function isGameValidationErrorResponse(
  value: unknown,
): value is GameValidationErrorResponse {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.message !== "string") {
    return false;
  }

  if (!isRecord(value.errors)) {
    return false;
  }

  return (
    isStringArray(value.errors.formErrors) &&
    isFieldErrors(value.errors.fieldErrors)
  );
}