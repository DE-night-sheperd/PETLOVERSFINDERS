"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Lock,
  Utensils,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Users,
  CreditCard,
  Building2,
  QrCode,
  AlertCircle,
  Award,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";
import type { DonationAllocation } from "@/lib/types";

const IMPACT_TIERS = [
  {
    amount: 25,
    title: "1 Nutritious Meal",
    desc: "Feeds a rescued puppy or foster companion for a full day.",
    icon: Utensils,
    popular: false,
  },
  {
    amount: 75,
    title: "3 Days Nutrition & Tick Care",
    desc: "Provides balanced puppy chow plus tick and flea treatment.",
    icon: Utensils,
    popular: false,
  },
  {
    amount: 200,
    title: "Deworming & Basic Check",
    desc: "Deworming medication, health check, and a cozy winter blanket.",
    icon: Stethoscope,
    popular: false,
  },
  {
    amount: 350,
    title: "Full SAVC Vaccination",
    desc: "Subsidizes 1 full Rabies & 5-in-1 vaccination package for an indigent pet.",
    icon: Stethoscope,
    popular: true,
  },
  {
    amount: 700,
    title: "Twin Pup Protection",
    desc: "Completely protects 2 rescue puppies against deadly Parvovirus & Rabies.",
    icon: Sparkles,
    popular: false,
  },
];

