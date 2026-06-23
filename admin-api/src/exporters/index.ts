// src/exporters/index.ts
import { exportDevlogsToDirectory } from "./devlog.exporter";
import { exportGamesToDirectory } from "./game.exporter";
import { exportSiteToDirectory } from "./site.exporter";
import { exportSocialsToDirectory } from "./socials.exporter";
import { exportTeamToDirectory } from "./team.exporter";

export async function exportAllToDirectory(
  outputRoot: string
) {
  const site = await exportSiteToDirectory(outputRoot);

  const games = await exportGamesToDirectory(outputRoot);

  const team = await exportTeamToDirectory(outputRoot);

  const socials = await exportSocialsToDirectory(outputRoot);

  const devlogs = await exportDevlogsToDirectory(outputRoot);

  return {
    site,
    games,
    team,
    socials,
    devlogs,
  };
}

export {
  exportDevlogsToDirectory,
  exportGamesToDirectory,
  exportSiteToDirectory,
  exportSocialsToDirectory,
  exportTeamToDirectory,
};