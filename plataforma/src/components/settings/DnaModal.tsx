"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type QText     = { type: "text";     label: string; placeholder?: string };
type QTextarea = { type: "textarea"; label: string; placeholder?: string };
type QRadio    = { type: "radio";    label: string; options: string[] };
type QChips    = { type: "chips";    label: string; options: string[]; max?: number };
type Question  = QText | QTextarea | QRadio | QChips;

interface Block {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

// ─── Blocks data (10 blocos do PDF) ──────────────────────────────────────────

const BLOCKS: Block[] = [
  {
    id: 1,
    title: "Contexto operacional",
    description: "Capacidade e limitações antes de qualquer estratégia.",
    questions: [
      { type: "radio", label: "Tipo de atendimento", options: ["Clínica própria", "Clínica de terceiros", "Ambos"] },
      { type: "text", label: "Cidade de atendimento", placeholder: "São Paulo, SP" },
      { type: "radio", label: "Dias de atendimento por semana", options: ["1–2 dias", "3–4 dias", "5 dias", "6–7 dias"] },
      { type: "text", label: "Atendimentos por semana (média)", placeholder: "20 sessões" },
      { type: "textarea", label: "Limitação de agenda para algum procedimento?", placeholder: "Ex: Laser apenas às quartas…" },
      { type: "textarea", label: "Limitação de estrutura, insumos ou equipamentos?", placeholder: "Ex: Sem Fotona atualmente…" },
    ],
  },
  {
    id: 2,
    title: "Objetivo financeiro",
    description: "Transformar faturamento em demanda previsível.",
    questions: [
      { type: "text", label: "Meta de faturamento mensal (R$)", placeholder: "48.000" },
      { type: "text", label: "Ticket médio dos procedimentos (R$)", placeholder: "3.200" },
    ],
  },
  {
    id: 3,
    title: "Estratégia de procedimentos",
    description: "Definir o que a IA vai vender.",
    questions: [
      { type: "text", label: "Seu procedimento carro-chefe atual", placeholder: "Harmonização facial" },
      { type: "text", label: "Procedimento que você MAIS quer vender agora", placeholder: "Bioestimulador" },
      { type: "textarea", label: "Procedimentos com maior margem ou interesse estratégico", placeholder: "Explique o porquê…" },
      { type: "textarea", label: "Procedimento estratégico para posicionamento (mesmo que não seja o mais lucrativo)", placeholder: "Ex: Fotona — eleva percepção de tecnologia…" },
      { type: "textarea", label: "Procedimentos que você NÃO quer mais vender", placeholder: "Ex: Preenchimento com ácido X…" },
    ],
  },
  {
    id: 4,
    title: "Conversão",
    description: "Identificar gargalos atuais.",
    questions: [
      { type: "radio", label: "Você já gera pacientes pelo Instagram?", options: ["Sim, frequentemente", "Sim, raramente", "Ainda não"] },
      { type: "text", label: "Leads (mensagens) recebidas por semana", placeholder: "30" },
      { type: "text", label: "Agendamentos realizados por semana", placeholder: "12" },
      { type: "text", label: "Quantos agendamentos viram procedimento pago?", placeholder: "8" },
      { type: "text", label: "Procedimento que mais converte em venda hoje", placeholder: "Botox" },
      { type: "textarea", label: "Procedimento que gera conversa mas pouca venda", placeholder: "Ex: Bioestimulador — medo do preço…" },
    ],
  },
  {
    id: 5,
    title: "Posicionamento e diferenciação",
    description: "Como a IA comunica e cria autoridade.",
    questions: [
      { type: "radio", label: "Tom de comunicação", options: ["Formal", "Equilibrado", "Informal"] },
      { type: "radio", label: "Estilo de comunicação preferido", options: ["Técnica", "Emocional", "Direta"] },
      { type: "textarea", label: "Valores que você quer transmitir no conteúdo", placeholder: "Ex: Naturalidade, segurança, elegância…" },
      { type: "textarea", label: "O que você NÃO quer comunicar", placeholder: "Ex: Não quero parecer clínica de desconto…" },
      { type: "textarea", label: "Por que um paciente escolheria você?", placeholder: "Sua diferença real…" },
      { type: "textarea", label: "O que você faz diferente na prática?", placeholder: "Ex: Atendo em sessões mais longas, sem pressa…" },
    ],
  },
  {
    id: 6,
    title: "Público",
    description: "Alimentar construção de conteúdo persuasivo.",
    questions: [
      { type: "radio", label: "Faixa etária predominante", options: ["25–35", "35–45", "45–55", "55+", "Misto"] },
      { type: "radio", label: "Renda aproximada", options: ["Classe C", "Classe B", "Classe A", "Alta renda"] },
      { type: "radio", label: "Nível de vaidade do público", options: ["Baixo", "Médio", "Alto"] },
      { type: "radio", label: "Já realizou harmonização antes?", options: ["Maioria nunca fez", "Maioria já fez", "Misto"] },
      { type: "textarea", label: "Principais dores desse paciente", placeholder: "Ex: Aparência cansada, perda de volume…" },
      { type: "textarea", label: "O que ele mais deseja ao buscar harmonização?", placeholder: "Ex: Naturalidade, descanso, confiança…" },
      { type: "textarea", label: "Principais objeções antes de fechar", placeholder: "Ex: Medo de ficar artificial, preço…" },
      { type: "textarea", label: "O que faz esse paciente confiar em um profissional?", placeholder: "Ex: Portfólio natural, referências…" },
    ],
  },
  {
    id: 7,
    title: "Capacidade de produção",
    description: "Ajustar estratégia à realidade da execução.",
    questions: [
      { type: "radio", label: "Dias por semana disponíveis para gravar", options: ["1 dia", "2 dias", "3+ dias", "Flexível"] },
      { type: "radio", label: "Horas por dia para produção de conteúdo", options: ["30 min", "1 hora", "2 horas", "3+ horas"] },
      { type: "radio", label: "Tem alguém que ajuda na gravação ou edição?", options: ["Sim", "Não", "Às vezes"] },
      { type: "radio", label: "Prefere gravar tudo em um dia ou ao longo da semana?", options: ["Tudo num dia", "Dividido na semana", "Sem preferência"] },
      { type: "radio", label: "Confortável aparecendo em vídeo?", options: ["Sim, muito", "Mais ou menos", "Prefiro evitar"] },
    ],
  },
  {
    id: 8,
    title: "Histórico de conteúdo",
    description: "Evitar tentativa e erro inicial.",
    questions: [
      { type: "radio", label: "Você já posta conteúdo atualmente?", options: ["Sim, com frequência", "Sim, raramente", "Ainda não"] },
      { type: "radio", label: "Formato que gera mais resultado hoje", options: ["Reels", "Feed (carrossel)", "Stories", "Não sei"] },
      { type: "chips", label: "Tipo de conteúdo que gera mais mensagens", options: ["Antes/depois", "Educacional", "Bastidores", "Depoimentos", "Técnico", "Lifestyle"], max: 2 },
      { type: "textarea", label: "Conteúdos que você sente que não funcionam", placeholder: "Ex: Posts muito técnicos sem imagem…" },
    ],
  },
  {
    id: 9,
    title: "Comportamento e execução",
    description: "Adaptar o nível de rigidez da IA.",
    questions: [
      { type: "radio", label: "Você costuma seguir planejamento ou improvisa?", options: ["Sigo planejamento", "Misto", "Improviso muito"] },
      { type: "radio", label: "Já tentou seguir um calendário de conteúdo?", options: ["Sim e funcionou", "Sim, mas abandonei", "Nunca tentei"] },
    ],
  },
  {
    id: 10,
    title: "Direção estratégica",
    description: "Alinhar expectativa com o sistema.",
    questions: [
      { type: "radio", label: "Seu foco principal hoje", options: ["Crescimento rápido", "Estabilidade", "Posicionamento"] },
      { type: "radio", label: "Você prefere", options: ["Mais volume de conteúdo", "Mais qualidade e profundidade"] },
      { type: "radio", label: "Disposta a seguir estratégia mesmo fora do padrão atual?", options: ["Sim, totalmente", "Com ressalvas", "Prefiro manter meu estilo"] },
    ],
  },
];

// ─── Sub-input components ─────────────────────────────────────────────────────

function PillRadio({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => {
        const on = value === opt;
        return (
          <motion.button
            key={opt} type="button"
            onClick={() => onChange(on ? "" : opt)}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "7px 16px", borderRadius: 9999,
              border: `1px solid ${on ? "var(--gold)" : "var(--line)"}`,
              background: on ? "color-mix(in oklch, var(--gold) 8%, transparent)" : "transparent",
              fontSize: 13, fontWeight: 500,
              color: on ? "var(--gold-dark)" : "var(--ink-soft)",
              transition: "all 0.18s ease",
            }}
          >
            {on && <span style={{ marginRight: 6, fontSize: 8 }}>◆</span>}
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

function ChipsInput({ options, value, onChange, max }: { options: string[]; value: string[]; onChange: (v: string[]) => void; max?: number }) {
  function toggle(opt: string) {
    if (value.includes(opt)) { onChange(value.filter((v) => v !== opt)); return; }
    if (!max || value.length < max) onChange([...value, opt]);
  }
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => {
        const on = value.includes(opt);
        const maxed = !!max && value.length >= max && !on;
        return (
          <motion.button
            key={opt} type="button"
            onClick={() => !maxed && toggle(opt)}
            whileTap={!maxed ? { scale: 0.96 } : {}}
            style={{
              padding: "7px 16px", borderRadius: 9999,
              border: `1px solid ${on ? "var(--gold)" : "var(--line)"}`,
              background: on ? "color-mix(in oklch, var(--gold) 8%, transparent)" : "transparent",
              fontSize: 13, fontWeight: 500,
              color: on ? "var(--gold-dark)" : maxed ? "var(--mute)" : "var(--ink-soft)",
              opacity: maxed ? 0.45 : 1,
              transition: "all 0.18s ease",
              cursor: maxed ? "default" : "pointer",
            }}
          >
            {on && <span style={{ marginRight: 6, fontSize: 8 }}>◆</span>}
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Block form ───────────────────────────────────────────────────────────────

type BlockAnswers = Record<string, string | string[]>;

function BlockForm({ block, answers, onChange }: { block: Block; answers: BlockAnswers; onChange: (a: BlockAnswers) => void }) {
  function set(label: string, val: string | string[]) {
    onChange({ ...answers, [label]: val });
  }

  return (
    <div className="flex flex-col gap-6">
      {block.questions.map((q) => {
        const key = q.label;
        if (q.type === "text") return (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="mono-label">{q.label}</label>
            <input
              type="text"
              value={(answers[key] as string) ?? ""}
              onChange={(e) => set(key, e.target.value)}
              placeholder={q.placeholder}
              className="rounded-[var(--radius)] px-4 py-2.5 text-[14px] outline-none font-medium"
              style={{
                border: "1px solid var(--line)", background: "var(--paper-surface)",
                color: "var(--ink)",
              }}
            />
          </div>
        );

        if (q.type === "textarea") return (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="mono-label">{q.label}</label>
            <textarea
              rows={3}
              value={(answers[key] as string) ?? ""}
              onChange={(e) => set(key, e.target.value)}
              placeholder={q.placeholder}
              className="rounded-[var(--radius)] px-4 py-2.5 text-[13px] outline-none resize-none leading-relaxed"
              style={{
                border: "1px solid var(--line)", background: "var(--paper-surface)",
                color: "var(--ink)", fontFamily: "inherit",
              }}
            />
          </div>
        );

        if (q.type === "radio") return (
          <div key={key} className="flex flex-col gap-1">
            <label className="mono-label">{q.label}</label>
            <PillRadio
              options={q.options}
              value={(answers[key] as string) ?? ""}
              onChange={(v) => set(key, v)}
            />
          </div>
        );

        if (q.type === "chips") return (
          <div key={key} className="flex flex-col gap-1">
            <label className="mono-label">
              {q.label}
              {q.max && <span style={{ color: "var(--mute)", marginLeft: 6 }}>até {q.max}</span>}
            </label>
            <ChipsInput
              options={q.options}
              value={(answers[key] as string[]) ?? []}
              onChange={(v) => set(key, v)}
              max={q.max}
            />
          </div>
        );

        return null;
      })}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

function hasAnswer(val: string | string[] | undefined): boolean {
  if (!val) return false;
  if (Array.isArray(val)) return val.length > 0;
  return val.trim() !== "";
}

export function DnaModal({ open, onClose }: Props) {
  const [blockIdx, setBlockIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [allAnswers, setAllAnswers] = useState<Record<number, BlockAnswers>>({});

  const block = BLOCKS[blockIdx];
  const answers = allAnswers[block.id] ?? {};
  const totalBlocks = BLOCKS.length;

  const blocksDone = BLOCKS.filter((b) => {
    const a = allAnswers[b.id] ?? {};
    return Object.values(a).some(hasAnswer);
  }).length;

  function goTo(idx: number) {
    setDir(idx > blockIdx ? 1 : -1);
    setBlockIdx(idx);
  }

  const goNext = useCallback(() => {
    if (blockIdx < totalBlocks - 1) goTo(blockIdx + 1);
  }, [blockIdx]);

  const goPrev = useCallback(() => {
    if (blockIdx > 0) goTo(blockIdx - 1);
  }, [blockIdx]);

  function updateAnswers(a: BlockAnswers) {
    setAllAnswers((prev) => ({ ...prev, [block.id]: a }));
  }

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.38, ease } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -18 : 18, filter: "blur(3px)", transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as E4 } }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — also acts as centering container */}
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            style={{ background: "color-mix(in oklch, var(--ink) 55%, transparent)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
          {/* Modal panel — stopPropagation so clicks inside don't close */}
          <motion.div
            className="flex flex-col"
            style={{
              width: "min(700px, 96vw)", maxHeight: "90vh",
              background: "var(--paper)", borderRadius: "var(--radius)",
              border: "1px solid var(--line)",
              boxShadow: "0 32px 80px -16px color-mix(in oklch, var(--ink) 28%, transparent)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.38, ease }}
          >
            {/* ── Header ── */}
            <div
              className="shrink-0 px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--line-soft)" }}
            >
              <div className="flex items-center gap-3">
                <span className="kicker">DNA Estratégico</span>
                <span
                  className="mono-label px-2 py-0.5 rounded-full"
                  style={{
                    background: "color-mix(in oklch, var(--gold) 10%, transparent)",
                    border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                    color: "var(--gold-dark)",
                  }}
                >
                  {blocksDone}/{totalBlocks} completos
                </span>
              </div>
              <button
                onClick={onClose}
                className="transition-colors"
                style={{ color: "var(--mute)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── Block navigator dots ── */}
            <div
              className="shrink-0 px-6 py-3 flex items-center gap-2"
              style={{ borderBottom: "1px solid var(--line-soft)" }}
            >
              {BLOCKS.map((b, i) => {
                const done = Object.values(allAnswers[b.id] ?? {}).some(hasAnswer);
                const active = i === blockIdx;
                return (
                  <motion.button
                    key={b.id}
                    type="button"
                    onClick={() => goTo(i)}
                    title={b.title}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: active ? 28 : 8, height: 8,
                      borderRadius: 9999,
                      background: active
                        ? "var(--gold)"
                        : done
                        ? "color-mix(in oklch, var(--gold) 45%, transparent)"
                        : "var(--line)",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                );
              })}

              {/* Progress bar */}
              <div
                className="flex-1 ml-2 relative overflow-hidden rounded-full"
                style={{ height: 2, background: "var(--line)" }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "var(--gold)" }}
                  animate={{ width: `${((blockIdx + 1) / totalBlocks) * 100}%` }}
                  transition={{ duration: 0.5, ease }}
                />
              </div>

              <span className="mono-label shrink-0 ml-1">
                {String(blockIdx + 1).padStart(2, "0")}/{String(totalBlocks).padStart(2, "0")}
              </span>
            </div>

            {/* ── Scrollable block content ── */}
            <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={block.id}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-6 py-6"
                >
                  {/* Block header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="mono-label"
                        style={{
                          width: 26, height: 26, borderRadius: "50%",
                          border: "1px solid var(--gold)",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          color: "var(--gold-dark)", fontSize: 9, flexShrink: 0,
                        }}
                      >
                        {String(block.id).padStart(2, "0")}
                      </span>
                      <h3
                        className="font-medium"
                        style={{ fontSize: 20, color: "var(--ink)", letterSpacing: "-0.015em" }}
                      >
                        {block.title}
                      </h3>
                      {Object.values(answers).some(hasAnswer) && (
                        <div
                          style={{
                            width: 18, height: 18, borderRadius: "50%",
                            background: "color-mix(in oklch, var(--gold) 15%, transparent)",
                            border: "1px solid var(--gold)",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Check className="h-2.5 w-2.5" style={{ color: "var(--gold-dark)" }} />
                        </div>
                      )}
                    </div>
                    <p className="text-[13px]" style={{ color: "var(--mute)", lineHeight: 1.5 }}>
                      {block.description}
                    </p>
                  </div>

                  <BlockForm
                    block={block}
                    answers={answers}
                    onChange={updateAnswers}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Footer navigation ── */}
            <div
              className="shrink-0 px-6 py-4 flex items-center justify-between"
              style={{ borderTop: "1px solid var(--line-soft)" }}
            >
              <motion.button
                onClick={goPrev}
                disabled={blockIdx === 0}
                whileHover={blockIdx > 0 ? { x: -2 } : {}}
                whileTap={blockIdx > 0 ? { scale: 0.97 } : {}}
                className="flex items-center gap-2 text-[13px] font-medium transition-colors"
                style={{
                  color: blockIdx === 0 ? "var(--line)" : "var(--mute)",
                  cursor: blockIdx === 0 ? "default" : "pointer",
                }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Anterior
              </motion.button>

              <span className="mono-label" style={{ color: "var(--mute)" }}>
                {block.title}
              </span>

              {blockIdx < totalBlocks - 1 ? (
                <motion.button
                  onClick={goNext}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 text-[13px] font-medium"
                  style={{ color: "var(--ink)" }}
                >
                  Próximo
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-gold flex items-center gap-2 px-5 py-2 text-[13px]"
                >
                  Salvar DNA
                  <Check className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
