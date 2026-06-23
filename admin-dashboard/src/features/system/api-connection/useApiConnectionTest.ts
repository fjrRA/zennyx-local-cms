// src/features/system/api-connection/useApiConnectionTest.ts
import { useState } from "react";

import {
  apiClient,
  getApiErrorMessage,
} from "../../../lib/api";

import type {
  ApiConnectionResult,
  HealthResponse,
} from "./api-connection.types";

const initialResult: ApiConnectionResult = {
  status: "idle",
};

export function useApiConnectionTest() {
  const [result, setResult] =
    useState<ApiConnectionResult>(initialResult);

  async function testConnection() {
    setResult({
      status: "loading",
    });

    try {
      const data =
        await apiClient.get<HealthResponse>(
          "/api/health",
        );

      setResult({
        status: "success",
        data,
      });
    } catch (error) {
      setResult({
        status: "error",
        message: getApiErrorMessage(error),
      });
    }
  }

  return {
    result,
    testConnection,
  };
}