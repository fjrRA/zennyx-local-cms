// src/features/games/form/components/game-form-validation.context.ts
import {
  createContext,
} from "react";

import type {
  GameFormErrors,
} from "../validation/game-form-validation.types";

export const GameFormValidationContext =
  createContext<GameFormErrors>({});