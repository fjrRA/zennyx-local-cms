// src/features/games/form/hooks/useGameFormFieldError.ts
import {
  useContext,
} from "react";

import {
  GameFormValidationContext,
} from "../components/game-form-validation.context";

import type {
  GameFormFieldId,
} from "../validation/game-form-validation.types";

export function useGameFormFieldError(
  fieldId: GameFormFieldId,
): string | undefined {
  const errors = useContext(
    GameFormValidationContext,
  );

  return errors[fieldId];
}