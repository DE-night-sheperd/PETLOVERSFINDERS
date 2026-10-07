-- Supabase / PostgreSQL schema for petLoversFinders (PLF)
-- Includes enums, tables for profiles, dog_listings, dog_images,
-- adoption_applications, escrow_transactions, and vet_vouchers.

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('adopter', 'rehomer', 'vet_partner', 'admin');
CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'active', 'under_adoption', 'vet_clearance_pending', 'ready_for_handover', 'adopted', 'cancelled');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected', 'deposit_paid');
CREATE TYPE escrow_status AS ENUM ('held', 'released_to_rehomer', 'refunded');

-- 2. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    role user_role DEFAULT 'adopter',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOG LISTINGS
CREATE TABLE dog_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rehomer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    age_months INT NOT NULL,
    color TEXT NOT NULL,
    gender TEXT NOT NULL,
    size TEXT NOT NULL, -- Small, Medium, Large
    description TEXT NOT NULL,
    listing_price_zar NUMERIC DEFAULT 400.00,
    status listing_status DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DOG IMAGES
CREATE TABLE dog_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dog_id UUID REFERENCES dog_listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE
);

-- 5. ADOPTION APPLICATIONS
CREATE TABLE adoption_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dog_id UUID REFERENCES dog_listings(id) ON DELETE CASCADE,
    adopter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    housing_type TEXT NOT NULL, -- e.g., House with garden, Apartment
    yard_fenced BOOLEAN NOT NULL,
    has_other_pets BOOLEAN NOT NULL,
    pet_experience_notes TEXT,
    status application_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ESCROW & PAYMENTS
CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES adoption_applications(id),
    dog_id UUID REFERENCES dog_listings(id),
    adopter_id UUID REFERENCES profiles(id),
    rehomer_id UUID REFERENCES profiles(id),
    total_amount_zar NUMERIC DEFAULT 400.00,
    plf_fee_zar NUMERIC DEFAULT 40.00,
    rehomer_payout_zar NUMERIC DEFAULT 360.00,
    status escrow_status DEFAULT 'held',
    payment_reference TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VET VOUCHERS & CLEARANCE
CREATE TABLE vet_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dog_id UUID REFERENCES dog_listings(id) ON DELETE CASCADE,
    rehomer_id UUID REFERENCES profiles(id),
    voucher_code TEXT UNIQUE NOT NULL,
    qr_code_url TEXT,
    is_redeemed BOOLEAN DEFAULT FALSE,
    vaccination_card_url TEXT,
    vet_clearance_notes TEXT,
    cleared_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
