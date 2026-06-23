// src/features/games/types/json.types.ts
export type JsonPrimitive =
  | string
  | number
  | boolean
  | null;

export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | {
    [key: string]: JsonValue;
  };