"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StepShell } from "../StepShell";
import { cn } from "@/shared/lib/utils";

export type CommStyle =
  | "elegante"
  | "humanizada"
  | "tecnica"
  | "moderna"
  | "premium"
  | "proxima";

type Option = {
  id: CommStyle;
  label: string;
  description: string;
  sample: string;
};

const OPTIONS: Option[] = [
  {
    id: "elegante",
    label: "Elegante",
    description: "Refinada e discreta",
    sample: "\"O equilíbrio entre técnica e beleza é o que define cada resultado que entrego.\"",
  },
  {
    id: "humanizada",
    label: "Humanizada",
    description: "Empática e calorosa",
    sample: "\"Cada rosto tem uma história. Meu papel é escutar, entender e valorizar o que é único em você.\"",
  },
  {
    id: "tecnica",
    label: "Técnica",
    description: "Especialista e precisa",
    sample: "\"A bioestimulação age em camadas profundas para restaurar a arquitetura natural do colágeno.\"",
  },
  {
    id: "moderna",
    label: "Moderna",
    description: "Atual e inovadora",
    sample: "\"Protocolos de última geração, resultados que respeitam a sua identidade.\"",
  },
  {
    id: "premium",
    label: "Premium",
    description: "Exclusiva e aspiracional",
    sample: "\"Não é sobre parecer diferente. É sobre aparecer como a melhor versão de si mesma.\"",
  },
  {
    id: "proxima",
    label: "Próxima",
    description: "Íntima e conversacional",
    sample: "\"Conta pra mim: o que você mais quer mudar? Pode ser algo pequeno — às vezes é exatamente isso que transforma.\"",
  },
];

interface Props {
  value: CommStyle | null;
  onChange: (v: CommStyle) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.055, duration: 0.45, ease },
  }),
};

export function CommunicationStep({ value, onChange, onNext, onPrev }: Props) {
  const selected = OPTIONS.find((o) => o.id === value);

  return (
    <StepShell
      step={4} total={6}
      onPrev={onPrev} onNext={onNext}
      canAdvance={value !== null}
      ctaLabel="Continuar"
    >
      <motion.span className="kicker block mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Identidade · 04 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Qual estilo combina com{" "}
        <span className="italic-gold">sua comunicação</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.55, marginBottom: 32, maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        A IA vai replicar esse estilo em todos os conteúdos gerados — scripts, legendas, CTAs e histórias.
      </motion.p>

      {/* Style grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {OPTIONS.map((opt, i) => {
          const on = value === opt.id;
          return (
            <motion.button
              key={opt.id} type="button"
              custom={i} variants={itemVariants} initial="hidden" animate="visible"
              onClick={() => onChange(opt.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={cn("proc-card text-left focus:outline-none", on && "on")}
              style={{
                padding: "22px 18px", gap: 10,
                transition: "all 0.25s ease",
                ...(on && {
                  boxShadow: "0 0 0 1.5px var(--gold), 0 8px 32px -8px color-mix(in oklch, var(--gold) 18%, transparent)",
                }),
              }}
            >
              <span className="tick">{on ? "◆" : "◇"}</span>

              {/* Accent dot */}
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: on ? "var(--gold)" : "var(--line)",
                transition: "background 0.3s ease",
              }} />

              <div
                className="font-medium"
                style={{
                  fontSize: 20, letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  fontStyle: on ? "italic" : "normal",
                  transition: "font-style 0.2s ease",
                }}
              >
                {opt.label}
              </div>

              <div className="proc-sub">{opt.description}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Live sample — slides in when something is selected */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            className="card-surface rounded-[var(--radius)] p-6"
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.38, ease }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="mono-label">◆ Amostra de conteúdo</span>
              <span className="mono-label italic-gold">{selected.label}</span>
            </div>
            <p
              className="font-serif-display"
              style={{
                fontSize: 16, lineHeight: 1.7, fontStyle: "italic",
                color: "var(--ink-soft)", letterSpacing: "-0.01em",
              }}
            >
              {selected.sample}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
