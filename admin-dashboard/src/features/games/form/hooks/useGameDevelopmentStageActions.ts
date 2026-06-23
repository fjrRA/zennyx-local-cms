// src/features/games/form/hooks/useGameDevelopmentStageActions.ts
import {
  useCallback,
} from "react";

import type {
  GameDevelopmentStageFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameDevelopmentStageTextField =
  keyof GameDevelopmentStageFormState;

export function useGameDevelopmentStageActions(
  setFormState: SetGameFormState,
) {
  const updateDevelopmentStageField =
    useCallback(
      (
        field:
          GameDevelopmentStageTextField,
        value: string,
      ) => {
        setFormState((currentState) => ({
          ...currentState,

          developmentStage: {
            ...currentState
              .developmentStage,

            [field]: value,
          },
        }));
      },
      [setFormState],
    );

  return {
    updateDevelopmentStageField,
  };
}