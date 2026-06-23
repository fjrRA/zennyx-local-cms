// src/scripts/export-team-preview.ts
import path from "node:path";
import { prisma } from "../lib/prisma";
import { exportTeamToDirectory } from "../exporters/team.exporter";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  const result = await exportTeamToDirectory(previewRoot);

  console.log("Team export preview completed");
  console.log(`Exported team members: ${result.exportedCount}`);
  console.log(`Output: ${result.outputPath}`);
}

main()
  .catch((error: unknown) => {
    console.error("Team export preview failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });