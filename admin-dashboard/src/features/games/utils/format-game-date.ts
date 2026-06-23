// src/features/games/utils/format-game-date.ts
const gameDateFormatter =
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export function formatGameDate(
  value: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  return gameDateFormatter.format(date);
}