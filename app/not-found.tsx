import Link from "next/link";
import { ArrowLeft, Home, Dog } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-50 text-4xl shadow-xs">
        🐕🐾
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">404: Lost Puppy!</h1>
      <p className="mt-3 text-sm text-slate-500 leading-relaxed">
        The page you are looking for seems to have trotted off. Let's get you back to safe territory!
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/dogs"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Dog className="h-4 w-4" />
          <span>Browse Available Dogs</span>
        </Link>
      </div>
    </div>
  );
}
