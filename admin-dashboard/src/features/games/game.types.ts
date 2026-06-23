// src/features/games/game.types.ts
export type {
  JsonPrimitive,
  JsonValue,
} from "./types/json.types";

export type {
  DevlogCategory,
  GameDevlogDetail,
  GameDevlogListItem,
  GameMediaAsset,
  MediaType,
} from "./types/game-relations.types";

export type {
  GameDetail,
  GameFields,
  GameListItem,
  GameRecord,
} from "./types/game-record.types";

export type {
  CreateGameInput,
  UpdateGameInput,
} from "./types/game-input.types";

export type {
  DeleteGameResult,
  GameApiErrorResponse,
  GameValidationErrorResponse,
  GameValidationErrors,
} from "./types/game-api.types";

export type {
  GameDevelopmentStage,
  GameGameplayFocus,
  GameLinks,
  GameMedia,
  GameSeo,
  GameSetting,
} from "./types/game-json.types";