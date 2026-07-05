// src/controllers/media.controller.ts

import type {
  Request,
  Response,
} from "express";

import {
  MediaFileValidationError,
} from "../lib/image-file-validation";

import {
  MediaPathValidationError,
} from "../lib/media-path";

import {
  deleteGameImageQuerySchema,
  uploadGameImageFieldsSchema,
} from "../schemas/media.schema";

import {
  deleteGameImage,
  saveGameImage,
} from "../services/media.service";

export async function uploadMediaImageController(
  req: Request,
  res: Response,
) {
  const parsedFields =
    uploadGameImageFieldsSchema.safeParse(
      req.body,
    );

  if (!parsedFields.success) {
    return res.status(400).json({
      message: "Validation error",
      errors:
        parsedFields.error.flatten(),
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Validation error",
      errors: {
        formErrors: [],
        fieldErrors: {
          file: [
            "Pilih file gambar yang akan diunggah.",
          ],
        },
      },
    });
  }

  try {
    const uploadedImage =
      await saveGameImage({
        file: req.file,
        slug:
          parsedFields.data.slug,
        role:
          parsedFields.data.role,
      });

    return res
      .status(201)
      .json(uploadedImage);
  } catch (error) {
    if (
      error instanceof
      MediaFileValidationError
    ) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          formErrors: [],
          fieldErrors: {
            file: [
              error.message,
            ],
          },
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      message:
        "Gagal menyimpan gambar ke storage lokal.",
    });
  }
}

/*
 * Controller DELETE ditaruh di sini,
 * setelah uploadMediaImageController selesai.
 */
export async function deleteMediaImageController(
  req: Request,
  res: Response,
) {
  const parsedQuery =
    deleteGameImageQuerySchema.safeParse(
      req.query,
    );

  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Validation error",
      errors:
        parsedQuery.error.flatten(),
    });
  }

  try {
    const result =
      await deleteGameImage(
        parsedQuery.data.publicPath,
      );

    return res
      .status(200)
      .json(result);
  } catch (error) {
    if (
      error instanceof
      MediaPathValidationError
    ) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          formErrors: [],
          fieldErrors: {
            publicPath: [
              error.message,
            ],
          },
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      message:
        "Gagal menghapus gambar dari storage lokal.",
    });
  }
}