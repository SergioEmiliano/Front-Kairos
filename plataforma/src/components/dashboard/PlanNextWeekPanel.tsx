"use client";

import { useState, useCallback, useId } from "react";
import {
  X,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  Instagram,
  Film,
  Image as ImageIcon,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PlannedPost, ContentFormat } from "@/types";
import { Button } from "@/components/ui/button";
import { GoldButton } from "@/components/common/GoldButton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// ─── Mock generator (replace with API/AI call) ────────────────────────────────

const PLATFORM_ICONS: Record<PlannedPost["platform"], LucideIcon> = {
  instagram: Instagram,
  tiktok: Film,
  youtube: Film,
  linkedin: BookOpen,
};

const FORMAT_ICONS: Record<ContentFormat, LucideIcon> = {
  reel: Film,
  post: ImageIcon,
  story: BookOpen,
  carrossel: LayoutGrid,
};

const FORMAT_LABEL: Record<ContentFormat, string> = {
  reel: "Reel",
  post: "Post",
  story: "Story",
  carrossel: "Carrossel",
};

function generateMockPosts(): PlannedPost[] {
  const weekdays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const templates: Omit<PlannedPost, "id" | "refinementHistory" | "isRefining">[] = [
    {
      title: "Mito vs. Verdade: Botox deixa a face sem expressão?",
      description:
        "Carrossel educativo desmistificando o principal medo das pacientes sobre toxina botulínica. Usa linguagem acessível e exemplos visuais.",
      objective: "Autoridade clínica + captação de leads frias",
      cta: "Salve para mostrar para uma amiga que tem esse medo →",
      suggestedTime: "10:00",
      platform: "instagram",
      format: "carrossel",
      weekday: weekdays[0],
    },
    {
      title: "Bastidores: um dia de atendimento na clínica",
      description:
        "Story no formato vlog mostrando a rotina profissional com foco em cuidado e elegância do ambiente — gera proximidade.",
      objective: "Conexão e humanização da marca",
      cta: "Responda: qual procedimento você teria curiosidade de ver?",
      suggestedTime: "17:30",
      platform: "instagram",
      format: "story",
      weekday: weekdays[1],
    },
    {
      title: "Por que resultado natural custa mais?",
      description:
        "Reel educativo em 45 segundos explicando a diferença entre técnica de diluição calibrada e aplicação em excesso.",
      objective: "Posicionamento premium + filtrar paciente ideal",
      cta: "Agende sua avaliação pelo link na bio.",
      suggestedTime: "09:00",
      platform: "instagram",
      format: "reel",
      weekday: weekdays[2],
    },
    {
      title: "Antes e depois — harmonização sutil",
      description:
        "Post estático com resultado real de paciente. Foco na sutileza do resultado e no processo de calibração individualizado.",
      objective: "Prova social e conversão",
      cta: "Conheça os próximos horários disponíveis → link na bio",
      suggestedTime: "12:00",
      platform: "instagram",
      format: "post",
      weekday: weekdays[3],
    },
    {
      title: "3 perguntas para fazer antes de escolher sua médica",
      description:
        "Carrossel com critérios objetivos que a paciente ideal usa para avaliar um profissional — posiciona a doutora como referência.",
      objective: "Educação + autoridade + filtro de paciente",
      cta: "Me conta nos comentários qual você já perguntaria.",
      suggestedTime: "08:00",
      platform: "instagram",
      format: "carrossel",
      weekday: weekdays[4],
    },
  ];

  return templates.map((t, i) => ({
    ...t,
    id: `plan-${Date.now()}-${i}`,
    refinementHistory: [],
    isRefining: false,
  }));
}

