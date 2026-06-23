// src/features/games/types/game-relations.types.ts
export type DevlogCategory =
  | "Studio"
  | "Development"
  | "Production"
  | "Design"
  | "Prototype"
  | "Milestone"
  | "Reflection"
  | "Technical";

export type MediaType =
  | "IMAGE"
  | "GIF"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT"
  | "OTHER";

export type GameDevlogListItem = {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: DevlogCategory;
  summary: string;
  isFeatured: boolean;
  isPublished: boolean;
};

export type GameDevlogDetail = {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: DevlogCategory;
  summary: string;

  relatedGame: string | null;

  isFeatured: boolean;
  isPublished: boolean;

  content: string;

  gameId: number | null;

  createdAt: string;
  updatedAt: string;
};

export type GameMediaAsset = {
  id: number;

  filename: string;
  originalName: string | null;

  altText: string | null;
  caption: string | null;

  mediaType: MediaType;

  sourcePath: string | null;
  publicPath: string;

  gameId: number | null;
  devlogId: number | null;

  createdAt: string;
  updatedAt: string;
};