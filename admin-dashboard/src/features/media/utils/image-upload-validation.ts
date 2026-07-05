// src/features/media/utils/
// image-upload-validation.ts

export const MAX_IMAGE_SIZE_BYTES =
  8 * 1024 * 1024;

export const IMAGE_FILE_ACCEPT = [
  "image/jpeg",
  "image/png",
  "image/webp",
].join(",");

const supportedMimeTypes =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

const extensionsByMimeType:
  Record<string, readonly string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const gameSlugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidGameSlugForMedia(
  slug: string,
): boolean {
  const normalizedSlug = slug.trim();

  return (
    normalizedSlug.length >= 3 &&
    normalizedSlug.length <= 140 &&
    gameSlugRegex.test(normalizedSlug)
  );
}

function getFileExtension(
  filename: string,
): string {
  const lastDotIndex =
    filename.lastIndexOf(".");

  if (lastDotIndex < 0) {
    return "";
  }

  return filename
    .slice(lastDotIndex)
    .toLowerCase();
}

export function validateImageUploadFile(
  file: File,
): string | null {
  if (file.size <= 0) {
    return "File gambar kosong atau tidak dapat dibaca.";
  }

  if (
    file.size >
    MAX_IMAGE_SIZE_BYTES
  ) {
    return "Ukuran gambar melebihi batas 8 MiB.";
  }

  if (
    !supportedMimeTypes.has(file.type)
  ) {
    return "Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP.";
  }

  const extension =
    getFileExtension(file.name);

  const allowedExtensions =
    extensionsByMimeType[file.type];

  if (
    !allowedExtensions?.includes(
      extension,
    )
  ) {
    return "Ekstensi nama file tidak sesuai dengan format gambar.";
  }

  return null;
}

export function formatImageFileSize(
  size: number,
): string {
  if (size < 1024) {
    return `${size} B`;
  }

  const kilobytes = size / 1024;

  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KiB`;
  }

  const megabytes =
    kilobytes / 1024;

  return `${megabytes.toFixed(1)} MiB`;
}