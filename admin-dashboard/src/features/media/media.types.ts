// src/features/media/media.types.ts

export type GameImageRole =
  | "hero"
  | "thumbnail"
  | "cover"
  | "gallery"
  | "og-image";

export type MediaImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/webp";

export type UploadGameImageInput = {
  file: File;
  slug: string;
  role: GameImageRole;
};

export type UploadedGameImage = {
  originalName: string;
  filename: string;
  mimeType: MediaImageMimeType;
  size: number;
  role: GameImageRole;
  publicPath: string;
  previewPath: string;
};

export type DeletedGameImage = {
  publicPath: string;
  deleted: boolean;
  directoryRemoved: boolean;
};