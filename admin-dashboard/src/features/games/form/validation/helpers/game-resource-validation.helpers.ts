// src/features/games/form/validation/helpers/game-resource-validation.helpers.ts
import type {
  GameFormErrors,
  GameFormFieldId,
} from "../game-form-validation.types";

import {
  addFieldError,
} from "./game-field-error.helper";

function isHttpUrl(
  value: string,
): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export function validateOptionalPublicPath(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  value: string,
  label: string,
): void {
  const normalizedValue = value.trim();

  if (
    normalizedValue &&
    !normalizedValue.startsWith("/")
  ) {
    addFieldError(
      errors,
      fieldId,
      `${label} harus menggunakan path yang diawali tanda /.`,
    );
  }
}

export function validateOptionalLink(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  value: string,
  label: string,
): void {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return;
  }

  const isInternalPath =
    normalizedValue.startsWith("/");

  if (
    !isInternalPath &&
    !isHttpUrl(normalizedValue)
  ) {
    addFieldError(
      errors,
      fieldId,
      `${label} harus berupa URL http/https atau path internal yang diawali /.`,
    );
  }
}