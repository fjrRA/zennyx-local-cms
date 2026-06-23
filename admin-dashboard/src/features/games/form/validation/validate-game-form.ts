// src/features/games/form/validation/validate-game-form.ts
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameFormValidationResult,
} from "./game-form-validation.types";

import {
  validateGameCore,
} from "./validate-game-core";

import {
  validateGameDevelopment,
} from "./validate-game-development";

import {
  validateGamePublishing,
} from "./validate-game-publishing";

export function validateGameForm(
  state: GameFormState,
): GameFormValidationResult {
  const errors = {
    ...validateGameCore(state),

    ...validateGameDevelopment(
      state,
    ),

    ...validateGamePublishing(
      state,
    ),
  };

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors,
  };
}