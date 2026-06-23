// src/features/games/types/game-api.types.ts
export type DeleteGameResult = {
  message: string;
};

export type GameValidationErrors = {
  formErrors: string[];

  fieldErrors: Record<
    string,
    string[] | undefined
  >;
};

export type GameValidationErrorResponse = {
  message: "Validation error";
  errors: GameValidationErrors;
};

export type GameApiErrorResponse = {
  message: string;
};
