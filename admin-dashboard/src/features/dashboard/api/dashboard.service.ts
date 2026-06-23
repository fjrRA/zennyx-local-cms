import { apiClient } from "../../../lib/api";

import type {
  DashboardDevlogRecord,
  DashboardGameRecord,
  DashboardSiteRecord,
  DashboardSocialConfigRecord,
  DashboardSummary,
  DashboardTeamMemberRecord,
} from "../dashboard.types";

export async function getDashboardSummary(
  signal?: AbortSignal,
): Promise<DashboardSummary> {
  const [
    games,
    devlogs,
    site,
    teamMembers,
    socialConfig,
  ] = await Promise.all([
    apiClient.get<DashboardGameRecord[]>(
      "/api/games",
      { signal },
    ),

    apiClient.get<DashboardDevlogRecord[]>(
      "/api/devlogs",
      { signal },
    ),

    apiClient.get<DashboardSiteRecord | null>(
      "/api/site",
      { signal },
    ),

    apiClient.get<DashboardTeamMemberRecord[]>(
      "/api/team",
      { signal },
    ),

    apiClient.get<DashboardSocialConfigRecord | null>(
      "/api/socials",
      { signal },
    ),
  ]);

  const socialLinks = socialConfig?.links ?? [];

  return {
    totalGames: games.length,

    publicGames: games.filter(
      (game) => game.isPublic,
    ).length,

    totalDevlogs: devlogs.length,

    publishedDevlogs: devlogs.filter(
      (devlog) => devlog.isPublished,
    ).length,

    totalTeamMembers: teamMembers.length,

    activeTeamMembers: teamMembers.filter(
      (member) => member.isActive,
    ).length,

    totalSocialLinks: socialLinks.length,

    activeSocialLinks: socialLinks.filter(
      (link) => link.isActive,
    ).length,

    siteConfigured: Boolean(
      site?.id && site.siteName.trim(),
    ),

    siteName:
      site?.siteName ?? "Belum dikonfigurasi",

    siteUpdatedAt:
      site?.updatedAt ?? null,
  };
}