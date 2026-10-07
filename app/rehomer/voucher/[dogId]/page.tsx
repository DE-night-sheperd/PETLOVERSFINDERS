import Link from "next/link";

export default function VoucherPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Vet voucher</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Luna - Discount voucher</h1>

        <div className="mt-8 rounded-[1.5rem] border border-dashed border-brand-200 bg-brand-50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-slate-600">Voucher code</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">PLF-LUNA-2026</div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
              <div className="h-28 w-28 rounded-xl bg-slate-900 text-center text-xs text-white flex items-center justify-center">
                QR
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span>Clinic discount</span>
            <span className="font-semibold text-slate-900">15% off vet services</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>Validity</span>
            <span className="font-semibold text-slate-900">7 days</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span>Presented to</span>
            <span className="font-semibold text-slate-900">PLF partner clinic</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Print voucher
          </button>
          <Link href="/rehomer/upload-clearance/dog-1" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Upload clearance
          </Link>
        </div>
      </div>
    </div>
  );
}
