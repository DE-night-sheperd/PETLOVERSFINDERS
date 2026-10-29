"use client";

import Link from "next/link";
import { ShieldCheck, Heart, RotateCcw, Lock, ExternalLink, Utensils, Stethoscope } from "lucide-react";
import { usePLFStore } from "@/lib/store";

export function Footer() {
  const { resetToDefaults } = usePLFStore();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                petLovers<span className="text-brand-600">Finders</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500">
              South Africa's dedicated middleman rehoming platform & community welfare fund. We protect
              pets with central escrow custody, pre-handover SAVC veterinary vouchers, and the
              community-backed <strong>Bark Back Feed & Vaccinate Fund</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Escrow Safe
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-800">
                <Heart className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Bark Back Fund
              </span>
            </div>
          </div>

          {/* Adoption Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Adoption</h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm">
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

          {/* Bark Back Fund & Rehoming */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Bark Back Fund
            </h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/donate"
                  className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                >
                  <Heart className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>Donate & Feed Dogs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/vaccine-incentive"
                  className="text-purple-700 font-semibold hover:text-purple-800 flex items-center gap-1.5"
                >
                  <Stethoscope className="h-3 w-3" />
                  <span>Vaccine Subsidy Grant</span>
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Governance</h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm">
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
              title="Reset all listings, donations, and state back to fresh demo seed"
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
