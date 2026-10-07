"use client";

import { FormEvent, useState } from "react";
import { Dog } from "lucide-react";
import { useParams } from "next/navigation";
import { dogListings } from "@/lib/mock-data";

export default function ApplyPage() {
  const params = useParams();
  const dog = dogListings.find((item) => item.id === params.dogId);
  const [submitted, setSubmitted] = useState(false);

  if (!dog) {
    return <div className="mx-auto max-w-3xl px-4 py-16">Dog not found.</div>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
            <Dog className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Adoption application</p>
            <h1 className="text-2xl font-bold text-slate-900">Apply for {dog.name}</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Housing type</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:border-brand-400 focus:outline-none">
              <option>House with garden</option>
              <option>Apartment</option>
              <option>Townhouse</option>
              <option>Farm</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Is your yard fenced?</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2"><input type="radio" name="yard" defaultChecked /> Yes</label>
              <label className="flex items-center gap-2"><input type="radio" name="yard" /> No</label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Do you have other pets?</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2"><input type="radio" name="pets" defaultChecked /> Yes</label>
              <label className="flex items-center gap-2"><input type="radio" name="pets" /> No</label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Pet experience notes</label>
            <textarea
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:border-brand-400 focus:outline-none"
              placeholder="Tell us about your pet care experience, routine, and lifestyle."
            />
          </div>
        </div>

        <div className="space-y-5 rounded-2xl bg-slate-50 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-brand-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-brand-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
            <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:border-brand-400 focus:outline-none" />
          </div>

          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4">
            <div className="text-sm text-slate-500">Desired adoption price</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">R {dog.listing_price_zar.toLocaleString("en-ZA")}</div>
            <p className="mt-2 text-xs text-slate-600">This value is reviewed by PLF during approval.</p>
          </div>

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Submit application
          </button>

          {submitted && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Application submitted successfully. An admin will review it shortly.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
