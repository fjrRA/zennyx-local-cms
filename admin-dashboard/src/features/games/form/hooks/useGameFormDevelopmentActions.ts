// src/features/games/form/hooks/useGameFormDevelopmentActions.ts
import type {
  SetGameFormState,
} from "./game-form-action.types";

import {
  useGameDevelopmentStageActions,
} from "./useGameDevelopmentStageActions";

import {
  useGameGameplayFocusActions,
} from "./useGameGameplayFocusActions";

import {
  useGameSettingActions,
} from "./useGameSettingActions";

export type {
  GameDevelopmentStageTextField,
} from "./useGameDevelopmentStageActions";

export type {
  GameGameplayFocusTextField,
} from "./useGameGameplayFocusActions";

export type {
  GameSettingTextField,
} from "./useGameSettingActions";

export function useGameFormDevelopmentActions(
  setFormState: SetGameFormState,
) {
  const settingActions =
    useGameSettingActions(
      setFormState,
    );

  const developmentStageActions =
    useGameDevelopmentStageActions(
      setFormState,
    );

  const gameplayFocusActions =
    useGameGameplayFocusActions(
      setFormState,
    );

  return {
    ...settingActions,
    ...developmentStageActions,
    ...gameplayFocusActions,
  };
}