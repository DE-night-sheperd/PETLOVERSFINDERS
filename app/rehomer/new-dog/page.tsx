import Link from "next/link";

export default function NewDogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Rehomer portal</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">List a new dog</h1>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Dog name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="e.g. Luna" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Breed</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="e.g. Mixed breed" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Age in months</label>
            <input type="number" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="12" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Listing price</label>
            <input type="number" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="1500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Color</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="Brown" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Size</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
          <textarea rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="Describe the dog, temperament, training, and daily routine." />
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
          Photo upload area for dog profile images
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Save as draft
          </button>
          <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Submit for review
          </button>
        </div>
      </div>
    </div>
  );
}
