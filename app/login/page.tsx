"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dog, ArrowRight, ShieldCheck, Lock, Mail, User } from "lucide-react";
import { usePLFStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { switchPersona, addToast } = usePLFStore();
  const [email, setEmail] = useState("");

  const handleQuickLogin = (role: "adopter" | "rehomer" | "admin") => {
    switchPersona(role);
    addToast("success", "Signed In Successfully! 🚀", `Welcome to your PLF dashboard.`);
    router.push("/dashboard");
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    switchPersona("adopter");
    addToast("success", "Signed In! 🐾", `Signed in as ${email}.`);
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-soft">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl border border-brand-100">
            🐕
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Sign in to petLoversFinders</h1>
          <p className="mt-1 text-xs text-slate-500">
            Safe, verified rehoming across South Africa.
          </p>
        </div>

        {/* 1-Click Fast Persona Access */}
        <div className="mt-8 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
            Instant 1-Click Persona Access
          </div>

          <button
            type="button"
            onClick={() => handleQuickLogin("adopter")}
            className="w-full flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100/70"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">👤</span>
              <div className="text-left">
                <div>Continue as Adopter</div>
                <div className="text-[10px] text-emerald-700 font-normal">Sipho Dlamini (Browse & Apply)</div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-700" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("rehomer")}
            className="w-full flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/60 p-3.5 text-xs font-bold text-blue-950 transition hover:bg-blue-100/70"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🏡</span>
              <div className="text-left">
                <div>Continue as Rehomer</div>
                <div className="text-[10px] text-blue-700 font-normal">Anika Van Der Merwe (List & Vouchers)</div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-700" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("admin")}
            className="w-full flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50/60 p-3.5 text-xs font-bold text-purple-950 transition hover:bg-purple-100/70"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🛡️</span>
              <div className="text-left">
                <div>Continue as PLF Operations</div>
                <div className="text-[10px] text-purple-700 font-normal">Admin Command Center</div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-purple-700" />
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-semibold text-slate-400">or sign in with email</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Custom Email Form */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.co.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800"
          >
            Sign In with Email
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-brand-600 underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-600 underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
