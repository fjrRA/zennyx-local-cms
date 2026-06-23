// prisma/seeds/seed.types.ts
import type { Prisma } from "../../generated/prisma/client";

export type JsonInput = Prisma.InputJsonValue;

export type SiteJson = {
  siteName: string;
  shortName: string;
  type: string;
  stage: string;
  country: string;
  language: string;
  siteUrl: string;
  tagline: JsonInput;
  positioning: JsonInput;
  description: JsonInput;
  coreMessage: JsonInput;
  studioPrinciples: JsonInput;
  toneOfVoice: JsonInput;
  home: JsonInput;
  about: JsonInput;
  footer: JsonInput;
  seo: JsonInput;
};

export type GameJson = {
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
  genre: JsonInput;
  theme: JsonInput;
  setting: JsonInput;
  platforms: JsonInput;
  targetBuild: string;
  targetRelease: string;
  developmentStage: JsonInput;
  gameplayFocus: JsonInput;
  prototypeScope: JsonInput;
  deferredFeatures: JsonInput;
  media: JsonInput;
  links: JsonInput;
  relatedDevlogs: JsonInput;
  seo: JsonInput;
};

export type TeamJson = {
  name: string;
  slug: string;
  role: string;
  displayRole: string;
  location?: string;
  avatar?: string;
  shortBio: string;
  bio: string;
  responsibilities: JsonInput;
  socials: JsonInput;
  isFounder: boolean;
  isActive: boolean;
  order: number;
};

export type SocialsJson = {
  primaryContact: JsonInput;
  contactMessage: JsonInput;
  links: JsonInput;
  cta: JsonInput;
};

export type DevlogCategory =
  | "Studio"
  | "Development"
  | "Production"
  | "Design"
  | "Prototype"
  | "Milestone"
  | "Reflection"
  | "Technical";

export type DevlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  category: DevlogCategory;
  summary: string;
  relatedGame?: string;
  isFeatured: boolean;
  isPublished: boolean;
};