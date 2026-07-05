// src/features/games/form/validation/
// game-submit-error.helper.ts

import {
  getApiErrorMessage,
  isApiError,
} from "../../../../lib/api";

import {
  isGameValidationErrorResponse,
} from "./game-api-validation.guard";

import {
  mapGameApiValidation,
} from "./game-api-validation.mapper";

import type {
  GameFormErrors,
} from "./game-form-validation.types";

export type GameSubmitErrorKind =
  | "validation"
  | "request";

export type GameSubmitErrorState = {
  kind: GameSubmitErrorKind;
  message: string;
  fieldErrors: GameFormErrors;
  formErrors: string[];
};

export function resolveGameSubmitError(
  error: unknown,
): GameSubmitErrorState {
  if (
    isApiError(error) &&
    isGameValidationErrorResponse(error.data)
  ) {
    const mappedValidation =
      mapGameApiValidation(error.data);

    return {
      kind: "validation",
      message: error.message,
      fieldErrors:
        mappedValidation.fieldErrors,
      formErrors:
        mappedValidation.formErrors,
    };
  }

  return {
    kind: "request",
    message: getApiErrorMessage(error),
    fieldErrors: {},
    formErrors: [],
  };
}