// src/features/system/api-connection/ApiConnectionTest.tsx
import {
  LoaderCircle,
  Server,
} from "lucide-react";

import { API_BASE_URL } from "../../../lib/api";

import ApiConnectionStatus from "./ApiConnectionStatus";
import { useApiConnectionTest } from "./useApiConnectionTest";

export default function ApiConnectionTest() {
  const {
    result,
    testConnection,
  } = useApiConnectionTest();

  const isLoading = result.status === "loading";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-zinc-100">
            Backend Connection
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Uji koneksi frontend menuju endpoint
            health milik admin API.
          </p>

          <p className="mt-3 font-mono text-xs text-zinc-500">
            {API_BASE_URL}/api/health
          </p>
        </div>

        <button
          type="button"
          onClick={testConnection}
          disabled={isLoading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />

              Checking...
            </>
          ) : (
            <>
              <Server
                size={18}
                aria-hidden="true"
              />

              Test API Connection
            </>
          )}
        </button>
      </div>

      <div
        className="mt-5"
        aria-live="polite"
      >
        <ApiConnectionStatus result={result} />
      </div>
    </section>
  );
}