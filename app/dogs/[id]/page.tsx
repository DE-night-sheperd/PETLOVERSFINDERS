"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Tag,
  Heart,
  Share2,
  CheckCircle2,
  Stethoscope,
  Lock,
  Sparkles,
  Info,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";
import { DogCard } from "@/components/DogCard";

export default function DogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dogId = String(params.id);

  const { dogs, isFavorite, toggleFavorite, addToast } = usePLFStore();
  const dog = dogs.find((item) => item.id === dogId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!dog) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-4xl mb-3">🐕🐾</div>
        <h2 className="text-2xl font-bold text-slate-900">Dog Listing Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          This dog may have found their forever home or the listing was moved.
        </p>
        <Link
          href="/dogs"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Available Dogs
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(dog.id);
  const allImages = [dog.primary_image, ...(dog.gallery || [])];
  const activeImage = allImages[activeImageIndex] || dog.primary_image;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      addToast("success", "Link Copied! 📋", "Dog profile link copied to your clipboard.");
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedDogs = dogs
    .filter((d) => d.id !== dog.id && (d.size === dog.size || d.breed === dog.breed))
    .slice(0, 3);

  const formatAge = (months: number) => {
    if (months < 12) return `${months} months (Puppy)`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years} yr ${rem} mos` : `${years} years old`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Share Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dogs"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all dogs</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>Share</span>
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(dog.id)}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition ${
              favorite
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
            <span>{favorite ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery + Action Sidebar */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Photo Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-slate-900 shadow-soft">
            <img
              src={activeImage}
              alt={dog.name}
              className="h-full w-full object-cover transition-all duration-300"
            />

            {/* Status overlay */}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-xs">
                {dog.status === "active" ? "Available for Adoption" : dog.status}
              </span>
            </div>

            {/* Photo counter */}
            <div className="absolute bottom-4 right-4 rounded-xl bg-slate-900/75 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Thumbnails row */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square h-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-600 ring-2 ring-brand-300"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Dog Personality & Backstory */}
          <div className="mt-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">About {dog.name}</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                {dog.description}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900">Rehoming Story</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{dog.story}</p>
            </div>

            {/* Personality Tags */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 mb-3">Temperament & Compatibility</h3>
              <div className="flex flex-wrap gap-2">
                {dog.personality_tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200/60"
                  >
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Health & Medical Status Card */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-brand-600" />
                <span>SAVC Health & Veterinary Records</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Vaccinated", val: dog.health_status.vaccinated },
                  { label: "Dewormed", val: dog.health_status.dewormed },
                  { label: "Microchipped", val: dog.health_status.microchipped },
                  { label: "Sterilized", val: dog.health_status.sterilized },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl border p-3 text-center ${
                      item.val
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex justify-center mb-1">
                      {item.val ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Info className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.val ? "Verified" : "Pending"}</div>
                  </div>
                ))}
              </div>

              {dog.health_status.vet_notes && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/70 text-xs text-slate-600">
                  <span className="font-bold text-slate-800">Veterinarian Notes: </span>
                  {dog.health_status.vet_notes}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Adoption CTA Box */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Adoption Profile
                </span>
                <h1 className="mt-1 text-3xl font-extrabold text-slate-900">{dog.name}</h1>
                <p className="text-sm font-medium text-slate-500">{dog.breed}</p>
              </div>

              <div className="flex flex-col items-end">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  PLF Verified
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Adoption Fee (ZAR)
                  </span>
                  <span className="text-3xl font-extrabold text-amber-400">
                    R {dog.listing_price_zar.toLocaleString("en-ZA")}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-800 p-2 text-slate-300">
                  <Lock className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-300 border-t border-slate-800 pt-2">
                Held in PLF Central Escrow until SAVC Vet clearance & safe handover are confirmed.
              </p>
            </div>

            {/* Quick Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Age</span>
                <span className="font-bold text-slate-900">{formatAge(dog.age_months)}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Gender</span>
                <span className="font-bold text-slate-900">{dog.gender}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Size</span>
                <span className="font-bold text-slate-900">{dog.size}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Color</span>
                <span className="font-bold text-slate-900">{dog.color}</span>
              </div>
            </div>

            {/* Location Pill */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 p-3 text-xs text-brand-900 border border-brand-100">
              <MapPin className="h-4 w-4 text-brand-700 shrink-0" />
              <span className="font-medium">Located in: <strong>{dog.location}</strong></span>
            </div>

            {/* Primary Action Button */}
            <div className="mt-6 space-y-3">
              <Link
                href={`/apply/${dog.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-brand-700"
              >
                <span>Apply to Adopt {dog.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  toggleFavorite(dog.id);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Heart className={`h-4 w-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{favorite ? "Remove from Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>

            {/* Middleman Protection Guarantee Callout */}
            <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4 text-xs text-brand-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-brand-900">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                <span>The PLF Middleman Safe Guarantee</span>
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
                <li>Zero direct cash handovers to strangers</li>
                <li>15% discount vet check voucher provided</li>
                <li>Full refund if medical condition fails standards</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Dogs */}
      {relatedDogs.length > 0 && (
        <div className="mt-16 border-t border-slate-200/80 pt-12">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Similar Companions You May Love</h3>
            <Link href="/dogs" className="text-xs font-bold text-brand-600 hover:text-brand-700">
              Browse all dogs →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedDogs.map((d) => (
              <DogCard key={d.id} dog={d} />
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Share {dog.name}'s Profile</h3>
            <p className="mt-1 text-xs text-slate-500">
              Help {dog.name} find a loving home by sharing their profile with friends and pet
              communities.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <input
                type="text"
                readOnly
                value={typeof window !== "undefined" ? window.location.href : ""}
                className="flex-1 bg-transparent text-xs text-slate-600 outline-none px-2"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShareOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
