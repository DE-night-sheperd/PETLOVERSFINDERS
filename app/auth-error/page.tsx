import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 text-2xl">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Authentication Notice</h1>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        Third-party OAuth providers require configured credentials in production. You can use the
        instant 1-click persona switcher on the top navigation bar to test any role.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
