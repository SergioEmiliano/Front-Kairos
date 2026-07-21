"use client";

import { useState, useRef, useCallback } from "react";
import {
  BookOpen,
  FileText,
  CheckSquare,
  Video,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Sparkles,
  Clock,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Material, MaterialCategory, MaterialType } from "@/shared/types";
import { mockMaterials, materialCategoryLabels, materialTypeLabels } from "@/shared/mock/materials";
import { cn } from "@/shared/lib/utils";

// ─── Type icons ───────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<MaterialType, LucideIcon> = {
  ebook: BookOpen,
  guia: FileText,
  checklist: CheckSquare,
  video: Video,
};

// ─── Category filter list ─────────────────────────────────────────────────────

const ALL_CATEGORIES: Array<{ value: MaterialCategory | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "harmonizacao", label: "Harmonização" },
  { value: "botox", label: "Botox" },
  { value: "bioestimulador", label: "Bioestimulador" },
  { value: "marketing", label: "Marketing" },
  { value: "negocios", label: "Negócios" },
  { value: "protocolo", label: "Protocolo" },
];

// ─── MaterialCard ─────────────────────────────────────────────────────────────

interface MaterialCardProps {
  material: Material;
  size?: "md" | "lg";
}

function MaterialCard({ material, size = "md" }: MaterialCardProps) {
  const TypeIcon = TYPE_ICONS[material.type];
  const isLarge = size === "lg";
  const hasProgress = material.progress !== undefined;
  const isCompleted = material.progress === 100;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-[var(--radius)] border overflow-hidden",
        "transition-all duration-200 hover:shadow-md hover:-translate-y-px cursor-pointer",
        "card-surface",
        isLarge ? "min-w-[280px]" : "min-w-[220px]",
        isCompleted && "opacity-80"
      )}
      role="article"
      tabIndex={0}
      aria-label={`${material.title} — ${materialTypeLabels[material.type]}`}
    >
      {/* Cover */}
      <div
        className="relative h-[120px] flex flex-col justify-between p-4 shrink-0"
        style={{
          background: `linear-gradient(135deg, ${material.coverAccent}, color-mix(in oklch, ${material.coverAccent} 50%, var(--ink)))`,
        }}
      >
        {/* Top row: badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {material.isNew && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-[0.12em]"
                style={{
                  background: "color-mix(in oklch, white 20%, transparent)",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              >
                ✦ Novo
              </span>
            )}
          </div>

          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.12em]"
            style={{
              background: "color-mix(in oklch, white 15%, transparent)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <TypeIcon className="h-2.5 w-2.5" />
            {materialTypeLabels[material.type]}
          </span>
        </div>

        {/* Bottom: meta */}
        <div className="flex items-end justify-between gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.14em] font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {materialCategoryLabels[material.category]}
          </span>
          {material.pages && (
            <span
              className="flex items-center gap-1 text-[9px]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <FileText className="h-2.5 w-2.5" />
              {material.pages} págs.
            </span>
          )}
          {material.duration && (
            <span
              className="flex items-center gap-1 text-[9px]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <Clock className="h-2.5 w-2.5" />
              {material.duration}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar (if started) */}
      {hasProgress && (
        <div className="h-[2px] shrink-0" style={{ background: "var(--line)" }}>
          <div
            className="h-full transition-all"
            style={{ width: `${material.progress}%`, background: "var(--gold)" }}
          />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div>
          <h3
            className="text-[14px] text-kairos-charcoal font-medium leading-[1.3] line-clamp-2"
            style={{ letterSpacing: "-0.01em" }}
          >
            {material.title}
          </h3>
          <p className="text-[11px] text-kairos-stone mt-1.5 leading-[1.45] line-clamp-2">
            {material.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {material.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.1em]"
              style={{
                background: "color-mix(in oklch, var(--paper-warm) 60%, transparent)",
                border: "1px solid var(--line)",
                color: "var(--mute)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-2 border-t"
          style={{ borderColor: "var(--line-soft)" }}
        >
          {hasProgress ? (
            <span className="mono-label" style={{ fontSize: 9, color: isCompleted ? "var(--gold-dark)" : "var(--mute)" }}>
              {isCompleted ? "◆ Concluído" : `${material.progress}% lido`}
            </span>
          ) : (
            <span className="mono-label" style={{ fontSize: 9 }}>
              {material.author ?? "Kairós"}
            </span>
          )}

          <button
            className="inline-flex items-center gap-1 text-[11px] font-medium transition-colors"
            style={{ color: "var(--gold-dark)" }}
            aria-label={`Acessar ${material.title}`}
          >
            {isCompleted ? "Reler" : hasProgress ? "Continuar" : "Acessar"}
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Horizontal scroll section ────────────────────────────────────────────────

interface HScrollSectionProps {
  title: string;
  kicker?: string;
  materials: Material[];
  cardSize?: "md" | "lg";
}

function HScrollSection({
  title,
  kicker,
  materials,
  cardSize = "md",
}: HScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  }, []);

  if (materials.length === 0) return null;

  return (
    <section className="shrink-0">
      <div className="flex items-baseline justify-between mb-4 px-6">
        <div>
          {kicker && <span className="kicker">{kicker}</span>}
          <h2
            className="text-[20px] text-kairos-charcoal font-medium mt-1"
            style={{ letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center transition-colors"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-kairos-charcoal" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center transition-colors"
            aria-label="Rolar para direita"
          >
            <ChevronRight className="h-3.5 w-3.5 text-kairos-charcoal" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {materials.map((m) => (
          <div key={m.id} style={{ scrollSnapAlign: "start" }}>
            <MaterialCard material={m} size={cardSize} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MaterialsPage ────────────────────────────────────────────────────────────

export default function MaterialsPage() {
  const [activeCategory, setActiveCategory] = useState<MaterialCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = mockMaterials.filter((m) => m.isFeatured);
  const recentlyAdded = mockMaterials.filter((m) => m.isNew);
  const inProgress = mockMaterials.filter(
    (m) => m.progress !== undefined && m.progress > 0 && m.progress < 100
  );

  const filteredMaterials = mockMaterials.filter((m) => {
    const matchesCategory =
      activeCategory === "all" || m.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div
          className="relative px-6 pt-8 pb-7 shrink-0 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--gold) 5%, var(--paper)), var(--paper))",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, color-mix(in oklch, var(--gold) 8%, transparent), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <span className="kicker">Biblioteca · Materiais exclusivos</span>
            <h1
              className="text-[36px] text-kairos-charcoal leading-[1.05] mt-2.5 mb-3 font-medium max-w-[520px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Conhecimento que{" "}
              <span className="italic-gold">converte</span>.
            </h1>
            <p className="text-[14px] text-kairos-stone leading-[1.55] max-w-[480px] mb-6">
              Materiais desenvolvidos por profissionais da estética com foco em
              prática clínica, posicionamento e crescimento sustentável.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[
                { value: String(mockMaterials.length), label: "materiais" },
                {
                  value: String(mockMaterials.filter((m) => m.progress !== undefined).length),
                  label: "em progresso",
                },
                {
                  value: String(mockMaterials.filter((m) => m.progress === 100).length),
                  label: "concluídos",
                },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-baseline gap-2">
                  {i > 0 && (
                    <span
                      className="w-px h-4 inline-block"
                      style={{ background: "var(--line)" }}
                    />
                  )}
                  <span
                    className="italic-gold"
                    style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}
                  >
                    {value}
                  </span>
                  <span className="mono-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Search + filter ────────────────────────────────────────────────── */}
        <div className="px-6 py-5 flex flex-col gap-4 shrink-0">
          {/* Search */}
          <div className="relative max-w-[400px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-kairos-stone pointer-events-none"
            />
            <input
              type="search"
              placeholder="Buscar materiais…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full h-9 pl-9 pr-4 rounded-full border text-[13px] transition-colors",
                "bg-kairos-paper text-kairos-charcoal placeholder:text-kairos-stone",
                "border-kairos-line focus:border-kairos-charcoal focus:outline-none"
              )}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {ALL_CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value as MaterialCategory | "all")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border",
                  activeCategory === value
                    ? "text-kairos-charcoal"
                    : "text-kairos-stone hover:border-kairos-charcoal hover:text-kairos-charcoal"
                )}
                style={{
                  borderColor:
                    activeCategory === value
                      ? "color-mix(in oklch, var(--gold) 60%, transparent)"
                      : "var(--line)",
                  background:
                    activeCategory === value
                      ? "color-mix(in oklch, var(--gold) 8%, transparent)"
                      : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Conditional sections ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 pb-8">

          {/* In progress — only when filter is "all" and no search */}
          {activeCategory === "all" && !searchQuery && inProgress.length > 0 && (
            <HScrollSection
              kicker="Retomar leitura"
              title="Onde você parou"
              materials={inProgress}
              cardSize="lg"
            />
          )}

          {/* Featured — only when filter is "all" and no search */}
          {activeCategory === "all" && !searchQuery && (
            <HScrollSection
              kicker="Destaques · Curadoria Kairós"
              title="Mais recomendados"
              materials={featured}
              cardSize="lg"
            />
          )}

          {/* Recent — only when filter is "all" and no search */}
          {activeCategory === "all" && !searchQuery && recentlyAdded.length > 0 && (
            <HScrollSection
              kicker="Publicados recentemente"
              title="Novidades"
              materials={recentlyAdded}
            />
          )}

          {/* Filtered grid */}
          <section className="px-6">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                {activeCategory !== "all" || searchQuery ? (
                  <span className="kicker">
                    {searchQuery
                      ? `Resultados para "${searchQuery}"`
                      : materialCategoryLabels[activeCategory as MaterialCategory]}
                  </span>
                ) : (
                  <span className="kicker">Para aumentar sua autoridade</span>
                )}
                <h2
                  className="text-[20px] text-kairos-charcoal font-medium mt-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {filteredMaterials.length} material(is)
                </h2>
              </div>
            </div>

            {filteredMaterials.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center"
                  style={{ borderColor: "var(--line)", background: "var(--paper-warm)" }}
                >
                  <Sparkles className="h-5 w-5" style={{ color: "var(--gold-dark)" }} />
                </div>
                <div>
                  <p className="text-[14px] text-kairos-charcoal font-medium">
                    Nenhum material encontrado
                  </p>
                  <p className="text-[12px] text-kairos-stone mt-1">
                    Tente um filtro diferente ou limpe a busca.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-[12px] underline underline-offset-4 text-kairos-stone hover:text-kairos-charcoal transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMaterials.map((m) => (
                  <MaterialCard key={m.id} material={m} />
                ))}
              </div>
            )}
          </section>

          {/* Footer note */}
          <div className="px-6">
            <div
              className="rounded-[var(--radius)] px-5 py-4 flex items-center gap-4"
              style={{
                background: "color-mix(in oklch, var(--paper-warm) 50%, transparent)",
                border: "1px solid var(--line)",
              }}
            >
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: "var(--gold-dark)" }} />
              <div>
                <p className="text-[12px] text-kairos-charcoal font-medium">
                  Novos materiais toda semana
                </p>
                <p className="text-[11px] text-kairos-stone mt-0.5">
                  A biblioteca é atualizada a cada ciclo com conteúdos alinhados ao seu momento estratégico.
                </p>
              </div>
              <button
                className="shrink-0 inline-flex items-center gap-1.5 text-[11px] ml-auto"
                style={{ color: "var(--gold-dark)" }}
              >
                Sugerir tema
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
