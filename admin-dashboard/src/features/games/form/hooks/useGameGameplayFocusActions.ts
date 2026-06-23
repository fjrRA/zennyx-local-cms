// src/features/games/form/hooks/useGameGameplayFocusActions.ts
import {
  useCallback,
} from "react";

import {
  appendEmptyStringListItem,
  removeStringListItem,
  replaceStringListItem,
} from "../game-form-list.helpers";

import type {
  GameGameplayFocusFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameGameplayFocusTextField =
  Exclude<
    keyof GameGameplayFocusFormState,
    "points"
  >;

export function useGameGameplayFocusActions(
  setFormState: SetGameFormState,
) {
  const updateGameplayFocusField =
    useCallback(
      (
        field:
          GameGameplayFocusTextField,
        value: string,
      ) => {
        setFormState((currentState) => ({
          ...currentState,

          gameplayFocus: {
            ...currentState.gameplayFocus,
            [field]: value,
          },
        }));
      },
      [setFormState],
    );

  const updateGameplayPointItem =
    useCallback(
      (
        index: number,
        value: string,
      ) => {
        setFormState((currentState) => ({
          ...currentState,

          gameplayFocus: {
            ...currentState.gameplayFocus,

            points:
              replaceStringListItem(
                currentState.gameplayFocus
                  .points,
                index,
                value,
              ),
          },
        }));
      },
      [setFormState],
    );

  const addGameplayPoint =
    useCallback(() => {
      setFormState((currentState) => ({
        ...currentState,

        gameplayFocus: {
          ...currentState.gameplayFocus,

          points:
            appendEmptyStringListItem(
              currentState.gameplayFocus
                .points,
            ),
        },
      }));
    }, [setFormState]);

  const removeGameplayPoint =
    useCallback(
      (index: number) => {
        setFormState((currentState) => ({
          ...currentState,

          gameplayFocus: {
            ...currentState.gameplayFocus,

            points:
              removeStringListItem(
                currentState.gameplayFocus
                  .points,
                index,
              ),
          },
        }));
      },
      [setFormState],
    );

  return {
    updateGameplayFocusField,
    updateGameplayPointItem,
    addGameplayPoint,
    removeGameplayPoint,
  };
}