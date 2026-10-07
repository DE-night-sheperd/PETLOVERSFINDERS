import type { DogListing } from "@/lib/types";

export const dogListings: DogListing[] = [
  {
    id: "dog-1",
    name: "Luna",
    breed: "Mixed Breed",
    age_months: 18,
    color: "Brown and white",
    gender: "Female",
    size: "Medium",
    location: "Johannesburg",
    listing_price_zar: 1450,
    status: "active",
    primary_image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Luna is a friendly and affectionate mixed breed dog who loves human attention and calm family routines.",
    story:
      "She was rescued from a local shelter and has since settled in beautifully with a foster family. She is playful, affectionate, and great with visitors.",
  },
  {
    id: "dog-2",
    name: "Milo",
    breed: "Labrador Mix",
    age_months: 24,
    color: "Black",
    gender: "Male",
    size: "Large",
    location: "Cape Town",
    listing_price_zar: 1700,
    status: "active",
    primary_image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Milo is energetic, loving, and ready for an active home with plenty of walks and outdoor time.",
    story:
      "He enjoys running around, learning new tricks, and spending time with people who enjoy an active lifestyle.",
  },
  {
    id: "dog-3",
    name: "Ruby",
    breed: "Beagle",
    age_months: 10,
    color: "Orange and white",
    gender: "Female",
    size: "Small",
    location: "Pretoria",
    listing_price_zar: 1200,
    status: "active",
    primary_image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Ruby is playful, curious, and affectionate with a sweet temperament that suits a calm home.",
    story:
      "She loves short walks, soft toys, and a cozy spot near the family. Her gentle personality makes her a wonderful companion.",
  },
  {
    id: "dog-4",
    name: "Theo",
    breed: "German Shepherd Mix",
    age_months: 30,
    color: "Black and tan",
    gender: "Male",
    size: "Large",
    location: "Durban",
    listing_price_zar: 1600,
    status: "active",
    primary_image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Theo is a loyal protector who responds well to structure and routine and is great with active families.",
    story:
      "He has been well socialized and enjoys spending time outdoors with his people. A confident and devoted companion.",
  },
  {
    id: "dog-5",
    name: "Nala",
    breed: "Cocker Spaniel Mix",
    age_months: 14,
    color: "Golden",
    gender: "Female",
    size: "Medium",
    location: "Kimberley",
    listing_price_zar: 1325,
    status: "active",
    primary_image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Nala is a cheerful, affectionate dog who thrives on connection and enjoys a calm, loving home.",
    story:
      "She is gentle with people, enjoys short walks, and adapts well to a family environment with consistent routines.",
  },
];
