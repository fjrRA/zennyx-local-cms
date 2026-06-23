// src/features/games/form/validation/helpers/game-text-validation.helpers.ts
import type {
  GameFormErrors,
  GameFormFieldId,
} from "../game-form-validation.types";

import {
  addFieldError,
} from "./game-field-error.helper";

import {
  GAME_SLUG_REGEX,
} from "./game-validation.constants";

export function validateRequiredText(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  value: string,
  label: string,
  minLength = 1,
): void {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    addFieldError(
      errors,
      fieldId,
      `${label} wajib diisi.`,
    );

    return;
  }

  if (normalizedValue.length < minLength) {
    addFieldError(
      errors,
      fieldId,
      `${label} minimal ${minLength} karakter.`,
    );
  }
}

export function validateSlug(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  value: string,
): void {
  const normalizedValue = value.trim();

  validateRequiredText(
    errors,
    fieldId,
    normalizedValue,
    "Slug",
    3,
  );

  if (
    normalizedValue &&
    !GAME_SLUG_REGEX.test(normalizedValue)
  ) {
    addFieldError(
      errors,
      fieldId,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda dash.",
    );
  }
}

export function validateOrder(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  value: string,
): void {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    addFieldError(
      errors,
      fieldId,
      "Urutan wajib diisi.",
    );

    return;
  }

  const parsedValue =
    Number(normalizedValue);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue < 0
  ) {
    addFieldError(
      errors,
      fieldId,
      "Urutan harus berupa bilangan bulat nol atau lebih.",
    );
  }
}