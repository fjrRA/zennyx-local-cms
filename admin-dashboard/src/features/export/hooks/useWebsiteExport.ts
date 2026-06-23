// src/features/export/hooks/useWebsiteExport.ts
import {
  useRef,
  useState,
} from "react";

import {
  ApiError,
  getApiErrorMessage,
} from "../../../lib/api";

import { exportWebsite } from "../api/export.service";

import type {
  WebsiteExportState,
} from "../export.types";

const initialState: WebsiteExportState = {
  status: "idle",
};

export function useWebsiteExport() {
  const [state, setState] =
    useState<WebsiteExportState>(initialState);

  const requestInProgressRef = useRef(false);

  async function startExport() {
    if (requestInProgressRef.current) {
      return;
    }

    requestInProgressRef.current = true;

    setState({
      status: "exporting",
    });

    try {
      const result = await exportWebsite();

      setState({
        status: "success",
        result,
      });
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.status === 409
      ) {
        setState({
          status: "error",
          kind: "already-running",
          message: error.message,
          statusCode: error.status,
        });

        return;
      }

      setState({
        status: "error",
        kind: "request-failed",
        message: getApiErrorMessage(error),
        statusCode:
          error instanceof ApiError
            ? error.status
            : null,
      });
    } finally {
      requestInProgressRef.current = false;
    }
  }

  function resetExport() {
    if (requestInProgressRef.current) {
      return;
    }

    setState(initialState);
  }

  return {
    state,
    startExport,
    resetExport,
    isExporting: state.status === "exporting",
  };
}