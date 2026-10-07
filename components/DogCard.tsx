import Link from "next/link";
import { Heart, MapPin, ShieldCheck } from "lucide-react";
import type { DogListing } from "@/lib/types";

export function DogCard({ dog }: { dog: DogListing }) {
  return (
    <Link href={`/dogs/${dog.id}`} className="group block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative">
        <img src={dog.primary_image} alt={dog.name} className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm">
          <Heart className="h-4 w-4" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{dog.name}</h3>
            <p className="text-sm text-slate-500">{dog.breed}</p>
          </div>
          <div className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">{dog.gender}</div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>{dog.age_months} months</span>
          <span>{dog.size}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-brand-700" />
          {dog.location}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Adoption fee</div>
            <div className="mt-1 text-xl font-bold text-slate-900">R {dog.listing_price_zar.toLocaleString("en-ZA")}</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            PLF reviewed
          </div>
        </div>
      </div>
    </Link>
  );
}
