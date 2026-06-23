// src/scripts/export-devlogs-preview.ts
import path from "node:path";
import { prisma } from "../lib/prisma";
import { exportDevlogsToDirectory } from "../exporters/devlog.exporter";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  const result = await exportDevlogsToDirectory(previewRoot);

  console.log("Devlogs export preview completed");
  console.log(`Exported devlogs: ${result.exportedCount}`);
  console.log(`Output directory: ${result.outputDirectory}`);

  for (const outputFile of result.outputFiles) {
    console.log(`- ${outputFile}`);
  }
}

main()
  .catch((error) => {
    console.error("Devlogs export preview failed");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });