// src/features/export/export.types.ts
export type WebsiteExportStatus = {
  isRunning: boolean;
};

export type WebsiteExportCounts = {
  site: number;
  games: number;
  team: number;
  socials: number;
  devlogs: number;
};

export type WebsiteExportResult = {
  message: string;
  destination: string;
  counts: WebsiteExportCounts;
};

export type WebsiteExportErrorResponse = {
  message: string;
};

export type WebsiteExportErrorKind =
  | "already-running"
  | "request-failed";

export type WebsiteExportState =
  | {
    status: "idle";
  }
  | {
    status: "exporting";
  }
  | {
    status: "success";
    result: WebsiteExportResult;
  }
  | {
    status: "error";
    kind: WebsiteExportErrorKind;
    message: string;
    statusCode: number | null;
  };

export type WebsiteExportSuccessState = Extract<
  WebsiteExportState,
  {
    status: "success";
  }
>;

export type WebsiteExportErrorState = Extract<
  WebsiteExportState,
  {
    status: "error";
  }
>;

export type WebsiteExportCompletedState =
  | WebsiteExportSuccessState
  | WebsiteExportErrorState;

export type WebsiteExportStatusState =
  | {
    status: "loading";
  }
  | {
    status: "success";
    data: WebsiteExportStatus;
  }
  | {
    status: "error";
    message: string;
  };