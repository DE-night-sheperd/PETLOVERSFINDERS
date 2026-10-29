import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PLFStoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "petLoversFinders | Safe, Verified Pet Rehoming in South Africa",
  description:
    "South Africa's premier middleman pet rehoming network. Escrow payment security, pre-handover SAVC veterinary vouchers, and zero puppy mills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-900">
        <SessionProvider>
          <PLFStoreProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </PLFStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
