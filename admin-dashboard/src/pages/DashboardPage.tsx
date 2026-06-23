// src/pages/DashboardPage.tsx
import DashboardSummary from "../features/dashboard/components/DashboardSummary";
import ExportToWebsitePanel from "../features/export/components/ExportToWebsitePanel";

export default function DashboardPage() {
  return (
    <section>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:text-sm">
          Zennyx Local CMS
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
          Halaman utama untuk melihat ringkasan
          Zennyx Local CMS dan menjalankan proses
          export ke website.
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <DashboardSummary />
      </div>

      <div className="mt-5 sm:mt-6">
        <ExportToWebsitePanel />
      </div>
    </section>
  );
}