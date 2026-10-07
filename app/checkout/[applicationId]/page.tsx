"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useParams();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Checkout</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Confirm your escrow payment</h1>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Application reference</span>
            <span className="font-medium text-slate-900">{String(params.applicationId ?? "PLF-2038")}</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>Adoption fee</span>
            <span className="font-medium text-slate-900">R 1,450.00</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>R 1,450.00</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Pay with PayFast
          </button>
          <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Pay with Ozow
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Escrow is held securely by PLF until the dog meets the vet clearance and handover requirements.
        </div>

        <Link href="/dogs" className="mt-8 inline-flex text-sm font-medium text-slate-700 hover:text-slate-900">
          ← Return to listings
        </Link>
      </div>
    </div>
  );
}
