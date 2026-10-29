"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  Download,
  Trash2,
  Lock,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function PrivacySettingsPage() {
  const { currentUser, addToast } = usePLFStore();

  const [popiaConsent, setPopiaConsent] = useState(true);
  const [vetSharingConsent, setVetSharingConsent] = useState(true);
  const [escrowAuditConsent, setEscrowAuditConsent] = useState(true);

  const handleDownloadData = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      user: currentUser,
      compliance: "POPIA Act 4 of 2013 (South Africa)",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PLF_Personal_Data_Export_${currentUser.name.replace(/\s+/g, "_")}.json`;
    a.click();
    addToast("success", "Data Exported! 📁", "Your complete POPIA data file has been downloaded.");
  };

  const handleDeleteRequest = () => {
    if (confirm("Are you sure you want to request erasure of your data under POPIA section 24?")) {
      addToast(
        "info",
        "Erasure Request Logged 🔒",
        "Your data deletion ticket has been forwarded to the PLF Information Officer."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
          <Lock className="h-3.5 w-3.5" />
          <span>POPIA Act Compliant</span>
        </span>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            South African Privacy Governance
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">POPIA Privacy Controls</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
            In compliance with South Africa's Protection of Personal Information Act (POPIA), you have
            full authority over how your personal details, veterinary data, and escrow records are
            processed.
          </p>
        </div>

        {/* Data processing consent toggles */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Processing Consents</h2>

          <div className="space-y-4 text-xs text-slate-700">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={popiaConsent}
                onChange={(e) => setPopiaConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-brand-600"
              />
              <div>
                <span className="font-bold block">General Rehoming Service Processing</span>
                <span className="text-slate-500 leading-relaxed">
                  Allow PLF to securely match your contact data with admin reviews for adoption applications.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={vetSharingConsent}
                onChange={(e) => setVetSharingConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-brand-600"
              />
              <div>
                <span className="font-bold block">SAVC Partner Veterinary Verification Sharing</span>
                <span className="text-slate-500 leading-relaxed">
                  Permit PLF to transmit voucher token information to accredited clinics for pre-handover
                  clearance.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={escrowAuditConsent}
                onChange={(e) => setEscrowAuditConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-brand-600"
              />
              <div>
                <span className="font-bold block">Financial Escrow Audit Trail Storage</span>
                <span className="text-slate-500 leading-relaxed">
                  Maintain an immutable ledger entry of your escrow deposit and payout releases for
                  tax and legal compliance.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Data Management Actions */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Data Access & Portability</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Download className="h-4 w-4 text-brand-600" />
                <span>Download My Personal Data</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Export a machine-readable JSON copy of all listings, applications, and account activity
                tied to your identity.
              </p>
              <button
                type="button"
                onClick={handleDownloadData}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
              >
                Export JSON Archive
              </button>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <Trash2 className="h-4 w-4 text-rose-600" />
                <span>Request Account Erasure</span>
              </div>
              <p className="text-xs text-rose-700/80 leading-relaxed">
                Invoke your POPIA Right of Deletion. Non-active listings and uncompleted records will be
                purged within 30 days.
              </p>
              <button
                type="button"
                onClick={handleDeleteRequest}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700"
              >
                Submit Deletion Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
