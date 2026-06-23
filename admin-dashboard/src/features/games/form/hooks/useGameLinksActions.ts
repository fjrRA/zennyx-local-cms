// src/features/games/form/hooks/useGameLinksActions.ts
import {
  useCallback,
} from "react";

import type {
  GameLinksFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameLinksTextField =
  keyof GameLinksFormState;

export function useGameLinksActions(
  setFormState: SetGameFormState,
) {
  const updateLinksField = useCallback(
    (
      field: GameLinksTextField,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        links: {
          ...currentState.links,
          [field]: value,
        },
      }));
    },
    [setFormState],
  );

  return {
    updateLinksField,
  };
}