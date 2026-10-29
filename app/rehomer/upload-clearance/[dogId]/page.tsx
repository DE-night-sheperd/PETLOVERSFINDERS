"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  FileText,
  Stethoscope,
  ShieldCheck,
  AlertCircle,
  X,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function UploadClearancePage() {
  const params = useParams();
  const router = useRouter();
  const dogId = String(params.dogId);

  const { dogs, submitVetClearance, addToast } = usePLFStore();
  const dog = dogs.find((d) => d.id === dogId) || dogs[0];

  const [clinicName, setClinicName] = useState("Randburg Veterinary Hospital");
  const [vetName, setVetName] = useState("Dr. Karen Van Zyl (BVSc)");
  const [savcRegNumber, setSavcRegNumber] = useState("SAVC-2019-8472");
  const [examDate, setExamDate] = useState("2026-10-28");
  const [vaccinationChecked, setVaccinationChecked] = useState(true);
  const [dewormedChecked, setDewormedChecked] = useState(true);
  const [fitChecked, setFitChecked] = useState(true);
  const [vetNotes, setVetNotes] = useState(
    "Patient is in excellent clinical health. Normal cardiac auscultation, clear eyes, clear lungs. Rabies and 5-in-1 boosters administered."
  );

  const [documentName, setDocumentName] = useState("SAVC_Health_Clearance_Certificate.pdf");
  const [documentUrl, setDocumentUrl] = useState(
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setDocumentUrl(String(uploadEvent.target.result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearDocument = () => {
    setDocumentName("");
    setDocumentUrl("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName) {
      alert("Please upload or attach a vaccination/health certificate document.");
      return;
    }

    submitVetClearance({
      dog_id: dog.id,
      dog_name: dog.name,
      clinic_name: clinicName,
      vet_name: vetName,
      savc_reg_number: savcRegNumber,
      examination_date: examDate,
      vaccination_up_to_date: vaccinationChecked,
      dewormed: dewormedChecked,
      fit_for_rehoming: fitChecked,
      document_name: documentName,
      document_url: documentUrl,
      notes: vetNotes,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/rehomer/voucher/${dog.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Voucher</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
          <Stethoscope className="h-3.5 w-3.5" />
          <span>SAVC Medical Clearance Portal</span>
        </span>
      </div>

      {isSubmitted ? (
        <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-12 shadow-soft text-center animate-in zoom-in-95 duration-150">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 text-3xl">
            🩺
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Clearance Submitted for Verification
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Veterinary Clearance Recorded for {dog.name}!
          </h1>

          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            The health documentation from {clinicName} has been queued for PLF Admin validation.
            Once checked, the handover authorization and escrow payout release will be unlocked.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
            >
              <span>View in Admin Operations Queue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <span>Go to My Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Pre-Handover Veterinary Clearance
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                Upload Health Documentation for {dog.name}
              </h1>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                South African law and PLF policy require verified veterinary confirmation that {dog.name}{" "}
                has received mandatory rabies vaccination, clinical checkup, and is fit for safe
                handover.
              </p>
            </div>

            {/* Document Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block">
                Vaccination Booklet / SAVC Health Certificate File *
              </label>

              {documentName ? (
                /* Attached Document Preview Card */
                <div className="flex items-center justify-between rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{documentName}</div>
                      <div className="text-xs text-brand-700 font-medium mt-0.5">
                        File attached • Ready for Admin verification
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearDocument}
                    className="rounded-lg p-2 text-slate-400 hover:bg-brand-100 hover:text-slate-700"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                /* Drag & Drop Input Card */
                <label className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center cursor-pointer transition hover:bg-brand-50/40 hover:border-brand-300">
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-bold text-slate-900">
                    Click to browse or drop vaccination booklet here
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Accepts clear photos (JPG, PNG) or scanned PDFs
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Clinic & SAVC Registration Details */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Veterinary Examination Details</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Veterinary Clinic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Examining Veterinarian (BVSc) *
                  </label>
                  <input
                    type="text"
                    required
                    value={vetName}
                    onChange={(e) => setVetName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    SAVC Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={savcRegNumber}
                    onChange={(e) => setSavcRegNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                    Date of Health Check *
                  </label>
                  <input
                    type="date"
                    required
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 pt-2">
                <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={vaccinationChecked}
                    onChange={(e) => setVaccinationChecked(e.target.checked)}
                    className="h-4 w-4 rounded accent-brand-600"
                  />
                  <span>Vaccinations Up to Date</span>
                </label>

                <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={dewormedChecked}
                    onChange={(e) => setDewormedChecked(e.target.checked)}
                    className="h-4 w-4 rounded accent-brand-600"
                  />
                  <span>Dewormed & Tick Free</span>
                </label>

                <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={fitChecked}
                    onChange={(e) => setFitChecked(e.target.checked)}
                    className="h-4 w-4 rounded accent-brand-600"
                  />
                  <span>Fit for Rehoming</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Veterinarian Clinical Findings & Treatment Notes
                </label>
                <textarea
                  rows={3}
                  value={vetNotes}
                  onChange={(e) => setVetNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs focus:bg-white"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-brand-600 px-8 py-3.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Clearance for Admin Approval</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
