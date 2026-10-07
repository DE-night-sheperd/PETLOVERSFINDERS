import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-lg font-bold text-slate-900">petLoversFinders</div>
          <p className="mt-2 text-sm text-slate-600">Rehoming dogs with safety, transparency, and trust.</p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-600">
          <Link href="/dogs">Browse dogs</Link>
          <Link href="/rehomer/new-dog">List a dog</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
