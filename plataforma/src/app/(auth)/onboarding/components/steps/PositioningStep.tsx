"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StepShell } from "../StepShell";
import { cn } from "@/shared/lib/utils";

export type Positioning =
  | "sofisticada"
  | "premium"
  | "acolhedora"
  | "tecnica"
  | "moderna"
  | "natural";

type Option = {
  id: Positioning;
  label: string;
  description: string;
  adjectives: string[];
  accent: string;
};

const OPTIONS: Option[] = [
  {
    id: "sofisticada",
    label: "Sofisticada",
    description: "Discreta e refinada",
    adjectives: ["reservada", "elegante", "atemporal"],
    accent: "var(--ink-soft)",        // dark in light mode, light in dark mode — always visible
  },
  {
    id: "premium",
    label: "Premium",
    description: "Aspiracional e exclusiva",
    adjectives: ["luxo", "prestígio", "exclusividade"],
    accent: "var(--gold-dark)",
  },
  {
    id: "acolhedora",
    label: "Acolhedora",
    description: "Próxima e humana",
    adjectives: ["cuidado", "segurança", "confiança"],
    accent: "oklch(0.62 0.09 50 / 0.85)",  // warm tone at 85% — readable on both surfaces
  },
  {
    id: "tecnica",
    label: "Técnica",
    description: "Autoridade e ciência",
    adjectives: ["evidência", "precisão", "expertise"],
    accent: "var(--steel-dark)",
  },
  {
    id: "moderna",
    label: "Moderna",
    description: "Inovação e tecnologia",
    adjectives: ["vanguarda", "inovação", "futuro"],
    accent: "oklch(0.55 0.09 200 / 0.85)",
  },
  {
    id: "natural",
    label: "Natural",
    description: "Autenticidade e bem-estar",
    adjectives: ["autenticidade", "equilíbrio", "naturalidade"],
    accent: "oklch(0.52 0.08 140 / 0.85)",
  },
];

interface Props {
  selected: Positioning[];
  onChange: (selected: Positioning[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.055, duration: 0.45, ease },
  }),
};

export function PositioningStep({ selected, onChange, onNext, onPrev }: Props) {
  function toggle(id: Positioning) {
    const isOn = selected.includes(id);
    if (isOn) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      onChange([...selected, id]);
    }
  }

  const canAdvance = selected.length > 0;

  return (
    <StepShell
      step={3}
      total={6}
      onPrev={onPrev}
      onNext={onNext}
      canAdvance={canAdvance}
      ctaLabel="Continuar"
    >
      <motion.span
        className="kicker block mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Identidade · 03 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      >
        Como sua clínica deve{" "}
        <span className="italic-gold">ser percebida</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.6, marginBottom: 10, maxWidth: 540 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Escolha até 3 percepções que definem a identidade da sua clínica.
      </motion.p>

      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 6,
              height: 6,
              background: i < selected.length ? "var(--gold)" : "var(--line)",
              transform: i < selected.length ? "scale(1.2)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
        <span className="mono-label ml-1">
          {selected.length}/3 selecionados
        </span>
      </motion.div>

      {/* Moodboard grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {OPTIONS.map((opt, i) => {
          const on = selected.includes(opt.id);
          const maxed = selected.length >= 3 && !on;
          return (
            <motion.button
              key={opt.id}
              type="button"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => !maxed && toggle(opt.id)}
              whileHover={!maxed ? { y: -3 } : {}}
              whileTap={!maxed ? { scale: 0.97 } : {}}
              className="focus:outline-none"
              style={{ opacity: maxed ? 0.4 : 1 }}
            >
              <div
                className={cn("proc-card text-left h-full", on && "on")}
                style={{
                  padding: "24px 20px",
                  gap: 14,
                  transition: "all 0.25s ease",
                  ...(on && {
                    boxShadow: `0 0 0 1.5px var(--gold), 0 8px 32px -8px color-mix(in oklch, var(--gold) 20%, transparent)`,
                  }),
                }}
              >
                {/* Accent dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: on ? opt.accent : "var(--line)",
                    transition: "background 0.3s ease",
                  }}
                />

                <div>
                  <div
                    className="font-medium mb-1.5"
                    style={{
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                      color: on ? "var(--ink)" : "var(--ink-soft)",
                      fontStyle: on ? "italic" : "normal",
                    }}
                  >
                    {opt.label}
                  </div>
                  <div className="proc-sub">{opt.description}</div>
                </div>

                {/* Tags */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      className="flex flex-wrap gap-1.5"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                    >
                      {opt.adjectives.map((adj) => (
                        <span
                          key={adj}
                          className="mono-label"
                          style={{
                            background: "color-mix(in oklch, var(--gold) 8%, transparent)",
                            border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                            borderRadius: 4,
                            padding: "2px 6px",
                            color: "var(--gold-dark)",
                          }}
                        >
                          {adj}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="tick">{on ? "◆" : "◇"}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
