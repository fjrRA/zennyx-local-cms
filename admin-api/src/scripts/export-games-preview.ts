// src/scripts/export-games-preview.ts
import path from "node:path";
import { prisma } from "../lib/prisma";
import { exportGamesToDirectory } from "../exporters/game.exporter";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  const result = await exportGamesToDirectory(previewRoot);

  console.log("Games export preview completed");
  console.log(`Exported games: ${result.exportedCount}`);
  console.log(`Output: ${result.outputPath}`);
}

main()
  .catch((error) => {
    console.error("Games export preview failed");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });