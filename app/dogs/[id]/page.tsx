import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, ShieldCheck, Tag } from "lucide-react";
import { dogListings } from "@/lib/mock-data";

export default function DogDetailPage({ params }: { params: { id: string } }) {
  const dog = dogListings.find((item) => item.id === params.id);

  if (!dog) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/dogs" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to dogs
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <img src={dog.primary_image} alt={dog.name} className="h-[520px] w-full object-cover" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {dog.gallery.map((image, index) => (
              <img
                key={`${dog.id}-${index}`}
                src={image}
                alt={`${dog.name} gallery ${index + 1}`}
                className="h-32 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">Available now</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{dog.name}</h1>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {dog.status}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Adoption price</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">R {dog.listing_price_zar.toLocaleString("en-ZA")}</div>
            <p className="mt-2 text-sm text-slate-600">Price set by the rehomer and reviewed by PLF.</p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div className="flex items-center gap-3"><Tag className="h-4 w-4 text-brand-700" /> {dog.breed}</div>
            <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-brand-700" /> {Math.floor(dog.age_months / 12)} years / {dog.age_months} months</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-700" /> {dog.location}</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-brand-700" /> Vet ready and health checked</div>
          </div>

          <Link
            href={`/apply/${dog.id}`}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Apply to adopt
          </Link>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">About {dog.name}</h2>
          <p className="mt-4 leading-7 text-slate-600">{dog.description}</p>
          <p className="mt-4 leading-7 text-slate-600">{dog.story}</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Dog profile</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Name</dt>
              <dd className="font-medium text-slate-900">{dog.name}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Breed</dt>
              <dd className="font-medium text-slate-900">{dog.breed}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Age</dt>
              <dd className="font-medium text-slate-900">{dog.age_months} months</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Color</dt>
              <dd className="font-medium text-slate-900">{dog.color}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Gender</dt>
              <dd className="font-medium text-slate-900">{dog.gender}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Size</dt>
              <dd className="font-medium text-slate-900">{dog.size}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
