import Link from "next/link";
import { CheckCircle2, CircleDollarSign, FileText, ShieldCheck, Users } from "lucide-react";

const boardItems = [
  { title: "Pending review", count: 6, tone: "bg-amber-100 text-amber-800" },
  { title: "Approved", count: 12, tone: "bg-blue-100 text-blue-800" },
  { title: "Payment verified", count: 8, tone: "bg-violet-100 text-violet-800" },
  { title: "Vet cleared", count: 3, tone: "bg-emerald-100 text-emerald-800" },
  { title: "Handover complete", count: 2, tone: "bg-slate-900 text-white" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">PLF admin</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Operations dashboard</h1>
        </div>
        <Link href="/admin" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Refresh queue
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {boardItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.tone}`}>{item.title}</div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{item.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <FileText className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-bold">Listing review queue</h2>
          </div>

          <div className="mt-6 space-y-4">
            {[
              { name: "Juno", status: "pending_review", price: "R 1,400" },
              { name: "Milo", status: "approved", price: "R 1,250" },
              { name: "Lucy", status: "under_adoption", price: "R 1,990" },
            ].map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-semibold text-slate-900">{entry.name}</div>
                  <div className="text-sm text-slate-500">{entry.status}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">{entry.price}</div>
                  <button className="mt-2 text-xs font-semibold text-brand-700">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldCheck className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-bold">Escrow and release actions</h2>
          </div>

          <div className="mt-6 space-y-4">
            {[
              { label: "Release payment to rehomer", value: "R 1,080" },
              { label: "PLF fee retained", value: "R 120" },
              { label: "Handover confirmation", value: "Verified" },
            ].map((action) => (
              <div key={action.label} className="rounded-2xl border border-slate-200 p-4">
                <div className="text-sm text-slate-500">{action.label}</div>
                <div className="mt-2 font-semibold text-slate-900">{action.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
