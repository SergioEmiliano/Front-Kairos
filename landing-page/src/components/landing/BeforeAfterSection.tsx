"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont    = "var(--font-jetbrains), 'JetBrains Mono', monospace";

// ─── Content ────────────────────────────────────────────────────────────────
const BEFORE = {
  label: "Antes de Kairós", estado: "ESTADO 01", mes: "— MÊS 0",
  bullets: [
    "Postagens sem direção",
    "Dependência de sorte algorítmica",
    "Agenda irregular",
    "Estratégia refeita toda semana",
  ],
};
const AFTER = {
  label: "Com Kairós", estado: "ESTADO 02", mes: "— MÊS 6",
  bullets: [
    "Estratégia amarrada à meta financeira",
    "Demanda previsível semana a semana",
    "Crescimento controlado e mensurável",
    "Ajuste automático contínuo",
  ],
};

// ─── Tokens ──────────────────────────────────────────────────────────────────
const ESPRESSO   = "oklch(0.22 0.015 50)";
const CREAM      = "oklch(0.985 0.002 80)";
const INK        = "oklch(0.14 0.006 60)";
const GOLD_VAR   = "var(--gold)";
const MUTED_L    = "oklch(0.58 0.007 70)";
const MUTED_D    = "oklch(0.46 0.008 65)";
const LINE_L     = "oklch(0.88 0.006 80)";
const LINE_D     = "oklch(0.28 0.012 52)";

// Shared layout constants — SAME value used by both halves, guaranteeing
// that every grid row has identical height on both panels.
const PH        = "clamp(24px, 3.5vw, 52px)";   // horizontal padding
const HDR_H     = "clamp(46px, 5.6vw, 72px)";   // explicit header / footer height
const CARD_SZ   = "clamp(16px, 1.7vw, 21px)";   // rótulo dos cards ilustrados
const MONO_SZ   = "clamp(9px, 0.62vw, 11px)";

// ─── Ícones ilustrativos (negativo ↔ positivo) ─────────────────────────────
// Cada card do "antes" e do "depois" carrega um glifo próprio — o contraste
// visual entre os dois já nasce do próprio slider revelando um painel ou outro.
type IconKind = "scatter" | "luck" | "jagged" | "cycle";
const ICON_ORDER: IconKind[] = ["scatter", "luck", "jagged", "cycle"];

// Traçados originais do pacote Lucide (via allsvgicons.com) — viewBox 24×24,
// mesmo estilo de stroke do design system (round cap/join).
const ICON_PATHS: Record<IconKind, { before: React.ReactNode; after: React.ReactNode }> = {
  scatter: {
    // shuffle (sem direção clara) → move-up-right (rumo à meta)
    before: <path d="m18 14l4 4l-4 4m0-20l4 4l-4 4M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />,
    after: <path d="M13 5h6v6m0-6L5 19" />,
  },
  luck: {
    // dado (sorte) → alvo (previsibilidade)
    before: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M16 8h.01M8 8h.01M8 16h.01M16 16h.01M12 12h.01" /></>,
    after: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  },
  jagged: {
    // barras em queda (ritmo quebrado) → barras em crescimento constante
    before: <path d="M5 21V3m7 18V9m7 12v-6" />,
    after: <path d="M5 21v-6m7 6V9m7 12V3" />,
  },
  cycle: {
    // refresh (refeito toda semana) → infinito (ajuste automático contínuo)
    before: <path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16m5 0H3v5" />,
    after: <path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />,
  },
};

function TransformIcon({ kind, revealed, size = 20 }: { kind: IconKind; revealed: boolean; size?: number }) {
  const stroke = revealed ? GOLD_VAR : MUTED_L;
  // strokeWidth fica fixo em 2 (padrão Lucide) — o SVG já escala o traço
  // junto com o ícone via width/height vs viewBox, escalar os dois juntos
  // deixava o traço grosso demais e fundia os anéis do alvo, por exemplo.
  const common = { stroke, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const glyph = ICON_PATHS[kind][revealed ? "after" : "before"];

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <g {...common}>{glyph}</g>
    </svg>
  );
}

