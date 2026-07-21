"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/store/app.store";

import { WelcomeStep } from "@/app/(auth)/onboarding/components/steps/WelcomeStep";
import { ProceduresStep } from "@/app/(auth)/onboarding/components/steps/ProceduresStep";
import type { ProcKey } from "@/app/(auth)/onboarding/components/steps/ProceduresStep";
import { HighlightStep } from "@/app/(auth)/onboarding/components/steps/HighlightStep";
import { PositioningStep } from "@/app/(auth)/onboarding/components/steps/PositioningStep";
import type { Positioning } from "@/app/(auth)/onboarding/components/steps/PositioningStep";
import { CommunicationStep } from "@/app/(auth)/onboarding/components/steps/CommunicationStep";
import type { CommStyle } from "@/app/(auth)/onboarding/components/steps/CommunicationStep";
import { AudienceStep } from "@/app/(auth)/onboarding/components/steps/AudienceStep";
import type { AudiencePersona } from "@/app/(auth)/onboarding/components/steps/AudienceStep";
import { GoalStep } from "@/app/(auth)/onboarding/components/steps/GoalStep";
import type { Goal } from "@/app/(auth)/onboarding/components/steps/GoalStep";
import { ProcessingStep } from "@/app/(auth)/onboarding/components/steps/ProcessingStep";

// ─── Transition ──────────────────────────────────────────────────────
type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];
const easeIn: E4 = [0.4, 0, 1, 1];

const pageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -28 : 28,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: easeIn },
  }),
};

// ─── State ───────────────────────────────────────────────────────────
interface OnboardingData {
  procedures: ProcKey[];       // S1 — quais procedimentos
  highlight: ProcKey | null;   // S2 — procedimento destaque
  positioning: Positioning[];  // S3 — percepção da clínica
  communication: CommStyle | null; // S4 — estilo de comunicação
  audience: AudiencePersona | null; // S5 — público principal
  goal: Goal | null;           // S6 — objetivo principal
}

export default function OnboardingPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const firstAccessCompleted = useAppStore((s) => s.firstAccessCompleted);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setFirstAccessCompleted = useAppStore((s) => s.setFirstAccessCompleted);
  const setShowDnaBanner = useAppStore((s) => s.setShowDnaBanner);

  // Gate de acesso ao onboarding (o (plataform)/layout não cobre esta rota):
  // não autenticada → /login; onboarding já concluído → /dashboard.
  // Garante que o onboarding só pode ser executado uma vez.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (firstAccessCompleted) {
      router.replace("/dashboard");
    }
  }, [hydrated, isAuthenticated, firstAccessCompleted, router]);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    procedures: [],
    highlight: null,
    positioning: [],
    communication: null,
    audience: null,
    goal: null,
  });

  const goNext = useCallback(() => { setDir(1); setStep((s) => s + 1); }, []);
  const goPrev = useCallback(() => { setDir(-1); setStep((s) => Math.max(0, s - 1)); }, []);

  function finish() {
    setShowDnaBanner(true);
    setAuthenticated(true);
    // Conclui o primeiro acesso de forma definitiva: o onboarding não reaparece.
    setFirstAccessCompleted(true);
    router.push("/dashboard");
  }

  // ─── Step map ────────────────────────────────────────────────────
  const steps = [
    // 0 — Welcome
    <WelcomeStep key="welcome" onNext={goNext} />,

    // 1 — Quais procedimentos representam sua clínica?
    <ProceduresStep
      key="procedures"
      selected={data.procedures}
      onChange={(p) => setData((d) => ({ ...d, procedures: p }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 2 — Qual procedimento você mais deseja vender?
    <HighlightStep
      key="highlight"
      selectedProcs={data.procedures}
      highlight={data.highlight}
      onChange={(k) => setData((d) => ({ ...d, highlight: k }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 3 — Como sua clínica deve ser percebida?
    <PositioningStep
      key="positioning"
      selected={data.positioning}
      onChange={(p) => setData((d) => ({ ...d, positioning: p }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 4 — Qual estilo combina com sua comunicação?
    <CommunicationStep
      key="communication"
      value={data.communication}
      onChange={(c) => setData((d) => ({ ...d, communication: c }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 5 — Quem é seu público principal?
    <AudienceStep
      key="audience"
      value={data.audience}
      onChange={(a) => setData((d) => ({ ...d, audience: a }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 6 — Qual é seu principal objetivo hoje?
    <GoalStep
      key="goal"
      goal={data.goal}
      onChange={(g) => setData((d) => ({ ...d, goal: g }))}
      onNext={goNext} onPrev={goPrev}
    />,

    // 7 — Processamento IA
    <ProcessingStep key="processing" onFinish={finish} />,
  ];

  // Enquanto o gate não liberou (hidratando ou prestes a redirecionar), não
  // renderiza o wizard para evitar flash de conteúdo.
  if (!hydrated || !isAuthenticated || firstAccessCompleted) {
    return (
      <div className="fixed inset-0 grid place-items-center" style={{ background: "var(--paper)" }}>
        <Loader2 className="h-5 w-5 animate-spin text-kairos-stone" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--paper)" }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
