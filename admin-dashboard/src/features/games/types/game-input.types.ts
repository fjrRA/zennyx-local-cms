// src/features/games/types/game-input.types.ts
import type {
  GameFields,
} from "./game-record.types";

type DefaultedGameField =
  | "isFeatured"
  | "isPublic"
  | "order";

type RequiredCreateGameFields =
  Omit<GameFields, DefaultedGameField>;

type OptionalCreateGameFields =
  Pick<GameFields, DefaultedGameField>;

export type CreateGameInput =
  RequiredCreateGameFields &
  Partial<OptionalCreateGameFields>;

export type UpdateGameInput =
  Partial<CreateGameInput>;