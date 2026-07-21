"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CalendarGrid } from "@/app/(plataform)/dashboard/components/CalendarGrid";
import { WeekView } from "@/app/(plataform)/dashboard/components/WeekView";
import { PlanNextWeekPanel } from "@/app/(plataform)/dashboard/components/PlanNextWeekPanel";
import { ContentGenerationModal } from "@/app/(plataform)/dashboard/components/ContentGenerationModal";
import { ContentViewModal } from "@/app/(plataform)/dashboard/components/ContentViewModal";
import { useUIStore } from "@/store/ui.store";
import { useAppStore } from "@/store/app.store";
import { contentService } from "@/services/content.service";
import { ContentEntry } from "@/shared/types";
import {
  addMonths,
  subMonths,
  addDays,
  formatMonthYear,
  formatWeekRange,
} from "@/shared/lib/date-utils";
import { formatCurrency, cn } from "@/shared/lib/utils";

export default function DashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeekRef, setCurrentWeekRef] = useState(new Date());
  const [content, setContent] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    // Creation modal
    contentModalOpen,
    selectedDate,
    openContentModal,
    closeContentModal,
    // View modal
    contentViewModalOpen,
    contentViewEntry,
    contentViewSiblings,
    openContentViewModal,
    closeContentViewModal,
    // Calendar state
    calendarView,
    toggleCalendarView,
    planNextWeekOpen,
    setPlanNextWeekOpen,
  } = useUIStore();

  const doctor = useAppStore((s) => s.doctor);

  // Fetch content on month change
  useEffect(() => {
    setLoading(true);
    const monthStr = currentMonth.toISOString().slice(0, 7);
    contentService.getCalendarContent(monthStr).then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, [currentMonth]);

  // ── Content index ──────────────────────────────────────────────────────────
  // Memoised so click handlers can look up entries without re-renders
  const contentByDate = useMemo(() => {
    const map: Record<string, ContentEntry[]> = {};
    content.forEach((c) => {
      if (!map[c.date]) map[c.date] = [];
      map[c.date].push(c);
    });
    return map;
  }, [content]);

  // ── Smart day click ────────────────────────────────────────────────────────
  // If the day has content → open view modal for the first entry.
  // If the day is empty  → open creation modal.
  const handleDayClick = useCallback(
    (dateStr: string) => {
      const entries = contentByDate[dateStr] ?? [];
      if (entries.length > 0) {
        openContentViewModal(entries[0], entries);
      } else {
        openContentModal(dateStr);
      }
    },
    [contentByDate, openContentViewModal, openContentModal]
  );

  // ── Entry click (from WeekView pill) ──────────────────────────────────────
  // Opens the view modal for the specific pill clicked, with all siblings.
  const handleEntryClick = useCallback(
    (entry: ContentEntry) => {
      const allForDay = contentByDate[entry.date] ?? [entry];
      openContentViewModal(entry, allForDay);
    },
    [contentByDate, openContentViewModal]
  );

  // ── Navigation ────────────────────────────────────────────────────────────
  const goBack = useCallback(() => {
    if (calendarView === "month") {
      setCurrentMonth((d) => subMonths(d, 1));
    } else {
      setCurrentWeekRef((d) => addDays(d, -7));
    }
  }, [calendarView]);

  const goForward = useCallback(() => {
    if (calendarView === "month") {
      setCurrentMonth((d) => addMonths(d, 1));
    } else {
      setCurrentWeekRef((d) => addDays(d, 7));
    }
  }, [calendarView]);

  const goToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now);
    setCurrentWeekRef(now);
  }, []);

  const publishedCount = content.filter((c) => c.status === "publicado").length;
  const firstName = doctor?.name
    ? doctor.name.split(" ")[1] ?? doctor.name
    : "Marina";

  const periodLabel =
    calendarView === "month"
      ? formatMonthYear(currentMonth)
      : formatWeekRange(currentWeekRef);

  return (
    <div className="h-full flex flex-col overflow-hidden p-6 gap-4">
      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex items-end justify-between gap-6 shrink-0">
        <div className="min-w-0">
          <span className="kicker">Planejamento Estratégico · {periodLabel}</span>
          <h1
            className="text-[32px] text-kairos-charcoal leading-[1.05] mt-2.5 font-medium"
            style={{ letterSpacing: "-0.025em" }}
          >
            Olá, {firstName}.{" "}
            <span className="italic-gold">Seu mês, com estratégia.</span>
          </h1>
        </div>

        {/* KPI strip */}
        <div className="hidden md:flex items-end gap-6 shrink-0">
          {[
            {
              label: "Conteúdos publicados",
              value: String(publishedCount).padStart(2, "0"),
              sub: "DE 28 · 64%",
              italic: true,
            },
            { label: "Leads gerados", value: "47", sub: "META · 65", italic: false },
            { label: "Alcance total", value: "32,4K", sub: "+38% VS MARÇO", italic: false },
          ].map(({ label, value, sub, italic }, i) => (
            <div key={label} className="flex items-end gap-6">
              {i > 0 && <div className="hairline-v h-10 self-center" />}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="mono-label truncate">{label}</span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={italic ? "italic-gold" : "text-kairos-charcoal"}
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.025em",
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                  <span className="mono-label" style={{ fontSize: 9 }}>
                    {sub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Calendar card ────────────────────────────────────────────────────── */}
      <div className="card-surface flex-1 min-h-0 flex flex-col overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-kairos-line shrink-0">
          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="w-8 h-9 rounded-full border border-kairos-line hover:border-kairos-charcoal"
              aria-label="Período anterior"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-kairos-charcoal" />
            </Button>

            <div>
              <div className="mono-label">Ciclo 04 · 2026</div>
              {calendarView === "month" ? (
                <div
                  className="text-[22px] text-kairos-charcoal mt-0.5 capitalize font-medium"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {formatMonthYear(currentMonth).split(" ")[0]}{" "}
                  <span className="italic-gold">2026</span>
                </div>
              ) : (
                <div
                  className="text-[15px] text-kairos-charcoal mt-0.5 font-medium"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {formatWeekRange(currentWeekRef)}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goForward}
              className="w-8 h-9 rounded-full border border-kairos-line hover:border-kairos-charcoal"
              aria-label="Próximo período"
            >
              <ChevronRight className="h-3.5 w-3.5 text-kairos-charcoal" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setPlanNextWeekOpen(true)}
            >
              <Sparkles
                className="h-3 w-3"
                style={{ color: "var(--gold-dark)" }}
              />
              Planejar próxima semana
            </Button>

            {/* View toggle */}
            <button
              onClick={() => {
                toggleCalendarView();
                setCurrentWeekRef(new Date());
              }}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-full border",
                "text-[12px] font-medium transition-all",
                calendarView === "week"
                  ? "border-kairos-gold text-kairos-charcoal"
                  : "border-kairos-line text-kairos-stone hover:border-kairos-charcoal hover:text-kairos-charcoal"
              )}
              aria-pressed={calendarView === "week"}
              aria-label="Alternar visualização semana/mês"
            >
              {calendarView === "week" ? (
                <>
                  <LayoutGrid className="h-3 w-3" />
                  Ver mês
                </>
              ) : (
                <>
                  <CalendarDays className="h-3 w-3" />
                  Ver semana
                </>
              )}
            </button>

            <Button
              size="sm"
              onClick={() =>
                openContentModal(new Date().toISOString().slice(0, 10))
              }
            >
              <Plus className="h-3 w-3" />
              Gerar conteúdo
            </Button>
          </div>
        </div>

        {/* Calendar body */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl shimmer-bar"
                  style={{
                    background:
                      "color-mix(in oklch, var(--paper-warm) 60%, transparent)",
                  }}
                />
              ))}
            </div>
          ) : calendarView === "month" ? (
            <div className="h-full animate-fade-in">
              <CalendarGrid
                month={currentMonth}
                content={content}
                onAddContent={openContentModal}
                onDayClick={handleDayClick}
              />
            </div>
          ) : (
            <div className="h-full animate-fade-in">
              <WeekView
                referenceDate={currentWeekRef}
                content={content}
                onAddContent={openContentModal}
                onDayClick={handleDayClick}
                onEntryClick={handleEntryClick}
              />
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-kairos-line flex gap-5 flex-wrap items-center shrink-0">
          {[
            { label: "Publicado / agendado", color: "var(--gold)" },
            {
              label: "Rascunho",
              color: "color-mix(in oklch, var(--gold) 45%, transparent)",
            },
            {
              label: "Aguardando confirmação",
              color: "color-mix(in oklch, var(--mute) 50%, transparent)",
            },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-px w-3" style={{ background: color }} />
              <span className="mono-label">{label}</span>
            </div>
          ))}

          <button
            onClick={goToday}
            className="ml-auto mono-label hover:text-kairos-charcoal transition-colors"
            style={{ fontSize: 9 }}
          >
            Ir para hoje →
          </button>
          <span className="mono-label">◆ Atualizado há 02 min</span>
        </div>
      </div>

      {/* ── Meta do mês ──────────────────────────────────────────────────────── */}
      <div className="card-surface p-5 shrink-0">
        <div className="flex items-baseline justify-between mb-4">
          <span className="kicker">Meta do mês</span>
          <span className="mono-label">Atualizado · 23 abr · 09:12</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              label: "Faturamento",
              value: doctor ? formatCurrency(doctor.monthlyRevenue) : "R$ 30,8k",
              sub: "64% DE R$ 48K",
              italic: true,
              pct: 64,
            },
            { label: "Procedimentos", value: "09", sub: "DE 15 AGENDADOS", italic: false, pct: 60 },
            { label: "Leads", value: "47", sub: "DE 65 PROJETADAS", italic: false, pct: 72 },
            { label: "Conversão", value: "32%", sub: "+4PTS VS MÊS ANTERIOR", italic: false, pct: 80 },
          ].map(({ label, value, sub, italic, pct }, i) => (
            <div
              key={label}
              className="pr-5"
              style={{ borderRight: i < 3 ? "1px solid var(--line)" : "none" }}
            >
              <div className="mono-label mb-2">{label}</div>
              <div
                className={italic ? "italic-gold" : "text-kairos-charcoal"}
                style={{
                  fontSize: 32,
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                {value}
              </div>
              <div className="mono-label mt-1.5" style={{ fontSize: 9 }}>
                {sub}
              </div>
              <div
                className="h-px mt-2.5 relative overflow-hidden"
                style={{ background: "var(--line)" }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${pct}%`, background: "var(--gold)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modals & Panels ──────────────────────────────────────────────────── */}

      {/* Creation modal — empty day click or "Gerar conteúdo" */}
      <ContentGenerationModal
        open={contentModalOpen}
        onClose={closeContentModal}
        date={selectedDate}
      />

      {/* View modal — existing content click */}
      <ContentViewModal
        open={contentViewModalOpen}
        onClose={closeContentViewModal}
        entry={contentViewEntry}
        siblings={contentViewSiblings}
      />

      {/* Plan next week panel */}
      <PlanNextWeekPanel
        open={planNextWeekOpen}
        onClose={() => setPlanNextWeekOpen(false)}
      />
    </div>
  );
}
