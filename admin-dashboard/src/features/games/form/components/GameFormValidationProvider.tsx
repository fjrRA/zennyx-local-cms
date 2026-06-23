// src/features/games/form/components/GameFormValidationProvider.tsx
import type {
  PropsWithChildren,
} from "react";

import {
  GameFormValidationContext,
} from "./game-form-validation.context";

import type {
  GameFormErrors,
} from "../validation/game-form-validation.types";

type GameFormValidationProviderProps =
  PropsWithChildren<{
    errors: GameFormErrors;
  }>;

export default function GameFormValidationProvider({
  errors,
  children,
}: GameFormValidationProviderProps) {
  return (
    <GameFormValidationContext.Provider
      value={errors}
    >
      {children}
    </GameFormValidationContext.Provider>
  );
}