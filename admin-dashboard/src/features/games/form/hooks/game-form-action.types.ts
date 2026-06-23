// src/features/games/form/hooks/game-form-action.types.ts
import type {
  Dispatch,
  SetStateAction,
} from "react";

import type {
  GameFormState,
} from "../game-form.types";

export type SetGameFormState = Dispatch<
  SetStateAction<GameFormState>
>;