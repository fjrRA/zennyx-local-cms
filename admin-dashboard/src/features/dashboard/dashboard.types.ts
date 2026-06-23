// src/features/dashboard/dashboard.types.ts
export type DashboardGameRecord = {
  id: number;
  isPublic: boolean;
  isFeatured: boolean;
};

export type DashboardDevlogRecord = {
  id: number;
  isPublished: boolean;
  isFeatured: boolean;
};

export type DashboardTeamMemberRecord = {
  id: number;
  isActive: boolean;
  isFounder: boolean;
};

export type DashboardSocialLinkRecord = {
  href: string;
  isActive: boolean;
  isPrimary: boolean;
};

export type DashboardSiteRecord = {
  id: number;
  siteName: string;
  updatedAt: string;
};

export type DashboardSocialConfigRecord = {
  id: number;
  links: DashboardSocialLinkRecord[];
  updatedAt: string;
};

export type DashboardSummary = {
  totalGames: number;
  publicGames: number;

  totalDevlogs: number;
  publishedDevlogs: number;

  totalTeamMembers: number;
  activeTeamMembers: number;

  totalSocialLinks: number;
  activeSocialLinks: number;

  siteConfigured: boolean;
  siteName: string;
  siteUpdatedAt: string | null;
};

export type DashboardSummaryState =
  | {
    status: "loading";
  }
  | {
    status: "success";
    data: DashboardSummary;
  }
  | {
    status: "error";
    message: string;
  };