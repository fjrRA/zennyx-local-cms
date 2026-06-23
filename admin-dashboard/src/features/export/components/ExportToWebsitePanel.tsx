// src/features/export/components/ExportToWebsitePanel.tsx
import { useState } from "react";

import {
  useWebsiteExport,
} from "../hooks/useWebsiteExport";

import {
  useWebsiteExportStatus,
} from "../hooks/useWebsiteExportStatus";

import ExportBackendStatus from "./ExportBackendStatus";
import ExportPanelFeedback from "./ExportPanelFeedback";
import ExportPanelHeader from "./ExportPanelHeader";
import ExportProcessOverview from "./ExportProcessOverview";

export default function ExportToWebsitePanel() {
  const [
    isConfirmationVisible,
    setIsConfirmationVisible,
  ] = useState(false);

  const {
    state,
    startExport,
    resetExport,
  } = useWebsiteExport();

  const {
    state: backendStatusState,
    refreshStatus,
    isStatusReady,
    isBackendExportRunning,
  } = useWebsiteExportStatus();

  const isExporting =
    state.status === "exporting";

  const isConfirmBlocked =
    !isStatusReady ||
    isBackendExportRunning;

  const isMainButtonDisabled =
    isConfirmationVisible ||
    isExporting ||
    isConfirmBlocked;

  const isHeaderLoading =
    isExporting ||
    (
      state.status === "idle" &&
      backendStatusState.status === "loading"
    );

  function getMainButtonLabel() {
    if (isExporting) {
      return "Export sedang berjalan";
    }

    if (state.status === "success") {
      return "Export selesai";
    }

    if (state.status === "error") {
      return "Export gagal";
    }

    if (
      backendStatusState.status === "loading"
    ) {
      return "Memeriksa status";
    }

    if (
      backendStatusState.status === "error"
    ) {
      return "Status tidak tersedia";
    }

    if (isBackendExportRunning) {
      return "Export aktif di backend";
    }

    if (isConfirmationVisible) {
      return "Menunggu Konfirmasi";
    }

    return "Export to Website";
  }

  function openConfirmation() {
    if (isMainButtonDisabled) {
      return;
    }

    setIsConfirmationVisible(true);
  }

  function closeConfirmation() {
    if (isExporting) {
      return;
    }

    resetExport();
    setIsConfirmationVisible(false);
  }

  async function handleConfirmExport() {
    await startExport();

    refreshStatus();
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900  shadow-xl p-4 sm:p-6">
      <ExportPanelHeader
        buttonLabel={getMainButtonLabel()}
        isDisabled={isMainButtonDisabled}
        isLoading={isHeaderLoading}
        onOpenConfirmation={
          openConfirmation
        }
      />

      <div className="mt-5">
        <ExportBackendStatus
          state={backendStatusState}
          onRefresh={refreshStatus}
        />
      </div>

      <ExportProcessOverview />

      <ExportPanelFeedback
        state={state}
        isVisible={isConfirmationVisible}
        isConfirmBlocked={
          isConfirmBlocked
        }
        onCancel={closeConfirmation}
        onConfirm={handleConfirmExport}
        onClose={closeConfirmation}
      />
    </section>
  );
}