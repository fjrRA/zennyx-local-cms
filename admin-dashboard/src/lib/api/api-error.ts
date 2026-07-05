// src/lib/api/api-error.ts

export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(
    message: string,
    status: number,
    data: unknown,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function isApiError(
  error: unknown,
): error is ApiError {
  return error instanceof ApiError;
}

export function isAbortError(
  error: unknown,
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}

export function getApiErrorMessage(
  error: unknown,
): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi error yang tidak dikenali.";
}