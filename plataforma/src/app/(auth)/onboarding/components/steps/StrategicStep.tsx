"use client";

import { motion } from "framer-motion";
import { StepShell } from "../StepShell";
import { cn } from "@/shared/lib/utils";

export interface StrategicData {
  meta: string;
  ticket: string;
  dias: string[];
  sessoesPerWeek: string;
  horasConteudo: string;
}

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const DIAS_KEYS = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

interface Props {
  data: StrategicData;
  onChange: (d: StrategicData) => void;
  onNext: () => void;
  onPrev: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

function NumberInput({
  label,
  prefix,
  suffix,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="mono-label">{label}</label>
      <div
        className="flex items-center gap-2 rounded-[var(--radius)] px-4 py-3"
        style={{ border: "1px solid var(--line)", background: "var(--paper-surface)" }}
      >
        {prefix && (
          <span className="mono-label shrink-0" style={{ color: "var(--mute)" }}>
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none font-medium"
          style={{ fontSize: 15, color: "var(--ink)", letterSpacing: "-0.01em" }}
        />
        {suffix && (
          <span className="mono-label shrink-0" style={{ color: "var(--mute)" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function StrategicStep({ data, onChange, onNext, onPrev }: Props) {
  const demanda =
    data.meta && data.ticket
      ? Math.max(1, Math.ceil(parseInt(data.meta.replace(/\D/g, "") || "0") / parseInt(data.ticket.replace(/\D/g, "") || "1")))
      : null;

  const canAdvance = data.meta.trim() !== "" && data.ticket.trim() !== "" && data.dias.length > 0;

  function toggleDia(key: string) {
    const next = data.dias.includes(key)
      ? data.dias.filter((d) => d !== key)
      : [...data.dias, key];
    onChange({ ...data, dias: next });
  }

  return (
    <StepShell
      step={2}
      total={4}
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
        DNA Estratégico · 02 de 04
      </motion.span>

      <motion.h1
        className="font-serif-display mb-3"
        style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.025em", color: "var(--ink)" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
      >
        Meta e{" "}
        <span className="italic-gold">capacidade real</span>.
      </motion.h1>

      <motion.p
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", opacity: 0.6, marginBottom: 36, maxWidth: 560 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Não adianta prometer ao sistema o que o seu dia não entrega. Defina sua meta e sua agenda real.
      </motion.p>

      <div className="flex flex-col gap-8 max-w-[840px]">

        {/* ── Bloco 2: Meta financeira ── */}
        <motion.div
          className="card-surface rounded-[var(--radius)] p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mono-label mb-5">◆ Objetivo financeiro</div>
          <div className="grid md:grid-cols-2 gap-5">
            <NumberInput
              label="Meta de faturamento mensal"
              prefix="R$"
              value={data.meta}
              placeholder="48.000"
              onChange={(v) => onChange({ ...data, meta: v })}
            />
            <NumberInput
              label="Ticket médio dos procedimentos"
              prefix="R$"
              value={data.ticket}
              placeholder="3.200"
              onChange={(v) => onChange({ ...data, ticket: v })}
            />
          </div>

          {/* Live math preview */}
          {demanda && (
            <motion.div
              className="mt-5 pt-5 flex items-center justify-between"
              style={{ borderTop: "1px dashed var(--line)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="mono-label">◆ Procedimentos necessários/mês</span>
              <span
                className="font-serif-display"
                style={{ fontSize: 26, fontStyle: "italic", color: "var(--gold-dark)", letterSpacing: "-0.025em" }}
              >
                {demanda}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ── Bloco 1: Contexto operacional ── */}
        <motion.div
          className="card-surface rounded-[var(--radius)] p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          <div className="mono-label mb-5">◆ Sua agenda real</div>

          <div className="mb-6">
            <label className="mono-label block mb-3">Dias de atendimento por semana</label>
            <div className="flex gap-2.5 flex-wrap">
              {DIAS.map((d, i) => {
                const key = DIAS_KEYS[i];
                const on = data.dias.includes(key);
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => toggleDia(key)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn("chip-circle focus:outline-none", on && "on")}
                    style={{ width: 44, height: 44, fontSize: 11 }}
                  >
                    {d}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <NumberInput
              label="Atendimentos por semana (média)"
              value={data.sessoesPerWeek}
              placeholder="20"
              suffix="sessões"
              onChange={(v) => onChange({ ...data, sessoesPerWeek: v })}
            />
            <NumberInput
              label="Horas disponíveis p/ conteúdo/semana"
              value={data.horasConteudo}
              placeholder="4"
              suffix="h/sem"
              onChange={(v) => onChange({ ...data, horasConteudo: v })}
            />
          </div>
        </motion.div>

      </div>
    </StepShell>
  );
}
