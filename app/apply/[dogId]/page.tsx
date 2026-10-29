"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Dog,
  MapPin,
  Home,
  User,
  Heart,
  FileCheck,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const dogId = String(params.dogId);

  const { dogs, currentUser, submitApplication } = usePLFStore();
  const dog = dogs.find((d) => d.id === dogId);

  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [applicantName, setApplicantName] = useState(currentUser.name || "Sipho Dlamini");
  const [applicantEmail, setApplicantEmail] = useState(currentUser.email || "adopter@petloversfinders.co.za");
  const [applicantPhone, setApplicantPhone] = useState(currentUser.phone || "+27 82 456 7890");
  const [city, setCity] = useState("Johannesburg");
  const [housingType, setHousingType] = useState("House with garden");
  const [yardFenced, setYardFenced] = useState(true);
  const [otherPets, setOtherPets] = useState(true);
  const [petDetails, setPetDetails] = useState("One 6-year-old sterilized Golden Retriever, very dog friendly.");
  const [experienceNotes, setExperienceNotes] = useState(
    "Lifelong dog owners, work from home schedule, daily morning walks and secure walled premises."
  );
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  if (!dog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Dog Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">Please choose an active companion from the catalog.</p>
        <Link
          href="/dogs"
          className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white"
        >
          Browse Dogs
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    const created = submitApplication({
      dog_id: dog.id,
      dog_name: dog.name,
      dog_image: dog.primary_image,
      dog_price_zar: dog.listing_price_zar,
      applicant_name: applicantName,
      applicant_email: applicantEmail,
      applicant_phone: applicantPhone,
      city,
      housing_type: housingType,
      yard_fenced: yardFenced,
      other_pets: otherPets,
      pet_details: petDetails,
      experience_notes: experienceNotes,
    });

    setSubmittedAppId(created.id);
  };

  // If application was submitted successfully, show Celebration screen!
  if (submittedAppId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-12 text-center shadow-soft">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 text-3xl">
            🎉
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Application Reference: {submittedAppId}
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Application Submitted for {dog.name}!
          </h1>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Thank you, {applicantName}. PLF Operations is reviewing your application against {dog.name}'s
            personality and care requirements.
          </p>

          {/* Step Timeline Card */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left border border-slate-200/80 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What Happens Next:
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                  1
                </div>
                <div>
                  <div className="font-bold text-slate-900">Admin Review (2 - 4 Hours)</div>
                  <div className="text-slate-500">
                    PLF verifies housing suitability and coordinates with the rehomer.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                  2
                </div>
                <div>
                  <div className="font-bold text-slate-900">Escrow Deposit Payment</div>
                  <div className="text-slate-500">
                    Once approved, you'll deposit R {dog.listing_price_zar.toLocaleString("en-ZA")} into
                    safe PLF escrow.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                  3
                </div>
                <div>
                  <div className="font-bold text-slate-900">SAVC Vet Clearance & Handover</div>
                  <div className="text-slate-500">
                    The rehomer takes {dog.name} to a partner vet with the 15% voucher, and you meet for
                    the handover.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard?tab=applications"
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
            >
              <span>Track in My Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <span>Test Admin Approval (Demo)</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        href={`/dogs/${dog.id}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to {dog.name}'s profile</span>
      </Link>

      {/* Header dog banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={dog.primary_image}
            alt={dog.name}
            className="h-18 w-18 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Official Adoption Application
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">Apply to Adopt {dog.name}</h1>
            <p className="text-xs text-slate-500">{dog.breed} • {dog.location}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 px-4 py-2.5 text-white text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Adoption Fee</span>
          <span className="text-lg font-extrabold text-amber-400">
            R {dog.listing_price_zar.toLocaleString("en-ZA")}
          </span>
        </div>
      </div>

      {/* Wizard Steps Navigation */}
      <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-4">
        {[
          { num: 1, title: "Applicant Details" },
          { num: 2, title: "Home Environment" },
          { num: 3, title: "Escrow Agreement" },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setStep(s.num as any)}
            className={`flex items-center gap-2 text-xs font-bold transition ${
              step === s.num ? "text-brand-600" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                step === s.num
                  ? "bg-brand-600 text-white"
                  : step > s.num
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {step === 1 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in duration-150">
            <h2 className="text-lg font-bold text-slate-900">Step 1: Your Profile & Contact Details</h2>
            <p className="text-xs text-slate-500">
              PLF keeps your personal phone and email private from the rehomer. All inquiries are
              coordinated via PLF admins.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Mobile Number (WhatsApp Enabled)
                </label>
                <input
                  type="text"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  City / Suburb
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
              >
                <span>Continue to Home Environment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in duration-150">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Home Environment & Pet Care</h2>
            <p className="text-xs text-slate-500">
              Helps us ensure {dog.name} has the suitable space, safety, and exercise they need.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Type of Dwelling
                </label>
                <select
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
                >
                  <option>House with large walled garden</option>
                  <option>Townhouse with private lawn</option>
                  <option>Apartment / Flat (Pet Friendly)</option>
                  <option>Smallholding / Farm</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Is your property yard securely fenced?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="yard"
                      checked={yardFenced === true}
                      onChange={() => setYardFenced(true)}
                      className="accent-brand-600"
                    />
                    <span>Yes, fully secure / fenced</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="yard"
                      checked={yardFenced === false}
                      onChange={() => setYardFenced(false)}
                      className="accent-brand-600"
                    />
                    <span>No / Partial fence</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Do you currently have other pets?
                </label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="otherPets"
                      checked={otherPets === true}
                      onChange={() => setOtherPets(true)}
                      className="accent-brand-600"
                    />
                    <span>Yes, have other pets</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="otherPets"
                      checked={otherPets === false}
                      onChange={() => setOtherPets(false)}
                      className="accent-brand-600"
                    />
                    <span>No other pets</span>
                  </label>
                </div>

                {otherPets && (
                  <input
                    type="text"
                    value={petDetails}
                    onChange={(e) => setPetDetails(e.target.value)}
                    placeholder="E.g. Breed, age, sterilization status of other pets..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
                  />
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Routine & Experience Notes
                </label>
                <textarea
                  rows={4}
                  value={experienceNotes}
                  onChange={(e) => setExperienceNotes(e.target.value)}
                  placeholder="Tell us about your daily dog exercise routine, work hours, and previous dog care experience..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
              >
                <span>Continue to Escrow Agreement</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Escrow & Middleman Terms</h2>

            {/* Escrow summary banner */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Dog Name</span>
                <span className="font-bold">{dog.name} ({dog.breed})</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Total Adoption Deposit</span>
                <span className="text-xl font-extrabold text-amber-400">
                  R {dog.listing_price_zar.toLocaleString("en-ZA")}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Central Escrow Custody</span>
                <span className="text-emerald-400 font-bold">100% Refundable if Handover Fails</span>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
                <span>Notice Regarding Middleman Rehoming</span>
              </div>
              <p className="leading-relaxed">
                By submitting this application, you agree to make the escrow deposit only through the
                secure PLF payment portal once approved. You will not send direct cash or bank transfers
                to third parties outside the PLF system.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-brand-600"
              />
              <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                I confirm that all provided details are accurate, and I agree to the PLF Middleman Escrow
                and Pre-handover Veterinary Clearance protocols.
              </span>
            </label>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!agreeTerms}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Adoption Application</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
