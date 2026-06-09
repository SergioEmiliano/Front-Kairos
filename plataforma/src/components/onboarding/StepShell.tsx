"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { KairosLogo } from "@/components/common/KairosLogo";
import { OnboardingProgress } from "./OnboardingProgress";

interface StepShellProps {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canAdvance?: boolean;
  ctaLabel?: string;
  children: React.ReactNode;
}

export function StepShell({
  step,
  total,
  onPrev,
  onNext,
  canAdvance = true,
  ctaLabel = "Continuar",
  children,
}: StepShellProps) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "var(--paper)" }}>
      {/* Top bar */}
      <div
        className="shrink-0 px-6 md:px-10 flex items-center justify-between"
        style={{
          height: 64,
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <motion.button
          onClick={onPrev}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[13px] transition-colors"
          style={{ color: "var(--mute)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="mono-label">Voltar</span>
        </motion.button>

        <KairosLogo size="sm" />

        <OnboardingProgress step={step} total={total} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden kairos-scroll">
        <div className="max-w-[960px] mx-auto px-6 md:px-10 py-10 md:py-14">
          {children}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="shrink-0 px-6 md:px-10 flex items-center justify-between"
        style={{
          height: 72,
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <button
          className="mono-label transition-colors"
          style={{ color: "var(--mute)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
        >
          Salvar e continuar depois
        </button>

        <motion.button
          onClick={canAdvance ? onNext : undefined}
          disabled={!canAdvance}
          className="btn-gold flex items-center gap-2.5 px-7 py-3 text-[14px]"
          whileHover={canAdvance ? { scale: 1.02, y: -1 } : {}}
          whileTap={canAdvance ? { scale: 0.98 } : {}}
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
