// src/constants/devlog.constants.ts
export const devlogCategories = [
  "Studio",
  "Development",
  "Production",
  "Design",
  "Prototype",
  "Milestone",
  "Reflection",
  "Technical",
] as const;

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;