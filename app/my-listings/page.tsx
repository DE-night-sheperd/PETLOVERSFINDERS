"use client";

import Link from "next/link";
import { PlusCircle, ArrowLeft, Dog, Sparkles, Stethoscope, FileCheck, ArrowRight } from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function MyListingsPage() {
  const { dogs, currentUser } = usePLFStore();

  const myListings = dogs.filter(
    (d) => d.rehomer_email === currentUser.email || currentUser.role === "rehomer" || currentUser.role === "admin"
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <Dog className="h-4 w-4" />
            <span>Rehomer Portfolio</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">My Dog Listings</h1>
          <p className="mt-1 text-sm text-slate-600">
            Monitor and manage your active companions, vet discount vouchers, and clearance statuses.
          </p>
        </div>

        <Link
          href="/rehomer/new-dog"
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>List a New Dog</span>
        </Link>
      </div>

      {/* Grid of Listings */}
      <div className="mt-8">
        {myListings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myListings.map((dog) => (
              <div
                key={dog.id}
                className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src={dog.primary_image}
                      alt={dog.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                        {dog.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{dog.name}</h3>
                        <p className="text-xs text-slate-500">{dog.breed}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Adoption Fee
                        </span>
                        <span className="text-sm font-extrabold text-brand-700">
                          R {dog.listing_price_zar.toLocaleString("en-ZA")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                      <span>{dog.location}</span>
                      <span>{dog.age_months} months</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex flex-wrap gap-2">
                  <Link
                    href={`/dogs/${dog.id}`}
                    className="flex-1 text-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    View Listing
                  </Link>
                  <Link
                    href={`/rehomer/voucher/${dog.id}`}
                    className="flex-1 text-center rounded-xl border border-brand-200 bg-brand-50 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100"
                  >
                    15% Vet Voucher
                  </Link>
                  <Link
                    href={`/rehomer/upload-clearance/${dog.id}`}
                    className="w-full text-center rounded-xl bg-slate-900 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
                  >
                    Upload SAVC Clearance Certificate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <Dog className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Listings Yet</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Ready to find a loving home for a dog? List them with PLF escrow and veterinary safety.
            </p>
            <Link
              href="/rehomer/new-dog"
              className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
            >
              List Your Dog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
