export default function UploadClearancePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Vaccination clearance</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Upload documentation</h1>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
          Drop vaccination card or PDF here
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">Vet notes</label>
          <textarea rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="Record vaccination date, treatment notes, and readiness for handover." />
        </div>

        <button className="mt-8 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
          Submit for admin review
        </button>
      </div>
    </div>
  );
}
