-- Supabase / PostgreSQL schema for petLoversFinders (PLF)
-- Listing prices are intentionally custom and set by the rehomer.
-- PLF fee and escrow handling are configured by application logic.

CREATE TYPE user_role AS ENUM ('adopter', 'rehomer', 'vet_partner', 'admin');
CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'active', 'under_adoption', 'vet_clearance_pending', 'ready_for_handover', 'adopted', 'cancelled');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected', 'deposit_paid');
CREATE TYPE escrow_status AS ENUM ('held', 'released_to_rehomer', 'refunded');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    role user_role DEFAULT 'adopter',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dog_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rehomer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    age_months INT NOT NULL,
    color TEXT NOT NULL,
    gender TEXT NOT NULL,
    size TEXT NOT NULL,
    description TEXT NOT NULL,
    listing_price_zar NUMERIC NOT NULL DEFAULT 0.00,
    status listing_status DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dog_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dog_id UUID REFERENCES dog_listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE adoption_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dog_id UUID REFERENCES dog_listings(id) ON DELETE CASCADE,
    adopter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    housing_type TEXT NOT NULL,
    yard_fenced BOOLEAN NOT NULL,
    has_other_pets BOOLEAN NOT NULL,
    pet_experience_notes TEXT,
    status application_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES adoption_applications(id),
    dog_id UUID REFERENCES dog_listings(id),
    adopter_id UUID REFERENCES profiles(id),
    rehomer_id UUID REFERENCES profiles(id),
    total_amount_zar NUMERIC DEFAULT 0.00,
    plf_fee_zar NUMERIC DEFAULT 0.00,
    rehomer_payout_zar NUMERIC DEFAULT 0.00,
    status escrow_status DEFAULT 'held',
    payment_reference TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE INDEX idx_dog_listings_status ON dog_listings(status);
CREATE INDEX idx_dog_listings_rehomer_id ON dog_listings(rehomer_id);
CREATE INDEX idx_adoption_applications_dog_id ON adoption_applications(dog_id);
CREATE INDEX idx_adoption_applications_adopter_id ON adoption_applications(adopter_id);
CREATE INDEX idx_escrow_transactions_application_id ON escrow_transactions(application_id);
CREATE INDEX idx_vet_vouchers_dog_id ON vet_vouchers(dog_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dog_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE dog_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vet_vouchers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public listings are visible when active"
ON dog_listings FOR SELECT
USING (status = 'active');

CREATE POLICY "Rehomer can manage their own listings"
ON dog_listings FOR ALL
USING (auth.uid() = rehomer_id)
WITH CHECK (auth.uid() = rehomer_id);

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admin can view all records"
ON dog_listings FOR ALL
USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Authenticated users can create adoption applications"
ON adoption_applications FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Applicants can view their own applications"
ON adoption_applications FOR SELECT
USING (auth.uid() = adopter_id);

CREATE POLICY "Admins can manage all adoption records"
ON adoption_applications FOR ALL
USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Users can view their own escrow records"
ON escrow_transactions FOR SELECT
USING (auth.uid() = adopter_id OR auth.uid() = rehomer_id);

CREATE POLICY "Admins can manage escrow"
ON escrow_transactions FOR ALL
USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
));

CREATE POLICY "Rehomers can view their voucher records"
ON vet_vouchers FOR SELECT
USING (auth.uid() = rehomer_id);

CREATE POLICY "Admins can manage vouchers"
ON vet_vouchers FOR ALL
USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
));
