"use client";

import { useCallback } from "react";
import { Plus } from "lucide-react";
import { ContentEntry, ContentFormat } from "@/types";
import {
  getWeekDays,
  formatWeekdayShort,
  formatDayNumber,
  isToday,
} from "@/lib/date-utils";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const formatLabel: Record<ContentFormat, string> = {
  reel: "Reel",
  post: "Post",
  story: "Story",
  carrossel: "Carrossel",
};

const formatAccent: Record<ContentFormat, string> = {
  reel: "var(--gold)",
  post: "var(--steel)",
  story: "color-mix(in oklch, var(--gold) 60%, transparent)",
  carrossel: "var(--gold-dark)",
};

const statusDot: Record<string, { bg: string; label: string }> = {
  publicado: { bg: "var(--gold)", label: "Publicado" },
  planejado: { bg: "color-mix(in oklch, var(--gold) 55%, transparent)", label: "Planejado" },
  rascunho: { bg: "color-mix(in oklch, var(--mute) 50%, transparent)", label: "Rascunho" },
};

// ─── Content pill ─────────────────────────────────────────────────────────────

interface ContentPillProps {
  entry: ContentEntry;
  onEntryClick: (entry: ContentEntry) => void;
}

function ContentPill({ entry, onEntryClick }: ContentPillProps) {
  const accent = formatAccent[entry.format];
  const dot = statusDot[entry.status] ?? statusDot.rascunho;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent column click from firing
      onEntryClick(entry);
    },
    [entry, onEntryClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onEntryClick(entry);
      }
    },
    [entry, onEntryClick]
  );

  return (
    <div
      className={cn(
        "relative px-2.5 py-2 rounded-lg border text-left w-full",
        "transition-all duration-150 cursor-pointer group/pill",
        "hover:shadow-sm hover:border-kairos-gold/40 hover:-translate-y-px"
      )}
      style={{
        background: "color-mix(in oklch, var(--paper-warm) 60%, transparent)",
        borderColor: "color-mix(in oklch, var(--line) 80%, transparent)",
        borderLeftWidth: 2,
        borderLeftColor: accent,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver conteúdo: ${entry.idea}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Status dot */}
      <span
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
        style={{ background: dot.bg }}
        title={dot.label}
        aria-label={dot.label}
      />

      {/* Format label */}
      <span className="mono-label block" style={{ fontSize: 8, color: accent }}>
        {formatLabel[entry.format]}
      </span>

      {/* Idea */}
      <p
        className="text-[11px] text-kairos-charcoal leading-[1.35] mt-0.5 line-clamp-2 pr-3"
        style={{ letterSpacing: "-0.005em" }}
      >
        {entry.idea}
      </p>
    </div>
  );
}

// ─── Day column ───────────────────────────────────────────────────────────────

interface DayColumnProps {
  day: Date;
  entries: ContentEntry[];
  onAddContent: (date: string) => void;
  onDayClick: (date: string) => void;
  onEntryClick: (entry: ContentEntry) => void;
}

function DayColumn({
  day,
  entries,
  onAddContent,
  onDayClick,
  onEntryClick,
}: DayColumnProps) {
  const dateStr = day.toISOString().split("T")[0];
  const today = isToday(day);
  const weekdayShort = formatWeekdayShort(day);
  const dayNumber = formatDayNumber(day);

  // Column click — only fires when NOT clicking a pill or the add button
  const handleColumnClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("[role='button']")) return;
      onDayClick(dateStr);
    },
    [dateStr, onDayClick]
  );

  return (
    <div
      className={cn(
        "flex flex-col min-h-0 border-r border-kairos-line last:border-r-0",
        "cursor-pointer group/col",
        today
          ? "bg-[color-mix(in_oklch,var(--gold)_3%,transparent)]"
          : "hover:bg-kairos-pearl/20 transition-colors"
      )}
      onClick={handleColumnClick}
      role="button"
      tabIndex={0}
      aria-label={`${weekdayShort} ${dayNumber} — ${entries.length} conteúdo(s)`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDayClick(dateStr);
        }
      }}
    >
      {/* Day header */}
      <div
        className={cn(
          "px-3 py-3 flex flex-col items-center border-b shrink-0",
          today ? "border-kairos-gold" : "border-kairos-line"
        )}
      >
        <span
          className="mono-label capitalize"
          style={{
            fontSize: 9,
            color: today ? "var(--gold-dark)" : "var(--mute)",
            letterSpacing: "0.18em",
          }}
        >
          {weekdayShort}
        </span>
        <span
          className={cn(
            "text-[20px] leading-[1.1] mt-0.5 font-medium",
            today ? "italic-gold" : "text-kairos-charcoal/80"
          )}
          style={{ letterSpacing: "-0.02em" }}
        >
          {dayNumber}
        </span>
        {today && (
          <span
            className="text-[7px] mt-0.5"
            style={{ color: "var(--gold-dark)" }}
            aria-hidden
          >
            ◆
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 p-2 flex flex-col gap-2 min-h-0 overflow-y-auto kairos-scroll">
        {entries.length === 0 ? (
          <div className="flex-1 flex items-center justify-center opacity-0 group-hover/col:opacity-100 transition-opacity">
            <span
              className="mono-label text-center"
              style={{ fontSize: 9, color: "var(--mute)" }}
            >
              Clique para
              <br />
              adicionar
            </span>
          </div>
        ) : (
          entries.map((entry) => (
            <ContentPill
              key={entry.id}
              entry={entry}
              onEntryClick={onEntryClick}
            />
          ))
        )}
      </div>

      {/* Add button — appears on hover */}
      <div className="px-2 pb-2 opacity-0 group-hover/col:opacity-100 transition-opacity shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddContent(dateStr);
          }}
          className={cn(
            "w-full h-7 rounded-lg border border-dashed text-kairos-stone",
            "hover:border-kairos-charcoal hover:text-kairos-charcoal transition-colors",
            "flex items-center justify-center gap-1 text-[10px]"
          )}
          style={{ borderColor: "var(--line)" }}
          aria-label={`Adicionar conteúdo em ${dateStr}`}
        >
          <Plus className="h-2.5 w-2.5" />
          Adicionar
        </button>
      </div>
    </div>
  );
}

// ─── WeekView ─────────────────────────────────────────────────────────────────

interface WeekViewProps {
  referenceDate: Date;
  content: ContentEntry[];
  onAddContent: (date: string) => void;
  onDayClick: (date: string) => void;
  onEntryClick: (entry: ContentEntry) => void;
}

export function WeekView({
  referenceDate,
  content,
  onAddContent,
  onDayClick,
  onEntryClick,
}: WeekViewProps) {
  const weekDays = getWeekDays(referenceDate);

  const contentByDate: Record<string, ContentEntry[]> = {};
  content.forEach((c) => {
    if (!contentByDate[c.date]) contentByDate[c.date] = [];
    contentByDate[c.date].push(c);
  });

  return (
    <div
      className="h-full grid"
      style={{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }}
    >
      {weekDays.map((day) => {
        const dateStr = day.toISOString().split("T")[0];
        return (
          <DayColumn
            key={dateStr}
            day={day}
            entries={contentByDate[dateStr] ?? []}
            onAddContent={onAddContent}
            onDayClick={onDayClick}
            onEntryClick={onEntryClick}
          />
        );
      })}
    </div>
  );
}
