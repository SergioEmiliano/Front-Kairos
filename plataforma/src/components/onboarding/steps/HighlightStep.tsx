"use client";

import { motion } from "framer-motion";
import { PROCEDURES } from "./ProceduresStep";
import type { ProcKey } from "./ProceduresStep";
import { StepShell } from "../StepShell";
import { cn } from "@/lib/utils";

interface Props {
  selectedProcs: ProcKey[];
  highlight: ProcKey | null;
  onChange: (key: ProcKey) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

export function HighlightStep({ selectedProcs, highlight, onChange, onNext, onPrev }: Props) {
  // Show only procedures selected in step 1; fall back to all if none
  const options = selectedProcs.length > 0
    ? PROCEDURES.filter((p) => selectedProcs.includes(p.key))
    : PROCEDURES;

  return (
    <StepShell
      step={2} total={6}
      onPrev={onPrev} onNext={onNext}
      canAdvance={highlight !== null}
      ctaLabel="Continuar"
    >
      <motion.span className="kicker block mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Identidade · 02 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Qual procedimento você mais{" "}
        <span className="italic-gold">deseja vender</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.55, marginBottom: 36, maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        A IA vai direcionar o calendário de conteúdo e os scripts priorizando esse procedimento.
      </motion.p>

      <div className="flex flex-col gap-3 max-w-[720px]">
        {options.map((p, i) => {
          const Icon = p.icon;
          const on = highlight === p.key;
          return (
            <motion.button
              key={p.key} type="button"
              onClick={() => onChange(p.key)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.055, duration: 0.45, ease }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.99 }}
              className={cn("proc-card text-left focus:outline-none", on && "on")}
              style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                gap: 18, padding: "18px 20px",
                transition: "all 0.25s ease",
                ...(on && {
                  boxShadow: "0 0 0 1.5px var(--gold), 0 8px 32px -8px color-mix(in oklch, var(--gold) 18%, transparent)",
                }),
              }}
            >
              <div className="icon-circle shrink-0" style={{ width: 40, height: 40 }}>
                <Icon className="h-5 w-5" strokeWidth={1.3} />
              </div>

              <div className="flex-1 text-left">
                <div className="proc-title" style={{ fontSize: 16 }}>{p.name}</div>
                {on && (
                  <motion.div
                    className="mono-label mt-1"
                    style={{ color: "var(--gold-dark)" }}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    Foco principal da sua IA
                  </motion.div>
                )}
              </div>

              <span className="tick" style={{ position: "static", flexShrink: 0 }}>
                {on ? "◆" : "◇"}
              </span>
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
