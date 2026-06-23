// src/features/games/form/hooks/useGameFormPublishingActions.ts
import type {
  SetGameFormState,
} from "./game-form-action.types";

import {
  useGameLinksActions,
} from "./useGameLinksActions";

import {
  useGameMediaActions,
} from "./useGameMediaActions";

import {
  useGameSeoActions,
} from "./useGameSeoActions";

export type {
  GameLinksTextField,
} from "./useGameLinksActions";

export type {
  GameMediaTextField,
} from "./useGameMediaActions";

export type {
  GameSeoTextField,
} from "./useGameSeoActions";

export function useGameFormPublishingActions(
  setFormState: SetGameFormState,
) {
  const mediaActions =
    useGameMediaActions(
      setFormState,
    );

  const linksActions =
    useGameLinksActions(
      setFormState,
    );

  const seoActions =
    useGameSeoActions(
      setFormState,
    );

  return {
    ...mediaActions,
    ...linksActions,
    ...seoActions,
  };
}