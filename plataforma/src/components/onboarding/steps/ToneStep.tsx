"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StepShell } from "../StepShell";
import { cn } from "@/lib/utils";

export type Tone = 0 | 1 | 2 | 3;
export type Formality = 0 | 1 | 2;

type ToneOption = {
  label: string;
  description: string;
  tags: string[];
  preview: string;
};

type FormalityOption = {
  label: string;
  sub: string;
};

const TONES: ToneOption[] = [
  {
    label: "Editorial clínica",
    description: "Serena, técnica, elegante",
    tags: ["sofisticado", "técnico", "premium"],
    preview:
      "\"Não é cada gota que transforma. É a calibração precisa da técnica ao longo do protocolo — e a escuta atenta de cada rosto.\"",
  },
  {
    label: "Didática calorosa",
    description: "Explica, acolhe, traduz",
    tags: ["educativo", "acessível", "humano"],
    preview:
      "\"Você já ouviu falar em bioestimulação? É uma das formas mais naturais de devolver o que o tempo leva — e o resultado surpreende.\"",
  },
  {
    label: "Autoridade direta",
    description: "Firme, objetiva, premium",
    tags: ["assertivo", "direto", "confiança"],
    preview:
      "\"Resultado não é acidente. É protocolo. É diagnóstico correto. É técnica refinada. É isso que entrego em cada consulta.\"",
  },
  {
    label: "Inspiracional",
    description: "Narrativa, sensorial, poética",
    tags: ["narrativa", "sensorial", "emocional"],
    preview:
      "\"Existe uma versão de você que já existe — só está esperando a luz certa para aparecer. É esse encontro que acontece aqui.\"",
  },
];

const FORMALITY: FormalityOption[] = [
  { label: "Próxima", sub: "Calorosa, íntima" },
  { label: "Equilibrada", sub: "Profissional e humana" },
  { label: "Sóbria", sub: "Distante, institucional" },
];

interface Props {
  tone: Tone | null;
  formality: Formality;
  onChange: (tone: Tone, formality: Formality) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.065, duration: 0.45, ease },
  }),
};

export function ToneStep({ tone, formality, onChange, onNext, onPrev }: Props) {
  return (
    <StepShell
      step={4}
      total={5}
      onPrev={onPrev}
      onNext={onNext}
      canAdvance={tone !== null}
      ctaLabel="Continuar"
    >
      <motion.span
        className="kicker block mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        DNA Estratégico · 04 de 05
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      >
        Qual estilo combina com{" "}
        <span className="italic-gold">sua comunicação</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.6, marginBottom: 32, maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Escolha o tom que representa como você quer ser ouvido. O sistema vai replicar esse estilo em todos os conteúdos.
      </motion.p>

      {/* Tone grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {TONES.map((t, i) => {
          const on = tone === i;
          return (
            <motion.button
              key={t.label}
              type="button"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onChange(i as Tone, formality)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn("proc-card text-left focus:outline-none", on && "on")}
              style={{
                padding: "20px",
                gap: 12,
                transition: "all 0.25s ease",
                ...(on && {
                  boxShadow: `0 0 0 1.5px var(--gold), 0 8px 32px -8px color-mix(in oklch, var(--gold) 18%, transparent)`,
                }),
              }}
            >
              <span className="tick">{on ? "◆" : "◇"}</span>

              <div className="proc-title" style={{ fontSize: 16 }}>{t.label}</div>
              <div className="text-[12px]" style={{ color: on ? "var(--gold-dark)" : "var(--mute)" }}>
                {t.description}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span key={tag} className="mono-label" style={{ color: "var(--mute)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Content preview */}
      <AnimatePresence mode="wait">
        {tone !== null && (
          <motion.div
            key={tone}
            className="card-surface rounded-[var(--radius)] p-6 mb-8"
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="mono-label">◆ Amostra gerada</span>
              <span className="mono-label" style={{ color: "var(--gold-dark)" }}>
                {TONES[tone].label}
              </span>
            </div>
            <p
              className="font-serif-display"
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                fontStyle: "italic",
                color: "var(--ink-soft)",
                letterSpacing: "-0.01em",
              }}
            >
              {TONES[tone].preview}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formality */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="mono-label mb-4">◆ Grau de formalidade</div>
        <div className="grid grid-cols-3 gap-3 max-w-[560px]">
          {FORMALITY.map((f, i) => {
            const on = formality === i;
            return (
              <motion.button
                key={f.label}
                type="button"
                onClick={() => onChange(tone as Tone, i as Formality)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={cn("proc-card text-left focus:outline-none", on && "on")}
                style={{ padding: "14px 16px" }}
              >
                <span className="tick">{on ? "◆" : "◇"}</span>
                <div className="proc-title" style={{ fontSize: 15 }}>{f.label}</div>
                <div className="proc-sub">{f.sub}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </StepShell>
  );
}
