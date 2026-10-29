"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type {
  DogListing,
  AdoptionApplication,
  EscrowTransaction,
  VetVoucher,
  VetClearance,
  UserProfile,
  ToastMessage,
  ApplicationStatus,
} from "@/lib/types";
import {
  initialDogListings,
  initialApplications,
  initialEscrows,
  initialVouchers,
  initialClearances,
  demoPersonas,
} from "@/lib/mock-data";

interface PLFStoreContextType {
  dogs: DogListing[];
  applications: AdoptionApplication[];
  escrows: EscrowTransaction[];
  vouchers: VetVoucher[];
  clearances: VetClearance[];
  favorites: string[];
  currentUser: UserProfile;
  toasts: ToastMessage[];
  // Actions
  addDog: (dog: Omit<DogListing, "id" | "created_at" | "views" | "likes">) => DogListing;
  updateDogStatus: (dogId: string, status: DogListing["status"]) => void;
  toggleFavorite: (dogId: string) => void;
  isFavorite: (dogId: string) => boolean;
  submitApplication: (
    data: Omit<AdoptionApplication, "id" | "submitted_at" | "status" | "escrow_deposit_zar">
  ) => AdoptionApplication;
  updateApplicationStatus: (appId: string, status: ApplicationStatus, notes?: string) => void;
  payEscrow: (appId: string, paymentMethod: "PayFast" | "Ozow Instant EFT" | "Debit / Credit Card") => EscrowTransaction | null;
  releaseEscrow: (escrowId: string) => void;
  submitVetClearance: (data: Omit<VetClearance, "id" | "submitted_at" | "verified">) => VetClearance;
  verifyVetClearance: (clearanceId: string) => void;
  setCurrentUser: (user: UserProfile) => void;
  switchPersona: (role: "adopter" | "rehomer" | "admin") => void;
  addToast: (type: ToastMessage["type"], title: string, message: string) => void;
  dismissToast: (id: string) => void;
  resetToDefaults: () => void;
}

const PLFStoreContext = createContext<PLFStoreContextType | null>(null);

const STORAGE_KEY = "PLF_APP_STORAGE_V1";

