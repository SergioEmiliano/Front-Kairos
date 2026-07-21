"use client";

import { useState, useCallback, useRef, useEffect, useId } from "react";
import {
  X,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  BookOpen,
  LayoutGrid,
  Instagram,
  Clock,
  Target,
  Hash,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { GoldButton } from "@/shared/components/GoldButton";
import { Textarea } from "@/shared/components/ui/textarea";
import { ContentEntry, ContentFormat, ContentStatus } from "@/shared/types";
import { formatFullDate } from "@/shared/lib/date-utils";
import { cn } from "@/shared/lib/utils";

// ─── Display maps ─────────────────────────────────────────────────────────────

const FORMAT_LABEL: Record<ContentFormat, string> = {
  reel: "Reel",
  post: "Post",
  story: "Story",
  carrossel: "Carrossel",
};

const FORMAT_ICONS: Record<ContentFormat, LucideIcon> = {
  reel: Film,
  post: ImageIcon,
  story: BookOpen,
  carrossel: LayoutGrid,
};

const STATUS_CONFIG: Record<ContentStatus, { label: string; color: string }> = {
  publicado: { label: "Publicado", color: "var(--gold)" },
  planejado: { label: "Planejado", color: "color-mix(in oklch, var(--gold) 55%, transparent)" },
  rascunho: { label: "Rascunho", color: "color-mix(in oklch, var(--mute) 50%, transparent)" },
};

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  tiktok: Film,
  youtube: Film,
  linkedin: BookOpen,
};

// ─── Mock content enrichment ─────────────────────────────────────────────────
// Generates sensible defaults for entries that don't have rich fields yet.
// Replace with real backend data when available.

function enrichEntry(entry: ContentEntry): Required<ContentEntry> {
  return {
    ...entry,
    platform: entry.platform ?? "instagram",
    suggestedTime: entry.suggestedTime ?? "10:00",
    objective: entry.objective ?? "Autoridade clínica + captação de leads",
    cta: entry.cta ?? "Agende sua avaliação pelo link na bio →",
    script: entry.script ?? `Hook: Abertura impactante relacionada a "${entry.idea}"\n\nCorpo: Desenvolvimento do tema com dados e técnica clínica.\n\nFechamento: Call to action e reforço do posicionamento.`,
    caption: entry.caption ?? `${entry.idea} ✨\n\nConteúdo técnico para pacientes que buscam resultados reais e duradouros.\n\nAgende sua avaliação pelo link na bio.`,
    hashtags: entry.hashtags ?? ["#harmonizacao", "#medicinaestetica", "#esteticafacial", "#dramarinavasconcellos"],
    color: entry.color ?? "#B5883A",
  };
}

// ─── Mock AI regeneration ────────────────────────────────────────────────────
// Replace with real AI API call. Accepts instruction for refinement.

