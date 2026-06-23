// src/scripts/export-all-preview.ts
import path from "node:path";
import { rm } from "node:fs/promises";
import { prisma } from "../lib/prisma";
import { exportAllToDirectory } from "../exporters/index";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  console.log("Preparing export preview...");

  await rm(previewRoot, {
    recursive: true,
    force: true,
  });

  const result = await exportAllToDirectory(previewRoot);

  console.log("");
  console.log("All content export preview completed");
  console.log(`Exported site records: ${result.site.exportedCount}`);
  console.log(`Exported games: ${result.games.exportedCount}`);
  console.log(`Exported team members: ${result.team.exportedCount}`);
  console.log(
    `Exported socials records: ${result.socials.exportedCount}`
  );
  console.log(
    `Exported devlogs: ${result.devlogs.exportedCount}`
  );
  console.log(`Output root: ${previewRoot}`);
}

main()
  .catch((error: unknown) => {
    console.error("All content export preview failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
