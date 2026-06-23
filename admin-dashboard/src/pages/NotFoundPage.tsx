// src/pages/NotFoundPage.tsx
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <section className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-4 leading-7 text-zinc-400">
          Halaman yang kamu buka tidak tersedia di dalam Zennyx Local CMS.
        </p>

        <Link
          to="/dashboard"
          className="mt-7 inline-flex rounded-lg bg-orange-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-orange-400"
        >
          Kembali ke Dashboard
        </Link>
      </section>
    </main>
  );
}