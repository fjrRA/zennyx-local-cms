// src/features/export/components/ExportPanelFeedback.tsx
import type {
  WebsiteExportState,
} from "../export.types";

import ExportConfirmation from "./ExportConfirmation";
import ExportResult from "./ExportResult";

type ExportPanelFeedbackProps = {
  state: WebsiteExportState;
  isVisible: boolean;
  isConfirmBlocked: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

export default function ExportPanelFeedback({
  state,
  isVisible,
  isConfirmBlocked,
  onCancel,
  onConfirm,
  onClose,
}: ExportPanelFeedbackProps) {
  if (!isVisible) {
    return null;
  }

  if (
    state.status === "idle" ||
    state.status === "exporting"
  ) {
    return (
      <ExportConfirmation
        isExporting={
          state.status === "exporting"
        }
        isBlocked={isConfirmBlocked}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
  }

  return (
    <ExportResult
      state={state}
      onClose={onClose}
    />
  );
}