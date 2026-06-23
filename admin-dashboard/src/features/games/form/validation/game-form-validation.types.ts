// src/features/games/form/validation/game-form-validation.types.ts

export type GameFormFieldId =
  | "game-title"
  | "game-slug"
  | "game-status"
  | "game-production-type"
  | "game-order"
  | "game-summary"
  | "game-short-description"
  | "game-description"
  | "game-genre"
  | "game-theme"
  | "game-platform"
  | "game-target-build"
  | "game-target-release"
  | "game-setting-name"
  | "game-setting-description"
  | "game-setting-inspiration"
  | "game-development-current"
  | "game-development-next"
  | "game-development-notes"
  | "game-gameplay-title"
  | "game-gameplay-description"
  | "game-gameplay-points"
  | "game-prototype-scope"
  | "game-deferred-features"
  | "game-media-hero-image"
  | "game-media-thumbnail"
  | "game-media-cover-image"
  | "game-media-gallery"
  | "game-link-demo"
  | "game-link-itch"
  | "game-link-steam"
  | "game-link-devlog"
  | "game-link-trailer"
  | "game-related-devlogs"
  | "game-seo-title"
  | "game-seo-description"
  | "game-seo-og-image";

export type GameFormErrors =
  Partial<
    Record<GameFormFieldId, string>
  >;

export type GameFormValidationResult = {
  isValid: boolean;
  errors: GameFormErrors;
};