// ─── Bar chart ───────────────────────────────────────────────────────────────
function Bars({ isAfter }: { isAfter: boolean }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          width: "clamp(2px, 0.22vw, 3.5px)",
          height: isAfter ? `${10 + i * 4}px` : `${5 + (i % 3) * 3}px`,
          background: isAfter ? GOLD_VAR : MUTED_L,
          opacity: isAfter ? 0.85 : 0.45,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
// Alignment guarantee: we render a SINGLE grid layout, then paint both
// colour variants as `position:absolute inset:0` children *inside each row*.
// The row heights come from an invisible spacer element — so both halves
// share the exact same pixel-perfect vertical dimensions.
// Controlado pelo pai: o texto à esquerda reage ao mesmo `pct` do arrasto.
function BeforeAfterSlider({ pct, setPct }: { pct: number; setPct: (v: number) => void }) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const dragging  = useRef(false);

  const update = (clientX: number) => {
    if (!outerRef.current) return;
    const r = outerRef.current.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    update(x);
  };
  useEffect(() => {
    const mv = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      update("touches" in e ? e.touches[0].clientX : e.clientX);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", mv, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", mv);
      window.removeEventListener("touchend", up);
    };
  }, []);

  // Clip paths — each half sees only its portion
  const bClip = `inset(0 ${100 - pct}% 0 0)`;      // before: left portion
  const aClip = `inset(0 0 0 ${pct}%)`;             // after:  right portion
  const atRest = pct > 84;

  // Shared styles for the two content overlays inside each row
  const row: React.CSSProperties = {
    position: "absolute", inset: 0,
    display: "flex", flexDirection: "column", justifyContent: "center",
  };

  return (
    <div>
      {/* Outer — overflow:visible so handle can peek at right edge */}
      <div
        ref={outerRef}
        onMouseDown={onDown}
        onTouchStart={onDown}
        style={{
          position: "relative",
          width: "100%", aspectRatio: "16 / 9",
          cursor: "ew-resize", userSelect: "none",
          overflow: "visible",
        }}
      >
        {/* ── Inner: clips panels, rounded corners ─────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 14, overflow: "hidden",
          background: ESPRESSO,
          border: `1px solid ${LINE_D}`,
        }}>
          {/*
            SINGLE grid — row heights set by invisible spacers.
            Both colour overlays live *inside* the same row cells,
            so they can never differ in vertical position.
          */}
          <div style={{
            position: "absolute", inset: 0,
            display: "grid",
            gridTemplateRows: `${HDR_H} 1fr ${HDR_H}`,
          }}>

            {/* ── ROW 1: Header ───────────────────────────────────────── */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* BEFORE */}
              <div style={{
                ...row, clipPath: bClip,
                background: CREAM,
                flexDirection: "row", justifyContent: "space-between",
                alignItems: "center",
                padding: `0 ${PH}`,
                borderBottom: `1px solid ${LINE_L}`,
              }}>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED_L }}>{BEFORE.label}</span>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED_L }}>{BEFORE.estado}</span>
              </div>
              {/* AFTER */}
              <div style={{
                ...row, clipPath: aClip,
                background: ESPRESSO,
                flexDirection: "row", justifyContent: "space-between",
                alignItems: "center",
                padding: `0 ${PH}`,
                borderBottom: `1px solid ${LINE_D}`,
              }}>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED_D }}>{AFTER.label}</span>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD_VAR }}>{AFTER.estado}</span>
              </div>
            </div>

            {/* ── ROW 2: Ilustração + texto (2×2, sem cartão) ─────────── */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* BEFORE */}
              <div style={{
                ...row, clipPath: bClip,
                background: CREAM,
                padding: `clamp(10px, 1.6vw, 20px) ${PH}`,
                justifyContent: "center",
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  columnGap: "clamp(10px, 1.6vw, 20px)",
                  rowGap: "clamp(14px, 2.2vw, 24px)",
                  width: "100%",
                }}>
                  {BEFORE.bullets.map((b, i) => (
                    <div key={i} style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      textAlign: "center", gap: "clamp(8px, 1vw, 12px)",
                    }}>
                      <TransformIcon kind={ICON_ORDER[i]} revealed={false} size={56} />
                      <span style={{ fontFamily: displayFont, fontSize: CARD_SZ, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: INK }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* AFTER */}
              <div style={{
                ...row, clipPath: aClip,
                background: ESPRESSO,
                padding: `clamp(10px, 1.6vw, 20px) ${PH}`,
                justifyContent: "center",
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  columnGap: "clamp(10px, 1.6vw, 20px)",
                  rowGap: "clamp(14px, 2.2vw, 24px)",
                  width: "100%",
                }}>
                  {AFTER.bullets.map((b, i) => (
                    <div key={i} style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      textAlign: "center", gap: "clamp(8px, 1vw, 12px)",
                    }}>
                      <TransformIcon kind={ICON_ORDER[i]} revealed={true} size={56} />
                      <span style={{ fontFamily: displayFont, fontSize: CARD_SZ, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: GOLD_VAR }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 3: Footer ───────────────────────────────────────── */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* BEFORE footer */}
              <div style={{
                ...row, clipPath: bClip,
                background: CREAM,
                flexDirection: "row", justifyContent: "space-between",
                alignItems: "center",
                padding: `0 ${PH}`,
                borderTop: `1px solid ${LINE_L}`,
              }}>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED_L }}>{BEFORE.mes}</span>
                <Bars isAfter={false} />
              </div>
              {/* AFTER footer */}
              <div style={{
                ...row, clipPath: aClip,
                background: ESPRESSO,
                flexDirection: "row", justifyContent: "space-between",
                alignItems: "center",
                padding: `0 ${PH}`,
                borderTop: `1px solid ${LINE_D}`,
              }}>
                <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED_D }}>{AFTER.mes}</span>
                <Bars isAfter={true} />
              </div>
            </div>

          </div>{/* / single grid */}

          {/* Gold divider line */}
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${pct}%`, width: 1.5,
            background: GOLD_VAR,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            opacity: pct <= 0 || pct >= 100 ? 0 : 1,
            transition: "opacity 0.15s",
          }} />

        </div>{/* / inner */}

        {/* ── Handle — outside inner so it can overflow at the right edge ── */}
        <div
          style={{
            position: "absolute", top: "50%", left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            pointerEvents: "none", zIndex: 10,
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: ESPRESSO,
            border: `1.5px solid ${GOLD_VAR}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,.45)",
            animation: atRest ? "hPulse 2.2s ease-in-out infinite" : "none",
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L1 7L3 11M11 3L13 7L11 11" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Inline hint label — visible only at rest, fades when dragging */}
          <span style={{
            fontFamily: monoFont,
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GOLD_VAR,
            background: ESPRESSO,
            padding: "3px 7px",
            borderRadius: 99,
            border: `1px solid ${LINE_D}`,
            opacity: atRest ? 0.85 : 0,
            transition: "opacity 0.3s",
            whiteSpace: "nowrap",
          }}>
            ← puxe
          </span>
        </div>

      </div>{/* / outer */}

      <style>{`
        @keyframes hPulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--gold) 45%, transparent); }
          55%       { box-shadow: 0 0 0 9px color-mix(in oklch, var(--gold) 0%, transparent); }
        }
      `}</style>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function BeforeAfterSection() {
  const displayFont2 = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
  const [pct, setPct] = useState(95); // start near right edge (mostra "antes")

  return (
    <section
      id="metodo"
      style={{ paddingTop: 120, paddingBottom: 120, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">Antes × Depois</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 style={{
            fontFamily: displayFont2,
            fontSize: "clamp(34px, 4.5vw, 60px)",
            fontWeight: 400, lineHeight: 0.94,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
            marginTop: 24, maxWidth: "26ch",
          }}>
            De esforço disperso a sistema calibrado.
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <div style={{ marginTop: 64 }}>
            <BeforeAfterSlider pct={pct} setPct={setPct} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
