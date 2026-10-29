export interface DogListing {
  id: string;
  name: string;
  breed: string;
  age_months: number;
  color: string;
  gender: "Male" | "Female";
  size: "Small" | "Medium" | "Large";
  location: string;
  listing_price_zar: number;
  status: "active" | "pending_review" | "under_adoption" | "vet_cleared" | "adopted" | "rejected";
  primary_image: string;
  gallery: string[];
  description: string;
  story: string;
  rehomer_name?: string;
  rehomer_email?: string;
  personality_tags: string[];
  health_status: {
    vaccinated: boolean;
    dewormed: boolean;
    microchipped: boolean;
    sterilized: boolean;
    vet_notes?: string;
  };
  created_at: string;
  views: number;
  likes: number;
}

export type ApplicationStatus =
  | "pending_admin"
  | "approved"
  | "deposit_paid"
  | "vet_clearing"
  | "ready_handover"
  | "completed"
  | "rejected";

export interface AdoptionApplication {
  id: string;
  dog_id: string;
  dog_name: string;
  dog_image: string;
  dog_price_zar: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  city: string;
  housing_type: string;
  yard_fenced: boolean;
  other_pets: boolean;
  pet_details: string;
  experience_notes: string;
  status: ApplicationStatus;
  submitted_at: string;
  escrow_deposit_zar: number;
  admin_notes?: string;
}

export interface EscrowTransaction {
  id: string;
  application_id: string;
  dog_id: string;
  dog_name: string;
  adopter_email: string;
  rehomer_email: string;
  amount_zar: number;
  platform_fee_zar: number;
  rehomer_payout_zar: number;
  status: "held_in_escrow" | "released_to_rehomer" | "refunded";
  payment_method: "PayFast" | "Ozow Instant EFT" | "Debit / Credit Card";
  created_at: string;
  released_at?: string;
  transaction_ref: string;
}

export interface VetVoucher {
  id: string;
  dog_id: string;
  dog_name: string;
  voucher_code: string;
  discount_percent: number;
  partner_clinic: string;
  expiry_date: string;
  status: "active" | "redeemed" | "clearance_submitted" | "verified";
  issued_at: string;
}

export interface VetClearance {
  id: string;
  dog_id: string;
  dog_name: string;
  clinic_name: string;
  vet_name: string;
  savc_reg_number: string;
  examination_date: string;
  vaccination_up_to_date: boolean;
  dewormed: boolean;
  fit_for_rehoming: boolean;
  document_name: string;
  document_url: string;
  notes: string;
  submitted_at: string;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "adopter" | "rehomer" | "admin";
  phone: string;
  location: string;
  avatar: string;
  bio: string;
  verified: boolean;
  popia_consent: boolean;
}

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
}
