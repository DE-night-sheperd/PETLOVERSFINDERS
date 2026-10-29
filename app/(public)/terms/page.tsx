import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | petLoversFinders South Africa",
  description: "Terms and conditions governing the PLF middleman pet rehoming network and escrow trust.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Legal Framework
            </span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Terms of Service</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Effective Date: 29 October 2026 • Governing Law: Republic of South Africa
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. The PLF Middleman Model</h2>
              <p>
                petLoversFinders (Pty) Ltd ("PLF") operates exclusively as a trusted intermediary between
                rehomers and adopters. To prevent scams, stolen animal trafficking, and unsafe breeding,
                all communications, listing reviews, escrow custody, and veterinary voucher validations
                must be conducted through the PLF platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Central Escrow Trust Protocol</h2>
              <p>
                Adopters must deposit the agreed adoption fee into the central PLF Escrow Trust Account.
                Funds are strictly held in custody and are not released to the rehomer until:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Pre-handover SAVC veterinary check has been completed.</li>
                <li>Admin verifies the official health clearance certificate.</li>
                <li>Both parties confirm safe physical handover.</li>
              </ul>
              <p>
                If a dog fails the SAVC veterinary health examination or if the rehomer fails handover
                commitments, the adopter receives a 100% refund of their escrow deposit.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Prohibition of Direct Cash Payments</h2>
              <p>
                Users agree not to bypass PLF by requesting or transmitting unverified cash, direct bank
                wires, or cryptocurrency outside the platform. Attempting to bypass the escrow trust
                invalidates health guarantees and results in immediate profile suspension.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Veterinary Health Vouchers</h2>
              <p>
                PLF provides a 15% discount voucher for pre-handover health checks redeemable at
                accredited South African Veterinary Council (SAVC) registered clinics. Rehomers are
                obligated to present the animal for examination and submit official stamped documentation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Governing Law and Jurisdiction</h2>
              <p>
                These terms are governed by the laws of South Africa. Any disputes arising in connection
                with these terms shall be subject to the exclusive jurisdiction of the South African courts.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
