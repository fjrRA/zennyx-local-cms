// src/features/games/form/game-form.mapper.ts
import type {
  CreateGameInput,
} from "../game.types";

import type {
  GameFormState,
} from "./game-form.types";

import {
  normalizeStringList,
  normalizeText,
  parseGameOrder,
} from "./game-form.normalizers";

import {
  mapGameDevelopmentStage,
  mapGameGameplayFocus,
  mapGameLinks,
  mapGameMedia,
  mapGameSeo,
  mapGameSetting,
} from "./game-form-section.mapper";

export function toCreateGameInput(
  state: GameFormState,
): CreateGameInput {
  return {
    title: normalizeText(state.title),
    slug: normalizeText(state.slug),

    status: normalizeText(state.status),
    productionType: normalizeText(
      state.productionType,
    ),

    isFeatured: state.isFeatured,
    isPublic: state.isPublic,
    order: parseGameOrder(state.order),

    summary: normalizeText(
      state.summary,
    ),

    shortDescription: normalizeText(
      state.shortDescription,
    ),

    description: normalizeText(
      state.description,
    ),

    genre: normalizeStringList(
      state.genre,
    ),

    theme: normalizeStringList(
      state.theme,
    ),

    platforms: normalizeStringList(
      state.platforms,
    ),

    targetBuild: normalizeText(
      state.targetBuild,
    ),

    targetRelease: normalizeText(
      state.targetRelease,
    ),

    setting: mapGameSetting(
      state.setting,
    ),

    developmentStage:
      mapGameDevelopmentStage(
        state.developmentStage,
      ),

    gameplayFocus:
      mapGameGameplayFocus(
        state.gameplayFocus,
      ),

    prototypeScope:
      normalizeStringList(
        state.prototypeScope,
      ),

    deferredFeatures:
      normalizeStringList(
        state.deferredFeatures,
      ),

    media: mapGameMedia(
      state.media,
    ),

    links: mapGameLinks(
      state.links,
    ),

    relatedDevlogs:
      normalizeStringList(
        state.relatedDevlogs,
      ),

    seo: mapGameSeo(
      state.seo,
    ),
  };
}