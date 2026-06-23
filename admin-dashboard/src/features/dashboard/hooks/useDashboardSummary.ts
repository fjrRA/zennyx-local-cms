// src/features/dashboard/hooks/useDashboardSummary.ts
import {
  useEffect,
  useState,
} from "react";

import { getApiErrorMessage } from "../../../lib/api";

import { getDashboardSummary } from "../api/dashboard.service";

import type {
  DashboardSummaryState,
} from "../dashboard.types";

const initialState: DashboardSummaryState = {
  status: "loading",
};

export function useDashboardSummary() {
  const [state, setState] =
    useState<DashboardSummaryState>(initialState);

  const [requestVersion, setRequestVersion] =
    useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let ignoreResult = false;

    void getDashboardSummary(controller.signal)
      .then((data) => {
        if (ignoreResult) {
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
          message: getApiErrorMessage(error),
        });
      });

    return () => {
      ignoreResult = true;
      controller.abort();
    };
  }, [requestVersion]);

  function retry() {
    setState({
      status: "loading",
    });

    setRequestVersion(
      (currentVersion) => currentVersion + 1,
    );
  }

  return {
    state,
    retry,
  };
}