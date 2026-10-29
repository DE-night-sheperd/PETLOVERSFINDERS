"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Dog,
  Upload,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Image as ImageIcon,
  ArrowRight,
  Info,
} from "lucide-react";
import { usePLFStore } from "@/lib/store";

const PHOTO_PRESETS = [
  {
    label: "Golden Mix Pup",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Labrador / Retriever",
    url: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Beagle / Hound",
    url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Shepherd Mix",
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Bulldog / Terrier",
    url: "https://images.unsplash.com/photo-1558944351-d4e6a4b6c7b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Fluffy / Shih Tzu",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  },
];

const AVAILABLE_TAGS = [
  "Great with Kids",
  "House Trained",
  "Gentle Soul",
  "High Energy",
  "Apartment Friendly",
  "Cat Friendly",
  "Couch Cuddler",
  "Loves Water",
  "Protective & Alert",
  "Leash Trained",
];

export default function NewDogPage() {
  const router = useRouter();
  const { addDog, currentUser } = usePLFStore();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [ageMonths, setAgeMonths] = useState<number>(18);
  const [color, setColor] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [location, setLocation] = useState("Johannesburg (Randburg)");
  const [priceZar, setPriceZar] = useState<number>(1450);
  const [primaryImage, setPrimaryImage] = useState(PHOTO_PRESETS[0].url);
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Great with Kids", "House Trained"]);

  // Health checklist
  const [vaccinated, setVaccinated] = useState(true);
  const [dewormed, setDewormed] = useState(true);
  const [microchipped, setMicrochipped] = useState(true);
  const [sterilized, setSterilized] = useState(true);
  const [vetNotes, setVetNotes] = useState("Up to date on Rabies & 5-in-1 vaccinations.");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPrimaryImage(String(uploadEvent.target.result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (status: "pending_review" | "active") => {
    if (!name.trim() || !breed.trim()) {
      alert("Please provide the dog's name and breed.");
      return;
    }

    const created = addDog({
      name: name.trim(),
      breed: breed.trim(),
      age_months: Number(ageMonths) || 12,
      color: color || "Tan & White",
      gender,
      size,
      location,
      listing_price_zar: Number(priceZar) || 1200,
      status,
      primary_image: primaryImage,
      gallery: [primaryImage],
      description: description || `${name} is an affectionate and wonderful family companion.`,
      story: story || `${name} is looking for a loving home through safe PLF oversight.`,
      rehomer_name: currentUser.name,
      rehomer_email: currentUser.email,
      personality_tags: selectedTags.length > 0 ? selectedTags : ["Friendly", "Playful"],
      health_status: {
        vaccinated,
        dewormed,
        microchipped,
        sterilized,
        vet_notes: vetNotes,
      },
    });

    router.push(`/dogs/${created.id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>PLF Rehomer Protected Listing</span>
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Rehomer Portal
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900">List a Dog for Rehoming</h1>
              <p className="mt-2 text-xs text-slate-500">
                Protect your privacy. Adopters never see your personal address or phone number.
                All handovers occur after PLF escrow deposit and SAVC vet voucher clearance.
              </p>
            </div>

            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Dog Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luna, Milo, Bella"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Breed / Mix *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Labrador Mix, Africanis, Beagle"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Age in Months
                </label>
                <input
                  type="number"
                  min="2"
                  max="200"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Male", "Female"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`rounded-xl py-2.5 text-xs font-bold transition border ${
                        gender === g
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Small", "Medium", "Large"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`rounded-xl py-2.5 text-xs font-bold transition border ${
                        size === s
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Color / Markings
                </label>
                <input
                  type="text"
                  placeholder="e.g. Honey Brown, Black & White"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Location (South Africa)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Johannesburg (Fourways)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Adoption Fee (ZAR)
                  </label>
                  <span className="text-xs font-bold text-emerald-600">
                    You receive 90%: R {Math.round(priceZar * 0.9).toLocaleString("en-ZA")}
                  </span>
                </div>
                <input
                  type="number"
                  min="400"
                  max="10000"
                  step="50"
                  value={priceZar}
                  onChange={(e) => setPriceZar(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  PLF retains 10% to cover the SAVC vet voucher discount and escrow fraud protection.
                </span>
              </div>
            </div>

            {/* Photo Selection */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block">
                Dog Primary Photo
              </label>

              {/* Upload custom file */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-400">or choose from preset puppy photos:</span>
              </div>

              {/* Presets grid */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 pt-1">
                {PHOTO_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrimaryImage(p.url)}
                    className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                      primaryImage === p.url
                        ? "border-brand-600 ring-2 ring-brand-300"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Personality Tags */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block">
                Personality & Temperament Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition border ${
                        isSelected
                          ? "bg-amber-100 border-amber-300 text-amber-900 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Health & Medical Checklist */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block">
                Health & Vet Status Checklist
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Vaccinated", state: vaccinated, setter: setVaccinated },
                  { label: "Dewormed", state: dewormed, setter: setDewormed },
                  { label: "Microchipped", state: microchipped, setter: setMicrochipped },
                  { label: "Sterilized", state: sterilized, setter: setSterilized },
                ].map((item) => (
                  <label
                    key={item.label}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition ${
                      item.state
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="accent-emerald-600 h-4 w-4"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Veterinary checkup notes (e.g. Clinic name, vaccine dates)..."
                  value={vetNotes}
                  onChange={(e) => setVetNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>
            </div>

            {/* Bio & Story */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  About the Dog
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe personality, favorite activities, how they behave with children, house habits..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Reason for Rehoming
                </label>
                <textarea
                  rows={3}
                  placeholder="E.g. Relocating, change in living circumstances, family estate downsizing..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs focus:bg-white"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleSubmit("active")}
                className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
              >
                <span>Publish Listing Immediately</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("pending_review")}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Submit for Admin Verification
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Live Marketplace Preview</span>
              <span className="text-brand-600 font-semibold normal-case">Updates in real-time</span>
            </div>

            {/* Preview Card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-soft">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <img
                  src={primaryImage}
                  alt={name || "Dog Preview"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700 shadow-xs">
                    Preview
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="rounded-xl bg-slate-900/85 backdrop-blur-md px-3 py-1 text-white">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">
                      Adoption Fee
                    </span>
                    <span className="text-sm font-extrabold">
                      R {Number(priceZar || 0).toLocaleString("en-ZA")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{name || "Your Dog's Name"}</h3>
                    <p className="text-xs text-slate-500">{breed || "Breed Specification"}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {gender}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {size}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedTags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-900 border border-amber-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500 flex justify-between">
                  <span>{location}</span>
                  <span>{ageMonths} months</span>
                </div>
              </div>
            </div>

            {/* Rehomer Escrow FAQ */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-brand-600" />
                <span>How Rehomers Get Paid</span>
              </div>
              <p className="leading-relaxed">
                Adopter funds are deposited in escrow before handover. Once your SAVC vet voucher
                examination is complete and the adopter confirms receipt, your 90% payout is
                transferred directly to your South African bank account.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
