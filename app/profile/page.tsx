"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Bell,
  Save,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function ProfilePage() {
  const { currentUser, setCurrentUser, addToast, switchPersona } = usePLFStore();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      email,
      phone,
      location,
      bio,
    });
    addToast("success", "Profile Updated! 👤", "Your account settings have been saved.");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>South African ID Verified</span>
        </span>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Account Preferences
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">User Profile & Settings</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Manage your personal contact details, role preferences, and notification channels.
          </p>
        </div>

        {/* User Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-brand-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">{name}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    currentUser.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : currentUser.role === "rehomer"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{location}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Quick Test Switch:</span>
            <button
              onClick={() => switchPersona("adopter")}
              className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold border border-slate-200 hover:bg-slate-100"
            >
              Adopter
            </button>
            <button
              onClick={() => switchPersona("rehomer")}
              className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold border border-slate-200 hover:bg-slate-100"
            >
              Rehomer
            </button>
            <button
              onClick={() => switchPersona("admin")}
              className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold border border-slate-200 hover:bg-slate-100"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                Phone Number (WhatsApp)
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                City / Province
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                Bio & Pet Lifestyle
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="h-4 w-4 text-brand-600" />
              <span>Notification Preferences</span>
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded accent-brand-600 h-4 w-4"
                />
                <span>Email me when application status or escrow updates occur</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="rounded accent-brand-600 h-4 w-4"
                />
                <span>Send urgent WhatsApp notifications for veterinary clearance milestones</span>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
            >
              <Save className="h-4 w-4" />
              <span>Save Profile Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
