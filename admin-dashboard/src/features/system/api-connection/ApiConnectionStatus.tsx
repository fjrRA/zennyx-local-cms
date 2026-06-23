// src/features/system/api-connection/ApiConnectionStatus.tsx
import {
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

import type {
  ApiConnectionResult,
} from "./api-connection.types";

type ApiConnectionStatusProps = {
  result: ApiConnectionResult;
};

function formatResponse(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }

  return JSON.stringify(data, null, 2) ??
    String(data);
}

export default function ApiConnectionStatus({
  result,
}: ApiConnectionStatusProps) {
  switch (result.status) {
    case "idle":
      return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-sm text-zinc-500">
            Koneksi belum diuji.
          </p>
        </div>
      );

    case "loading":
      return (
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
          <p className="text-sm text-orange-300">
            Sedang menghubungi backend...
          </p>
        </div>
      );

    case "success":
      return (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2
              size={18}
              aria-hidden="true"
            />

            <p className="text-sm font-semibold">
              Backend berhasil terhubung
            </p>
          </div>

          <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs leading-6 text-zinc-300">
            {formatResponse(result.data)}
          </pre>
        </div>
      );

    case "error":
      return (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start gap-2 text-red-400">
            <CircleAlert
              size={18}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-semibold">
                Backend tidak dapat dihubungi
              </p>

              <p className="mt-2 text-sm leading-6 text-red-300/80">
                {result.message}
              </p>
            </div>
          </div>
        </div>
      );
  }
}