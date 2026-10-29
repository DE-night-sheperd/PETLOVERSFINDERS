"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  ShieldCheck,
  PlusCircle,
  LayoutDashboard,
  Dog,
  ChevronDown,
  User,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const {
    favorites,
    currentUser,
    switchPersona,
    applications,
    dogs,
  } = usePLFStore();

  const pendingAdminCount =
    dogs.filter((d) => d.status === "pending_review").length +
    applications.filter((a) => a.status === "pending_admin").length;

  const navLinks = [
    { label: "Browse Dogs", href: "/dogs", icon: Dog },
    { label: "List a Dog", href: "/rehomer/new-dog", icon: PlusCircle },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Admin Portal",
      href: "/admin",
      icon: ShieldCheck,
      badge: pendingAdminCount > 0 ? pendingAdminCount : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner Notice for middleman model */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-slate-300">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>South Africa's Trusted Middleman Pet Rehoming — 100% Escrow Protected & SAVC Vet Cleared</span>
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 border border-brand-100 text-xl shadow-xs transition group-hover:scale-105">
            🐕
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-slate-900">
              <span className="text-lg">petLovers</span>
              <span className="text-lg text-brand-600">Finders</span>
              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                ZA
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400">Escrow & Vet Protected</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-brand-600" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white shadow-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Favorites + Interactive Persona Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Wishlist / Favorites Pill */}
          <Link
            href="/dashboard?tab=favorites"
            className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-rose-300 hover:bg-rose-50"
            title="View saved dogs"
          >
            <Heart className={`h-4 w-4 ${favorites.length > 0 ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"}`} />
            <span>Saved</span>
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 group-hover:bg-rose-100 group-hover:text-rose-700">
              {favorites.length}
            </span>
          </Link>

          {/* Persona Switcher / Role Selector (Live Testing Helper) */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-2 pr-3 text-xs font-semibold text-slate-800 shadow-xs transition hover:bg-white hover:border-slate-300"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-6 w-6 rounded-full object-cover border border-slate-200"
              />
              <span className="max-w-[110px] truncate">{currentUser.name}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider ${
                  currentUser.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : currentUser.role === "rehomer"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {currentUser.role}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Test Persona
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Click to test as different users:
                  </div>
                </div>

                <div className="mt-1 space-y-1">
                  <button
                    onClick={() => {
                      switchPersona("adopter");
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition ${
                      currentUser.role === "adopter"
                        ? "bg-emerald-50 text-emerald-900 font-semibold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div className="flex-1">
                      <div className="font-medium">Sipho Dlamini</div>
                      <div className="text-[10px] text-slate-400">Adopter (Search & Apply)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchPersona("rehomer");
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition ${
                      currentUser.role === "rehomer"
                        ? "bg-blue-50 text-blue-900 font-semibold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium">Anika Van Der Merwe</div>
                      <div className="text-[10px] text-slate-400">Rehomer (List & Vouchers)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchPersona("admin");
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition ${
                      currentUser.role === "admin"
                        ? "bg-purple-50 text-purple-900 font-semibold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <div className="flex-1">
                      <div className="font-medium">PLF Operations Team</div>
                      <div className="text-[10px] text-slate-400">Admin (Escrow & Clearances)</div>
                    </div>
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setRoleMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>My Profile & Settings</span>
                  </Link>
                  <Link
                    href="/privacy-settings"
                    onClick={() => setRoleMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>POPIA Privacy Controls</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/dashboard?tab=favorites"
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-2 text-slate-700"
          >
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span className="text-xs font-bold">{favorites.length}</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2">Switch Active Persona:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  switchPersona("adopter");
                  setIsOpen(false);
                }}
                className={`rounded-xl p-2 text-center text-xs font-semibold ${
                  currentUser.role === "adopter" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                }`}
              >
                Adopter
              </button>
              <button
                onClick={() => {
                  switchPersona("rehomer");
                  setIsOpen(false);
                }}
                className={`rounded-xl p-2 text-center text-xs font-semibold ${
                  currentUser.role === "rehomer" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"
                }`}
              >
                Rehomer
              </button>
              <button
                onClick={() => {
                  switchPersona("admin");
                  setIsOpen(false);
                }}
                className={`rounded-xl p-2 text-center text-xs font-semibold ${
                  currentUser.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
