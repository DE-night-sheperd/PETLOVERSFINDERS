"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Lock,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Dog,
  User,
  Heart,
  Building2,
  FileText,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";
import { southAfricanVetPartners } from "@/lib/mock-data";
import type { IncomeBracket } from "@/lib/types";

export default function VaccineIncentivePage() {
  const router = useRouter();
  const { submitVaccineIncentive, currentUser, donationPoolStats } = usePLFStore();

  // Form State
  const [applicantName, setApplicantName] = useState(currentUser.name || "");
  const [saIdNumber, setSaIdNumber] = useState("");
  const [applicantEmail, setApplicantEmail] = useState(currentUser.email || "");
  const [applicantPhone, setApplicantPhone] = useState(currentUser.phone || "");
  const [city, setCity] = useState("Johannesburg");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [incomeBracket, setIncomeBracket] = useState<IncomeBracket>("sassa_recipient");
  const [proofOfIncomeDoc, setProofOfIncomeDoc] = useState("Nomsa_SASSA_Card_Verification_2026.pdf");
  const [proofOfResidenceDoc, setProofOfResidenceDoc] = useState("Meadowlands_Municipal_Statement_Sept2026.pdf");

  // Pet Info
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAgeMonths, setPetAgeMonths] = useState<number>(10);
  const [petPhotoUrl, setPetPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80"
  );
  const [preferredClinic, setPreferredClinic] = useState(southAfricanVetPartners[0].name);
  const [hardshipReason, setHardshipReason] = useState("");

  // Anti-fraud checklist declarations
  const [declTruthful, setDeclTruthful] = useState(false);
  const [declNoCash, setDeclNoCash] = useState(false);
  const [declLimit, setDeclLimit] = useState(false);
  const [declCriminalNotice, setDeclCriminalNotice] = useState(false);

  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // South African 13-digit ID Luhn algorithm check helper
  const validateSaId = (id: string): boolean => {
    const cleanId = id.replace(/\s+/g, "");
    if (!/^\d{13}$/.test(cleanId)) return false;
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      let digit = parseInt(cleanId.charAt(i), 10);
      if (i % 2 !== 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const handleIncomeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProofOfIncomeDoc(file.name);
  };

  const handleResidenceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProofOfResidenceDoc(file.name);
  };

  const handlePetPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPetPhotoUrl(String(uploadEvent.target.result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict Anti-Fraud Validation
    const isIdValid = validateSaId(saIdNumber);
    if (!isIdValid) {
      alert(
        "Invalid South African ID Number. Please enter an authentic 13-digit South African ID number for identity verification."
      );
      return;
    }

    if (!declTruthful || !declNoCash || !declLimit || !declCriminalNotice) {
      alert("You must agree to all strict anti-fraud declarations before submitting.");
      return;
    }

    if (!proofOfIncomeDoc || !proofOfResidenceDoc) {
      alert("Please upload both Proof of Income/SASSA and Proof of Residence.");
      return;
    }

    const created = submitVaccineIncentive({
      applicant_name: applicantName.trim(),
      sa_id_number: saIdNumber.trim(),
      applicant_email: applicantEmail.trim(),
      applicant_phone: applicantPhone.trim(),
      city: city.trim(),
      residential_address: residentialAddress.trim(),
      income_bracket: incomeBracket,
      proof_of_income_doc: proofOfIncomeDoc,
      proof_of_residence_doc: proofOfResidenceDoc,
      pet_name: petName.trim(),
      pet_breed: petBreed.trim(),
      pet_age_months: Number(petAgeMonths) || 12,
      pet_photo_url: petPhotoUrl,
      preferred_partner_clinic: preferredClinic,
      hardship_reason: hardshipReason.trim(),
      anti_fraud_declaration: true,
    });

    setSubmittedAppId(created.id);
  };

  if (submittedAppId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-[2.5rem] border-2 border-emerald-300 bg-white p-8 sm:p-12 shadow-soft text-center animate-in zoom-in-95 duration-150">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 text-3xl">
            🩺📋
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Application Ref: {submittedAppId}
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Subsidy Application Submitted for {petName}!
          </h1>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Your vaccination incentive request has been routed to our risk and anti-fraud team for
            strict SASSA/income document and South African ID verification.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900">Verification Timeline & Reminders:</div>
            <ul className="space-y-1 list-disc list-inside text-slate-600">
              <li>Review turnaround: 24 to 48 business hours.</li>
              <li>
                Upon approval, an official non-cash voucher is sent directly to{" "}
                <strong>{preferredClinic}</strong>.
              </li>
              <li>You will receive an SMS and WhatsApp token to present with your dog.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin"
              className="rounded-2xl bg-purple-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-purple-800"
            >
              Test Admin Verification (Demo)
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Return to Dashboard
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
        href="/donate"
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Bark Back Fund</span>
      </Link>

      {/* Strict Anti-Fraud Notice Banner */}
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/10 via-amber-50 to-amber-500/10 p-6 sm:p-8 mb-8 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 font-extrabold text-sm uppercase tracking-wider">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
          <span>Strict Anti-Fraud Criteria & Governance Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The <strong>Bark Back Community Vaccination Fund</strong> is created through personal
          donations from everyday animal lovers to protect dogs of genuinely indigent families and
          rescue fosters. To safeguard public generosity from fraudulent exploitation:
        </p>
        <div className="grid gap-2 text-xs text-slate-700 sm:grid-cols-2 pt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>No cash is ever disbursed</strong> to applicants.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Direct vouchers paid only to <strong>accredited SAVC Vets</strong>.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>1 dog per household</strong> per 12 months.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Mandatory <strong>SASSA or income proof verification</strong>.</span>
          </div>
        </div>
      </div>

      {/* Main Application Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Applicant Identity & South African Verification */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-5 w-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">
              1. Applicant Identity & South African Citizenship
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Full Legal Name (as on ID book) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nomsa Mthembu"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                13-Digit South African ID Number *
              </label>
              <input
                type="text"
                required
                maxLength={13}
                placeholder="e.g. 8804120892083"
                value={saIdNumber}
                onChange={(e) => setSaIdNumber(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-mono focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Checked against the South African Luhn algorithm checksum to prevent fake IDs.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Mobile Number (for SMS & WhatsApp Voucher token) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +27 72 884 9102"
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                City / Town *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Physical Residential Address *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1482 Zone 3, Meadowlands, Soweto"
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Means & Financial Hardship Verification */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="h-5 w-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">
              2. Financial Need Verification (Strict Means Test)
            </h2>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
              Select Your Financial Assistance Category *
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                {
                  id: "sassa_recipient",
                  title: "SASSA Grant Recipient",
                  desc: "Old age, child support, or disability grant holder",
                },
                {
                  id: "unemployed_affidavit",
                  title: "Unemployed with Police Affidavit",
                  desc: "Certified SAPS affidavit confirming current unemployment",
                },
                {
                  id: "low_income_under_8500",
                  title: "Low-Income Household",
                  desc: "Combined household income strictly under R 8,500/month",
                },
                {
                  id: "pensioner_or_student",
                  title: "State Pensioner or Full-Time Student",
                  desc: "Retiree on state pension or tertiary student foster parent",
                },
              ].map((b) => (
                <div
                  key={b.id}
                  onClick={() => setIncomeBracket(b.id as any)}
                  className={`rounded-2xl border p-3.5 cursor-pointer transition ${
                    incomeBracket === b.id
                      ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-300"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{b.title}</span>
                    <input
                      type="radio"
                      name="incomeBracket"
                      checked={incomeBracket === b.id}
                      onChange={() => setIncomeBracket(b.id as any)}
                      className="accent-brand-600 h-3.5 w-3.5"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block leading-relaxed">
                    {b.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Document Uploads */}
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Upload Proof of Income / SASSA Card Scan *
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 p-3 cursor-pointer hover:bg-slate-100 transition">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="h-4 w-4 text-brand-600 shrink-0" />
                  <span className="text-xs text-slate-700 truncate">{proofOfIncomeDoc}</span>
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleIncomeFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Upload Proof of Residence (Utility Bill / Affidavit) *
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 p-3 cursor-pointer hover:bg-slate-100 transition">
                <div className="flex items-center gap-2 truncate">
                  <FileCheck className="h-4 w-4 text-brand-600 shrink-0" />
                  <span className="text-xs text-slate-700 truncate">{proofOfResidenceDoc}</span>
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleResidenceFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
              Detailed Statement of Hardship *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explain your family/financial circumstances and why your dog urgently requires community vaccination support..."
              value={hardshipReason}
              onChange={(e) => setHardshipReason(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs focus:bg-white"
            />
          </div>
        </div>

        {/* Section 3: Pet Identity & SAVC Clinic Allocation */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Dog className="h-5 w-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">
              3. Pet Identity (No Ghost Dog Verification)
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Pet Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Spike, Bruno"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Breed / Mix *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Africanis, Terrier"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Age in Months *
              </label>
              <input
                type="number"
                min="2"
                max="180"
                required
                value={petAgeMonths}
                onChange={(e) => setPetAgeMonths(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Allocated SAVC Partner Veterinary Hospital *
              </label>
              <select
                value={preferredClinic}
                onChange={(e) => setPreferredClinic(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
              >
                {southAfricanVetPartners.map((clinic) => (
                  <option key={clinic.name} value={clinic.name}>
                    {clinic.name} ({clinic.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Photo of Pet *
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-2.5 cursor-pointer text-xs font-bold text-slate-700 hover:bg-slate-100">
                <Upload className="h-4 w-4" />
                <span>Upload Pet Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePetPhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Anti-Fraud Sworn Declarations */}
        <div className="rounded-3xl border-2 border-red-200 bg-rose-50/40 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm uppercase tracking-wider">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <span>4. Mandatory Anti-Fraud Sworn Declaration</span>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={declTruthful}
                onChange={(e) => setDeclTruthful(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-rose-600"
              />
              <span className="font-semibold leading-relaxed">
                I declare under oath that the dog named above is my personal companion under my care and
                is not being kept for commercial breeding, sale, or trade.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={declNoCash}
                onChange={(e) => setDeclNoCash(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-rose-600"
              />
              <span className="font-semibold leading-relaxed">
                I understand that <strong>NO cash will be paid to me</strong>. The community grant (R
                350 value) will be credited directly to the accredited veterinary clinic upon physical
                examination of the pet.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={declLimit}
                onChange={(e) => setDeclLimit(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-rose-600"
              />
              <span className="font-semibold leading-relaxed">
                I certify that neither I nor any resident of my household has applied for or received a
                vaccine subsidy incentive from PLF within the past 12 months.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={declCriminalNotice}
                onChange={(e) => setDeclCriminalNotice(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-rose-600"
              />
              <span className="font-semibold leading-relaxed">
                I acknowledge that submitting fraudulent SASSA documents, forged pay slips, or fake pet
                records constitutes criminal fraud and will be reported directly to the South African
                Police Service (SAPS).
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 px-8 py-4 text-sm font-bold text-white shadow-soft transition hover:from-purple-800 hover:to-indigo-900"
          >
            <Stethoscope className="h-4 w-4" />
            <span>Submit for Anti-Fraud Verification</span>
          </button>
        </div>
      </form>
    </div>
  );
}