async function mockRegenerateContent(
  entry: ContentEntry,
  instruction?: string
): Promise<Partial<ContentEntry>> {
  await new Promise((r) => setTimeout(r, 1600 + Math.random() * 800));

  const base = enrichEntry(entry);

  if (!instruction) {
    // Full regeneration — same theme, different angle
    return {
      script: `${base.script}\n\n[Versão regenerada — nova abordagem aplicada com ângulo diferente para maximizar engajamento e alcance orgânico.]`,
      caption: `${base.caption}\n\n[Caption atualizada com foco em conversão otimizada para o horário sugerido.]`,
    };
  }

  // Refinement — apply instruction
  if (/elegante|sofisticado/i.test(instruction)) {
    return {
      caption: base.caption.replace(
        /✨/g,
        "— curadoria personalizada para cada paciente."
      ) + "\n\n[Adaptado para tom mais sofisticado e editorial.]",
      cta: "Reserve sua avaliação exclusiva →",
    };
  }
  if (/harmoni[zs]/i.test(instruction)) {
    return {
      script: base.script + "\n\n[Reformulado com foco específico em harmonização facial completa — técnicas, indicações e diferencial clínico.]",
    };
  }
  if (/persuasivo|convers[aã]/i.test(instruction)) {
    return {
      cta: "Só 3 horários disponíveis esta semana. Reserve o seu →",
      caption: base.caption + "\n\n[Versão com gatilho de escassez e urgência ética.]",
    };
  }
  if (/emocional|conexão/i.test(instruction)) {
    return {
      caption: "Cada rosto conta uma história. O nosso papel é garantir que o seu seja contado com autenticidade e cuidado.\n\n" + base.caption,
    };
  }
  if (/reel/i.test(instruction)) {
    return {
      format: "reel",
      script: `Hook (00:00): Pergunta impactante sobre ${entry.idea}\n\nCorpo (00:08): Resposta visual e técnica em 30 segundos\n\nFechamento (00:40): CTA direto — "${base.cta}"`,
      suggestedTime: "19:00",
    };
  }

  // Generic refinement
  return {
    script: base.script + `\n\n[Refinado com instrução: "${instruction}"]`,
    caption: base.caption + `\n\n[Legenda ajustada: "${instruction}"]`,
  };
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text, fieldKey }: { text: string; fieldKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="w-7 h-7 rounded-full border border-kairos-line inline-flex items-center justify-center text-kairos-charcoal/80 hover:border-kairos-charcoal transition-colors"
      aria-label={`Copiar ${fieldKey}`}
    >
      {copied ? (
        <Check className="h-3 w-3" style={{ color: "var(--gold-dark)" }} />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}

// ─── Content section block ────────────────────────────────────────────────────

interface SectionBlockProps {
  label: string;
  children: React.ReactNode;
  copyText?: string;
  fieldKey?: string;
  isLoading?: boolean;
}

function SectionBlock({
  label,
  children,
  copyText,
  fieldKey,
  isLoading,
}: SectionBlockProps) {
  return (
    <div className="card-surface rounded-[var(--radius)] px-5 py-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="mono-label" style={{ color: "var(--gold-dark)" }}>
          ◆ {label}
        </span>
        {copyText && fieldKey && !isLoading && (
          <CopyButton text={copyText} fieldKey={fieldKey} />
        )}
      </div>
      <div className="hairline" />
      {isLoading ? (
        <div className="space-y-2 py-1">
          {[100, 85, 70].map((w) => (
            <div
              key={w}
              className="h-3 rounded shimmer-bar"
              style={{
                width: `${w}%`,
                background: "color-mix(in oklch, var(--paper-warm) 70%, transparent)",
              }}
            />
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// ─── Refine input ─────────────────────────────────────────────────────────────

interface RefineInputProps {
  onSubmit: (instruction: string) => void;
  isLoading: boolean;
  onCancel: () => void;
}

function RefineInput({ onSubmit, isLoading, onCancel }: RefineInputProps) {
  const [instruction, setInstruction] = useState("");
  const inputId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!instruction.trim()) return;
    onSubmit(instruction.trim());
  }, [instruction, onSubmit]);

  const SUGGESTIONS = [
    "Tom mais elegante",
    "Focar em harmonização",
    "Versão mais emocional",
    "Deixar mais persuasivo",
    "Adaptar para Reels",
  ];

  return (
    <div
      className="rounded-[var(--radius)] p-4 flex flex-col gap-3 animate-fade-in"
      style={{
        background: "color-mix(in oklch, var(--paper-warm) 40%, transparent)",
        border: "1px solid color-mix(in oklch, var(--gold) 25%, transparent)",
      }}
    >
      <label
        htmlFor={inputId}
        className="mono-label"
        style={{ fontSize: 9, color: "var(--gold-dark)" }}
      >
        ◆ Como deseja refinar este conteúdo?
      </label>

      {/* Quick suggestion chips */}
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setInstruction(s)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] border transition-all",
              instruction === s
                ? "border-kairos-gold text-kairos-charcoal"
                : "border-kairos-line text-kairos-stone hover:border-kairos-charcoal hover:text-kairos-charcoal"
            )}
            style={{
              background: instruction === s
                ? "color-mix(in oklch, var(--gold) 8%, transparent)"
                : "transparent",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <Textarea
        id={inputId}
        ref={textareaRef}
        rows={2}
        placeholder="Descreva como quer refinar... Ex: deixar mais emocional e focar em resultados"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="text-[13px] resize-none"
        disabled={isLoading}
      />

      <div className="flex items-center justify-between">
        <span className="mono-label" style={{ fontSize: 8 }}>
          ⌘↵ para enviar
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!instruction.trim() || isLoading}
          >
            {isLoading ? (
              "Refinando…"
            ) : (
              <>
                <Send className="h-3 w-3" />
                Refinar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Refinement history ───────────────────────────────────────────────────────

interface RefinementRecord {
  instruction: string;
  timestamp: Date;
}

// ─── ContentViewModal ─────────────────────────────────────────────────────────

interface ContentViewModalProps {
  open: boolean;
  onClose: () => void;
  entry: ContentEntry | null;
  siblings?: ContentEntry[];   // other entries on the same day (for navigation)
}

type ViewLoadState = "idle" | "regenerating" | "refining";

export function ContentViewModal({
  open,
  onClose,
  entry: initialEntry,
  siblings = [],
}: ContentViewModalProps) {
  // Local mutable copy — updated by refine/regen without touching the store
  const [localEntry, setLocalEntry] = useState<ContentEntry | null>(null);
  const [loadState, setLoadState] = useState<ViewLoadState>("idle");
  const [refineOpen, setRefineOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [refinements, setRefinements] = useState<RefinementRecord[]>([]);

  // Sibling navigation (for days with multiple entries)
  const [siblingIndex, setSiblingIndex] = useState(0);

  // Keep localEntry in sync when initialEntry changes
  useEffect(() => {
    if (initialEntry) {
      setLocalEntry(initialEntry);
      setRefinements([]);
      setRefineOpen(false);
      setSiblingIndex(0);
      setLoadState("idle");
    }
  }, [initialEntry]);

  const handleClose = useCallback(() => {
    onClose();
    // Let animation finish before resetting
    setTimeout(() => {
      setLocalEntry(null);
      setRefinements([]);
      setRefineOpen(false);
      setHistoryOpen(false);
      setLoadState("idle");
    }, 300);
  }, [onClose]);

  const handleRegenerate = useCallback(async () => {
    if (!localEntry) return;
    setLoadState("regenerating");
    const updates = await mockRegenerateContent(localEntry);
    setLocalEntry((prev) => prev ? { ...prev, ...updates } : prev);
    setLoadState("idle");
  }, [localEntry]);

  const handleRefine = useCallback(
    async (instruction: string) => {
      if (!localEntry) return;
      setLoadState("refining");
      const updates = await mockRegenerateContent(localEntry, instruction);
      setLocalEntry((prev) => prev ? { ...prev, ...updates } : prev);
      setRefinements((prev) => [...prev, { instruction, timestamp: new Date() }]);
      setRefineOpen(false);
      setLoadState("idle");
    },
    [localEntry]
  );

  // Navigate between siblings
  const allSiblings = siblings;
  const navigateSibling = useCallback(
    (dir: "prev" | "next") => {
      if (!allSiblings.length) return;
      setSiblingIndex((i) => {
        const next = dir === "prev" ? i - 1 : i + 1;
        const clamped = Math.max(0, Math.min(allSiblings.length - 1, next));
        setLocalEntry(allSiblings[clamped]);
        return clamped;
      });
    },
    [allSiblings]
  );

  if (!localEntry) return null;

  const rich = enrichEntry(localEntry);
  const FormatIcon = FORMAT_ICONS[rich.format];
  const PlatformIcon = PLATFORM_ICONS[rich.platform] ?? Instagram;
  const statusConf = STATUS_CONFIG[rich.status];
  const isLoading = loadState !== "idle";

  const formattedDate = (() => {
    try {
      return formatFullDate(new Date(rich.date + "T12:00:00"));
    } catch {
      return rich.date;
    }
  })();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[860px] max-h-[92vh] overflow-y-auto kairos-scroll",
            "card-surface rounded-[var(--radius)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div className="px-8 py-6 border-b border-kairos-line flex items-start justify-between gap-4 sticky top-0 z-10"
            style={{ background: "color-mix(in oklch, var(--paper-surface) 95%, transparent)", backdropFilter: "blur(8px)" }}
          >
            <div className="flex flex-col gap-2 min-w-0">
              <span className="kicker">Conteúdo · {formattedDate}</span>

              <DialogPrimitive.Title
                className="text-[22px] text-kairos-charcoal font-medium leading-tight pr-4"
                style={{ letterSpacing: "-0.018em" }}
              >
                {rich.idea}
              </DialogPrimitive.Title>

              {/* Meta badges */}
              <div className="flex items-center flex-wrap gap-2 mt-1">
                {/* Format */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium"
                  style={{
                    background: "color-mix(in oklch, var(--gold) 10%, transparent)",
                    borderColor: "color-mix(in oklch, var(--gold) 35%, transparent)",
                    color: "var(--gold-dark)",
                  }}
                >
                  <FormatIcon className="h-3 w-3" />
                  {FORMAT_LABEL[rich.format]}
                </span>

                {/* Platform */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{ borderColor: "var(--line)", color: "var(--mute)" }}
                >
                  <PlatformIcon className="h-3 w-3" />
                  {rich.platform}
                </span>

                {/* Time */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{ borderColor: "var(--line)", color: "var(--mute)" }}
                >
                  <Clock className="h-3 w-3" />
                  {rich.suggestedTime}
                </span>

                {/* Status */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px]"
                  style={{
                    borderColor: statusConf.color,
                    color: statusConf.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: statusConf.color }}
                  />
                  {statusConf.label}
                </span>

                {/* Refinement badge */}
                {refinements.length > 0 && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px]"
                    style={{
                      borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)",
                      background: "color-mix(in oklch, var(--gold) 6%, transparent)",
                      color: "var(--gold-dark)",
                    }}
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    {refinements.length} refinamento{refinements.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Sibling navigation */}
              {allSiblings.length > 0 && (
                <div className="flex items-center gap-1 mr-1">
                  <button
                    onClick={() => navigateSibling("prev")}
                    disabled={siblingIndex === 0}
                    className="w-7 h-7 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center transition-colors disabled:opacity-40"
                    aria-label="Conteúdo anterior"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <span className="mono-label" style={{ fontSize: 9, minWidth: 32, textAlign: "center" }}>
                    {siblingIndex + 1} / {allSiblings.length + 1}
                  </span>
                  <button
                    onClick={() => navigateSibling("next")}
                    disabled={siblingIndex === allSiblings.length - 1}
                    className="w-7 h-7 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center transition-colors disabled:opacity-40"
                    aria-label="Próximo conteúdo"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Close */}
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-charcoal transition-colors"
                aria-label="Fechar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────────────────────── */}
          <div className="px-8 py-6 flex flex-col gap-4">

            {/* Loading banner */}
            {isLoading && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] animate-fade-in"
                style={{
                  background: "color-mix(in oklch, var(--gold) 6%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--gold) 25%, transparent)",
                }}
              >
                <div className="kairos-spinner" style={{ width: 20, height: 20 }} />
                <span className="mono-label" style={{ color: "var(--gold-dark)" }}>
                  ◆ {loadState === "regenerating" ? "Regenerando conteúdo…" : "Refinando com IA…"}
                </span>
                <div className="flex-1">
                  <div className="shimmer-bar h-px" />
                </div>
              </div>
            )}

            {/* ── Objective ──────────────────────────────────────────────── */}
            <SectionBlock
              label="01 · Objetivo do post"
              copyText={rich.objective}
              fieldKey="objetivo"
              isLoading={isLoading && loadState === "regenerating"}
            >
              <div className="flex items-start gap-2.5">
                <Target
                  className="h-4 w-4 shrink-0 mt-0.5"
                  style={{ color: "var(--gold-dark)" }}
                />
                <p className="text-[13px] text-kairos-charcoal leading-[1.55]">
                  {rich.objective}
                </p>
              </div>
            </SectionBlock>

            {/* ── Script ─────────────────────────────────────────────────── */}
            <SectionBlock
              label="02 · Roteiro completo"
              copyText={rich.script}
              fieldKey="roteiro"
              isLoading={isLoading}
            >
              <div className="flex flex-col gap-2">
                {rich.script.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[13px] text-kairos-charcoal leading-[1.6]"
                  >
                    {paragraph.split("\n").map((line, j) => {
                      const isMeta = /^(Hook|Corpo|Fechamento|Slide|Frame|Resultado|Comparação|Pergunta|CTA)\s/.test(line);
                      return (
                        <span key={j}>
                          {j > 0 && <br />}
                          {isMeta ? (
                            <span className="mono-label" style={{ color: "var(--gold-dark)", fontSize: 9 }}>
                              {line}
                            </span>
                          ) : (
                            line
                          )}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            </SectionBlock>

            {/* ── Caption ────────────────────────────────────────────────── */}
            <SectionBlock
              label="03 · Legenda"
              copyText={rich.caption}
              fieldKey="legenda"
              isLoading={isLoading}
            >
              <p className="text-[13px] text-kairos-charcoal/80 leading-[1.6] whitespace-pre-line">
                {rich.caption}
              </p>
            </SectionBlock>

            {/* ── CTA ────────────────────────────────────────────────────── */}
            <SectionBlock
              label="04 · CTA sugerido"
              copyText={rich.cta}
              fieldKey="cta"
              isLoading={isLoading && loadState === "regenerating"}
            >
              <p
                className="italic text-[15px] leading-[1.4]"
                style={{ color: "var(--gold-dark)", fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                &ldquo;{rich.cta}&rdquo;
              </p>
            </SectionBlock>

            {/* ── Hashtags ────────────────────────────────────────────────── */}
            <SectionBlock
              label="05 · Hashtags"
              copyText={rich.hashtags.join(" ")}
              fieldKey="hashtags"
              isLoading={isLoading && loadState === "regenerating"}
            >
              <div className="flex items-start gap-2">
                <Hash className="h-3.5 w-3.5 shrink-0 mt-0.5 text-kairos-stone" />
                <p
                  className="text-[12px] leading-[1.7]"
                  style={{ color: "var(--mute)", letterSpacing: "0.02em" }}
                >
                  {rich.hashtags.join(" ")}
                </p>
              </div>
            </SectionBlock>

            {/* ── Refinement history ──────────────────────────────────────── */}
            {refinements.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setHistoryOpen((p) => !p)}
                  className="flex items-center gap-2 text-kairos-stone hover:text-kairos-charcoal transition-colors w-full"
                >
                  <span className="mono-label" style={{ fontSize: 9 }}>
                    Histórico de refinamentos ({refinements.length})
                  </span>
                  {historyOpen ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>

                {historyOpen && (
                  <ul className="mt-2 flex flex-col gap-1.5 animate-fade-in">
                    {refinements.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg"
                        style={{
                          background: "color-mix(in oklch, var(--paper-warm) 50%, transparent)",
                          border: "1px solid var(--line-soft)",
                        }}
                      >
                        <Sparkles
                          className="h-3 w-3 shrink-0 mt-0.5"
                          style={{ color: "var(--gold-dark)" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-kairos-charcoal leading-[1.4]">
                            &ldquo;{r.instruction}&rdquo;
                          </p>
                          <span className="mono-label block mt-0.5" style={{ fontSize: 8 }}>
                            {r.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ── Refine input ────────────────────────────────────────────── */}
            {refineOpen && (
              <RefineInput
                onSubmit={handleRefine}
                isLoading={loadState === "refining"}
                onCancel={() => setRefineOpen(false)}
              />
            )}
          </div>

          {/* ── Footer actions ──────────────────────────────────────────────── */}
          <div
            className="px-8 py-5 border-t border-kairos-line flex items-center justify-between gap-4 sticky bottom-0"
            style={{
              background: "color-mix(in oklch, var(--paper-surface) 95%, transparent)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Left: meta */}
            <span className="mono-label" style={{ fontSize: 9 }}>
              ◆ Pilar atual:{" "}
              <span style={{ color: "var(--gold-dark)" }}>Autoridade</span>
            </span>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              {/* Regenerate */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isLoading}
                className="gap-1.5"
              >
                <RefreshCw className={cn("h-3 w-3", isLoading && loadState === "regenerating" && "animate-spin")} />
                Regenerar
              </Button>

              {/* Refine toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefineOpen((p) => !p)}
                disabled={isLoading}
                className={cn(
                  "gap-1.5",
                  refineOpen && "border-kairos-gold text-kairos-charcoal"
                )}
              >
                <Sparkles
                  className="h-3 w-3"
                  style={{ color: refineOpen ? "var(--gold-dark)" : undefined }}
                />
                Refinar
              </Button>

              {/* Schedule */}
              <GoldButton size="sm" disabled={isLoading}>
                Salvar no calendário
              </GoldButton>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
