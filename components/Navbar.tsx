import Link from "next/link";

export function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/dogs", label: "Dogs" },
    { href: "/admin", label: "Admin" },
    { href: "/rehomer/new-dog", label: "Rehomer" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
            P
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">petLoversFinders</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">PLF</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/apply/dog-1" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:inline-flex">
            Adopt now
          </Link>
          <Link href="/admin" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
