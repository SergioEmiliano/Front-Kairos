"use client";

import { useState } from "react";
import { BibleVerse as BibleVerseType } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

/**
 * BibleVerse — discrete editorial verse display in the TopBar.
 *
 * Currently uses static data; ready for daily API rotation:
 *   - Connect to bible-api.com, API.Bible, or your own endpoint
 *   - Use React Query with `staleTime: Infinity` + daily revalidation
 *   - Key by ISO date: queryKey: ["verse", today]
 */

// ─── Static verse (swap with API fetch) ──────────────────────────────────────
const DAILY_VERSE: BibleVerseType = {
  text: "O Senhor é o meu pastor; nada me faltará.",
  reference: "Sl 23:1",
  book: "Salmos",
};

interface BibleVerseProps {
  className?: string;
}

export function BibleVerse({ className }: BibleVerseProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className={cn("relative hidden lg:flex items-center", className)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {/* Verse text — truncated, shows ref on hover */}
      <button
        type="button"
        className="flex items-center gap-2 max-w-[220px] xl:max-w-[280px] group"
        aria-label={`${DAILY_VERSE.text} — ${DAILY_VERSE.reference}`}
      >
        <span
          className="shrink-0 text-[8px]"
          style={{ color: "var(--gold-dark)" }}
          aria-hidden
        >
          ✦
        </span>
        <span
          className="text-[11px] truncate leading-none transition-colors"
          style={{
            color: "var(--mute)",
            letterSpacing: "0.01em",
            fontStyle: "italic",
          }}
        >
          {DAILY_VERSE.text}
        </span>
        <span
          className="shrink-0 mono-label hidden xl:inline"
          style={{ fontSize: 9, color: "var(--gold-dark)" }}
        >
          {DAILY_VERSE.reference}
        </span>
      </button>

      {/* Tooltip — full verse + reference for xl:hidden reference */}
      {tooltipVisible && (
        <div
          className="absolute top-full left-0 mt-2 z-50 animate-fade-in"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="card-surface rounded-[var(--radius)] px-4 py-3 max-w-[280px] shadow-md"
            style={{ borderColor: "color-mix(in oklch, var(--gold) 30%, transparent)" }}
          >
            <p
              className="text-[12px] leading-[1.6] italic"
              style={{ color: "var(--ink-soft)" }}
            >
              &ldquo;{DAILY_VERSE.text}&rdquo;
            </p>
            <p className="mono-label mt-2" style={{ color: "var(--gold-dark)", fontSize: 9 }}>
              — {DAILY_VERSE.reference}
            </p>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-4 bottom-full w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: "5px solid var(--line)",
            }}
          />
        </div>
      )}
    </div>
  );
}
