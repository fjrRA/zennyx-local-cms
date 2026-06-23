// src/features/games/form/game-form.normalizers.ts

export function normalizeText(
  value: string,
): string {
  return value.trim();
}

export function normalizeStringList(
  values: string[],
): string[] {
  return values
    .map(normalizeText)
    .filter((value) => value.length > 0);
}

export function parseGameOrder(
  value: string,
): number {
  const normalizedValue =
    normalizeText(value);

  if (!normalizedValue) {
    return 0;
  }

  const parsedValue =
    Number(normalizedValue);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue < 0
  ) {
    throw new Error(
      "Urutan Game harus berupa bilangan bulat nol atau lebih.",
    );
  }

  return parsedValue;
}