export default function DonatePage() {
  const { addDonation, donationPoolStats, donations, currentUser } = usePLFStore();

  const [selectedTier, setSelectedTier] = useState<number>(350);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [allocation, setAllocation] = useState<DonationAllocation>("both");
  const [donorName, setDonorName] = useState(currentUser.name || "A Caring Pet Lover");
  const [donorEmail, setDonorEmail] = useState(currentUser.email || "donor@example.co.za");
  const [message, setMessage] = useState("Bring a bark back to a friendly soul!");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "PayFast" | "Ozow Instant EFT" | "SnapScan" | "Debit / Credit Card"
  >("PayFast");

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<{
    id: string;
    amount: number;
    ref: string;
  } | null>(null);

  const effectiveAmount = customAmount ? Number(customAmount) : selectedTier;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 10) {
      alert("Please enter a donation amount of at least R 10.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const created = addDonation({
        donor_name: isAnonymous ? "Anonymous Pet Lover" : donorName,
        donor_email: donorEmail,
        amount_zar: effectiveAmount,
        allocated_to: allocation,
        message: message.trim(),
        is_anonymous: isAnonymous,
        payment_method: paymentMethod,
      });

      setIsProcessing(false);
      setCompletedTx({
        id: created.id,
        amount: created.amount_zar,
        ref: created.transaction_ref,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-white to-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/70 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-xs">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span>The PLF Bark Back Community Fund</span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Donate as little as you have to bring a bark back to a{" "}
            <span className="text-amber-600">friendly soul</span>.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Every rand feeds vulnerable rescue dogs and subsidizes life-saving SAVC Rabies and 5-in-1
            vaccinations for pets belonging to indigent South African families and community fosters.
          </p>

          {/* Live Impact Counters */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 block">
                R {donationPoolStats.total_donated_zar.toLocaleString("en-ZA")}
              </span>
              <span className="text-xs text-slate-500 font-medium">Total Community Donated</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">
                {donationPoolStats.meals_funded_count.toLocaleString("en-ZA")}
              </span>
              <span className="text-xs text-slate-500 font-medium">Nutritious Meals Funded</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 block">
                {donationPoolStats.vaccinations_funded_count.toLocaleString("en-ZA")}
              </span>
              <span className="text-xs text-slate-500 font-medium">Vaccines Subsidized</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 block">
                {donationPoolStats.active_grants_count}
              </span>
              <span className="text-xs text-slate-500 font-medium">Incentive Grants Issued</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation & Subsidy Gateway */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Donation Form */}
            <div className="lg:col-span-7">
              {completedTx ? (
                /* Donation Celebration Screen */
                <div className="rounded-[2.5rem] border border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white p-8 sm:p-12 text-center shadow-soft animate-in zoom-in-95 duration-200">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-3xl">
                    🐶❤️
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Donation Successful
                  </span>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                    Thank You for Bringing a Bark Back!
                  </h2>

                  <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                    Your contribution of <strong>R {completedTx.amount.toLocaleString("en-ZA")}</strong>{" "}
                    has been deposited into the Bark Back Community Pool to feed and vaccinate rescue pets.
                  </p>

                  <div className="mt-6 rounded-2xl bg-white p-4 border border-slate-200 text-xs text-slate-500 max-w-sm mx-auto font-mono">
                    Receipt Ref: <strong className="text-slate-900">{completedTx.ref}</strong>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setCompletedTx(null)}
                      className="rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
                    >
                      Make Another Contribution
                    </button>
                    <Link
                      href="/dogs"
                      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Browse Dogs for Adoption
                    </Link>
                  </div>
                </div>
              ) : (
                /* Active Donation Form */
                <form
                  onSubmit={handleDonate}
                  className="rounded-[2.5rem] border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-8"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Step 1 of 3: Choose Your Contribution
                    </span>
                    <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                      Select an Impact Amount
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Donate as little as you have — every R25 provides a full nutritious day's meal.
                    </p>
                  </div>

                  {/* Impact Tiers Grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {IMPACT_TIERS.map((tier) => {
                      const Icon = tier.icon;
                      const isSelected = selectedTier === tier.amount && !customAmount;
                      return (
                        <div
                          key={tier.amount}
                          onClick={() => {
                            setSelectedTier(tier.amount);
                            setCustomAmount("");
                          }}
                          className={`relative flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition ${
                            isSelected
                              ? "border-amber-500 bg-amber-50/60 ring-2 ring-amber-300"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {tier.popular && (
                            <span className="absolute -top-2.5 right-4 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                              Most Needed
                            </span>
                          )}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-xl font-black text-slate-900">
                                R {tier.amount}
                              </div>
                              <div className="text-xs font-bold text-slate-800 mt-0.5">
                                {tier.title}
                              </div>
                            </div>
                            <div
                              className={`rounded-xl p-2 ${
                                isSelected ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                          </div>
                          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                            {tier.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Amount Field */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                      Or Enter a Custom Amount (ZAR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                        R
                      </span>
                      <input
                        type="number"
                        min="10"
                        step="10"
                        placeholder="e.g. 50, 150, 1500"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Fund Allocation Selector */}
                  <div className="border-t border-slate-100 pt-6 space-y-3">
                    <label className="text-xs font-bold text-slate-700 uppercase block">
                      Step 2: Allocate Your Donation
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "both", label: "Meals & Vaccines", icon: Sparkles },
                        { id: "meals", label: "Rescue Food Only", icon: Utensils },
                        { id: "vaccines", label: "Vaccines Only", icon: Stethoscope },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAllocation(item.id as any)}
                          className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition ${
                            allocation === item.id
                              ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <item.icon className="h-4 w-4 mb-1" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Donor Info & Message */}
                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <label className="text-xs font-bold text-slate-700 uppercase block">
                      Step 3: Donor Details & Wall Note
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          disabled={isAnonymous}
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:bg-white disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Email (for receipt)
                        </label>
                        <input
                          type="email"
                          required
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:bg-white"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded accent-amber-600 h-4 w-4"
                      />
                      <span>Make my contribution anonymous on the public community wall</span>
                    </label>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Encouraging message for the community
                      </label>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="E.g. In loving memory of Max / Hope this helps a sweet puppy!"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Payment Gateway Picker */}
                  <div className="border-t border-slate-100 pt-6 space-y-3">
                    <label className="text-xs font-bold text-slate-700 uppercase block">
                      Select Payment Gateway
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { id: "PayFast", label: "PayFast", icon: CreditCard },
                        { id: "Ozow Instant EFT", label: "Ozow EFT", icon: Building2 },
                        { id: "SnapScan", label: "SnapScan", icon: QrCode },
                        { id: "Debit / Credit Card", label: "Bank Card", icon: CreditCard },
                      ].map((gw) => (
                        <button
                          key={gw.id}
                          type="button"
                          onClick={() => setPaymentMethod(gw.id as any)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-bold transition ${
                            paymentMethod === gw.id
                              ? "bg-amber-100 border-amber-300 text-amber-950"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <gw.icon className="h-3.5 w-3.5" />
                          <span>{gw.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-slate-100 pt-6">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-sm font-bold text-white shadow-soft transition hover:from-amber-600 hover:to-amber-700 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Processing Donation to Safe Pool...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 fill-white" />
                          <span>
                            Donate R {effectiveAmount.toLocaleString("en-ZA")} via {paymentMethod}
                          </span>
                        </>
                      )}
                    </button>
                    <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      <span>100% Tax Deductible PBO Receipt available via email</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right: The Incentive Application Promotion Card & Wall */}
            <aside className="lg:col-span-5 space-y-6">
              {/* Vaccine Incentive Application Callout */}
              <div className="rounded-[2.5rem] border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-brand-50/50 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white text-xl shadow-xs">
                  💉
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                    Need Help With Your Dog?
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Apply for the Vaccination & Nutrition Incentive
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Struggling pet parents, SASSA recipients, and low-income households can apply for a
                    subsidized <strong>SAVC Rabies & 5-in-1 vaccination voucher</strong> funded directly
                    from these community donations.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 border border-purple-100 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-purple-600" />
                    <span>Strict Anti-Fraud Criteria Apply:</span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-500">
                    <li>Proof of low-income or SASSA grant required</li>
                    <li>No cash is ever disbursed to applicants</li>
                    <li>Non-transferable voucher paid directly to SAVC Vet</li>
                    <li>Limit of 1 companion pet per household</li>
                  </ul>
                </div>

                <Link
                  href="/vaccine-incentive"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-700 py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-800"
                >
                  <span>Apply for Vaccine Incentive</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Community Donor Wall */}
              <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>Recent Community Donors</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Live Feed</span>
                </div>

                <div className="divide-y divide-slate-100 space-y-2">
                  {donations.slice(0, 5).map((d) => (
                    <div key={d.id} className="pt-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{d.donor_name}</span>
                        <span className="font-extrabold text-amber-600">
                          R {d.amount_zar.toLocaleString("en-ZA")}
                        </span>
                      </div>
                      {d.message && (
                        <p className="text-[11px] text-slate-500 italic">"{d.message}"</p>
                      )}
                      <div className="text-[10px] text-slate-400">
                        {new Date(d.created_at).toLocaleDateString()} • via {d.payment_method}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
