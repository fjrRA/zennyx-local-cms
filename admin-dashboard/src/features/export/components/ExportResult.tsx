// src/features/export/components/ExportResult.tsx
import type {
  WebsiteExportCompletedState,
} from "../export.types";

import ExportErrorResult from "./ExportErrorResult";
import ExportSuccessResult from "./ExportSuccessResult";

type ExportResultProps = {
  state: WebsiteExportCompletedState;
  onClose: () => void;
};

export default function ExportResult({
  state,
  onClose,
}: ExportResultProps) {
  if (state.status === "error") {
    return (
      <ExportErrorResult
        state={state}
        onClose={onClose}
      />
    );
  }

  return (
    <ExportSuccessResult
      state={state}
      onClose={onClose}
    />
  );
}