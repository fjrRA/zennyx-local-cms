// src/config/media-upload.config.ts

export const MAX_IMAGE_SIZE_BYTES =
  8 * 1024 * 1024;

export const SUPPORTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type SupportedImageMimeType =
  typeof SUPPORTED_IMAGE_MIME_TYPES[number];

export const IMAGE_EXTENSION_BY_MIME_TYPE:
  Record<SupportedImageMimeType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const ORIGINAL_EXTENSIONS_BY_MIME_TYPE:
  Record<
    SupportedImageMimeType,
    readonly string[]
  > = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export function isSupportedImageMimeType(
  value: string,
): value is SupportedImageMimeType {
  return (
    SUPPORTED_IMAGE_MIME_TYPES as
    readonly string[]
  ).includes(value);
}