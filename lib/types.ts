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

// -------------------------------------------------------------
// DONATIONS & VACCINATION INCENTIVE SUBSIDY TYPES
// -------------------------------------------------------------

export type DonationAllocation = "both" | "vaccines" | "meals";

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount_zar: number;
  allocated_to: DonationAllocation;
  message: string;
  is_anonymous: boolean;
  payment_method: "PayFast" | "Ozow Instant EFT" | "SnapScan" | "Debit / Credit Card";
  created_at: string;
  transaction_ref: string;
}

export type IncentiveStatus =
  | "pending_review"
  | "approved"
  | "voucher_issued"
  | "redeemed_at_clinic"
  | "declined";

export type IncomeBracket =
  | "sassa_recipient"
  | "unemployed_affidavit"
  | "low_income_under_8500"
  | "pensioner_or_student";

export interface VaccineIncentiveApplication {
  id: string;
  applicant_name: string;
  sa_id_number: string; // 13-digit SA ID
  applicant_email: string;
  applicant_phone: string;
  city: string;
  residential_address: string;
  income_bracket: IncomeBracket;
  proof_of_income_doc: string;
  proof_of_residence_doc: string;
  pet_name: string;
  pet_breed: string;
  pet_age_months: number;
  pet_photo_url: string;
  preferred_partner_clinic: string;
  hardship_reason: string;
  subsidy_amount_zar: number; // e.g. R350 (Full Rabies + 5-in-1 vaccination package directly paid to vet)
  voucher_code?: string;
  status: IncentiveStatus;
  anti_fraud_declaration: boolean;
  admin_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
}

export interface DonationPoolStats {
  total_donated_zar: number;
  meals_funded_count: number; // calculated e.g. R25/meal
  vaccinations_funded_count: number; // calculated e.g. R350/vaccine
  active_grants_count: number;
  remaining_pool_zar: number;
}
