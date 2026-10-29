"use client";

import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, ShieldCheck, ArrowRight, Dog, FileText } from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function ApplicationsPage() {
  const { applications, dogs } = usePLFStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_admin":
        return { label: "Under PLF Review", tone: "bg-amber-100 text-amber-800" };
      case "approved":
        return { label: "Approved • Deposit Escrow Ready", tone: "bg-emerald-100 text-emerald-800" };
      case "deposit_paid":
        return { label: "Deposit Escrowed • Vet Check Ongoing", tone: "bg-purple-100 text-purple-800" };
      case "vet_clearing":
        return { label: "SAVC Vet Cleared", tone: "bg-blue-100 text-blue-800" };
      case "ready_handover":
        return { label: "Ready for Handover", tone: "bg-emerald-100 text-emerald-900" };
      case "completed":
        return { label: "Adoption Completed 🎉", tone: "bg-slate-900 text-white" };
      default:
        return { label: status, tone: "bg-slate-100 text-slate-700" };
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <FileText className="h-4 w-4" />
            <span>Adoption Applications</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Application Status Tracker</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track your progress across admin vetting, escrow deposit custody, and SAVC veterinary checks.
          </p>
        </div>

        <Link
          href="/dogs"
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
        >
          <span>Browse Available Dogs</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {applications.length > 0 ? (
          applications.map((app) => {
            const badge = getStatusBadge(app.status);
            return (
              <div
                key={app.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={app.dog_image}
                      alt={app.dog_name}
                      className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900">{app.dog_name}</span>
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          ({app.id})
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badge.tone}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Applicant: {app.applicant_name} ({app.applicant_email}) • {app.city}
                      </div>
                      <div className="text-[11px] font-bold text-brand-700 mt-0.5">
                        Escrow Amount: R {app.escrow_deposit_zar.toLocaleString("en-ZA")}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {app.status === "approved" && (
                      <Link
                        href={`/checkout/${app.id}`}
                        className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                      >
                        Deposit Escrow Payment →
                      </Link>
                    )}

                    {app.status === "deposit_paid" && (
                      <Link
                        href={`/rehomer/voucher/${app.dog_id}`}
                        className="rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700"
                      >
                        View 15% Vet Voucher
                      </Link>
                    )}

                    <Link
                      href={`/dogs/${app.dog_id}`}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Dog Profile
                    </Link>
                  </div>
                </div>

                {/* Application Details Summary */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div>
                    <strong>Living Environment: </strong> {app.housing_type} (Fenced Yard:{" "}
                    {app.yard_fenced ? "Yes" : "No"})
                  </div>
                  <div>
                    <strong>Care Experience: </strong> {app.experience_notes}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Applications Submitted</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Find a companion and start your verified adoption journey with PLF.
            </p>
            <Link
              href="/dogs"
              className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
            >
              Browse Dogs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
