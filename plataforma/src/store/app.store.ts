import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DoctorProfile } from "@/types";
import { mockDoctor } from "@/mock/doctor";

interface AppStore {
  doctor: DoctorProfile | null;
  isAuthenticated: boolean;
  showDnaBanner: boolean;
  setDoctor: (doctor: DoctorProfile) => void;
  setAuthenticated: (value: boolean) => void;
  setShowDnaBanner: (value: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      doctor: mockDoctor,
      isAuthenticated: false,
      showDnaBanner: false,

      setDoctor: (doctor) => set({ doctor }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setShowDnaBanner: (showDnaBanner) => set({ showDnaBanner }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "kairos-app",
      partialize: (state) => ({
        doctor: state.doctor,
        isAuthenticated: state.isAuthenticated,
        showDnaBanner: state.showDnaBanner,
      }),
    }
  )
);
