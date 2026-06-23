// src/services/website-export/types.ts
export type ExpectedExportCounts = {
  games: number;
  team: number;
  devlogs: number;
};

export type WebsiteExportSummary = {
  destination: string;

  counts: {
    site: number;
    games: number;
    team: number;
    socials: number;
    devlogs: number;
  };
};