"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";
  const size = compact ? 34 : 40;

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Modo claro" : "Modo escuro"}
      className="flex items-center justify-center rounded-full border transition-[background,border-color] duration-400"
      style={{
        width: size,
        height: size,
        borderColor: dark ? "oklch(0.34 0.02 52)" : "oklch(0.88 0.008 80)",
        background: "transparent",
      }}
    >
      {!mounted ? (
        <span style={{ width: 15, height: 15 }} />
      ) : dark ? (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
          <path d="M15.5 12.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8Z" fill="var(--gold)" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="oklch(0.35 0.02 60)" strokeWidth="1.3" strokeLinecap="round">
          <circle cx="10" cy="10" r="3.2" fill="var(--gold)" stroke="none" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="10" y1="16" x2="10" y2="18" />
          <line x1="2" y1="10" x2="4" y2="10" />
          <line x1="16" y1="10" x2="18" y2="10" />
          <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
          <line x1="14.4" y1="14.4" x2="15.8" y2="15.8" />
          <line x1="4.2" y1="15.8" x2="5.6" y2="14.4" />
          <line x1="14.4" y1="5.6" x2="15.8" y2="4.2" />
        </svg>
      )}
    </button>
  );
}
