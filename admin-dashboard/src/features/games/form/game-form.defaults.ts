// src/features/games/form/game-form.defaults.ts
import type {
  GameFormState,
} from "./game-form.types";

export function createInitialGameFormState():
  GameFormState {
  return {
    title: "",
    slug: "",

    status: "",
    productionType: "",

    isFeatured: false,
    isPublic: false,

    order: "0",

    summary: "",
    shortDescription: "",
    description: "",

    genre: [""],
    theme: [""],
    platforms: [""],

    targetBuild: "",
    targetRelease: "",

    setting: {
      name: "",
      description: "",
      inspiration: [""],
    },

    developmentStage: {
      current: "",
      nextMilestone: "",
      notes: "",
    },

    gameplayFocus: {
      title: "",
      description: "",
      points: [""],
    },

    prototypeScope: [""],
    deferredFeatures: [""],

    media: {
      heroImage: "",
      thumbnail: "",
      coverImage: "",
      gallery: [],
    },

    links: {
      demo: "",
      itch: "",
      steam: "",
      devlog: "",
      trailer: "",
    },

    relatedDevlogs: [""],

    seo: {
      title: "",
      description: "",
      ogImage: "",
    },
  };
}