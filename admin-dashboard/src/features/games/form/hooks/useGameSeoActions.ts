// src/features/games/form/hooks/useGameSeoActions.ts
import {
  useCallback,
} from "react";

import type {
  GameSeoFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameSeoTextField =
  keyof GameSeoFormState;

export function useGameSeoActions(
  setFormState: SetGameFormState,
) {
  const updateSeoField = useCallback(
    (
      field: GameSeoTextField,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        seo: {
          ...currentState.seo,
          [field]: value,
        },
      }));
    },
    [setFormState],
  );

  return {
    updateSeoField,
  };
}