function refineMockPost(post: PlannedPost, instruction: string): PlannedPost {
  // Simulate AI refinement — replace with real API call
  const refined = { ...post };

  if (/elegante|sofisticado/i.test(instruction)) {
    refined.description =
      refined.description.replace(/\.$/, "") +
      ". Adaptado com linguagem mais sofisticada e referências ao universo premium.";
    refined.cta = "Reserve sua avaliação exclusiva →";
  } else if (/botox|toxina/i.test(instruction)) {
    refined.title = refined.title + " — foco em toxina botulínica";
    refined.description =
      "Reformulado com foco específico em toxina botulínica: dosagem, zonas de aplicação e diferencial técnico da clínica.";
  } else if (/persuasivo|conversão/i.test(instruction)) {
    refined.cta =
      "Só restam 3 horários disponíveis esta semana. Garanta o seu →";
    refined.objective += " (otimizado para conversão imediata)";
  } else if (/reels|reel/i.test(instruction)) {
    refined.format = "reel";
    refined.description =
      refined.description + " Adaptado para formato vertical 9:16 com hook nos primeiros 3 segundos.";
    refined.suggestedTime = "19:00";
  } else {
    refined.description =
      refined.description + ` Refinado com foco em: "${instruction}".`;
  }

  return refined;
}

// ─── Planned Post Card ────────────────────────────────────────────────────────

interface PlannedPostCardProps {
  post: PlannedPost;
  index: number;
  onRefine: (postId: string, instruction: string) => void;
  onRegenerate: (postId: string) => void;
}

