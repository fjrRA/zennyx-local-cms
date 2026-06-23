// src/features/games/form/validation/game-api-validation.mapper.ts
import type {
  GameValidationErrorResponse,
} from "../../game.types";

import type {
  GameFormErrors,
  GameFormFieldId,
} from "./game-form-validation.types";

const backendFieldMap:
  Record<string, GameFormFieldId> = {
  title: "game-title",
  slug: "game-slug",
  status: "game-status",

  productionType:
    "game-production-type",

  isFeatured:
    "game-is-featured" as GameFormFieldId,

  isPublic:
    "game-is-public" as GameFormFieldId,

  order: "game-order",
  summary: "game-summary",

  shortDescription:
    "game-short-description",

  description:
    "game-description",

  genre: "game-genre",
  theme: "game-theme",
  platforms: "game-platform",

  targetBuild:
    "game-target-build",

  targetRelease:
    "game-target-release",

  setting:
    "game-setting-name",

  developmentStage:
    "game-development-current",

  gameplayFocus:
    "game-gameplay-title",

  prototypeScope:
    "game-prototype-scope",

  deferredFeatures:
    "game-deferred-features",

  media:
    "game-media-hero-image",

  links:
    "game-link-demo",

  relatedDevlogs:
    "game-related-devlogs",

  seo:
    "game-seo-title",
};

export type MappedGameApiValidation = {
  fieldErrors: GameFormErrors;
  formErrors: string[];
};

export function mapGameApiValidation(
  response: GameValidationErrorResponse,
): MappedGameApiValidation {
  const fieldErrors: GameFormErrors =
    {};

  const formErrors = [
    ...response.errors.formErrors,
  ];

  for (const [
    backendField,
    messages,
  ] of Object.entries(
    response.errors.fieldErrors,
  )) {
    if (!messages?.length) {
      continue;
    }

    const fieldId =
      backendFieldMap[backendField];

    if (!fieldId) {
      formErrors.push(messages[0]);
      continue;
    }

    fieldErrors[fieldId] =
      messages[0];
  }

  return {
    fieldErrors,
    formErrors,
  };
}