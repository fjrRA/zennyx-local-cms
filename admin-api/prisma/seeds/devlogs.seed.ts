// prisma/seeds/devlogs.seed.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { prisma } from "../../src/lib/prisma";
import type { DevlogFrontmatter } from "./seed.types";
import {
  cleanLegacyDevlogContent,
  getMarkdownFiles,
} from "./seed.utils";

export async function seedDevlogs(
  contentDirectory: string
): Promise<void> {
  const devlogsDirectory = path.join(
    contentDirectory,
    "devlogs"
  );

  const files = getMarkdownFiles(devlogsDirectory);

  if (files.length === 0) {
    console.log("No devlog files found");
    return;
  }

  for (const file of files) {
    await seedSingleDevlog(devlogsDirectory, file);
  }

  console.log(`Seeded ${files.length} devlogs`);
}

async function seedSingleDevlog(
  devlogsDirectory: string,
  fileName: string
): Promise<void> {
  const filePath = path.join(devlogsDirectory, fileName);
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(rawContent);

  const frontmatter = parsed.data as DevlogFrontmatter;
  const content = cleanLegacyDevlogContent(parsed.content);

  const relatedGameSlug =
    frontmatter.relatedGame?.trim() || null;

  const relatedGame = relatedGameSlug
    ? await findGameBySlug(relatedGameSlug)
    : null;

  const devlogData = {
    title: frontmatter.title,
    date: new Date(frontmatter.date),
    category: frontmatter.category,
    summary: frontmatter.summary,
    relatedGame: relatedGameSlug,
    isFeatured: frontmatter.isFeatured,
    isPublished: frontmatter.isPublished,
    content,
    gameId: relatedGame?.id ?? null,
  };

  await prisma.devlog.upsert({
    where: {
      slug: frontmatter.slug,
    },
    update: devlogData,
    create: {
      slug: frontmatter.slug,
      ...devlogData,
    },
  });
}

async function findGameBySlug(slug: string) {
  return prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });
}