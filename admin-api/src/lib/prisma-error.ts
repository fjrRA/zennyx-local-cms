// src/lib/prisma-error.ts

import {
  Prisma,
} from "../../generated/prisma/client";

export function isPrismaKnownRequestError(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof
    Prisma.PrismaClientKnownRequestError
  );
}

export function isPrismaUniqueConstraintError(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    isPrismaKnownRequestError(error) &&
    error.code === "P2002"
  );
}