function PlannedPostCard({
  post,
  index,
  onRefine,
  onRegenerate,
}: PlannedPostCardProps) {
  const [refineOpen, setRefineOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const inputId = useId();

  const PlatformIcon = PLATFORM_ICONS[post.platform];
  const FormatIcon = FORMAT_ICONS[post.format];

  const handleSubmitRefinement = useCallback(() => {
    if (!instruction.trim()) return;
    onRefine(post.id, instruction.trim());
    setInstruction("");
    setRefineOpen(false);
  }, [instruction, onRefine, post.id]);

  return (
    <div
      className={cn(
        "card-surface rounded-[var(--radius)] flex flex-col gap-0 overflow-hidden",
        "transition-shadow duration-200 hover:shadow-md",
        post.isRefining && "opacity-70"
      )}
      style={{
        borderColor: post.refinementHistory.length > 0
          ? "color-mix(in oklch, var(--gold) 40%, transparent)"
          : undefined,
      }}
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3 border-b border-kairos-line"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <div className="flex items-start gap-3 min-w-0">
          {/* Index */}
          <span
            className="shrink-0 w-7 h-7 rounded-full border border-kairos-line inline-flex items-center justify-center"
            style={{
              color: "var(--gold-dark)",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <div className="min-w-0">
            <div
              className="flex items-center gap-2 mb-0.5 flex-wrap"
            >
              <span
                className="mono-label capitalize"
                style={{ fontSize: 9, color: "var(--gold-dark)" }}
              >
                {post.weekday}
              </span>
              <span className="mono-label" style={{ fontSize: 9, color: "var(--mute)" }}>
                ·
              </span>
              <div className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5 text-kairos-stone" />
                <span className="mono-label" style={{ fontSize: 9 }}>
                  {post.suggestedTime}
                </span>
              </div>
            </div>
            <h3
              className="text-[14px] text-kairos-charcoal font-medium leading-[1.3]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {post.title}
            </h3>
          </div>
        </div>

        {/* Format + platform badges */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border"
            style={{
              fontSize: 9,
              border: "1px solid var(--line)",
              color: "var(--mute)",
            }}
          >
            <PlatformIcon className="h-2.5 w-2.5" />
            {post.platform}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{
              fontSize: 9,
              background: "color-mix(in oklch, var(--gold) 12%, transparent)",
              color: "var(--gold-dark)",
              border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
            }}
          >
            <FormatIcon className="h-2.5 w-2.5" />
            {FORMAT_LABEL[post.format]}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Description */}
        <p className="text-[13px] text-kairos-charcoal/80 leading-[1.55]">
          {post.description}
        </p>

        {/* Meta rows */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <span className="mono-label" style={{ fontSize: 9 }}>Objetivo</span>
            <p className="text-[11px] text-kairos-charcoal leading-[1.4]">
              {post.objective}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="mono-label" style={{ fontSize: 9 }}>CTA sugerido</span>
            <p
              className="text-[11px] leading-[1.4] italic"
              style={{ color: "var(--gold-dark)" }}
            >
              &ldquo;{post.cta}&rdquo;
            </p>
          </div>
        </div>

        {/* Loading spinner (refining state) */}
        {post.isRefining && (
          <div className="flex items-center gap-2 py-1">
            <div className="kairos-spinner scale-75" />
            <span className="mono-label" style={{ fontSize: 9, color: "var(--gold-dark)" }}>
              Refinando com IA…
            </span>
          </div>
        )}

        {/* Refinement history */}
        {post.refinementHistory.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setHistoryOpen((p) => !p)}
              className="flex items-center gap-1.5 text-kairos-stone hover:text-kairos-charcoal transition-colors"
            >
              <span className="mono-label" style={{ fontSize: 9 }}>
                {post.refinementHistory.length} refinamento(s)
              </span>
              {historyOpen ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            {historyOpen && (
              <ul className="mt-2 flex flex-col gap-1.5 animate-fade-in">
                {post.refinementHistory.map((entry, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: "color-mix(in oklch, var(--paper-warm) 50%, transparent)",
                      border: "1px solid var(--line-soft)",
                    }}
                  >
                    <span className="mono-label shrink-0" style={{ fontSize: 8, color: "var(--gold-dark)", marginTop: 2 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-kairos-charcoal/80 leading-[1.4]">
                      &ldquo;{entry.instruction}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Refine input — expandable */}
        {refineOpen && (
          <div
            className="flex flex-col gap-2 pt-3 border-t border-kairos-line animate-fade-in"
          >
            <label
              htmlFor={inputId}
              className="mono-label"
              style={{ fontSize: 9, color: "var(--gold-dark)" }}
            >
              ◆ Como deseja refinar este post?
            </label>
            <Textarea
              id={inputId}
              rows={2}
              placeholder="Ex: quero um tom mais elegante · focar em botox · criar para reels…"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmitRefinement();
                }
              }}
              className="text-[13px] resize-none"
            />
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setRefineOpen(false);
                  setInstruction("");
                }}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitRefinement}
                disabled={!instruction.trim()}
              >
                <Send className="h-3 w-3" />
                Enviar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Card actions */}
      <div
        className="px-5 py-3 flex items-center gap-2 border-t border-kairos-line"
        style={{ borderTop: "1px solid var(--line-soft)" }}
      >
        <button
          onClick={() => onRegenerate(post.id)}
          className="flex items-center gap-1.5 text-kairos-stone hover:text-kairos-charcoal transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span className="mono-label" style={{ fontSize: 9 }}>Regenerar</span>
        </button>

        <div className="flex-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => setRefineOpen((p) => !p)}
          className={cn(refineOpen && "border-kairos-gold text-kairos-charcoal")}
        >
          <Sparkles className="h-3 w-3" />
          Refinar
        </Button>
      </div>
    </div>
  );
}

// ─── PlanNextWeekPanel ────────────────────────────────────────────────────────

interface PlanNextWeekPanelProps {
  open: boolean;
  onClose: () => void;
}

type PanelState = "idle" | "loading" | "result";

export function PlanNextWeekPanel({ open, onClose }: PlanNextWeekPanelProps) {
  const [panelState, setPanelState] = useState<PanelState>("idle");
  const [posts, setPosts] = useState<PlannedPost[]>([]);

  const handleGenerate = useCallback(() => {
    setPanelState("loading");
    // Simulate async AI generation — replace with real API call
    setTimeout(() => {
      setPosts(generateMockPosts());
      setPanelState("result");
    }, 2200);
  }, []);

  const handleRefine = useCallback(
    (postId: string, instruction: string) => {
      // Mark as refining
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isRefining: true } : p))
      );

      // Simulate async refinement
      setTimeout(() => {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id !== postId) return p;
            const refined = refineMockPost(p, instruction);
            return {
              ...refined,
              isRefining: false,
              refinedAt: new Date(),
              refinementHistory: [
                ...p.refinementHistory,
                { instruction, timestamp: new Date() },
              ],
            };
          })
        );
      }, 1500);
    },
    []
  );

  const handleRegenerate = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const [fresh] = generateMockPosts();
        return {
          ...fresh,
          id: postId,
          weekday: p.weekday,
          refinementHistory: p.refinementHistory,
        };
      })
    );
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    // Delay reset so animation completes
    setTimeout(() => {
      setPanelState("idle");
      setPosts([]);
    }, 300);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-kairos-charcoal/20 backdrop-blur-[2px]"
        onClick={handleClose}
        aria-hidden
      />

      {/* Panel — slides up from bottom */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "h-[75vh] flex flex-col",
          "card-surface rounded-t-[calc(var(--radius)*1.5)]",
          "shadow-2xl",
          "animate-slide-up"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Planejar próxima semana"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--line)" }}
            aria-hidden
          />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-kairos-line flex items-start justify-between gap-4 shrink-0">
          <div>
            <span className="kicker">IA · Planejamento semanal</span>
            <h2
              className="text-[22px] text-kairos-charcoal font-medium mt-1.5 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {panelState === "result"
                ? <>Próxima semana <span className="italic-gold">calibrada.</span></>
                : <>Planejamento da <span className="italic-gold">próxima semana.</span></>}
            </h2>
            {panelState === "result" && (
              <p className="text-[12px] text-kairos-stone mt-1">
                {posts.length} sugestões geradas · revise, refine e adicione ao calendário.
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-charcoal transition-colors shrink-0"
            aria-label="Fechar painel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll px-6 py-5">

          {/* Idle state */}
          {panelState === "idle" && (
            <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)",
                  background: "color-mix(in oklch, var(--gold) 6%, transparent)",
                }}
              >
                <Sparkles className="h-6 w-6" style={{ color: "var(--gold-dark)" }} />
              </div>
              <div className="max-w-[360px]">
                <p className="text-[15px] text-kairos-charcoal font-medium" style={{ letterSpacing: "-0.01em" }}>
                  A IA vai analisar seus pilares, histórico e meta do mês para sugerir os melhores posts.
                </p>
                <p className="text-[12px] text-kairos-stone mt-2 leading-[1.5]">
                  Você pode refinar cada sugestão individualmente depois.
                </p>
              </div>
              <GoldButton onClick={handleGenerate}>
                <Sparkles className="h-3.5 w-3.5" />
                Gerar plano da semana
              </GoldButton>
            </div>
          )}

          {/* Loading state */}
          {panelState === "loading" && (
            <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
              <div className="kairos-spinner" style={{ width: 36, height: 36 }} />
              <div>
                <div className="mono-label" style={{ color: "var(--gold-dark)" }}>
                  ◆ Analisando seus pilares + histórico de performance
                </div>
                <div className="w-48 mx-auto mt-4">
                  <div className="shimmer-bar h-px" />
                </div>
                <p
                  className="font-serif-display italic text-[15px] text-kairos-charcoal/60 mt-4"
                >
                  &ldquo;Calibrando frequência, tom e horário ideal…&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Result state */}
          {panelState === "result" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {posts.map((post, i) => (
                <PlannedPostCard
                  key={post.id}
                  post={post}
                  index={i}
                  onRefine={handleRefine}
                  onRegenerate={handleRegenerate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {panelState === "result" && (
          <div className="px-6 py-4 border-t border-kairos-line flex items-center justify-between gap-4 shrink-0">
            <span className="mono-label" style={{ fontSize: 9 }}>
              ◆ Sugestões baseadas no pilar atual: <span style={{ color: "var(--gold-dark)" }}>Autoridade</span>
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerate}>
                <RefreshCw className="h-3 w-3" />
                Regenerar tudo
              </Button>
              <GoldButton size="sm" onClick={handleClose}>
                Adicionar ao calendário
              </GoldButton>
            </div>
          </div>
        )}
      </div>

      {/* Slide-up animation */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0.7; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </>
  );
}
