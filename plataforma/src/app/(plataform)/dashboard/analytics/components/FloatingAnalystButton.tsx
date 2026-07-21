"use client";

import { HeartPulse, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FloatingAnalystButtonProps {
  open: boolean;
  onClick: () => void;
}

export function FloatingAnalystButton({ open, onClick }: FloatingAnalystButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Fechar analista" : "Falar com o Analista Kairós"}
      aria-pressed={open}
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Hover tooltip */}
      {!open && (
        <span
          className={cn(
            "absolute bottom-full right-0 mb-3",
            "px-3 py-1.5 rounded-full border",
            "text-[11px] font-medium whitespace-nowrap",
            "pointer-events-none select-none",
            "opacity-0 translate-y-1",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-200"
          )}
          style={{
            background: "var(--paper-surface)",
            borderColor: "var(--line)",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            boxShadow:
              "0 2px 8px -2px color-mix(in oklch, var(--ink) 10%, transparent)",
          }}
        >
          Analista Kairós
        </span>
      )}

      {/* Pulse ring — only when closed */}
      {!open && (
        <span
          className="absolute inset-0 rounded-full animate-ping pointer-events-none"
          style={{
            background: "var(--gold)",
            opacity: 0.12,
            animationDuration: "2.4s",
          }}
        />
      )}

      {/* Main circle */}
      <div
        className={cn(
          "relative w-14 h-14 rounded-full",
          "flex items-center justify-center",
          "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          open ? "scale-95" : "scale-100 group-hover:scale-105"
        )}
        style={{
          background: "var(--ink)",
          border: `1px solid color-mix(in oklch, var(--gold) ${open ? "50%" : "25%"}, transparent)`,
          boxShadow: open
            ? "0 8px 32px -8px color-mix(in oklch, var(--ink) 50%, transparent)"
            : "0 4px 20px -4px color-mix(in oklch, var(--ink) 30%, transparent)",
        }}
      >
        {/* Inner gold shimmer (closed state) */}
        {!open && (
          <span
            className="absolute inset-[3px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--gold) 25%, transparent), transparent 65%)",
            }}
          />
        )}

        {open ? (
          <X
            className="h-5 w-5 relative z-10"
            style={{ color: "var(--paper)", strokeWidth: 1.75 }}
          />
        ) : (
          <>
            <HeartPulse
              className="h-5 w-5 relative z-10"
              style={{ color: "var(--gold)", strokeWidth: 1.6 }}
            />
            {/* Sparkle badge */}
            <span
              className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center z-20"
              style={{
                background: "var(--gold)",
                border: "2px solid var(--paper)",
              }}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--paper-surface)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </span>
          </>
        )}
      </div>
    </button>
  );
}
