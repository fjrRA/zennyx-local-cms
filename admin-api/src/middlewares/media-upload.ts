// src/middlewares/media-upload.ts

import type {
  NextFunction,
  Request,
  Response,
} from "express";

import multer from "multer";

import {
  MAX_IMAGE_SIZE_BYTES,
  isSupportedImageMimeType,
} from "../config/media-upload.config";

const imageUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES,
    files: 1,
    fields: 3,
  },

  fileFilter(
    _req,
    file,
    callback,
  ) {
    if (
      !isSupportedImageMimeType(
        file.mimetype,
      )
    ) {
      callback(
        new Error(
          "Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP.",
        ),
      );

      return;
    }

    callback(null, true);
  },
});

const uploadSingleImageMiddleware =
  imageUpload.single("file");

export function uploadSingleImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  uploadSingleImageMiddleware(
    req,
    res,
    (error: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (
        error instanceof
        multer.MulterError
      ) {
        if (
          error.code ===
          "LIMIT_FILE_SIZE"
        ) {
          res.status(413).json({
            message:
              "Ukuran gambar melebihi batas 8 MiB.",
          });

          return;
        }

        if (
          error.code ===
          "LIMIT_UNEXPECTED_FILE"
        ) {
          res.status(400).json({
            message:
              'Field file upload harus bernama "file".',
          });

          return;
        }

        res.status(400).json({
          message:
            "Request upload media tidak valid.",

          code: error.code,
        });

        return;
      }

      const message =
        error instanceof Error
          ? error.message
          : "Terjadi error saat menerima file.";

      res.status(400).json({
        message,
      });
    },
  );
}