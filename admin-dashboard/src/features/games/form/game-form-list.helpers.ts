// src/features/games/form/game-form-list.helpers.ts

export function replaceStringListItem(
  values: string[],
  index: number,
  value: string,
): string[] {
  return values.map(
    (currentValue, currentIndex) =>
      currentIndex === index
        ? value
        : currentValue,
  );
}

export function appendEmptyStringListItem(
  values: string[],
): string[] {
  return [...values, ""];
}

export function removeStringListItem(
  values: string[],
  index: number,
): string[] {
  const nextValues = values.filter(
    (_, currentIndex) =>
      currentIndex !== index,
  );

  return nextValues.length > 0
    ? nextValues
    : [""];
}