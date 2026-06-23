// src/scripts/export-site-preview.ts
import path from "node:path";
import { prisma } from "../lib/prisma";
import { exportSiteToDirectory } from "../exporters/site.exporter";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  const result = await exportSiteToDirectory(previewRoot);

  console.log("Site export preview completed");
  console.log(`Exported site records: ${result.exportedCount}`);
  console.log(`Output: ${result.outputPath}`);
}

main()
  .catch((error: unknown) => {
    console.error("Site export preview failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });