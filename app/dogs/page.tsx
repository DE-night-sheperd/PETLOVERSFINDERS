"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Dog,
  MapPin,
  Tag,
  Calendar,
  Grid,
  List,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { DogCard } from "@/components/DogCard";
import { usePLFStore } from "@/lib/store";
import type { DogListing } from "@/lib/types";

function DogsCatalogContent() {
  const searchParams = useSearchParams();
  const { dogs } = usePLFStore();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSize, setSelectedSize] = useState(searchParams.get("size") || "All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
    const loc = searchParams.get("location");
    if (loc) setSelectedLocation(loc);
    const sz = searchParams.get("size");
    if (sz) setSelectedSize(sz);
  }, [searchParams]);

  // Derive unique breeds and locations from live data
  const availableBreeds = useMemo(() => {
    const breeds = new Set<string>();
    dogs.forEach((d) => breeds.add(d.breed));
    return ["All", ...Array.from(breeds)];
  }, [dogs]);

  const availableLocations = useMemo(() => {
    const locations = ["All", "Johannesburg", "Cape Town", "Pretoria", "Durban", "Bloemfontein", "Kimberley"];
    return locations;
  }, []);

  // Filter and sort dogs
  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dog.name.toLowerCase().includes(query);
        const matchesBreed = dog.breed.toLowerCase().includes(query);
        const matchesLocation = dog.location.toLowerCase().includes(query);
        const matchesDesc = dog.description.toLowerCase().includes(query);
        const matchesTags = dog.personality_tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBreed && !matchesLocation && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Breed filter
      if (selectedBreed !== "All" && dog.breed !== selectedBreed) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All" && !dog.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Gender filter
      if (selectedGender !== "All" && dog.gender !== selectedGender) {
        return false;
      }

      // Size filter
      if (selectedSize !== "All" && dog.size !== selectedSize) {
        return false;
      }

      // Age filter
      if (selectedAge === "puppy" && dog.age_months >= 12) return false;
      if (selectedAge === "young" && (dog.age_months < 12 || dog.age_months > 24)) return false;
      if (selectedAge === "adult" && dog.age_months <= 24) return false;

      // Price filter
      if (dog.listing_price_zar > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.listing_price_zar - b.listing_price_zar;
      if (sortBy === "price_desc") return b.listing_price_zar - a.listing_price_zar;
      if (sortBy === "age_youngest") return a.age_months - b.age_months;
      if (sortBy === "popular") return b.likes - a.likes;
      // Default: featured/newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [
    dogs,
    searchQuery,
    selectedBreed,
    selectedLocation,
    selectedGender,
    selectedSize,
    selectedAge,
    maxPrice,
    sortBy,
  ]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (selectedBreed !== "All" ? 1 : 0) +
    (selectedLocation !== "All" ? 1 : 0) +
    (selectedGender !== "All" ? 1 : 0) +
    (selectedSize !== "All" ? 1 : 0) +
    (selectedAge !== "All" ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedBreed("All");
    setSelectedLocation("All");
    setSelectedGender("All");
    setSelectedSize("All");
    setSelectedAge("All");
    setMaxPrice(3000);
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <Dog className="h-4 w-4" />
            <span>South Africa Companion Catalog</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Browse Available Dogs
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Each listing is backed by PLF central escrow protection and SAVC veterinary vouchers.
          </p>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/rehomer/new-dog"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800"
          >
            + List a Dog
          </Link>

          <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-1.5 transition ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-700"}`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-1.5 transition ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-700"}`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Dog Cards */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Filter className="h-4 w-4 text-brand-600" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-brand-600"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Luna, Beagle, Gentle"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Region / Location */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Region
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All South Africa" : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Breed
              </label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {availableBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            {/* Dog Size */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Size
              </label>
              <div className="grid grid-cols-4 gap-1">
                {["All", "Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                      selectedSize === size
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-1">
                {["All", "Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setSelectedGender(gender)}
                    className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                      selectedGender === gender
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Age
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">Any Age</option>
                <option value="puppy">Puppy (&lt; 12 months)</option>
                <option value="young">Young (12 - 24 months)</option>
                <option value="adult">Adult (2+ years)</option>
              </select>
            </div>

            {/* Max Adoption Fee Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Max Fee</span>
                <span className="text-brand-600 font-extrabold normal-case">
                  R {maxPrice.toLocaleString("en-ZA")}
                </span>
              </div>
              <input
                type="range"
                min="900"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>R 900</span>
                <span>R 3,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Catalog Body */}
        <main className="lg:col-span-9">
          {/* Top Control Bar: Total Count + Active Filters + Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-brand-600" />
                <span>Filters ({activeFilterCount})</span>
              </button>

              <span className="text-xs font-bold text-slate-700">
                Showing <span className="text-brand-600">{filteredDogs.length}</span> dogs
              </span>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="featured">Featured / Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="age_youngest">Youngest Age</option>
                <option value="popular">Most Loved</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Active:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedLocation !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Location: {selectedLocation}
                  <button onClick={() => setSelectedLocation("All")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedBreed !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Breed: {selectedBreed}
                  <button onClick={() => setSelectedBreed("All")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedSize !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize("All")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedGender !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender("All")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedAge !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Age: {selectedAge}
                  <button onClick={() => setSelectedAge("All")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {maxPrice < 3000 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Under R {maxPrice.toLocaleString("en-ZA")}
                  <button onClick={() => setMaxPrice(3000)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Dog Listings Results */}
          {filteredDogs.length > 0 ? (
            <div
              className={`mt-6 grid gap-6 ${
                viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-3xl">
                🐕🔍
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">No companions match your filters</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                Try widening your price range, clearing specific breed filters, or checking all
                regions across South Africa.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/40 backdrop-blur-xs lg:hidden">
          <div className="ml-auto w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="font-bold text-slate-900 text-base">Filter Dogs</div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  >
                    {availableLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Breed
                  </label>
                  <select
                    value={selectedBreed}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  >
                    {availableBreeds.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Size
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {["All", "Small", "Medium", "Large"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`rounded-lg py-1.5 text-xs font-semibold ${
                          selectedSize === s ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {["All", "Male", "Female"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedGender(g)}
                        className={`rounded-lg py-1.5 text-xs font-semibold ${
                          selectedGender === g ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-xs"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DogsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="animate-spin text-3xl mb-2">🐕</div>
          <p className="text-slate-500 text-sm">Loading available companions...</p>
        </div>
      }
    >
      <DogsCatalogContent />
    </Suspense>
  );
}