export function PLFStoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [dogs, setDogs] = useState<DogListing[]>(initialDogListings);
  const [applications, setApplications] = useState<AdoptionApplication[]>(initialApplications);
  const [escrows, setEscrows] = useState<EscrowTransaction[]>(initialEscrows);
  const [vouchers, setVouchers] = useState<VetVoucher[]>(initialVouchers);
  const [clearances, setClearances] = useState<VetClearance[]>(initialClearances);
  const [favorites, setFavorites] = useState<string[]>(["dog-1", "dog-3"]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(demoPersonas[0]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.dogs) setDogs(parsed.dogs);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.escrows) setEscrows(parsed.escrows);
        if (parsed.vouchers) setVouchers(parsed.vouchers);
        if (parsed.clearances) setClearances(parsed.clearances);
        if (parsed.favorites) setFavorites(parsed.favorites);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          dogs,
          applications,
          escrows,
          vouchers,
          clearances,
          favorites,
          currentUser,
        })
      );
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
  }, [dogs, applications, escrows, vouchers, clearances, favorites, currentUser, isHydrated]);

  const addToast = useCallback(
    (type: ToastMessage["type"], title: string, message: string) => {
      const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (dogId: string) => {
      setFavorites((prev) => {
        const isFav = prev.includes(dogId);
        const dog = dogs.find((d) => d.id === dogId);
        const name = dog ? dog.name : "Dog";
        if (isFav) {
          addToast("info", "Removed from Favorites", `${name} was removed from your saved list.`);
          return prev.filter((id) => id !== dogId);
        } else {
          addToast("success", "Saved to Favorites ❤️", `${name} has been added to your wishlist.`);
          return [...prev, dogId];
        }
      });
    },
    [dogs, addToast]
  );

  const isFavorite = useCallback(
    (dogId: string) => {
      return favorites.includes(dogId);
    },
    [favorites]
  );

  const addDog = useCallback(
    (newDogData: Omit<DogListing, "id" | "created_at" | "views" | "likes">) => {
      const newDog: DogListing = {
        ...newDogData,
        id: "dog-" + Date.now(),
        created_at: new Date().toISOString(),
        views: 1,
        likes: 0,
      };
      setDogs((prev) => [newDog, ...prev]);
      addToast(
        "success",
        "Listing Submitted! 🐾",
        `${newDog.name} has been submitted for PLF Admin verification.`
      );
      return newDog;
    },
    [addToast]
  );

  const updateDogStatus = useCallback(
    (dogId: string, status: DogListing["status"]) => {
      setDogs((prev) =>
        prev.map((dog) => {
          if (dog.id === dogId) {
            return { ...dog, status };
          }
          return dog;
        })
      );
      addToast("info", "Listing Status Updated", `Dog listing status changed to "${status}".`);
    },
    [addToast]
  );

  const submitApplication = useCallback(
    (
      data: Omit<AdoptionApplication, "id" | "submitted_at" | "status" | "escrow_deposit_zar">
    ) => {
      const newApp: AdoptionApplication = {
        ...data,
        id: "PLF-APP-" + Math.floor(1000 + Math.random() * 9000),
        status: "pending_admin",
        submitted_at: new Date().toISOString(),
        escrow_deposit_zar: data.dog_price_zar,
      };

      setApplications((prev) => [newApp, ...prev]);
      addToast(
        "success",
        "Application Received! 🐶",
        `Application ${newApp.id} for ${data.dog_name} submitted to PLF operations.`
      );
      return newApp;
    },
    [addToast]
  );

  const updateApplicationStatus = useCallback(
    (appId: string, status: ApplicationStatus, notes?: string) => {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              status,
              ...(notes ? { admin_notes: notes } : {}),
            };
          }
          return app;
        })
      );

      // If approved, notify
      if (status === "approved") {
        addToast("success", "Application Approved! 🎉", `Application ${appId} is approved. Escrow payment can now proceed.`);
      } else if (status === "rejected") {
        addToast("warning", "Application Declined", `Application ${appId} has been declined.`);
      } else {
        addToast("info", "Application Status Updated", `Application ${appId} is now marked as "${status}".`);
      }
    },
    [addToast]
  );

  const payEscrow = useCallback(
    (appId: string, paymentMethod: "PayFast" | "Ozow Instant EFT" | "Debit / Credit Card") => {
      const app = applications.find((a) => a.id === appId);
      if (!app) return null;

      const platformFee = Math.round(app.dog_price_zar * 0.1);
      const rehomerPayout = app.dog_price_zar - platformFee;

      const newEscrow: EscrowTransaction = {
        id: "PLF-ESC-" + Math.floor(1000 + Math.random() * 9000),
        application_id: app.id,
        dog_id: app.dog_id,
        dog_name: app.dog_name,
        adopter_email: app.applicant_email,
        rehomer_email: "rehomer@petloversfinders.co.za",
        amount_zar: app.dog_price_zar,
        platform_fee_zar: platformFee,
        rehomer_payout_zar: rehomerPayout,
        status: "held_in_escrow",
        payment_method: paymentMethod,
        created_at: new Date().toISOString(),
        transaction_ref: `TX-${Date.now().toString(36).toUpperCase()}-${paymentMethod.substring(0, 3).toUpperCase()}`,
      };

      setEscrows((prev) => [newEscrow, ...prev]);

      // Update application status
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: "deposit_paid" as ApplicationStatus } : a))
      );

      // Update dog status to under_adoption
      setDogs((prev) =>
        prev.map((d) => (d.id === app.dog_id ? { ...d, status: "under_adoption" } : d))
      );

      // Automatically issue Vet Voucher if not already issued
      const existingVoucher = vouchers.find((v) => v.dog_id === app.dog_id);
      if (!existingVoucher) {
        const newVoucher: VetVoucher = {
          id: "PLF-VCH-" + Math.floor(1000 + Math.random() * 9000),
          dog_id: app.dog_id,
          dog_name: app.dog_name,
          voucher_code: `PLF-VET-2026-${app.dog_name.toUpperCase().replace(/\s+/g, "")}`,
          discount_percent: 15,
          partner_clinic: "PLF Partner Veterinary Network (SAVC Certified)",
          expiry_date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
          status: "active",
          issued_at: new Date().toISOString(),
        };
        setVouchers((prev) => [newVoucher, ...prev]);
      }

      addToast(
        "success",
        "Escrow Deposit Secured! 🔐",
        `R ${app.dog_price_zar.toLocaleString("en-ZA")} safely stored in PLF Trust. Vet Voucher unlocked!`
      );

      return newEscrow;
    },
    [applications, vouchers, addToast]
  );

  const releaseEscrow = useCallback(
    (escrowId: string) => {
      const escrow = escrows.find((e) => e.id === escrowId);
      if (!escrow) return;

      setEscrows((prev) =>
        prev.map((e) =>
          e.id === escrowId
            ? {
                ...e,
                status: "released_to_rehomer",
                released_at: new Date().toISOString(),
              }
            : e
        )
      );

      // Update dog to adopted
      setDogs((prev) =>
        prev.map((d) => (d.id === escrow.dog_id ? { ...d, status: "adopted" } : d))
      );

      // Update application to completed
      setApplications((prev) =>
        prev.map((a) => (a.id === escrow.application_id ? { ...a, status: "completed" } : a))
      );

      addToast(
        "success",
        "Escrow Payout Released! 💸",
        `R ${escrow.rehomer_payout_zar.toLocaleString("en-ZA")} disbursed to rehomer. Adoption finalized!`
      );
    },
    [escrows, addToast]
  );

  const submitVetClearance = useCallback(
    (data: Omit<VetClearance, "id" | "submitted_at" | "verified">) => {
      const newClearance: VetClearance = {
        ...data,
        id: "PLF-CLR-" + Math.floor(1000 + Math.random() * 9000),
        submitted_at: new Date().toISOString(),
        verified: false,
      };

      setClearances((prev) => [newClearance, ...prev]);

      // Update dog status
      setDogs((prev) =>
        prev.map((d) => (d.id === data.dog_id ? { ...d, status: "vet_cleared" } : d))
      );

      // Update voucher status
      setVouchers((prev) =>
        prev.map((v) => (v.dog_id === data.dog_id ? { ...v, status: "clearance_submitted" } : v))
      );

      // Update applications
      setApplications((prev) =>
        prev.map((a) =>
          a.dog_id === data.dog_id && a.status === "deposit_paid"
            ? { ...a, status: "vet_clearing" }
            : a
        )
      );

      addToast(
        "success",
        "Clearance Certificate Uploaded! 📋",
        `SAVC documents for ${data.dog_name} submitted for admin verification.`
      );

      return newClearance;
    },
    [addToast]
  );

  const verifyVetClearance = useCallback(
    (clearanceId: string) => {
      const clr = clearances.find((c) => c.id === clearanceId);
      if (!clr) return;

      setClearances((prev) =>
        prev.map((c) => (c.id === clearanceId ? { ...c, verified: true } : c))
      );

      // Update voucher
      setVouchers((prev) =>
        prev.map((v) => (v.dog_id === clr.dog_id ? { ...v, status: "verified" } : v))
      );

      // Update application to ready_handover
      setApplications((prev) =>
        prev.map((a) =>
          a.dog_id === clr.dog_id ? { ...a, status: "ready_handover" } : a
        )
      );

      addToast(
        "success",
        "SAVC Clearance Verified! 🩺",
        `Health certificate for ${clr.dog_name} approved. Ready for verified handover.`
      );
    },
    [clearances, addToast]
  );

  const switchPersona = useCallback(
    (role: "adopter" | "rehomer" | "admin") => {
      const target = demoPersonas.find((p) => p.role === role) || demoPersonas[0];
      setCurrentUser(target);
      addToast(
        "info",
        `Switched Role to ${target.role.toUpperCase()} 👤`,
        `You are now testing as ${target.name} (${target.email}).`
      );
    },
    [addToast]
  );

  const resetToDefaults = useCallback(() => {
    setDogs(initialDogListings);
    setApplications(initialApplications);
    setEscrows(initialEscrows);
    setVouchers(initialVouchers);
    setClearances(initialClearances);
    setFavorites(["dog-1", "dog-3"]);
    setCurrentUser(demoPersonas[0]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    addToast("info", "Store Reset", "Demo data reset to fresh state.");
  }, [addToast]);

  return (
    <PLFStoreContext.Provider
      value={{
        dogs,
        applications,
        escrows,
        vouchers,
        clearances,
        favorites,
        currentUser,
        toasts,
        addDog,
        updateDogStatus,
        toggleFavorite,
        isFavorite,
        submitApplication,
        updateApplicationStatus,
        payEscrow,
        releaseEscrow,
        submitVetClearance,
        verifyVetClearance,
        setCurrentUser,
        switchPersona,
        addToast,
        dismissToast,
        resetToDefaults,
      }}
    >
      {children}

      {/* Floating Global Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm transition-all duration-300 transform translate-y-0 ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100"
                : toast.type === "warning"
                ? "bg-amber-950/90 border-amber-500/30 text-amber-100"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-500/30 text-rose-100"
                : "bg-slate-900/90 border-slate-700 text-slate-100"
            }`}
          >
            <div className="flex-1">
              <div className="font-semibold">{toast.title}</div>
              <div className="mt-0.5 text-xs opacity-90 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-xs opacity-60 hover:opacity-100 p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </PLFStoreContext.Provider>
  );
}

export function usePLFStore() {
  const context = useContext(PLFStoreContext);
  if (!context) {
    throw new Error("usePLFStore must be used within a PLFStoreProvider");
  }
  return context;
}
