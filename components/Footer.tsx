"use client";

import Link from "next/link";
import { ShieldCheck, Heart, RotateCcw, Lock, ExternalLink } from "lucide-react";
import { usePLFStore } from "@/lib/store";

export function Footer() {
  const { resetToDefaults } = usePLFStore();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                petLovers<span className="text-brand-600">Finders</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              South Africa's dedicated middleman rehoming platform. We protect pets and adopters
              with central escrow payments, pre-handover SAVC veterinary vouchers, and strict identity
              vetting.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Escrow Safe
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 font-semibold text-blue-700">
                <Lock className="h-3.5 w-3.5" /> POPIA Compliant
              </span>
            </div>
          </div>

          {/* Adoption Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Adoption</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/dogs" className="hover:text-brand-600 transition">
                  Browse Available Dogs
                </Link>
              </li>
              <li>
                <Link href="/dogs?breed=Labrador" className="hover:text-brand-600 transition">
                  Labradors & Retrievers
                </Link>
              </li>
              <li>
                <Link href="/dogs?size=Small" className="hover:text-brand-600 transition">
                  Small & Apartment Dogs
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=applications" className="hover:text-brand-600 transition">
                  Application Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Rehoming & Vets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Rehomers & Vets</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/rehomer/new-dog" className="hover:text-brand-600 transition">
                  List a Dog for Rehoming
                </Link>
              </li>
              <li>
                <Link href="/my-listings" className="hover:text-brand-600 transition">
                  My Dog Listings
                </Link>
              </li>
              <li>
                <Link href="/rehomer/voucher/dog-1" className="hover:text-brand-600 transition">
                  Vet Voucher Portal
                </Link>
              </li>
              <li>
                <Link href="/rehomer/upload-clearance/dog-1" className="hover:text-brand-600 transition">
                  Upload Vet Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Governance</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/admin" className="font-semibold text-brand-600 hover:text-brand-700 transition">
                  PLF Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-600 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-settings" className="hover:text-brand-600 transition">
                  POPIA Privacy Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with demo reset */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row text-xs text-slate-400">
          <p>© {new Date().getFullYear()} petLoversFinders (Pty) Ltd. Built for South African Pet Welfare.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              title="Reset all listings and state back to fresh demo seed"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Demo State</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for rescue animals
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
