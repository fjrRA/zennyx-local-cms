// src/features/games/form/validation/helpers/game-field-error.helper.ts
import type {
  GameFormErrors,
  GameFormFieldId,
} from "../game-form-validation.types";

export function addFieldError(
  errors: GameFormErrors,
  fieldId: GameFormFieldId,
  message: string,
): void {
  if (!errors[fieldId]) {
    errors[fieldId] = message;
  }
}