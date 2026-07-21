import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OnboardingState, Procedure, ToneOfVoice, FormalityLevel } from "@/shared/types";

interface OnboardingStore extends OnboardingState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setProcedures: (procedures: Procedure[]) => void;
  toggleProcedure: (procedure: Procedure) => void;
  setFinancials: (revenue: number, ticket: number) => void;
  setCapacity: (days: number[], sessionsPerDay: number, teamSize: number) => void;
  setPositioning: (tone: ToneOfVoice, formality: FormalityLevel) => void;
  setAudience: (targetAudience: string, uniqueValue: string) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  step: 1,
  procedures: [],
  monthlyRevenue: 0,
  averageTicket: 0,
  workingDays: [1, 2, 3, 4, 5],
  sessionsPerDay: 4,
  teamSize: 1,
  toneOfVoice: "",
  formalityLevel: "",
  targetAudience: "",
  uniqueValue: "",
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 6) })),
      prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

      setProcedures: (procedures) => set({ procedures }),
      toggleProcedure: (procedure) =>
        set((s) => ({
          procedures: s.procedures.includes(procedure)
            ? s.procedures.filter((p) => p !== procedure)
            : [...s.procedures, procedure],
        })),

      setFinancials: (monthlyRevenue, averageTicket) =>
        set({ monthlyRevenue, averageTicket }),

      setCapacity: (workingDays, sessionsPerDay, teamSize) =>
        set({ workingDays, sessionsPerDay, teamSize }),

      setPositioning: (toneOfVoice, formalityLevel) =>
        set({ toneOfVoice, formalityLevel }),

      setAudience: (targetAudience, uniqueValue) =>
        set({ targetAudience, uniqueValue }),

      reset: () => set(initialState),
    }),
    {
      name: "kairos-onboarding",
    }
  )
);
