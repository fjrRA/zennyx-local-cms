// prisma.seed.ts
import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { runSeeds } from "./seeds/index";

runSeeds()
  .catch((error: unknown) => {
    console.error("Seed failed");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });