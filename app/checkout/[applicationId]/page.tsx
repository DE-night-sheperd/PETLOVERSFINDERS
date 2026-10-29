"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Building2,
  QrCode,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const appId = String(params.applicationId);

  const { applications, dogs, payEscrow } = usePLFStore();

  const application =
    applications.find((a) => a.id === appId) ||
    applications.find((a) => a.dog_id === appId) ||
    applications[0];

  const dog = application ? dogs.find((d) => d.id === application.dog_id) : dogs[0];

  const [paymentMethod, setPaymentMethod] = useState<
    "PayFast" | "Ozow Instant EFT" | "Debit / Credit Card"
  >("PayFast");
  const [selectedBank, setSelectedBank] = useState("Capitec Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(
    application?.status === "deposit_paid" || application?.status === "vet_clearing"
  );
  const [txRef, setTxRef] = useState<string>("PF-TX-" + Math.floor(100000 + Math.random() * 900000));

  if (!application || !dog) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">Application Reference Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          Please verify the application reference or select a dog from the catalog.
        </p>
        <Link
          href="/dogs"
          className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white"
        >
          Browse Dogs
        </Link>
      </div>
    );
  }

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const createdTx = payEscrow(application.id, paymentMethod);
      if (createdTx) {
        setTxRef(createdTx.transaction_ref);
      }
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard?tab=applications"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Applications</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
          <Lock className="h-3.5 w-3.5" />
          <span>256-Bit SSL Escrow Gateway</span>
        </span>
      </div>

      {paymentSuccess ? (
        /* Payment Complete / Escrow Custody Certificate Screen */
        <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-12 shadow-soft text-center animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 text-3xl">
            🔐
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Escrow Deposit Secured
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Deposit Held in PLF Escrow Trust
          </h1>

          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            R {application.dog_price_zar.toLocaleString("en-ZA")} has been successfully deposited into the
            central trust account for <strong>{dog.name}</strong>.
          </p>

          {/* Certificate Receipt Box */}
          <div className="mt-8 rounded-3xl bg-slate-900 p-6 sm:p-8 text-white text-left shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  PLF Escrow Custody Certificate
                </div>
                <div className="text-lg font-bold text-amber-400">{dog.name}'s Adoption</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Transaction Ref</div>
                <div className="text-xs font-mono font-bold text-emerald-400">{txRef}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4 pt-2">
              <div>
                <span className="text-slate-400 block">Total Held</span>
                <span className="font-bold text-white text-sm">
                  R {application.dog_price_zar.toLocaleString("en-ZA")}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Method</span>
                <span className="font-bold text-white">{paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Beneficiary</span>
                <span className="font-bold text-white">PLF Trust Acct</span>
              </div>
              <div>
                <span className="text-slate-400 block">Status</span>
                <span className="font-bold text-emerald-400">Held in Trust</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-800/80 p-4 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Next Milestone:</strong> The rehomer has been notified to redeem their 15% SAVC
                Vet Voucher. Once medical clearance is verified by admin and the safe handover is
                complete, funds will be released.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/rehomer/voucher/${dog.id}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
            >
              <span>View Issued Vet Voucher</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard?tab=applications"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <span>Track in Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Payment Checkout Form Screen */
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Step 2 of 3: Escrow Payment
                </span>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Confirm Escrow Deposit</h1>
                <p className="mt-2 text-xs text-slate-500">
                  Select your preferred South African payment gateway. Your deposit is safeguarded in the
                  PLF Trust account until adoption completion.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                {[
                  {
                    id: "PayFast",
                    title: "PayFast (South Africa)",
                    desc: "Credit/Debit Card, Masterpass, Mobicred, SCode",
                    icon: CreditCard,
                    badge: "Most Popular",
                  },
                  {
                    id: "Ozow Instant EFT",
                    title: "Ozow Instant EFT",
                    desc: "Capitec, FNB, Standard Bank, Nedbank, Absa, TymeBank",
                    icon: Building2,
                    badge: "Zero Card Fees",
                  },
                  {
                    id: "Debit / Credit Card",
                    title: "Direct Card Payment",
                    desc: "Visa & Mastercard with 3D Secure OTP",
                    icon: CreditCard,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`flex items-start justify-between rounded-2xl border p-4 cursor-pointer transition ${
                        isSelected
                          ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-200"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-xl p-2.5 ${
                            isSelected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                            {item.badge && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 mt-0.5 block">{item.desc}</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(item.id as any)}
                        className="mt-1 h-4 w-4 accent-brand-600"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Ozow Bank Selector sub-panel */}
              {paymentMethod === "Ozow Instant EFT" && (
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 animate-in fade-in duration-150 space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase block">
                    Select Your South African Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      "Capitec Bank",
                      "FNB",
                      "Standard Bank",
                      "Nedbank",
                      "Absa",
                      "TymeBank",
                    ].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`rounded-xl py-2 px-3 text-xs font-bold transition border ${
                          selectedBank === bank
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 py-4 text-sm font-bold text-white shadow-xs transition hover:bg-brand-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Connecting to Secure Banking Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>
                      Deposit R {application.dog_price_zar.toLocaleString("en-ZA")} via {paymentMethod}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Protected by PLF Central Middleman Escrow Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900">Escrow Summary</h2>

              {/* Dog Preview Card */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                <img
                  src={dog.primary_image}
                  alt={dog.name}
                  className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{dog.name}</div>
                  <div className="text-xs text-slate-500">{dog.breed}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{dog.location}</div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-3 text-xs border-y border-slate-100 py-4">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Application Reference</span>
                  <span className="font-mono font-bold text-slate-900">{application.id}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Dog Adoption Fee</span>
                  <span className="font-bold text-slate-900">
                    R {application.dog_price_zar.toLocaleString("en-ZA")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>15% SAVC Vet Voucher Subsidy</span>
                  <span className="font-bold text-emerald-600">FREE / Included</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>PLF Escrow Trust Custody</span>
                  <span className="font-bold text-emerald-600">FREE / Included</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Total Escrow Deposit</span>
                <span className="text-2xl font-extrabold text-brand-600">
                  R {application.dog_price_zar.toLocaleString("en-ZA")}
                </span>
              </div>

              {/* Trust Callout */}
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                <strong>Why Escrow?</strong> This money is locked safely. If the dog does not pass the
                SAVC vet check or if the rehomer fails to meet handover terms, you receive a full 100%
                refund.
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
