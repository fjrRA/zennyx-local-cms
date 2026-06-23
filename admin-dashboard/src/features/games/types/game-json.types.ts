// src/features/games/types/game-json.types.ts
export type GameSetting = {
  name: string;
  description: string;
  inspiration: string[];
};

export type GameDevelopmentStage = {
  notes: string;
  current: string;
  nextMilestone: string;
};

export type GameGameplayFocus = {
  title: string;
  points: string[];
  description: string;
};

export type GameMedia = {
  gallery: string[];
  heroImage: string;
  thumbnail: string;
  coverImage: string;
};

export type GameLinks = {
  demo: string;
  itch: string;
  steam: string;
  devlog: string;
  trailer: string;
};

export type GameSeo = {
  title: string;
  ogImage: string;
  description: string;
};