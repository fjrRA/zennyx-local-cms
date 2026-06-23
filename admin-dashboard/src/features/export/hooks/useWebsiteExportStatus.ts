// src/features/export/hooks/useWebsiteExportStatus.ts
import {
  useEffect,
  useState,
} from "react";

import { getApiErrorMessage } from "../../../lib/api";

import {
  getWebsiteExportStatus,
} from "../api/export.service";

import type {
  WebsiteExportStatusState,
} from "../export.types";

const STATUS_POLL_INTERVAL_MS = 2_000;

const initialState: WebsiteExportStatusState = {
  status: "loading",
};

export function useWebsiteExportStatus() {
  const [state, setState] =
    useState<WebsiteExportStatusState>(initialState);

  const [requestVersion, setRequestVersion] =
    useState(0);

  useEffect(() => {
    let ignoreResult = false;
    let currentController:
      AbortController | null = null;

    function checkStatus() {
      currentController?.abort();

      const controller =
        new AbortController();

      currentController = controller;

      void getWebsiteExportStatus(
        controller.signal,
      )
        .then((data) => {
          if (
            ignoreResult ||
            controller.signal.aborted
          ) {
            return;
          }

          setState({
            status: "success",
            data,
          });
        })
        .catch((error: unknown) => {
          if (
            ignoreResult ||
            controller.signal.aborted
          ) {
            return;
          }

          setState({
            status: "error",
            message:
              getApiErrorMessage(error),
          });
        });
    }

    const initialTimerId =
      window.setTimeout(
        checkStatus,
        0,
      );

    const intervalId =
      window.setInterval(
        checkStatus,
        STATUS_POLL_INTERVAL_MS,
      );

    return () => {
      ignoreResult = true;

      window.clearTimeout(initialTimerId);
      window.clearInterval(intervalId);

      currentController?.abort();
    };
  }, [requestVersion]);

  function refreshStatus() {
    setState({
      status: "loading",
    });

    setRequestVersion(
      (currentVersion) =>
        currentVersion + 1,
    );
  }

  return {
    state,
    refreshStatus,

    isStatusReady:
      state.status === "success",

    isBackendExportRunning:
      state.status === "success" &&
      state.data.isRunning,
  };
}