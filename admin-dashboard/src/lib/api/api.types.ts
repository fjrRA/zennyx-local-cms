// src/lib/api/api.types.ts
export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export type MethodRequestOptions = Omit<
  ApiRequestOptions,
  "method" | "body"
>;