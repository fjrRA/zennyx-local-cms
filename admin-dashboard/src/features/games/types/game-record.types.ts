// src/features/games/types/game-record.types.ts
import type {
  GameDevelopmentStage,
  GameGameplayFocus,
  GameLinks,
  GameMedia,
  GameSeo,
  GameSetting,
} from "./game-json.types";

import type {
  GameDevlogDetail,
  GameDevlogListItem,
  GameMediaAsset,
} from "./game-relations.types";

export type GameFields = {
  title: string;
  slug: string;

  status: string;
  productionType: string;

  isFeatured: boolean;
  isPublic: boolean;
  order: number;

  summary: string;
  shortDescription: string;
  description: string;

  genre: string[];
  theme: string[];
  setting: GameSetting;
  platforms: string[];

  targetBuild: string;
  targetRelease: string;

  developmentStage: GameDevelopmentStage;
  gameplayFocus: GameGameplayFocus;

  prototypeScope: string[];
  deferredFeatures: string[];

  media: GameMedia;
  links: GameLinks;

  relatedDevlogs: string[];
  seo: GameSeo;
};

export type GameRecord =
  GameFields & {
    id: number;
    createdAt: string;
    updatedAt: string;
  };

export type GameListItem =
  GameRecord & {
    devlogs: GameDevlogListItem[];
  };

export type GameDetail =
  GameRecord & {
    devlogs: GameDevlogDetail[];
    mediaAssets: GameMediaAsset[];
  };