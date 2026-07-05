// src/config/media.config.ts

import * as path from "node:path";
import {
  fileURLToPath,
} from "node:url";

const configDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

export const MEDIA_STORAGE_ROOT =
  path.resolve(
    configDirectory,
    "../../storage/media",
  );

export const GAME_MEDIA_STORAGE_ROOT =
  path.join(
    MEDIA_STORAGE_ROOT,
    "games",
  );

export const MEDIA_PREVIEW_PREFIX =
  "/media";

export const GAME_MEDIA_PREVIEW_PREFIX =
  `${MEDIA_PREVIEW_PREFIX}/games`;

export const GAME_MEDIA_PUBLIC_PREFIX =
  "/images/games";