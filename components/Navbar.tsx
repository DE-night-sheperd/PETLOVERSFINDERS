'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'loading') {
    return (
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={session ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="text-2xl">🐕</div>
            <span className="text-xl font-bold text-slate-900">petLoversFinders</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/listings"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Browse Dogs
                </Link>
                <Link
                  href="/my-listings"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  My Listings
                </Link>
                <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-200" />
                    <span className="text-sm font-medium text-slate-700">
                      {session.user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/"
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/listings"
                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition"
                >
                  Browse Dogs
                </Link>
                <Link
                  href="/my-listings"
                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition"
                >
                  My Listings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="block px-4 py-2 text-sm font-medium text-center bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
