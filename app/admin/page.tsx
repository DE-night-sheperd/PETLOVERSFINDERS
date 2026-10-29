"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Users,
  Coins,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  Search,
  Lock,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function AdminPage() {
  const {
    dogs,
    applications,
    escrows,
    clearances,
    updateDogStatus,
    updateApplicationStatus,
    releaseEscrow,
    verifyVetClearance,
    addToast,
    resetToDefaults,
  } = usePLFStore();

  const [activeTab, setActiveTab] = useState<
    "listings" | "applications" | "escrow" | "clearances"
  >("listings");
  const [adminSearch, setAdminSearch] = useState("");

  // Derived statistics
  const pendingReviewDogs = dogs.filter((d) => d.status === "pending_review");
  const pendingApps = applications.filter((a) => a.status === "pending_admin");
  const escrowHeldTotal = escrows
    .filter((e) => e.status === "held_in_escrow")
    .reduce((sum, e) => sum + e.amount_zar, 0);
  const releasedTotal = escrows
    .filter((e) => e.status === "released_to_rehomer")
    .reduce((sum, e) => sum + e.rehomer_payout_zar, 0);
  const pendingClearances = clearances.filter((c) => !c.verified);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <ShieldCheck className="h-4 w-4" />
            <span>PLF Operations & Risk Governance</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Operations Command Center
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Centralized admin workflow: review listings, vet applications, oversee escrow trust, and verify SAVC health clearances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo State</span>
          </button>

          <Link
            href="/dogs"
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
          >
            View Live Marketplace →
          </Link>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          {
            label: "Pending Listings",
            val: pendingReviewDogs.length,
            tab: "listings",
            tone: "text-amber-600 bg-amber-50 border-amber-200",
          },
          {
            label: "Pending Applications",
            val: pendingApps.length,
            tab: "applications",
            tone: "text-blue-600 bg-blue-50 border-blue-200",
          },
          {
            label: "SAVC Clearances Queue",
            val: pendingClearances.length,
            tab: "clearances",
            tone: "text-purple-600 bg-purple-50 border-purple-200",
          },
          {
            label: "Escrow Held in Trust",
            val: `R ${escrowHeldTotal.toLocaleString("en-ZA")}`,
            tab: "escrow",
            tone: "text-emerald-600 bg-emerald-50 border-emerald-200",
          },
          {
            label: "Total Rehomer Payouts",
            val: `R ${releasedTotal.toLocaleString("en-ZA")}`,
            tab: "escrow",
            tone: "text-slate-800 bg-slate-100 border-slate-200",
          },
        ].map((kpi) => (
          <button
            key={kpi.label}
            onClick={() => setActiveTab(kpi.tab as any)}
            className={`rounded-2xl border p-4 text-left shadow-xs transition hover:scale-[1.02] ${kpi.tone}`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block">
              {kpi.label}
            </span>
            <span className="mt-1 text-2xl font-extrabold tracking-tight block">{kpi.val}</span>
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex gap-2">
          {[
            { id: "listings", label: "Listings Queue", count: pendingReviewDogs.length, icon: FileText },
            { id: "applications", label: "Applications", count: pendingApps.length, icon: Users },
            { id: "escrow", label: "Escrow & Payouts", count: escrows.length, icon: Coins },
            { id: "clearances", label: "SAVC Clearances", count: pendingClearances.length, icon: Stethoscope },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                      isActive ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Quick Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search queue records..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="mt-6">
        {/* TAB 1: LISTINGS QUEUE */}
        {activeTab === "listings" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Dog Listings Review & Oversight</h2>
              <span className="text-xs text-slate-500">{dogs.length} total listings</span>
            </div>

            <div className="divide-y divide-slate-100">
              {dogs
                .filter((d) =>
                  adminSearch ? d.name.toLowerCase().includes(adminSearch.toLowerCase()) || d.breed.toLowerCase().includes(adminSearch.toLowerCase()) : true
                )
                .map((dog) => (
                  <div
                    key={dog.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={dog.primary_image}
                        alt={dog.name}
                        className="h-14 w-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{dog.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              dog.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : dog.status === "pending_review"
                                ? "bg-amber-100 text-amber-800"
                                : dog.status === "adopted"
                                ? "bg-slate-100 text-slate-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {dog.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {dog.breed} • {dog.location} • Fee: R {dog.listing_price_zar.toLocaleString("en-ZA")}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Rehomer: {dog.rehomer_name || "Community Foster"} ({dog.rehomer_email || "N/A"})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/dogs/${dog.id}`}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Preview
                      </Link>

                      {dog.status === "pending_review" ? (
                        <>
                          <button
                            onClick={() => updateDogStatus(dog.id, "active")}
                            className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                          >
                            Approve & Publish
                          </button>
                          <button
                            onClick={() => updateDogStatus(dog.id, "rejected")}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                          >
                            Decline
                          </button>
                        </>
                      ) : dog.status === "active" ? (
                        <button
                          onClick={() => updateDogStatus(dog.id, "pending_review")}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Unpublish
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS QUEUE */}
        {activeTab === "applications" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Adoption Applications Queue</h2>
              <span className="text-xs text-slate-500">{applications.length} applications</span>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div key={app.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold text-xs">
                        APP
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">{app.id}</span>
                          <span className="text-sm font-bold text-slate-900">
                            for {app.dog_name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              app.status === "deposit_paid"
                                ? "bg-purple-100 text-purple-800"
                                : app.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.status === "completed"
                                ? "bg-slate-900 text-white"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Applicant: {app.applicant_name} ({app.applicant_email}) • {app.applicant_phone} • {app.city}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {app.status === "pending_admin" && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(app.id, "approved")}
                            className="rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                          >
                            Approve for Escrow
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, "rejected")}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {app.status === "approved" && (
                        <Link
                          href={`/checkout/${app.id}`}
                          className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                        >
                          Open Checkout Gateway
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Environment details expander */}
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
                    <div>
                      <strong>Housing: </strong> {app.housing_type} • Yard fenced:{" "}
                      {app.yard_fenced ? "✅ Yes" : "❌ No"}
                    </div>
                    <div>
                      <strong>Other Pets: </strong> {app.pet_details || "None reported"}
                    </div>
                    <div>
                      <strong>Care Notes: </strong> {app.experience_notes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ESCROW & PAYOUTS */}
        {activeTab === "escrow" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">PLF Central Escrow Trust Vault</h2>
              <span className="text-xs font-mono text-emerald-600 font-bold">
                Held: R {escrowHeldTotal.toLocaleString("en-ZA")}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {escrows.map((tx) => (
                <div
                  key={tx.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{tx.dog_name}'s Adoption Deposit</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            tx.status === "held_in_escrow"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {tx.status === "held_in_escrow" ? "Locked in Escrow" : "Disbursed to Rehomer"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Ref: {tx.transaction_ref} • Gateway: {tx.payment_method}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Total: R {tx.amount_zar.toLocaleString("en-ZA")} (Rehomer 90%: R{" "}
                        {tx.rehomer_payout_zar.toLocaleString("en-ZA")} | PLF 10%: R {tx.platform_fee_zar})
                      </div>
                    </div>
                  </div>

                  {/* Escrow Release Button */}
                  <div>
                    {tx.status === "held_in_escrow" ? (
                      <button
                        onClick={() => releaseEscrow(tx.id)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                      >
                        Authorize Rehomer Payout (90%)
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Paid out on {new Date(tx.released_at || "").toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SAVC CLEARANCES */}
        {activeTab === "clearances" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">SAVC Veterinary Clearances Queue</h2>
              <span className="text-xs text-slate-500">{clearances.length} records</span>
            </div>

            <div className="divide-y divide-slate-100">
              {clearances.map((clr) => (
                <div
                  key={clr.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{clr.dog_name}</span>
                        <span className="text-xs text-slate-600">• {clr.clinic_name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            clr.verified
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {clr.verified ? "SAVC Verified" : "Pending Check"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Examined by: {clr.vet_name} (Reg: {clr.savc_reg_number}) on {clr.examination_date}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 italic">
                        "{clr.notes}"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={clr.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Document
                    </a>

                    {!clr.verified && (
                      <button
                        onClick={() => verifyVetClearance(clr.id)}
                        className="rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                      >
                        Verify & Clear Handover
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
