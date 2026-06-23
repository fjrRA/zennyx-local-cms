// devlog.exporter.ts
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import matter from "gray-matter";
import { prisma } from "../lib/prisma";

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function cleanDevlogContent(content: string): string {
  return content
    .replace(/^\s*-{10,}\s*(?:\r?\n)+/, "")
    .trim();
}

export async function exportDevlogsToDirectory(outputRoot: string) {
  const devlogs = await prisma.devlog.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      game: {
        select: {
          slug: true,
        },
      },
    },
  });

  const outputDirectory = path.join(
    outputRoot,
    "content",
    "devlogs"
  );

  await mkdir(outputDirectory, {
    recursive: true,
  });

  const outputFiles: string[] = [];

  for (const devlog of devlogs) {
    const relatedGame =
      devlog.game?.slug ??
      devlog.relatedGame ??
      "";

    const frontmatter = {
      title: devlog.title,
      slug: devlog.slug,
      date: formatDate(devlog.date),
      category: devlog.category,
      summary: devlog.summary,
      relatedGame,
      isFeatured: devlog.isFeatured,
      isPublished: devlog.isPublished,
    };

    const cleanedContent = cleanDevlogContent(devlog.content);

    const markdownContent = matter.stringify(
      `${cleanedContent}\n`,
      frontmatter
    );

    const outputPath = path.join(
      outputDirectory,
      `${devlog.slug}.md`
    );

    await writeFile(
      outputPath,
      markdownContent,
      "utf-8"
    );

    outputFiles.push(outputPath);
  }

  return {
    outputDirectory,
    outputFiles,
    exportedCount: outputFiles.length,
  };
}