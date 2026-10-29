import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | petLoversFinders South Africa",
  description: "POPIA compliance policy and data protection framework for petLoversFinders.",
};

export default function PrivacyPage() {
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
              Data Protection & POPIA
            </span>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Protection of Personal Information Act (POPIA Act 4 of 2013) Compliance Notice
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Commitment to Personal Privacy</h2>
              <p>
                petLoversFinders ("PLF") is committed to protecting your privacy in accordance with the
                Protection of Personal Information Act (POPIA). This policy explains what information we
                collect, why we collect it, and your statutory rights to access and delete your records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Privacy by Middleman Design</h2>
              <p>
                Unlike public classified websites where anyone can scrape your mobile number and physical
                address, PLF conceals rehomer and adopter personal information on all public listing
                pages. Only verified PLF operations admins review submitted identity and address records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Contact Information: Full name, verified email address, and mobile number.</li>
                <li>Housing & Environment: Dwelling type, garden fencing verification, and pet notes.</li>
                <li>Veterinary Health Records: SAVC vaccination certificates and veterinary clinic notes.</li>
                <li>Financial Escrow Logs: Bank reference and payment timestamp (we never store card numbers).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Your Statutory POPIA Rights</h2>
              <p>Under sections 23 and 24 of POPIA, you possess the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Request confirmation of whether we hold personal information about you.</li>
                <li>Download a complete export of your personal data archive.</li>
                <li>Request correction or deletion of inaccurate, irrelevant, or obsolete records.</li>
              </ul>
              <p className="mt-2">
                You can manage all consent choices directly through our{" "}
                <Link href="/privacy-settings" className="font-bold text-brand-600 underline">
                  POPIA Privacy Settings Portal
                </Link>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Contact Our Information Officer</h2>
              <p>
                If you have questions regarding data privacy or wish to lodge an inquiry, contact:
                <br />
                <span className="font-mono text-xs text-slate-800">
                  Information Officer: privacy@petloversfinders.co.za
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
