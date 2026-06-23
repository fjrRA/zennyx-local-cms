// src/scripts/export-all-website.ts
import "dotenv/config";

import { prisma } from "../lib/prisma";

import {
  exportAllContentToWebsite,
} from "../services/website-export/website-export.service";

async function main(): Promise<void> {
  const result =
    await exportAllContentToWebsite();

  console.log("");
  console.log("Website export completed");

  console.log(
    `Exported site records: ${result.counts.site}`
  );

  console.log(
    `Exported games: ${result.counts.games}`
  );

  console.log(
    `Exported team members: ${result.counts.team}`
  );

  console.log(
    `Exported socials records: ${result.counts.socials}`
  );

  console.log(
    `Exported devlogs: ${result.counts.devlogs}`
  );

  console.log(
    `Destination: ${result.destination}`
  );
}

main()
  .catch((error: unknown) => {
    console.error("Website export failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });