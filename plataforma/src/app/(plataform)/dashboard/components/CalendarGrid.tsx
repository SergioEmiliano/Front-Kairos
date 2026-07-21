"use client";

import { useCallback } from "react";
import { Plus } from "lucide-react";
import { ContentEntry, ContentFormat } from "@/shared/types";
import { getMonthDays, WEEK_DAYS, isToday, isSameMonth } from "@/shared/lib/date-utils";
import { cn } from "@/shared/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const formatShortLabel: Record<ContentFormat, string> = {
  reel: "Reel",
  post: "Post",
  story: "Story",
  carrossel: "Carrossel",
};

const statusLine: Record<string, string> = {
  publicado: "var(--gold)",
  planejado: "color-mix(in oklch, var(--gold) 45%, transparent)",
  rascunho: "color-mix(in oklch, var(--mute) 50%, transparent)",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CalendarGridProps {
  month: Date;
  content: ContentEntry[];
  onAddContent: (date: string) => void;
  onDayClick?: (date: string) => void;
}

// ─── CalendarGrid ─────────────────────────────────────────────────────────────

export function CalendarGrid({
  month,
  content,
  onAddContent,
  onDayClick,
}: CalendarGridProps) {
  const { days, startWeekday } = getMonthDays(month);

  const contentByDate: Record<string, ContentEntry[]> = {};
  content.forEach((c) => {
    if (!contentByDate[c.date]) contentByDate[c.date] = [];
    contentByDate[c.date].push(c);
  });

  const emptyCells = Array(startWeekday).fill(null);
  const allCells = [...emptyCells, ...days];
  const rows = Math.ceil(allCells.length / 7);

  const handleDayClick = useCallback(
    (dateStr: string) => {
      if (onDayClick) {
        onDayClick(dateStr);
      } else {
        onAddContent(dateStr);
      }
    },
    [onDayClick, onAddContent]
  );

  return (
    <div className="select-none h-full flex flex-col">
      {/* Week header */}
      <div className="grid grid-cols-7 border-b border-kairos-line shrink-0">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="mono-label py-2 px-2 border-r border-kairos-line last:border-r-0"
            style={{ fontSize: 9, letterSpacing: "0.2em" }}
          >
            {d.slice(0, 3)}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-7 flex-1 min-h-0"
        style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
      >
        {allCells.map((day, idx) => {
          if (!day) {
            return (
              <div
                key={`empty-${idx}`}
                className="border-b border-r border-kairos-line last:border-r-0 [&:nth-child(7n)]:border-r-0 opacity-45"
                aria-hidden
              />
            );
          }

          const dateStr = day.toISOString().split("T")[0];
          const dayContent = contentByDate[dateStr] || [];
          const isCurrentDay = isToday(day);
          const isThisMonth = isSameMonth(day, month);

          return (
            <div
              key={dateStr}
              role="button"
              tabIndex={0}
              aria-label={`${day.getDate()} de ${month.toLocaleString("pt-BR", { month: "long" })} — ${dayContent.length} conteúdo(s)`}
              onClick={() => handleDayClick(dateStr)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleDayClick(dateStr);
                }
              }}
              className={cn(
                // Layout
                "relative border-b border-r border-kairos-line last:border-r-0",
                "[&:nth-child(7n)]:border-r-0",
                "px-2 py-1.5 flex flex-col gap-1 overflow-hidden",
                // Cursor & interactivity — full cell is clickable
                "cursor-pointer",
                // Faded for other months
                !isThisMonth && "opacity-45",
                // Today highlight
                isCurrentDay
                  ? "bg-[color-mix(in_oklch,var(--gold)_4%,transparent)]"
                  : "hover:bg-kairos-paper-warm/40 active:bg-kairos-paper-warm/70",
                // Transition
                "transition-colors duration-100 group"
              )}
            >
              {/* Day number */}
              {isCurrentDay ? (
                <>
                  <div
                    className="italic-gold leading-none"
                    style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em" }}
                  >
                    {day.getDate()}
                  </div>
                  <span
                    className="absolute top-1.5 right-2"
                    style={{ color: "var(--gold-dark)", fontSize: 8 }}
                    aria-hidden
                  >
                    ◆
                  </span>
                </>
              ) : (
                <span className="text-[13px] text-kairos-charcoal/80 leading-none">
                  {day.getDate()}
                </span>
              )}

              {/* Content pills */}
              <div className="flex flex-col gap-0.5 flex-1 min-h-0 overflow-hidden mt-0.5">
                {dayContent.slice(0, 2).map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-1.5 text-[10px] text-kairos-charcoal/80 truncate"
                  >
                    <span
                      className="h-px w-3 shrink-0"
                      style={{ background: statusLine[c.status] || "var(--gold)" }}
                    />
                    <span className="truncate">{formatShortLabel[c.format]}</span>
                  </div>
                ))}
                {dayContent.length > 2 && (
                  <span className="mono-label" style={{ fontSize: 9 }}>
                    +{dayContent.length - 2}
                  </span>
                )}
              </div>

              {/* Quick add button — shows on hover, stopPropagation so it doesn't trigger day click */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddContent(dateStr);
                }}
                className={cn(
                  "absolute bottom-1.5 right-1.5",
                  "w-4 h-4 rounded-full border border-kairos-line",
                  "bg-kairos-paper-surface text-kairos-stone",
                  "hover:border-kairos-charcoal hover:text-kairos-charcoal",
                  "opacity-0 group-hover:opacity-100",
                  "transition-all flex items-center justify-center"
                )}
                aria-label={`Adicionar conteúdo em ${dateStr}`}
                tabIndex={-1}
              >
                <Plus className="h-2.5 w-2.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
