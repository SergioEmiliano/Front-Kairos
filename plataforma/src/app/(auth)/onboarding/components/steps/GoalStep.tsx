"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Award, Star, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StepShell } from "../StepShell";
import { cn } from "@/shared/lib/utils";

export type Goal = "crescimento" | "agenda" | "autoridade" | "premium" | "estabilidade";

type GoalOption = {
  id: Goal;
  label: string;
  description: string;
  sub: string;
  icon: LucideIcon;
};

const GOALS: GoalOption[] = [
  {
    id: "crescimento",
    label: "Crescimento rápido",
    description: "Novos pacientes todo mês",
    sub: "Estratégia de aquisição acelerada",
    icon: TrendingUp,
  },
  {
    id: "agenda",
    label: "Agenda lotada",
    description: "Sem intervalos vazios",
    sub: "Maximizar ocupação e recorrência",
    icon: Calendar,
  },
  {
    id: "autoridade",
    label: "Autoridade no nicho",
    description: "Referência reconhecida",
    sub: "Posição de especialista no mercado",
    icon: Award,
  },
  {
    id: "premium",
    label: "Posicionamento premium",
    description: "Clínica de alto padrão",
    sub: "Atrair o público de maior poder aquisitivo",
    icon: Star,
  },
  {
    id: "estabilidade",
    label: "Crescimento sustentável",
    description: "Sem depender de picos",
    sub: "Previsibilidade e base sólida",
    icon: Leaf,
  },
];

interface Props {
  goal: Goal | null;
  onChange: (goal: Goal) => void;
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
    transition: { delay: i * 0.07, duration: 0.45, ease },
  }),
};

export function GoalStep({ goal, onChange, onNext, onPrev }: Props) {
  return (
    <StepShell
      step={6}
      total={6}
      onPrev={onPrev}
      onNext={onNext}
      canAdvance={goal !== null}
      ctaLabel="Criar minha identidade"
    >
      <motion.span
        className="kicker block mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Identidade · 06 de 06
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Qual é seu{" "}
        <span className="italic-gold">principal objetivo</span> hoje?
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.55, marginBottom: 36, maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Essa escolha orienta toda a estratégia de conteúdo — do tipo de post ao ritmo de publicação.
      </motion.p>

      <div className="flex flex-col gap-3 max-w-[720px]">
        {GOALS.map((g, i) => {
          const Icon = g.icon;
          const on = goal === g.id;
          return (
            <motion.button
              key={g.id}
              type="button"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onChange(g.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={cn("proc-card text-left flex-row items-center gap-5 focus:outline-none", on && "on")}
              style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20, padding: "18px 20px" }}
            >
              {/* Icon */}
              <div
                className="icon-circle shrink-0"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>

              {/* Text */}
              <div className="flex-1 text-left">
                <div className="proc-title" style={{ fontSize: 16 }}>{g.label}</div>
                <div className="text-[13px] mt-0.5" style={{ color: on ? "var(--gold-dark)" : "var(--mute)" }}>
                  {g.description}
                </div>
              </div>

              {/* Sub */}
              <div className="shrink-0 hidden md:block">
                <span className="proc-sub">{g.sub}</span>
              </div>

              {/* Tick */}
              <span className="tick" style={{ position: "static", marginLeft: "auto", flexShrink: 0 }}>
                {on ? "◆" : "◇"}
              </span>
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
