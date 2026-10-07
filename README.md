# petLoversFinders (PLF)

A South African pet rehoming platform that keeps the process safe, transparent, and centrally managed through PLF.

## Overview

petLoversFinders is built to help:
- Rehomers list dogs for adoption
- Adopters discover suitable dogs and apply
- PLF admins review listings and applications
- Escrow holds payment securely during the process
- Rehomers complete pre-handover veterinary clearance
- Admins verify documentation and release funds after handover

This project follows a middleman model:
- Rehomers and adopters do not communicate directly
- All communication is routed through PLF admins
- Public pages hide seller contact details
- Adoption price is set by the rehomer and reviewed by PLF

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons
- Supabase
- PostgreSQL
- PayFast / Ozow-ready architecture

## Repository structure

```bash
app/
  admin/
  apply/
  checkout/
  dogs/
  rehomer/
  globals.css
  layout.tsx
  page.tsx
components/
  Navbar.tsx
  Footer.tsx
  DogCard.tsx
lib/
  mock-data.ts
  types.ts
schema.sql
package.json
next.config.mjs
tailwind.config.ts
postcss.config.js
```

## Current status

This repository currently includes:
- a working starter Next.js app shell
- public catalog and dog detail pages
- adopter application form
- rehomer listing UI
- admin dashboard concept
- custom pricing support rather than a fixed R400 default
- SQL schema for profiles, listings, applications, escrow, and vouchers

This is a product foundation and demo flow, and it still needs:
- real Supabase authentication and role checks
- live database integration
- payment webhook logic
- escrow payout logic
- API routes/server actions
- document upload handling
- production-grade admin workflows

## Local preview

To run the project locally:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Build for production

```bash
npm run build
npm run start
```

## Environment variables

Create a `.env.local` file with values such as:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database setup

Import the schema from `schema.sql` into your Supabase PostgreSQL database.

## Key product flow

```text
Rehomer lists dog
  -> Admin reviews listing
  -> Listing goes live
  -> Adopter applies
  -> Admin approves application
  -> Adopter pays escrow deposit
  -> Vet voucher generated
  -> Rehomer completes vet clearance
  -> Admin verifies documents
  -> Handover completed
  -> Escrow payout released to rehomer
```

## Notes

- Public UI does not expose rehomer contact details.
- The platform keeps PLF as the trusted middleman.
- Listing pricing is customizable by the rehomer.
- Escrow and payout logic should remain server-authoritative and validated.

## Next milestones

Recommended next steps:
1. Add Supabase auth and profile creation
2. Replace mock data with database-backed queries
3. Implement admin approval workflows
4. Add payment webhook and escrow verification
5. Add QR/voucher PDF generation
6. Add file uploads for vet clearance documentation
7. Add secure RLS policies and production validation

## License

This project is currently a starter application for development and demonstration purposes.
