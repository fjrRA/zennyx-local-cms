// src/services/website-export/validate-staging.ts
import path from "node:path";
import {
  readFile,
  readdir,
  stat,
} from "node:fs/promises";

import type {
  ExpectedExportCounts,
} from "./types";

function isJsonObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

async function readJsonFile(
  filePath: string
): Promise<unknown> {
  const rawContent = await readFile(
    filePath,
    "utf-8"
  );

  return JSON.parse(rawContent) as unknown;
}

export async function validateStagedExport(
  stagedContentDirectory: string,
  expectedCounts: ExpectedExportCounts
): Promise<void> {
  const site = await readJsonFile(
    path.join(
      stagedContentDirectory,
      "site.json"
    )
  );

  const games = await readJsonFile(
    path.join(
      stagedContentDirectory,
      "games.json"
    )
  );

  const team = await readJsonFile(
    path.join(
      stagedContentDirectory,
      "team.json"
    )
  );

  const socials = await readJsonFile(
    path.join(
      stagedContentDirectory,
      "socials.json"
    )
  );

  validateSite(site);
  validateGames(games, expectedCounts.games);
  validateTeam(team, expectedCounts.team);
  validateSocials(socials);

  await validateDevlogs(
    stagedContentDirectory,
    expectedCounts.devlogs
  );
}

function validateSite(site: unknown): void {
  if (!isJsonObject(site)) {
    throw new Error(
      "Hasil staging site.json harus berupa object"
    );
  }
}

function validateGames(
  games: unknown,
  expectedCount: number
): void {
  if (!Array.isArray(games)) {
    throw new Error(
      "Hasil staging games.json harus berupa array"
    );
  }

  if (games.length !== expectedCount) {
    throw new Error(
      createCountErrorMessage(
        "games.json",
        expectedCount,
        games.length
      )
    );
  }
}

function validateTeam(
  team: unknown,
  expectedCount: number
): void {
  if (!Array.isArray(team)) {
    throw new Error(
      "Hasil staging team.json harus berupa array"
    );
  }

  if (team.length !== expectedCount) {
    throw new Error(
      createCountErrorMessage(
        "team.json",
        expectedCount,
        team.length
      )
    );
  }
}

function validateSocials(
  socials: unknown
): void {
  if (!isJsonObject(socials)) {
    throw new Error(
      "Hasil staging socials.json harus berupa object"
    );
  }
}

async function validateDevlogs(
  stagedContentDirectory: string,
  expectedCount: number
): Promise<void> {
  const devlogsDirectory = path.join(
    stagedContentDirectory,
    "devlogs"
  );

  const directoryStat = await stat(
    devlogsDirectory
  );

  if (!directoryStat.isDirectory()) {
    throw new Error(
      "Hasil staging devlogs harus berupa directory"
    );
  }

  const devlogFiles = (
    await readdir(devlogsDirectory)
  ).filter((fileName) =>
    fileName.endsWith(".md")
  );

  if (devlogFiles.length !== expectedCount) {
    throw new Error(
      createCountErrorMessage(
        "Devlog",
        expectedCount,
        devlogFiles.length
      )
    );
  }
}

function createCountErrorMessage(
  resourceName: string,
  expected: number,
  actual: number
): string {
  return [
    `Jumlah ${resourceName} tidak sesuai.`,
    `Expected: ${expected}.`,
    `Actual: ${actual}.`,
  ].join(" ");
}