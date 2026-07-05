// src/schemas/media.schema.ts

import { z } from "zod";

export const gameImageRoleSchema =
  z.enum([
    "hero",
    "thumbnail",
    "cover",
    "gallery",
    "og-image",
  ]);

export const uploadGameImageFieldsSchema =
  z.object({
    scope: z.literal("games"),

    slug: z
      .string()
      .trim()
      .min(3)
      .max(140)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug Game tidak valid.",
      ),

    role: gameImageRoleSchema,
  });

export type GameImageRole =
  z.infer<typeof gameImageRoleSchema>;

export type UploadGameImageFields =
  z.infer<
    typeof uploadGameImageFieldsSchema
  >;

export const deleteGameImageQuerySchema =
  z.object({
    publicPath: z
      .string()
      .trim()
      .min(
        1,
        "Public path gambar harus diisi.",
      )
      .max(
        500,
        "Public path gambar terlalu panjang.",
      ),
  });