import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { DogCard } from "@/components/DogCard";
import { dogListings } from "@/lib/mock-data";

export default function HomePage() {
  const featuredDogs = dogListings.slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                Trusted pet rehoming with PLF oversight
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Find a safe, happy forever home for your dog.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                Pet rehoming without the risk. PLF manages all listings, approvals, vet checks, and transparent handovers.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dogs"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
                >
                  View dogs
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/rehomer/new-dog"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  List a dog
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Active listings", value: "120+" },
                  { label: "Vet clearance checks", value: "99%" },
                  { label: "Rehoming success", value: "4.9/5" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"
                alt="Happy dog"
                className="h-[440px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Safe by design",
              description: "PLF keeps all direct contact hidden and manages approvals centrally.",
            },
            {
              icon: HeartHandshake,
              title: "Transparent process",
              description: "From application to handover, every step is tracked and visible to admins.",
            },
            {
              icon: Sparkles,
              title: "Supportive aftercare",
              description: "Partner vets and health clearances reduce risk before the final handover.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">Featured dogs</p>
              <h2 className="mt-2 text-3xl font-bold">Recently listed companions</h2>
            </div>
            <Link href="/dogs" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
              Browse all dogs →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
