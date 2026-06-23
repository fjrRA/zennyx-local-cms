// src/schemas/devlog.schema.ts
import { z } from "zod";
import { devlogCategories, slugRegex } from "../constants/devlog.constants";

const emptyStringToNull = (value: unknown) => {
  if (value === "") return null;
  return value;
};

const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(140)
  .regex(slugRegex, "Slug hanya boleh huruf kecil, angka, dan tanda dash");

const relatedGameSchema = z.preprocess(
  emptyStringToNull,
  z.string().trim().min(1).max(140).nullable().optional()
);

const gameIdSchema = z
  .number()
  .int()
  .positive()
  .nullable()
  .optional();

export const createDevlogSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: slugSchema,
  date: z.coerce.date(),
  category: z.enum(devlogCategories),
  summary: z.string().trim().min(10),
  relatedGame: relatedGameSchema,
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  content: z.string().trim().min(1),
  gameId: gameIdSchema,
});

export const updateDevlogSchema = createDevlogSchema.partial();

export type CreateDevlogInput = z.infer<typeof createDevlogSchema>;
export type UpdateDevlogInput = z.infer<typeof updateDevlogSchema>;