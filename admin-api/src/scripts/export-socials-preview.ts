// src/scripts/export-socials-preview.ts
import path from "node:path";
import { prisma } from "../lib/prisma";
import { exportSocialsToDirectory } from "../exporters/socials.exporter";

async function main() {
  const previewRoot = path.resolve(".export-preview");

  const result =
    await exportSocialsToDirectory(previewRoot);

  console.log("Socials export preview completed");
  console.log(
    `Exported socials records: ${result.exportedCount}`
  );
  console.log(`Output: ${result.outputPath}`);
}

main()
  .catch((error: unknown) => {
    console.error("Socials export preview failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });