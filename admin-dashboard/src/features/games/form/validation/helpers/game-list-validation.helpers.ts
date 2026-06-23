// src/features/games/form/validation/helpers/game-list-validation.helpers.ts
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

export function validateRequiredList(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  values: string[],
  label: string,
): void {
  const hasValue = values.some(
    (value) =>
      value.trim().length > 0,
  );

  if (!hasValue) {
    addFieldError(
      errors,
      fieldId,
      `${label} minimal memiliki satu item.`,
    );
  }
}

export function validateOptionalSlugList(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  values: string[],
  label: string,
): void {
  const hasInvalidItem = values.some(
    (value) => {
      const normalizedValue =
        value.trim();

      return (
        normalizedValue.length > 0 &&
        !GAME_SLUG_REGEX.test(
          normalizedValue,
        )
      );
    },
  );

  if (hasInvalidItem) {
    addFieldError(
      errors,
      fieldId,
      `${label} hanya boleh berisi slug huruf kecil, angka, dan tanda dash.`,
    );
  }
}