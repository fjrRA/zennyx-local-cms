// src/features/games/form/validation/validate-game-development.ts
import type {
  GameFormState,
} from "../game-form.types";

import {
  validateRequiredList,
  validateRequiredText,
} from "./game-form-validation.helpers";

import type {
  GameFormErrors,
} from "./game-form-validation.types";

export function validateGameDevelopment(
  state: GameFormState,
): GameFormErrors {
  const errors: GameFormErrors = {};

  validateRequiredText(
    errors,
    "game-setting-name",
    state.setting.name,
    "Nama Setting",
  );

  validateRequiredText(
    errors,
    "game-setting-description",
    state.setting.description,
    "Deskripsi Setting",
    10,
  );

  validateRequiredList(
    errors,
    "game-setting-inspiration",
    state.setting.inspiration,
    "Inspirasi Setting",
  );

  validateRequiredText(
    errors,
    "game-development-current",
    state.developmentStage.current,
    "Current Stage",
  );

  validateRequiredText(
    errors,
    "game-development-next",
    state.developmentStage
      .nextMilestone,
    "Next Milestone",
  );

  validateRequiredText(
    errors,
    "game-development-notes",
    state.developmentStage.notes,
    "Development Notes",
    10,
  );

  validateRequiredText(
    errors,
    "game-gameplay-title",
    state.gameplayFocus.title,
    "Judul Gameplay Focus",
  );

  validateRequiredText(
    errors,
    "game-gameplay-description",
    state.gameplayFocus.description,
    "Deskripsi Gameplay",
    10,
  );

  validateRequiredList(
    errors,
    "game-gameplay-points",
    state.gameplayFocus.points,
    "Gameplay Point",
  );

  validateRequiredList(
    errors,
    "game-prototype-scope",
    state.prototypeScope,
    "Prototype Scope",
  );

  return errors;
}
