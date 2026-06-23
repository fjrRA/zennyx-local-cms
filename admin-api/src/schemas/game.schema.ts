// src/schema.game.schema.ts
import { z } from "zod";

const slugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(140)
  .regex(
    slugRegex,
    "Slug hanya boleh huruf kecil, angka, dan tanda dash",
  );

const requiredJsonSchema = z.unknown();

const gameBaseSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: slugSchema,

  status: z.string().trim().min(2).max(120),

  productionType: z
    .string()
    .trim()
    .min(2)
    .max(160),

  isFeatured: z.boolean(),
  isPublic: z.boolean(),

  order: z
    .number()
    .int()
    .nonnegative(),

  summary: z.string().trim().min(10),

  shortDescription: z
    .string()
    .trim()
    .min(10),

  description: z.string().trim().min(10),

  genre: requiredJsonSchema,
  theme: requiredJsonSchema,
  setting: requiredJsonSchema,
  platforms: requiredJsonSchema,

  targetBuild: z
    .string()
    .trim()
    .min(2)
    .max(120),

  targetRelease: z
    .string()
    .trim()
    .min(2)
    .max(120),

  developmentStage: requiredJsonSchema,
  gameplayFocus: requiredJsonSchema,

  prototypeScope: requiredJsonSchema,
  deferredFeatures: requiredJsonSchema,

  media: requiredJsonSchema,
  links: requiredJsonSchema,

  relatedDevlogs: requiredJsonSchema,
  seo: requiredJsonSchema,
});

export const createGameSchema =
  gameBaseSchema.extend({
    isFeatured: z
      .boolean()
      .default(false),

    isPublic: z
      .boolean()
      .default(false),

    order: z
      .number()
      .int()
      .nonnegative()
      .default(0),
  });

export const updateGameSchema =
  gameBaseSchema.partial();

export type CreateGameInput =
  z.infer<typeof createGameSchema>;

export type UpdateGameInput =
  z.infer<typeof updateGameSchema>;