import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DoctorProfile } from "@/shared/types";
import { mockDoctor } from "@/shared/mock/doctor";

interface AppStore {
  doctor: DoctorProfile | null;
  isAuthenticated: boolean;
  // Espelha doctor.firstAccessCompleted como flag de sessão: false força o
  // redirecionamento obrigatório para o onboarding até que ele seja concluído.
  firstAccessCompleted: boolean;
  showDnaBanner: boolean;
  setDoctor: (doctor: DoctorProfile) => void;
  setAuthenticated: (value: boolean) => void;
  setFirstAccessCompleted: (value: boolean) => void;
  setShowDnaBanner: (value: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      doctor: mockDoctor,
      isAuthenticated: false,
      firstAccessCompleted: true,
      showDnaBanner: false,

      setDoctor: (doctor) => set({ doctor }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setFirstAccessCompleted: (firstAccessCompleted) =>
        set({ firstAccessCompleted }),
      setShowDnaBanner: (showDnaBanner) => set({ showDnaBanner }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "kairos-app",
      partialize: (state) => ({
        doctor: state.doctor,
        isAuthenticated: state.isAuthenticated,
        firstAccessCompleted: state.firstAccessCompleted,
        showDnaBanner: state.showDnaBanner,
      }),
    }
  )
);
