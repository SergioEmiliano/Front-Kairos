"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";

import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { ProceduresStep } from "@/components/onboarding/steps/ProceduresStep";
import type { ProcKey } from "@/components/onboarding/steps/ProceduresStep";
import { HighlightStep } from "@/components/onboarding/steps/HighlightStep";
import { PositioningStep } from "@/components/onboarding/steps/PositioningStep";
import type { Positioning } from "@/components/onboarding/steps/PositioningStep";
import { CommunicationStep } from "@/components/onboarding/steps/CommunicationStep";
import type { CommStyle } from "@/components/onboarding/steps/CommunicationStep";
import { AudienceStep } from "@/components/onboarding/steps/AudienceStep";
import type { AudiencePersona } from "@/components/onboarding/steps/AudienceStep";
import { GoalStep } from "@/components/onboarding/steps/GoalStep";
import type { Goal } from "@/components/onboarding/steps/GoalStep";
import { ProcessingStep } from "@/components/onboarding/steps/ProcessingStep";

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
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setShowDnaBanner = useAppStore((s) => s.setShowDnaBanner);

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
