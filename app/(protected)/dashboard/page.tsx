"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Dog,
  FileText,
  Heart,
  PlusCircle,
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  User,
  Settings,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";
import { DogCard } from "@/components/DogCard";

function DashboardContent() {
  const searchParams = useSearchParams();
  const {
    currentUser,
    switchPersona,
    dogs,
    applications,
    favorites,
    escrows,
  } = usePLFStore();

  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "listings" | "favorites">("overview");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "favorites" || tab === "applications" || tab === "listings") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Derived user specific items
  const myApplications = applications;
  const myListings = dogs.filter(
    (d) => d.rehomer_email === currentUser.email || currentUser.role === "rehomer" || currentUser.role === "admin"
  );
  const myFavorites = dogs.filter((d) => favorites.includes(d.id));

  const getApplicationProgress = (status: string) => {
    switch (status) {
      case "pending_admin":
        return { step: 1, label: "Admin Vetting in Progress" };
      case "approved":
        return { step: 2, label: "Approved • Deposit Escrow Required" };
      case "deposit_paid":
        return { step: 3, label: "Escrow Secured • Vet Voucher Issued" };
      case "vet_clearing":
        return { step: 4, label: "SAVC Health Check Complete" };
      case "ready_handover":
        return { step: 5, label: "Ready for Safe Handover" };
      case "completed":
        return { step: 6, label: "Adoption Finalized 🎉" };
      default:
        return { step: 1, label: status };
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Greeting Header */}
      <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl object-cover border-2 border-brand-200 shadow-xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Welcome back, {currentUser.name}! 👋
                </h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    currentUser.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : currentUser.role === "rehomer"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {currentUser.location} • {currentUser.email}
              </p>
            </div>
          </div>

          {/* Quick Persona Switch for testing */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Test Role:
            </span>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(["adopter", "rehomer", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => switchPersona(r)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold capitalize transition ${
                    currentUser.role === r
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
          {[
            { id: "overview", label: "Overview", count: undefined },
            { id: "applications", label: "My Applications", count: myApplications.length },
            { id: "listings", label: "My Dog Listings", count: myListings.length },
            { id: "favorites", label: "Saved Favorites", count: myFavorites.length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  isActive
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Panels */}
      <div className="mt-8">
        {/* OVERVIEW PANEL */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Quick Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div
                onClick={() => setActiveTab("applications")}
                className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-brand-300 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-xl">
                    📬
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {myApplications.length}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900 text-sm">Active Applications</h3>
                <p className="mt-1 text-xs text-slate-500">Track vetting, escrow & handover progress</p>
                <div className="mt-3 flex items-center text-xs font-bold text-brand-600">
                  <span>View applications</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("listings")}
                className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-brand-300 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 text-xl">
                    🐕
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {myListings.length}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900 text-sm">My Dog Listings</h3>
                <p className="mt-1 text-xs text-slate-500">Manage companion profiles & vet vouchers</p>
                <div className="mt-3 flex items-center text-xs font-bold text-brand-600">
                  <span>Manage listings</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("favorites")}
                className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-brand-300 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 text-xl">
                    ❤️
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {myFavorites.length}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900 text-sm">Saved Wishlist</h3>
                <p className="mt-1 text-xs text-slate-500">Dogs you have saved for later review</p>
                <div className="mt-3 flex items-center text-xs font-bold text-brand-600">
                  <span>View saved dogs</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>

            {/* Recent Application Tracker Highlight */}
            {myApplications.length > 0 && (
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-600" />
                    <h2 className="text-base font-bold text-slate-900">
                      Latest Application Progress
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    View all ({myApplications.length})
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {myApplications.slice(0, 2).map((app) => {
                    const progress = getApplicationProgress(app.status);
                    return (
                      <div
                        key={app.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={app.dog_image}
                              alt={app.dog_name}
                              className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{app.dog_name}</span>
                                <span className="font-mono text-xs text-slate-400">({app.id})</span>
                              </div>
                              <div className="text-xs font-semibold text-brand-700 mt-0.5">
                                {progress.label}
                              </div>
                            </div>
                          </div>

                          {/* Quick action buttons per status */}
                          <div className="flex items-center gap-2 self-start sm:self-center">
                            {app.status === "approved" && (
                              <Link
                                href={`/checkout/${app.id}`}
                                className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                              >
                                Pay Escrow Deposit →
                              </Link>
                            )}
                            {app.status === "deposit_paid" && (
                              <Link
                                href={`/rehomer/voucher/${app.dog_id}`}
                                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700"
                              >
                                View 15% Vet Voucher →
                              </Link>
                            )}
                            <Link
                              href={`/dogs/${app.dog_id}`}
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Dog Profile
                            </Link>
                          </div>
                        </div>

                        {/* Progress Step Bar */}
                        <div className="grid grid-cols-5 gap-2 pt-2">
                          {[
                            { num: 1, label: "Applied" },
                            { num: 2, label: "Approved" },
                            { num: 3, label: "Escrow Paid" },
                            { num: 4, label: "SAVC Vet Cleared" },
                            { num: 5, label: "Handover Complete" },
                          ].map((s) => (
                            <div key={s.num} className="space-y-1">
                              <div
                                className={`h-1.5 rounded-full ${
                                  progress.step >= s.num ? "bg-emerald-500" : "bg-slate-200"
                                }`}
                              />
                              <span
                                className={`text-[10px] block truncate font-medium ${
                                  progress.step >= s.num ? "text-emerald-700" : "text-slate-400"
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MY APPLICATIONS PANEL */}
        {activeTab === "applications" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">My Adoption Applications</h2>
                <p className="text-xs text-slate-500">Track and manage your applications in real-time.</p>
              </div>
              <Link
                href="/dogs"
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                Find More Dogs
              </Link>
            </div>

            {myApplications.length > 0 ? (
              <div className="space-y-4">
                {myApplications.map((app) => {
                  const progress = getApplicationProgress(app.status);
                  return (
                    <div
                      key={app.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.dog_image}
                            alt={app.dog_name}
                            className="h-14 w-14 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-base">{app.dog_name}</span>
                              <span className="font-mono text-xs text-slate-400">({app.id})</span>
                              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                                {app.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              Submitted: {new Date(app.submitted_at).toLocaleDateString()} • Deposit: R{" "}
                              {app.escrow_deposit_zar.toLocaleString("en-ZA")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {app.status === "approved" && (
                            <Link
                              href={`/checkout/${app.id}`}
                              className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                            >
                              Pay Escrow Deposit →
                            </Link>
                          )}
                          {app.status === "deposit_paid" && (
                            <Link
                              href={`/rehomer/voucher/${app.dog_id}`}
                              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700"
                            >
                              View Vet Voucher
                            </Link>
                          )}
                          <Link
                            href={`/dogs/${app.dog_id}`}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            View Dog
                          </Link>
                        </div>
                      </div>

                      {app.admin_notes && (
                        <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs text-slate-600">
                          <span className="font-bold text-slate-800">PLF Ops Note: </span>
                          {app.admin_notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                <p className="text-sm">You haven't submitted any adoption applications yet.</p>
                <Link
                  href="/dogs"
                  className="mt-4 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white"
                >
                  Browse Available Dogs
                </Link>
              </div>
            )}
          </div>
        )}

        {/* MY LISTINGS PANEL */}
        {activeTab === "listings" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">My Dog Listings</h2>
                <p className="text-xs text-slate-500">
                  Manage your listings, vet discount vouchers, and clearance documents.
                </p>
              </div>
              <Link
                href="/rehomer/new-dog"
                className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
              >
                + List a New Dog
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myListings.map((dog) => (
                <div
                  key={dog.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={dog.primary_image}
                      alt={dog.name}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{dog.name}</h3>
                          <p className="text-xs text-slate-500">{dog.breed}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          {dog.status}
                        </span>
                      </div>
                      <div className="mt-3 text-xs font-extrabold text-brand-700">
                        Adoption Fee: R {dog.listing_price_zar.toLocaleString("en-ZA")}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                    <Link
                      href={`/rehomer/voucher/${dog.id}`}
                      className="flex-1 text-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Vet Voucher
                    </Link>
                    <Link
                      href={`/rehomer/upload-clearance/${dog.id}`}
                      className="flex-1 text-center rounded-xl bg-brand-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                    >
                      Clearance
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SAVED FAVORITES PANEL */}
        {activeTab === "favorites" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Saved Wishlist Dogs</h2>
                <p className="text-xs text-slate-500">Companions you've saved for future adoption.</p>
              </div>
              <span className="text-xs font-bold text-rose-600">
                {myFavorites.length} dogs bookmarked
              </span>
            </div>

            {myFavorites.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myFavorites.map((dog) => (
                  <DogCard key={dog.id} dog={dog} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                <Heart className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm">You haven't added any dogs to your wishlist yet.</p>
                <Link
                  href="/dogs"
                  className="mt-4 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
                >
                  Explore Dogs
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="animate-spin text-3xl mb-2">🐕</div>
          <p className="text-slate-500 text-sm">Loading your dashboard...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
