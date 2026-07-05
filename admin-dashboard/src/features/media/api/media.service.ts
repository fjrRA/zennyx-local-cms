// src/features/media/api/media.service.ts

import {
  apiClient,
} from "../../../lib/api";

import type {
  DeletedGameImage,
  UploadedGameImage,
  UploadGameImageInput,
} from "../media.types";

function normalizeGameMediaPublicPath(
  publicPath: string,
): string {
  const normalizedPath =
    publicPath.trim();

  if (!normalizedPath) {
    throw new Error(
      "Public path gambar harus diisi.",
    );
  }

  return normalizedPath;
}

function normalizeGameSlug(
  slug: string,
): string {
  const normalizedSlug =
    slug.trim();

  if (!normalizedSlug) {
    throw new Error(
      "Slug Game harus diisi sebelum mengunggah gambar.",
    );
  }

  return normalizedSlug;
}

function createGameImageFormData(
  input: UploadGameImageInput,
): FormData {
  const normalizedSlug =
    normalizeGameSlug(input.slug);

  const formData =
    new FormData();

  formData.append(
    "file",
    input.file,
    input.file.name,
  );

  formData.append(
    "scope",
    "games",
  );

  formData.append(
    "slug",
    normalizedSlug,
  );

  formData.append(
    "role",
    input.role,
  );

  return formData;
}

export function uploadGameImage(
  input: UploadGameImageInput,
  signal?: AbortSignal,
): Promise<UploadedGameImage> {
  const formData =
    createGameImageFormData(
      input,
    );

  return apiClient.post<
    UploadedGameImage,
    FormData
  >(
    "/api/media/images",
    formData,
    {
      signal,
    },
  );
}

export function deleteGameImage(
  publicPath: string,
  signal?: AbortSignal,
): Promise<DeletedGameImage> {
  const normalizedPath =
    normalizeGameMediaPublicPath(
      publicPath,
    );

  const query =
    encodeURIComponent(
      normalizedPath,
    );

  return apiClient.delete<
    DeletedGameImage
  >(
    `/api/media/images?publicPath=${query}`,
    {
      signal,
    },
  );
}