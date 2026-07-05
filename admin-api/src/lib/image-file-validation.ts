// src/lib/image-file-validation.ts

import * as path from "node:path";

import {
  IMAGE_EXTENSION_BY_MIME_TYPE,
  MAX_IMAGE_SIZE_BYTES,
  ORIGINAL_EXTENSIONS_BY_MIME_TYPE,
  isSupportedImageMimeType,
} from "../config/media-upload.config";

import type {
  SupportedImageMimeType,
} from "../config/media-upload.config";

export class MediaFileValidationError
  extends Error {
  constructor(message: string) {
    super(message);

    this.name =
      "MediaFileValidationError";
  }
}

export type ValidatedImageFile = {
  originalName: string;
  mimeType: SupportedImageMimeType;
  extension: string;
};

function isPng(buffer: Buffer): boolean {
  const pngSignature = [
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ];

  if (
    buffer.length <
    pngSignature.length
  ) {
    return false;
  }

  return pngSignature.every(
    (byte, index) =>
      buffer[index] === byte,
  );
}

function isJpeg(buffer: Buffer): boolean {
  return (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  );
}

function isWebp(buffer: Buffer): boolean {
  if (buffer.length < 12) {
    return false;
  }

  return (
    buffer.toString(
      "ascii",
      0,
      4,
    ) === "RIFF" &&
    buffer.toString(
      "ascii",
      8,
      12,
    ) === "WEBP"
  );
}

function detectImageMimeType(
  buffer: Buffer,
): SupportedImageMimeType | null {
  if (isPng(buffer)) {
    return "image/png";
  }

  if (isJpeg(buffer)) {
    return "image/jpeg";
  }

  if (isWebp(buffer)) {
    return "image/webp";
  }

  return null;
}

function normalizeOriginalName(
  originalName: string,
): string {
  const normalizedPath =
    originalName.replaceAll("\\", "/");

  const normalizedName =
    path.posix
      .basename(normalizedPath)
      .trim();

  if (
    !normalizedName ||
    normalizedName.includes("\0")
  ) {
    throw new MediaFileValidationError(
      "Nama file gambar tidak valid.",
    );
  }

  return normalizedName;
}

export function validateUploadedImageFile(
  file: Express.Multer.File,
): ValidatedImageFile {
  if (
    !file.buffer ||
    file.buffer.length === 0
  ) {
    throw new MediaFileValidationError(
      "File gambar kosong atau tidak dapat dibaca.",
    );
  }

  if (
    file.size <= 0 ||
    file.size !== file.buffer.length
  ) {
    throw new MediaFileValidationError(
      "Ukuran file gambar tidak valid.",
    );
  }

  if (
    file.size > MAX_IMAGE_SIZE_BYTES
  ) {
    throw new MediaFileValidationError(
      "Ukuran gambar melebihi batas 8 MiB.",
    );
  }

  if (
    !isSupportedImageMimeType(
      file.mimetype,
    )
  ) {
    throw new MediaFileValidationError(
      "Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP.",
    );
  }

  const detectedMimeType =
    detectImageMimeType(file.buffer);

  if (!detectedMimeType) {
    throw new MediaFileValidationError(
      "Isi file bukan gambar JPEG, PNG, atau WebP yang valid.",
    );
  }

  if (
    detectedMimeType !==
    file.mimetype
  ) {
    throw new MediaFileValidationError(
      "MIME type gambar tidak sesuai dengan isi file.",
    );
  }

  const originalName =
    normalizeOriginalName(
      file.originalname,
    );

  const originalExtension =
    path.extname(
      originalName,
    ).toLowerCase();

  const allowedExtensions =
    ORIGINAL_EXTENSIONS_BY_MIME_TYPE[
    detectedMimeType
    ];

  if (
    !allowedExtensions.includes(
      originalExtension,
    )
  ) {
    throw new MediaFileValidationError(
      "Ekstensi nama file tidak sesuai dengan format gambar.",
    );
  }

  return {
    originalName,
    mimeType: detectedMimeType,

    extension:
      IMAGE_EXTENSION_BY_MIME_TYPE[
      detectedMimeType
      ],
  };
}