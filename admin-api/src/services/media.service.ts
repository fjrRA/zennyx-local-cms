// src/services/media.service.ts

import {
  randomBytes,
} from "node:crypto";

import {
  readdir,
  rmdir,
  unlink,
  writeFile,
} from "node:fs/promises";

import type {
  SupportedImageMimeType,
} from "../config/media-upload.config";

import {
  validateUploadedImageFile,
} from "../lib/image-file-validation";

import {
  ensureGameMediaDirectory,
  getGameMediaDirectory,
  getGameMediaFilePath,
  getGameMediaFilePathFromPublicPath,
  getGameMediaPreviewPath,
  getGameMediaPublicPath,
  parseGameMediaPublicPath,
} from "../lib/media-path";

import type {
  GameImageRole,
} from "../schemas/media.schema";

type SaveGameImageInput = {
  file: Express.Multer.File;
  slug: string;
  role: GameImageRole;
};

export type SavedGameImage = {
  originalName: string;
  filename: string;
  mimeType: SupportedImageMimeType;
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

function hasFileSystemErrorCode(
  error: unknown,
  expectedCode: string,
): error is NodeJS.ErrnoException {
  return (
    error instanceof Error &&
    "code" in error &&
    (
      error as NodeJS.ErrnoException
    ).code === expectedCode
  );
}

function createFilenameTimestamp():
  string {
  return new Date()
    .toISOString()
    .replace(/\D/g, "")
    .slice(0, 14);
}

function createImageFilename(
  role: GameImageRole,
  extension: string,
): string {
  const timestamp =
    createFilenameTimestamp();

  const token =
    randomBytes(4).toString("hex");

  return [
    role,
    timestamp,
    token,
  ].join("-") + `.${extension}`;
}

export async function saveGameImage({
  file,
  slug,
  role,
}: SaveGameImageInput):
  Promise<SavedGameImage> {
  const validatedFile =
    validateUploadedImageFile(file);

  ensureGameMediaDirectory(slug);

  const filename =
    createImageFilename(
      role,
      validatedFile.extension,
    );

  const filePath =
    getGameMediaFilePath(
      slug,
      filename,
    );

  await writeFile(
    filePath,
    file.buffer,
    {
      flag: "wx",
    },
  );

  return {
    originalName:
      validatedFile.originalName,

    filename,

    mimeType:
      validatedFile.mimeType,

    size: file.size,
    role,

    publicPath:
      getGameMediaPublicPath(
        slug,
        filename,
      ),

    previewPath:
      getGameMediaPreviewPath(
        slug,
        filename,
      ),
  };
}

export async function deleteGameImage(
  publicPath: string,
): Promise<DeletedGameImage> {
  const {
    slug,
  } = parseGameMediaPublicPath(
    publicPath,
  );

  const filePath =
    getGameMediaFilePathFromPublicPath(
      publicPath,
    );

  let deleted = true;

  try {
    await unlink(filePath);
  } catch (error) {
    if (
      hasFileSystemErrorCode(
        error,
        "ENOENT",
      )
    ) {
      deleted = false;
    } else {
      throw error;
    }
  }

  const gameDirectory =
    getGameMediaDirectory(slug);

  let directoryRemoved = false;

  try {
    const remainingEntries =
      await readdir(gameDirectory);

    if (
      remainingEntries.length === 0
    ) {
      await rmdir(gameDirectory);

      directoryRemoved = true;
    }
  } catch (error) {
    const canBeIgnored =
      hasFileSystemErrorCode(
        error,
        "ENOENT",
      ) ||
      hasFileSystemErrorCode(
        error,
        "ENOTEMPTY",
      );

    if (!canBeIgnored) {
      throw error;
    }
  }

  return {
    publicPath:
      getGameMediaPublicPath(
        slug,
        parseGameMediaPublicPath(
          publicPath,
        ).filename,
      ),

    deleted,
    directoryRemoved,
  };
}