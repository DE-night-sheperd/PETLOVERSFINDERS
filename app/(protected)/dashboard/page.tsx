'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🐕</div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome back, {session.user?.name || session.user?.email}! 👋
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Your secure pet rehoming dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Browse Listings */}
          <Link
            href="/listings"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-soft"
          >
            <div className="text-5xl mb-4">🐕</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              Browse Dogs
            </h3>
            <p className="mt-2 text-slate-600">
              Explore available dogs for rehoming
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Explore
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* My Listings */}
          <Link
            href="/my-listings"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-soft"
          >
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              My Listings
            </h3>
            <p className="mt-2 text-slate-600">
              View and manage your dog listings
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Manage
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* New Listing */}
          <Link
            href="/new-listing"
            className="group rounded-2xl border-2 border-brand-300 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm transition hover:shadow-soft"
          >
            <div className="text-5xl mb-4">➕</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              List Your Dog
            </h3>
            <p className="mt-2 text-slate-600">
              Create a new listing for your dog
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Create
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Applications */}
          <Link
            href="/applications"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-soft"
          >
            <div className="text-5xl mb-4">📬</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              Applications
            </h3>
            <p className="mt-2 text-slate-600">
              Review adoption applications
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Review
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-soft"
          >
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              Profile
            </h3>
            <p className="mt-2 text-slate-600">
              Manage your account settings
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Settings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Data Privacy */}
          <Link
            href="/privacy-settings"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-soft"
          >
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              Privacy & Security
            </h3>
            <p className="mt-2 text-slate-600">
              Control your data and privacy settings
            </p>
            <div className="mt-4 flex items-center text-brand-600 font-semibold">
              Configure
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="mt-12 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-2">🔐 Your Data is Safe</h3>
          <p className="text-blue-700">
            All your information is encrypted and protected. You're authenticated via secure OAuth, and we never store your passwords. Your privacy is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
}
