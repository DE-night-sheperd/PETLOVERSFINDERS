"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  QrCode,
  Stethoscope,
  Building2,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";
import { southAfricanVetPartners } from "@/lib/mock-data";

export default function VoucherPage() {
  const params = useParams();
  const dogId = String(params.dogId);

  const { dogs, vouchers, addToast } = usePLFStore();
  const dog = dogs.find((d) => d.id === dogId) || dogs[0];

  const voucher =
    vouchers.find((v) => v.dog_id === dog.id) || {
      id: "PLF-VCH-DEFAULT",
      dog_id: dog.id,
      dog_name: dog.name,
      voucher_code: `PLF-VET-2026-${dog.name.toUpperCase().replace(/\s+/g, "")}`,
      discount_percent: 15,
      partner_clinic: "PLF Partner Veterinary Network (SAVC Certified)",
      expiry_date: "2026-11-25",
      status: "active" as const,
      issued_at: new Date().toISOString(),
    };

  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(southAfricanVetPartners[0].name);
  const [appointmentDate, setAppointmentDate] = useState("2026-11-05");

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleBookAppointment = () => {
    setAppointmentModalOpen(false);
    addToast(
      "success",
      "Vet Appointment Scheduled! 🩺",
      `Appointment requested at ${selectedClinic} for ${dog.name} on ${appointmentDate}.`
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/dogs/${dog.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {dog.name}'s Profile</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            <span>Print Certificate</span>
          </button>
          <Link
            href={`/rehomer/upload-clearance/${dog.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
          >
            <span>Upload Clearance</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Voucher Certificate (Printable) */}
      <div className="rounded-[2.5rem] border-2 border-brand-200/90 bg-white p-8 sm:p-12 shadow-soft relative overflow-hidden">
        {/* Subtle decorative stamp watermark */}
        <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none text-[160px] font-black text-slate-900 select-none">
          SAVC
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 text-2xl border border-brand-100">
              🩺
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Official Veterinary Subsidy Certificate
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">PLF Veterinary Health Voucher</h1>
            </div>
          </div>

          <div className="rounded-2xl bg-purple-50 border border-purple-200 px-4 py-2 text-purple-900 text-right">
            <span className="text-[10px] font-bold uppercase block tracking-wider text-purple-700">
              Discount Value
            </span>
            <span className="text-xl font-extrabold text-purple-800">15% SAVC Discount</span>
          </div>
        </div>

        {/* Voucher Code & QR Card */}
        <div className="mt-8 rounded-3xl border border-dashed border-brand-300 bg-gradient-to-br from-brand-50/60 to-white p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Authorized Voucher Code
                </span>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-brand-700 tracking-wider">
                  {voucher.voucher_code}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400 block">Dog Candidate</span>
                  <span className="font-bold text-slate-900">{dog.name} ({dog.breed})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location</span>
                  <span className="font-bold text-slate-900">{dog.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expires On</span>
                  <span className="font-bold text-slate-900">{voucher.expiry_date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status</span>
                  <span className="font-bold text-emerald-600">Active / Valid</span>
                </div>
              </div>
            </div>

            {/* Dynamic Scannable QR Representation */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-xl bg-slate-900 p-2 text-white">
                <QrCode className="h-24 w-24 text-white" />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Scan at SAVC Clinic
              </span>
            </div>
          </div>
        </div>

        {/* Terms & Requirements */}
        <div className="mt-8 rounded-2xl bg-slate-50 p-6 border border-slate-200/80 text-xs text-slate-600 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Voucher Instructions & SAVC Scope:</h3>
          <ul className="space-y-1.5 list-disc list-inside text-slate-600 leading-relaxed">
            <li>Present this digital voucher or printed certificate to any authorized PLF partner clinic.</li>
            <li>Applies 15% discount on pre-handover clinical examination, rabies booster, and microchipping.</li>
            <li>The veterinarian must stamp and sign the health clearance booklet for admin verification.</li>
            <li>Once completed, photograph the documentation and upload on the clearance portal.</li>
          </ul>
        </div>

        {/* Quick action buttons */}
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => setAppointmentModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Vet Appointment</span>
          </button>

          <Link
            href={`/rehomer/upload-clearance/${dog.id}`}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <span>Proceed to Upload Clearance Certificate</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* South Africa Partner Clinic Directory */}
      <div className="mt-12 print:hidden space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            SAVC Network
          </span>
          <h2 className="text-xl font-bold text-slate-900">Participating Veterinary Hospitals</h2>
          <p className="text-xs text-slate-500 mt-1">
            These accredited clinics honor the PLF 15% veterinary discount voucher.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {southAfricanVetPartners.map((clinic) => (
            <div
              key={clinic.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{clinic.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    SAVC
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{clinic.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-brand-700 font-semibold">{clinic.discount_applicable}</span>
                <button
                  onClick={() => {
                    setSelectedClinic(clinic.name);
                    setAppointmentModalOpen(true);
                  }}
                  className="font-bold text-slate-900 hover:text-brand-600 underline"
                >
                  Book here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {appointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Schedule Health Check for {dog.name}</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Select Clinic
              </label>
              <select
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900"
              >
                {southAfricanVetPartners.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                Appointment Date
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900"
              />
            </div>

            <div className="rounded-xl bg-purple-50 p-3 border border-purple-200 text-xs text-purple-900">
              Voucher code <strong>{voucher.voucher_code}</strong> will be pre-registered with{" "}
              {selectedClinic}.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAppointmentModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
