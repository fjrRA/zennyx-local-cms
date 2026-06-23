// src/features/games/form/game-form-section.mapper.ts
import type {
  CreateGameInput,
} from "../game.types";

import type {
  GameFormState,
} from "./game-form.types";

import {
  normalizeStringList,
  normalizeText,
} from "./game-form.normalizers";

export function mapGameSetting(
  state: GameFormState["setting"],
): CreateGameInput["setting"] {
  return {
    name: normalizeText(state.name),

    description: normalizeText(
      state.description,
    ),

    inspiration: normalizeStringList(
      state.inspiration,
    ),
  };
}

export function mapGameDevelopmentStage(
  state: GameFormState["developmentStage"],
): CreateGameInput["developmentStage"] {
  return {
    current: normalizeText(
      state.current,
    ),

    nextMilestone: normalizeText(
      state.nextMilestone,
    ),

    notes: normalizeText(
      state.notes,
    ),
  };
}

export function mapGameGameplayFocus(
  state: GameFormState["gameplayFocus"],
): CreateGameInput["gameplayFocus"] {
  return {
    title: normalizeText(
      state.title,
    ),

    description: normalizeText(
      state.description,
    ),

    points: normalizeStringList(
      state.points,
    ),
  };
}

export function mapGameMedia(
  state: GameFormState["media"],
): CreateGameInput["media"] {
  return {
    heroImage: normalizeText(
      state.heroImage,
    ),

    thumbnail: normalizeText(
      state.thumbnail,
    ),

    coverImage: normalizeText(
      state.coverImage,
    ),

    gallery: normalizeStringList(
      state.gallery,
    ),
  };
}

export function mapGameLinks(
  state: GameFormState["links"],
): CreateGameInput["links"] {
  return {
    demo: normalizeText(state.demo),
    itch: normalizeText(state.itch),
    steam: normalizeText(state.steam),

    devlog: normalizeText(
      state.devlog,
    ),

    trailer: normalizeText(
      state.trailer,
    ),
  };
}

export function mapGameSeo(
  state: GameFormState["seo"],
): CreateGameInput["seo"] {
  return {
    title: normalizeText(
      state.title,
    ),

    description: normalizeText(
      state.description,
    ),

    ogImage: normalizeText(
      state.ogImage,
    ),
  };
}