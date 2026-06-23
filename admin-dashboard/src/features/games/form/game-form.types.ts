// src/features/games/form/game-form.types.ts
export type GameSettingFormState = {
  name: string;
  description: string;
  inspiration: string[];
};

export type GameDevelopmentStageFormState = {
  current: string;
  nextMilestone: string;
  notes: string;
};

export type GameGameplayFocusFormState = {
  title: string;
  description: string;
  points: string[];
};

export type GameMediaFormState = {
  heroImage: string;
  thumbnail: string;
  coverImage: string;
  gallery: string[];
};

export type GameLinksFormState = {
  demo: string;
  itch: string;
  steam: string;
  devlog: string;
  trailer: string;
};

export type GameSeoFormState = {
  title: string;
  description: string;
  ogImage: string;
};

export type GameFormState = {
  title: string;
  slug: string;

  status: string;
  productionType: string;

  isFeatured: boolean;
  isPublic: boolean;

  /*
   * Input HTML mengembalikan string.
   * Nilai ini akan diubah menjadi number
   * sebelum dikirim ke backend.
   */
  order: string;

  summary: string;
  shortDescription: string;
  description: string;

  genre: string[];
  theme: string[];
  platforms: string[];

  targetBuild: string;
  targetRelease: string;

  setting: GameSettingFormState;

  developmentStage:
  GameDevelopmentStageFormState;

  gameplayFocus:
  GameGameplayFocusFormState;

  prototypeScope: string[];
  deferredFeatures: string[];

  media: GameMediaFormState;
  links: GameLinksFormState;

  relatedDevlogs: string[];

  seo: GameSeoFormState;
};