"use client";

import { motion } from "framer-motion";
import { Heart, Droplets, Zap, Sparkles, Waves, Sun, Wind, Scissors, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StepShell } from "../StepShell";
import { cn } from "@/shared/lib/utils";

export type ProcKey =
  | "harmonizacao"
  | "bioestimulador"
  | "labial"
  | "skinbooster"
  | "botox"
  | "laser"
  | "peeling"
  | "fios"
  | "cirurgico"
  | "outros";

type ProcData = { key: ProcKey; name: string; sub: string; icon: LucideIcon };

export const PROCEDURES: ProcData[] = [
  { key: "harmonizacao",  name: "Harmonização facial",      sub: "Alto volume",   icon: Heart },
  { key: "bioestimulador", name: "Bioestimulador",          sub: "Recorrente",    icon: Droplets },
  { key: "labial",        name: "Preenchimento labial",     sub: "Alta demanda",  icon: Heart },
  { key: "skinbooster",   name: "Skinbooster",              sub: "Fidelização",   icon: Waves },
  { key: "botox",         name: "Botox / Toxina",           sub: "Alto volume",   icon: Zap },
  { key: "laser",         name: "Laser / Fotona",           sub: "Premium",       icon: Sparkles },
  { key: "peeling",       name: "Peelings e revitalização", sub: "Recorrente",    icon: Sun },
  { key: "fios",          name: "Fios e lifting",           sub: "Alto ticket",   icon: Wind },
  { key: "cirurgico",     name: "Procedimento cirúrgico",   sub: "Especialidade", icon: Scissors },
  { key: "outros",        name: "Outros procedimentos",     sub: "Personalizado", icon: Layers },
];

interface Props {
  selected: ProcKey[];
  onChange: (selected: ProcKey[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.04, duration: 0.42, ease },
  }),
};

export function ProceduresStep({ selected, onChange, onNext, onPrev }: Props) {
  function toggle(key: ProcKey) {
    onChange(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]);
  }

  return (
    <StepShell
      step={1} total={6}
      onPrev={onPrev} onNext={onNext}
      canAdvance={selected.length > 0}
      ctaLabel={
        selected.length > 0
          ? `Continuar com ${selected.length} procedimento${selected.length !== 1 ? "s" : ""}`
          : "Selecione ao menos um"
      }
    >
      <motion.span className="kicker block mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Identidade · 01 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Quais procedimentos{" "}
        <span className="italic-gold">representam sua clínica</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.55, marginBottom: 32, maxWidth: 560 }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Selecione tudo que você opera com frequência. Isso define a base da sua identidade na plataforma.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {PROCEDURES.map((p, i) => {
          const Icon = p.icon;
          const on = selected.includes(p.key);
          return (
            <motion.button
              key={p.key} type="button"
              custom={i} variants={itemVariants} initial="hidden" animate="visible"
              onClick={() => toggle(p.key)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className={cn("proc-card text-left focus:outline-none", on && "on")}
            >
              <span className="tick">{on ? "◆" : "◇"}</span>
              <div className="icon-circle"><Icon className="h-4 w-4" strokeWidth={1.4} /></div>
              <div className="proc-title">{p.name}</div>
              <div className="proc-sub mt-1">{p.sub}</div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="card-surface rounded-[var(--radius)] px-5 py-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <span className="mono-label">
          ◆ {selected.length > 0
            ? `${String(selected.length).padStart(2, "0")} selecionados`
            : "Nenhum selecionado ainda"}
        </span>
        {selected.length > 0 && (
          <span className="italic-gold font-serif-display" style={{ fontSize: 15, letterSpacing: "-0.01em" }}>
            Sua especialidade está sendo definida
          </span>
        )}
      </motion.div>
    </StepShell>
  );
}
