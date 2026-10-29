"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  QrCode,
  Stethoscope,
  ShieldCheck,
  Building2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function IncentiveVoucherPage() {
  const params = useParams();
  const incentiveId = String(params.id);

  const { vaccineIncentives } = usePLFStore();
  const incentive =
    vaccineIncentives.find((i) => i.id === incentiveId) ||
    vaccineIncentives.find((i) => i.voucher_code === incentiveId) ||
    vaccineIncentives[0];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!incentive) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">Subsidy Voucher Not Found</h2>
        <Link href="/donate" className="mt-4 inline-flex text-xs font-bold text-brand-600">
          Back to Community Fund
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
        >
          <Printer className="h-4 w-4" />
          <span>Print Certificate</span>
        </button>
      </div>

      {/* Main Certificate */}
      <div className="rounded-[2.5rem] border-2 border-purple-300 bg-white p-8 sm:p-12 shadow-soft relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 text-2xl border border-purple-200">
              💉
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Non-Cash SAVC Clinic Credit Grant
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">
                PLF Bark Back Vaccination Subsidy
              </h1>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-emerald-900 text-right">
            <span className="text-[10px] font-bold uppercase block tracking-wider text-emerald-700">
              Direct Subsidy Credit
            </span>
            <span className="text-xl font-extrabold text-emerald-800">
              R {incentive.subsidy_amount_zar} Value
            </span>
          </div>
        </div>

        {/* Voucher Token Box */}
        <div className="rounded-3xl border border-dashed border-purple-300 bg-gradient-to-br from-purple-50/60 to-white p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-8 space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Authorized Voucher Token
                </span>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-purple-900 tracking-wider">
                  {incentive.voucher_code || "PLF-SUBSIDY-PENDING"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400 block">Beneficiary Pet</span>
                  <span className="font-bold text-slate-900">
                    {incentive.pet_name} ({incentive.pet_breed})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Beneficiary Caregiver</span>
                  <span className="font-bold text-slate-900">{incentive.applicant_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Assigned SAVC Clinic</span>
                  <span className="font-bold text-slate-900">
                    {incentive.preferred_partner_clinic}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status</span>
                  <span className="font-bold text-emerald-600">
                    {incentive.status === "voucher_issued"
                      ? "Authorized & Valid"
                      : incentive.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 flex flex-col items-center justify-center rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
              <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-slate-900 p-2 text-white">
                <QrCode className="h-24 w-24 text-white" />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Clinic Scannable Code
              </span>
            </div>
          </div>
        </div>

        {/* Clinic Terms & Instructions */}
        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-purple-600" />
            <span>Strict Clinic Instructions:</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-slate-600 leading-relaxed text-[11px]">
            <li>This certificate carries NO cash exchange value. Do not give change or cash.</li>
            <li>Apply credit strictly toward Rabies and 5-in-1 vaccination and clinical examination.</li>
            <li>Verify physical identity and markings of {incentive.pet_name}.</li>
            <li>PLF will disburse reimbursement directly to the clinic account upon SAVC invoice submission.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
