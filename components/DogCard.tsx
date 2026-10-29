"use client";

import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import type { DogListing } from "@/lib/types";
import { usePLFStore } from "@/lib/store";

export function DogCard({ dog }: { dog: DogListing }) {
  const { isFavorite, toggleFavorite } = usePLFStore();
  const favorite = isFavorite(dog.id);

  const formatAge = (months: number) => {
    if (months < 12) return `${months} mos`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years}y ${rem}m` : `${years} yrs`;
  };

  const getStatusBadge = (status: DogListing["status"]) => {
    switch (status) {
      case "active":
        return { label: "Available", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "under_adoption":
        return { label: "Under Adoption", bg: "bg-blue-50 text-blue-700 border-blue-200" };
      case "vet_cleared":
        return { label: "Vet Cleared", bg: "bg-purple-50 text-purple-700 border-purple-200" };
      case "adopted":
        return { label: "Adopted 🎉", bg: "bg-slate-100 text-slate-700 border-slate-200" };
      case "pending_review":
        return { label: "Pending Verification", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      default:
        return { label: status, bg: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const statusBadge = getStatusBadge(dog.status);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      {/* Top Image & Favorite Button */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Link href={`/dogs/${dog.id}`} className="block h-full w-full">
          <img
            src={dog.primary_image}
            alt={dog.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(dog.id);
          }}
          className={`absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all ${
            favorite
              ? "bg-white text-rose-500 shadow-md ring-2 ring-rose-300"
              : "bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500 shadow-xs"
          }`}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4.5 w-4.5 ${favorite ? "fill-rose-500" : ""}`} />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md shadow-xs ${statusBadge.bg}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusBadge.label}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="rounded-xl bg-slate-900/85 backdrop-blur-md px-3 py-1 text-white shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-300 block leading-tight">
              Adoption Fee
            </span>
            <span className="text-sm font-extrabold tracking-tight">
              R {dog.listing_price_zar.toLocaleString("en-ZA")}
            </span>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/dogs/${dog.id}`}>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 transition hover:text-brand-600">
                {dog.name}
              </h3>
            </Link>
            <p className="text-xs font-medium text-slate-500 line-clamp-1">{dog.breed}</p>
          </div>

          <div className="flex items-center gap-1">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
              {dog.gender}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
              {dog.size}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {dog.personality_tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-50/80 px-2 py-0.5 text-[10px] font-medium text-amber-900 border border-amber-200/50"
            >
              <Sparkles className="h-2.5 w-2.5 text-amber-600" />
              {tag}
            </span>
          ))}
        </div>

        {/* Location & Quick Meta */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
            <span className="truncate">{dog.location}</span>
          </div>
          <span className="font-semibold text-slate-700">{formatAge(dog.age_months)}</span>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center gap-2 pt-1">
          <Link
            href={`/dogs/${dog.id}`}
            className="flex-1 text-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            View Details
          </Link>
          <Link
            href={`/apply/${dog.id}`}
            className="flex items-center justify-center gap-1 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-brand-700"
          >
            <span>Apply</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
