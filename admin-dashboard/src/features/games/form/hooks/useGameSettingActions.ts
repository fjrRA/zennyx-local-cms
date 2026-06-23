// src/features/games/form/hooks/useGameSettingActions.ts
import {
  useCallback,
} from "react";

import {
  appendEmptyStringListItem,
  removeStringListItem,
  replaceStringListItem,
} from "../game-form-list.helpers";

import type {
  GameSettingFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameSettingTextField =
  Exclude<
    keyof GameSettingFormState,
    "inspiration"
  >;

export function useGameSettingActions(
  setFormState: SetGameFormState,
) {
  const updateSettingField = useCallback(
    (
      field: GameSettingTextField,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        setting: {
          ...currentState.setting,
          [field]: value,
        },
      }));
    },
    [setFormState],
  );

  const updateSettingInspirationItem =
    useCallback(
      (
        index: number,
        value: string,
      ) => {
        setFormState((currentState) => ({
          ...currentState,

          setting: {
            ...currentState.setting,

            inspiration:
              replaceStringListItem(
                currentState.setting
                  .inspiration,
                index,
                value,
              ),
          },
        }));
      },
      [setFormState],
    );

  const addSettingInspiration =
    useCallback(() => {
      setFormState((currentState) => ({
        ...currentState,

        setting: {
          ...currentState.setting,

          inspiration:
            appendEmptyStringListItem(
              currentState.setting
                .inspiration,
            ),
        },
      }));
    }, [setFormState]);

  const removeSettingInspiration =
    useCallback(
      (index: number) => {
        setFormState((currentState) => ({
          ...currentState,

          setting: {
            ...currentState.setting,

            inspiration:
              removeStringListItem(
                currentState.setting
                  .inspiration,
                index,
              ),
          },
        }));
      },
      [setFormState],
    );

  return {
    updateSettingField,
    updateSettingInspirationItem,
    addSettingInspiration,
    removeSettingInspiration,
  };
}