"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Search,
  MapPin,
  CheckCircle2,
  Lock,
  Stethoscope,
  Coins,
  ChevronRight,
  Award,
} from "lucide-react";
import { DogCard } from "@/components/DogCard";
import { usePLFStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const { dogs } = usePLFStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [calcPrice, setCalcPrice] = useState(1500);

  const featuredDogs = dogs.filter((d) => d.status === "active").slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLocation !== "All") params.set("location", selectedLocation);
    if (selectedSize !== "All") params.set("size", selectedSize);
    router.push(`/dogs?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-amber-50/40 pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Background ambient blur circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-200" />
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-amber-200" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-xs backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                <span>South Africa's Trusted Middleman Rehoming Network</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.12]">
                Find a safe, vetted forever home for your <span className="text-brand-600">dog</span>.
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Rehoming without the risks of scammers, stolen pets, or unsafe backyard breeders.
                Every adoption is secured with <strong>PLF Central Escrow</strong> and pre-handover{" "}
                <strong>SAVC Veterinary Clearance</strong>.
              </p>

              {/* Interactive Quick Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-8 rounded-3xl border border-slate-200/90 bg-white p-3 shadow-soft sm:p-4"
              >
                <div className="grid gap-3 sm:grid-cols-12 sm:items-center">
                  <div className="relative sm:col-span-5">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Breed, name or temperament..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border-0 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full rounded-2xl border-0 bg-slate-50 py-3 px-3 text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="All">All Regions</option>
                      <option value="Johannesburg">Johannesburg</option>
                      <option value="Cape Town">Cape Town</option>
                      <option value="Pretoria">Pretoria</option>
                      <option value="Durban">Durban</option>
                      <option value="Bloemfontein">Bloemfontein</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full rounded-2xl border-0 bg-slate-50 py-3 px-3 text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="All">Any Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-brand-600 py-3 px-4 text-sm font-bold text-white shadow-xs transition hover:bg-brand-700"
                    >
                      <span>Search</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">Quick filters:</span>
                  {["Labrador", "Puppies", "Cape Town", "Apartment Friendly"].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => {
                        setSearchQuery(pill);
                        router.push(`/dogs?q=${encodeURIComponent(pill)}`);
                      }}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </form>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/dogs"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-slate-800"
                >
                  Browse All Dogs
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/rehomer/new-dog"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  List a Dog for Rehoming
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[2.5rem] border border-slate-200/90 bg-white p-4 shadow-soft">
                <div className="relative h-[440px] w-full overflow-hidden rounded-[2rem] bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"
                    alt="Happy dog rehomed through PLF"
                    className="h-full w-full object-cover"
                  />
                  {/* Floating Trust Card 1 */}
                  <div className="absolute top-4 left-4 rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-md border border-slate-100 max-w-[210px]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Escrow Protected</div>
                        <div className="text-[10px] text-slate-500">Funds held until safe handover</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Trust Card 2 */}
                  <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-md border border-slate-100 max-w-[220px]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">15% SAVC Vet Voucher</div>
                        <div className="text-[10px] text-slate-500">Mandatory health clearance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats Row */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Active Companion Dogs", value: `${dogs.length}+`, icon: Sparkles },
              { label: "SAVC Vet Verified", value: "99.8%", icon: Stethoscope },
              { label: "Escrow Deposit Safety", value: "100%", icon: ShieldCheck },
              { label: "Trust Community Rating", value: "4.9 / 5", icon: Award },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      {stat.value}
                    </span>
                    <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-slate-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4-Step Middleman Guarantee */}
      <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Middleman Safety Architecture
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How petLoversFinders Protects Every Adoption
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Direct peer-to-peer pet transactions expose buyers to scams and sellers to stolen dogs.
              PLF acts as the verified intermediary through each stage:
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Vetted Listing",
                desc: "Rehomers list dogs with photos and vaccination details. PLF admins verify listing legitimacy before publishing.",
                icon: ShieldCheck,
                color: "bg-blue-50 text-blue-700 border-blue-200",
              },
              {
                step: "02",
                title: "Central Escrow Vault",
                desc: "Adopter applies and deposits adoption fee into secure PLF escrow. Rehomer never receives funds until handover is done.",
                icon: Coins,
                color: "bg-amber-50 text-amber-700 border-amber-200",
              },
              {
                step: "03",
                title: "SAVC Vet Clearance",
                desc: "PLF issues a 15% discount voucher for a partner vet clinic. Dog completes full medical exam and vaccination check.",
                icon: Stethoscope,
                color: "bg-purple-50 text-purple-700 border-purple-200",
              },
              {
                step: "04",
                title: "Verified Handover",
                desc: "Both parties complete verified handover. Admin checks documents and releases escrow payout (90%) to the rehomer.",
                icon: HeartHandshake,
                color: "bg-emerald-50 text-emerald-700 border-emerald-200",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="relative flex flex-col rounded-3xl border border-slate-200/90 bg-slate-50/60 p-6 shadow-xs transition hover:bg-white hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-slate-400">
                      STEP {card.step}
                    </span>
                    <div className={`rounded-xl border p-2.5 ${card.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Dogs Section */}
      <section className="bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Live Companions
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ready for Safe Adoption
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Explore recently listed dogs with verified profiles and health records.
              </p>
            </div>

            <Link
              href="/dogs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              <span>View all {dogs.length} available dogs</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/dogs"
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-brand-700"
            >
              Browse Complete Catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Rehoming Cost & Escrow Calculator */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 text-white shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="rounded-full bg-brand-500/20 border border-brand-400/30 px-3 py-1 text-xs font-bold text-brand-300">
                  Transparent South African Pricing
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                  Escrow & Payout Transparency Calculator
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Unlike shady pet classifieds, PLF is 100% transparent. Rehomers choose their adoption
                  price. PLF retains only 10% to cover the SAVC vet voucher subsidy, identity checks,
                  and escrow security.
                </p>

                {/* Slider */}
                <div className="mt-8">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">Adoption Price (ZAR)</span>
                    <span className="text-xl font-extrabold text-amber-400">
                      R {calcPrice.toLocaleString("en-ZA")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="mt-3 w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                    <span>R 500</span>
                    <span>R 2,500</span>
                    <span>R 5,000</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Card */}
              <div className="lg:col-span-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 backdrop-blur-md">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fund Allocation
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Adopter Deposits</span>
                    <span className="font-bold text-white">R {calcPrice.toLocaleString("en-ZA")}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-400 font-medium">Rehomer Receives (90%)</span>
                    <span className="font-extrabold text-emerald-400">
                      R {Math.round(calcPrice * 0.9).toLocaleString("en-ZA")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm border-b border-slate-700 pb-3">
                    <span className="text-slate-400">PLF Fee (10%)</span>
                    <span className="text-slate-300">
                      R {Math.round(calcPrice * 0.1).toLocaleString("en-ZA")}
                    </span>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-400 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Includes 15% SAVC Vet Voucher</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Funds held in South African Trust account</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/rehomer/new-dog"
                  className="mt-6 flex w-full items-center justify-center rounded-2xl bg-amber-400 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  List a Dog With Custom Price
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              South African Rehoming Stories
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by Hundreds of Pet Parents
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Having PLF hold the escrow deposit gave me complete peace of mind. The vet clearance voucher was honored immediately at our local clinic in Randburg.",
                author: "Sipho D.",
                city: "Johannesburg",
                dog: "Luna (Africanis Mix)",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
              },
              {
                quote:
                  "I was moving abroad and terrified of giving Milo to unknown gumtree buyers. PLF vetted the applicants and the payout arrived cleanly after handover.",
                author: "Anika V.",
                city: "Cape Town",
                dog: "Milo (Labrador)",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
              },
              {
                quote:
                  "The application process is so structured. The SAVC health certificate guaranteed that Ruby had all her puppy deworming and microchip checks.",
                author: "Lerato M.",
                city: "Pretoria",
                dog: "Ruby (Beagle)",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
              },
            ].map((item) => (
              <div
                key={item.author}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs"
              >
                <div className="flex gap-1 text-amber-400 text-sm">★★★★★</div>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.author}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.city} • Rehomed {item.dog}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-800 p-10 sm:p-16 text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to give a pup their forever home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-brand-100 leading-relaxed">
              Join thousands of pet lovers across South Africa. Browse verified companions or list your
              dog safely with PLF escrow and veterinary protection.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dogs"
                className="rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-brand-700 shadow-xs transition hover:bg-brand-50"
              >
                Browse Dogs
              </Link>
              <Link
                href="/rehomer/new-dog"
                className="rounded-2xl border border-brand-400 bg-brand-800/60 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                List a Dog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
