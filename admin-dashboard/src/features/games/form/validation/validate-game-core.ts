// src/features/games/form/validation/validate-game-core.ts
import type {
  GameFormState,
} from "../game-form.types";

import {
  validateOrder,
  validateRequiredList,
  validateRequiredText,
  validateSlug,
} from "./game-form-validation.helpers";

import type {
  GameFormErrors,
} from "./game-form-validation.types";

export function validateGameCore(
  state: GameFormState,
): GameFormErrors {
  const errors: GameFormErrors = {};

  validateRequiredText(
    errors,
    "game-title",
    state.title,
    "Judul Game",
    3,
  );

  validateSlug(
    errors,
    "game-slug",
    state.slug,
  );

  validateRequiredText(
    errors,
    "game-status",
    state.status,
    "Status",
    2,
  );

  validateRequiredText(
    errors,
    "game-production-type",
    state.productionType,
    "Production Type",
    2,
  );

  validateOrder(
    errors,
    "game-order",
    state.order,
  );

  validateRequiredText(
    errors,
    "game-summary",
    state.summary,
    "Summary",
    10,
  );

  validateRequiredText(
    errors,
    "game-short-description",
    state.shortDescription,
    "Short Description",
    10,
  );

  validateRequiredText(
    errors,
    "game-description",
    state.description,
    "Description",
    10,
  );

  validateRequiredList(
    errors,
    "game-genre",
    state.genre,
    "Genre",
  );

  validateRequiredList(
    errors,
    "game-theme",
    state.theme,
    "Tema",
  );

  validateRequiredList(
    errors,
    "game-platform",
    state.platforms,
    "Platform",
  );

  validateRequiredText(
    errors,
    "game-target-build",
    state.targetBuild,
    "Target Build",
    2,
  );

  validateRequiredText(
    errors,
    "game-target-release",
    state.targetRelease,
    "Target Release",
    2,
  );

  return errors;
}