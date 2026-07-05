// src/features/media/utils/
// media-preview-url.ts

import {
  API_BASE_URL,
} from "../../../lib/api";

const GAME_MEDIA_PUBLIC_PREFIX =
  "/images/games/";

const GAME_MEDIA_PREVIEW_PREFIX =
  "/media/games/";

function buildApiResourceUrl(
  path: string,
): string {
  const normalizedBaseUrl =
    API_BASE_URL.replace(/\/+$/, "");

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

export function getGameMediaPreviewPath(
  publicPath: string,
): string | null {
  const normalizedPublicPath =
    publicPath.trim();

  if (
    !normalizedPublicPath.startsWith(
      GAME_MEDIA_PUBLIC_PREFIX,
    )
  ) {
    return null;
  }

  const relativePath =
    normalizedPublicPath.slice(
      GAME_MEDIA_PUBLIC_PREFIX.length,
    );

  if (!relativePath) {
    return null;
  }

  return (
    GAME_MEDIA_PREVIEW_PREFIX +
    relativePath
  );
}

export function getGameMediaPreviewUrl(
  publicPath: string,
): string | null {
  const previewPath =
    getGameMediaPreviewPath(
      publicPath,
    );

  if (!previewPath) {
    return null;
  }

  return buildApiResourceUrl(
    previewPath,
  );
}