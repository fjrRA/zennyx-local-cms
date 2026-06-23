// src/features/system/api-connection/api-connection.types.ts
export type HealthResponse = {
  status: string;
  app: string;
};

export type ApiConnectionResult =
  | {
    status: "idle";
  }
  | {
    status: "loading";
  }
  | {
    status: "success";
    data: HealthResponse;
  }
  | {
    status: "error";
    message: string;
  };