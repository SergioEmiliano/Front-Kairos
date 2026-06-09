"use client";

import { motion } from "framer-motion";
import { StepShell } from "../StepShell";
import { cn } from "@/lib/utils";

export type AudiencePersona =
  | "jovens"
  | "maduras"
  | "premium"
  | "primeira-vez"
  | "recorrentes";

type PersonaOption = {
  id: AudiencePersona;
  label: string;
  age: string;
  description: string;
  desire: string;
};

const PERSONAS: PersonaOption[] = [
  {
    id: "jovens",
    label: "Mulheres 25–35",
    age: "Jovens profissionais",
    description: "Investem em aparência como parte da identidade. Querem resultados naturais, sutis e instagramáveis.",
    desire: "Autoestima & carreira",
  },
  {
    id: "maduras",
    label: "Mulheres 35–50",
    age: "Estabelecidas e exigentes",
    description: "Querem parecer descansadas, confiantes e sem idade aparente. Não querem 'parecer feita'.",
    desire: "Elegância & discrição",
  },
  {
    id: "premium",
    label: "Público premium",
    age: "Alta renda",
    description: "Buscam exclusividade, atenção personalizada e resultados que combinam com o seu estilo de vida.",
    desire: "Exclusividade & luxo",
  },
  {
    id: "primeira-vez",
    label: "Primeira harmonização",
    age: "Curiosas e com receios",
    description: "Têm interesse, mas hesitam. Precisam de segurança, transparência e resultado natural.",
    desire: "Confiança & segurança",
  },
  {
    id: "recorrentes",
    label: "Pacientes recorrentes",
    age: "Já confiam em você",
    description: "Retornam com frequência, indicam e são as melhores embaixadoras da clínica.",
    desire: "Fidelização & recorrência",
  },
];

interface Props {
  value: AudiencePersona | null;
  onChange: (v: AudiencePersona) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

export function AudienceStep({ value, onChange, onNext, onPrev }: Props) {
  return (
    <StepShell
      step={5} total={6}
      onPrev={onPrev} onNext={onNext}
      canAdvance={value !== null}
      ctaLabel="Continuar"
    >
      <motion.span className="kicker block mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Identidade · 05 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Quem é seu{" "}
        <span className="italic-gold">público principal</span>?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.55, marginBottom: 36, maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        A IA vai criar conteúdo que fala diretamente com esse perfil — na linguagem, nos gatilhos e nas histórias.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[840px]">
        {PERSONAS.map((p, i) => {
          const on = value === p.id;
          return (
            <motion.button
              key={p.id} type="button"
              onClick={() => onChange(p.id)}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.45, ease }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={cn("proc-card text-left focus:outline-none", on && "on")}
              style={{
                padding: "22px 20px", gap: 12,
                transition: "all 0.25s ease",
                ...(on && {
                  boxShadow: "0 0 0 1.5px var(--gold), 0 8px 32px -8px color-mix(in oklch, var(--gold) 18%, transparent)",
                }),
              }}
            >
              <span className="tick">{on ? "◆" : "◇"}</span>

              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="proc-title" style={{ fontSize: 17 }}>{p.label}</div>
                <span
                  className="proc-sub shrink-0"
                  style={{
                    background: on
                      ? "color-mix(in oklch, var(--gold) 10%, transparent)"
                      : "var(--paper-warm)",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    padding: "2px 8px",
                    whiteSpace: "nowrap",
                    color: on ? "var(--gold-dark)" : "var(--mute)",
                  }}
                >
                  {p.age}
                </span>
              </div>

              {/* Description */}
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--mute)" }}>
                {p.description}
              </p>

              {/* Desire tag */}
              <div
                className="mono-label"
                style={{
                  color: on ? "var(--gold-dark)" : "var(--mute)",
                  transition: "color 0.2s ease",
                }}
              >
                {on ? "◆ " : ""}{p.desire}
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
