import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, ShieldCheck, Tag } from "lucide-react";
import { dogListings } from "@/lib/mock-data";
import { DogCard } from "@/components/DogCard";

export default function DogsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Available dogs</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Find your perfect match</h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          {[
            "All breeds",
            "Age",
            "Color",
            "Gender",
            "Location",
          ].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Breed</label>
          <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <option>Any breed</option>
            <option>Labrador</option>
            <option>Mixed breed</option>
            <option>Beagle</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Age</label>
          <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <option>Any age</option>
            <option>Under 12 months</option>
            <option>12-24 months</option>
            <option>2+ years</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Gender</label>
          <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
          <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <option>All regions</option>
            <option>Johannesburg</option>
            <option>Cape Town</option>
            <option>Pretoria</option>
            <option>Kimberley</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dogListings.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-brand-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              <ShieldCheck className="h-4 w-4" />
              PLF checks every adoption
            </div>
            <h3 className="mt-2 text-2xl font-bold">Clear, transparent rehoming process</h3>
          </div>
          <Link
            href="/apply/dog-1"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Start adoption process
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
