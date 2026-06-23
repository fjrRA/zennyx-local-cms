// src/features/games/form/validation/validate-game-publishing.ts
import type {
  GameFormState,
} from "../game-form.types";

import {
  validateOptionalLink,
  validateOptionalPublicPath,
  validateOptionalSlugList,
  validateRequiredText,
} from "./game-form-validation.helpers";

import type {
  GameFormErrors,
} from "./game-form-validation.types";

export function validateGamePublishing(
  state: GameFormState,
): GameFormErrors {
  const errors: GameFormErrors = {};

  validateOptionalPublicPath(
    errors,
    "game-media-hero-image",
    state.media.heroImage,
    "Hero Image",
  );

  validateOptionalPublicPath(
    errors,
    "game-media-thumbnail",
    state.media.thumbnail,
    "Thumbnail",
  );

  validateOptionalPublicPath(
    errors,
    "game-media-cover-image",
    state.media.coverImage,
    "Cover Image",
  );

  const invalidGalleryPath =
    state.media.gallery.find(
      (value) => {
        const normalizedValue =
          value.trim();

        return (
          normalizedValue.length > 0 &&
          !normalizedValue.startsWith("/")
        );
      },
    );

  if (invalidGalleryPath) {
    errors["game-media-gallery"] =
      "Setiap Gallery Image harus menggunakan path yang diawali tanda /.";
  }

  validateOptionalLink(
    errors,
    "game-link-demo",
    state.links.demo,
    "Demo",
  );

  validateOptionalLink(
    errors,
    "game-link-itch",
    state.links.itch,
    "Itch.io",
  );

  validateOptionalLink(
    errors,
    "game-link-steam",
    state.links.steam,
    "Steam",
  );

  validateOptionalLink(
    errors,
    "game-link-devlog",
    state.links.devlog,
    "Devlog",
  );

  validateOptionalLink(
    errors,
    "game-link-trailer",
    state.links.trailer,
    "Trailer",
  );

  validateOptionalSlugList(
    errors,
    "game-related-devlogs",
    state.relatedDevlogs,
    "Related Devlogs",
  );

  const hasSeoContent = [
    state.seo.title,
    state.seo.description,
    state.seo.ogImage,
  ].some(
    (value) =>
      value.trim().length > 0,
  );

  if (hasSeoContent) {
    validateRequiredText(
      errors,
      "game-seo-title",
      state.seo.title,
      "SEO Title",
      3,
    );

    validateRequiredText(
      errors,
      "game-seo-description",
      state.seo.description,
      "SEO Description",
      10,
    );

    validateOptionalPublicPath(
      errors,
      "game-seo-og-image",
      state.seo.ogImage,
      "Open Graph Image",
    );
  }

  return errors;
}