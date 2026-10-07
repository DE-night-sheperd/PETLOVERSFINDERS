import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";

export interface DogListing {
  id: string;
  name: string;
  breed: string;
  age_months: number;
  color: string;
  gender: string;
  size: string;
  location: string;
  listing_price_zar: number;
  status: "active" | "pending_review" | "under_adoption" | "adopted";
  primary_image: string;
  gallery: string[];
  description: string;
  story: string;
}
