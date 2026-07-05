// src/lib/media-path.ts

import {
  mkdirSync,
} from "node:fs";

import * as path from "node:path";

import {
  GAME_MEDIA_PREVIEW_PREFIX,
  GAME_MEDIA_PUBLIC_PREFIX,
  GAME_MEDIA_STORAGE_ROOT,
} from "../config/media.config";

const gameSlugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const mediaFilenameRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/;

export type GameMediaPathParts = {
  slug: string;
  filename: string;
};

export class MediaPathValidationError
  extends Error {
  constructor(message: string) {
    super(message);

    this.name =
      "MediaPathValidationError";
  }
}

function normalizeGameSlug(
  slug: string,
): string {
  const normalizedSlug = slug.trim();

  if (
    normalizedSlug.length < 3 ||
    normalizedSlug.length > 140 ||
    !gameSlugRegex.test(normalizedSlug)
  ) {
    throw new MediaPathValidationError(
      "Game slug tidak valid untuk path media.",
    );
  }

  return normalizedSlug;
}

function normalizeMediaFilename(
  filename: string,
): string {
  const normalizedFilename =
    filename.trim();

  const containsPathSeparator =
    normalizedFilename.includes("/") ||
    normalizedFilename.includes("\\");

  if (
    normalizedFilename.length === 0 ||
    normalizedFilename.length > 255 ||
    containsPathSeparator ||
    !mediaFilenameRegex.test(
      normalizedFilename,
    )
  ) {
    throw new Error(
      "Nama file media tidak valid.",
    );
  }

  return normalizedFilename;
}

function resolveInsideGameMediaRoot(
  ...segments: string[]
): string {
  const resolvedPath = path.resolve(
    GAME_MEDIA_STORAGE_ROOT,
    ...segments,
  );

  const relativePath = path.relative(
    GAME_MEDIA_STORAGE_ROOT,
    resolvedPath,
  );

  const isInsideRoot =
    relativePath === "" ||
    (
      relativePath !== ".." &&
      !relativePath.startsWith(
        `..${path.sep}`,
      ) &&
      !path.isAbsolute(relativePath)
    );

  if (!isInsideRoot) {
    throw new Error(
      "Path media berada di luar folder storage Game.",
    );
  }

  return resolvedPath;
}

export function ensureGameMediaStorageRoot():
  string {
  mkdirSync(
    GAME_MEDIA_STORAGE_ROOT,
    {
      recursive: true,
    },
  );

  return GAME_MEDIA_STORAGE_ROOT;
}

export function getGameMediaDirectory(
  slug: string,
): string {
  const normalizedSlug =
    normalizeGameSlug(slug);

  return resolveInsideGameMediaRoot(
    normalizedSlug,
  );
}

export function ensureGameMediaDirectory(
  slug: string,
): string {
  const directory =
    getGameMediaDirectory(slug);

  mkdirSync(
    directory,
    {
      recursive: true,
    },
  );

  return directory;
}

export function getGameMediaFilePath(
  slug: string,
  filename: string,
): string {
  const normalizedSlug =
    normalizeGameSlug(slug);

  const normalizedFilename =
    normalizeMediaFilename(filename);

  return resolveInsideGameMediaRoot(
    normalizedSlug,
    normalizedFilename,
  );
}

export function getGameMediaPublicPath(
  slug: string,
  filename: string,
): string {
  const normalizedSlug =
    normalizeGameSlug(slug);

  const normalizedFilename =
    normalizeMediaFilename(filename);

  return path.posix.join(
    GAME_MEDIA_PUBLIC_PREFIX,
    normalizedSlug,
    normalizedFilename,
  );
}

export function getGameMediaPreviewPath(
  slug: string,
  filename: string,
): string {
  const normalizedSlug =
    normalizeGameSlug(slug);

  const normalizedFilename =
    normalizeMediaFilename(filename);

  return path.posix.join(
    GAME_MEDIA_PREVIEW_PREFIX,
    normalizedSlug,
    normalizedFilename,
  );
}

export function parseGameMediaPublicPath(
  publicPath: string,
): GameMediaPathParts {
  const normalizedPublicPath =
    publicPath.trim();

  const expectedPrefix =
    `${GAME_MEDIA_PUBLIC_PREFIX}/`;

  if (
    !normalizedPublicPath.startsWith(
      expectedPrefix,
    )
  ) {
    throw new Error(
      "Public path media Game tidak valid.",
    );
  }

  const relativePath =
    normalizedPublicPath.slice(
      expectedPrefix.length,
    );

  const segments =
    relativePath.split("/");

  if (segments.length !== 2) {
    throw new Error(
      "Struktur public path media Game tidak valid.",
    );
  }

  const [
    rawSlug,
    rawFilename,
  ] = segments;

  if (!rawSlug || !rawFilename) {
    throw new Error(
      "Public path media Game tidak lengkap.",
    );
  }

  return {
    slug: normalizeGameSlug(rawSlug),
    filename:
      normalizeMediaFilename(
        rawFilename,
      ),
  };
}

export function getGameMediaFilePathFromPublicPath(
  publicPath: string,
): string {
  const {
    slug,
    filename,
  } = parseGameMediaPublicPath(
    publicPath,
  );

  return getGameMediaFilePath(
    slug,
    filename,
  );
}