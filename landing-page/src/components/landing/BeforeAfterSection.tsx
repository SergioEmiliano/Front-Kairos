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
const WHITE_S    = "oklch(0.91 0.005 80)";

// Shared layout constants — SAME value used by both halves, guaranteeing
// that every grid row has identical height on both panels.
const PH        = "clamp(24px, 3.5vw, 52px)";   // horizontal padding
const HDR_H     = "clamp(46px, 5.6vw, 72px)";   // explicit header / footer height
const BODY_GAP  = "clamp(12px, 1.5vw, 20px)";
const PHRASE_SZ = "clamp(16px, 1.62vw, 26px)";
const MONO_SZ   = "clamp(9px, 0.62vw, 11px)";

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
function BeforeAfterSlider() {
  const [pct, setPct] = useState(95); // start near right edge
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

            {/* ── ROW 2: Bullets ──────────────────────────────────────── */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* BEFORE bullets */}
              <div style={{
                ...row, clipPath: bClip,
                background: CREAM,
                gap: BODY_GAP,
                padding: `clamp(28px, 4vw, 56px) ${PH}`,
                justifyContent: "center",
              }}>
                {BEFORE.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px, 1.6vw, 22px)" }}>
                    <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.08em", color: MUTED_L, fontWeight: 700, flexShrink: 0, minWidth: "1.8em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: displayFont, fontSize: PHRASE_SZ, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, color: INK }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
              {/* AFTER bullets */}
              <div style={{
                ...row, clipPath: aClip,
                background: ESPRESSO,
                gap: BODY_GAP,
                padding: `clamp(28px, 4vw, 56px) ${PH}`,
                justifyContent: "center",
              }}>
                {AFTER.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px, 1.6vw, 22px)" }}>
                    <span style={{ fontFamily: monoFont, fontSize: MONO_SZ, letterSpacing: "0.08em", color: WHITE_S, fontWeight: 700, flexShrink: 0, minWidth: "1.8em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: displayFont, fontSize: PHRASE_SZ, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, color: GOLD_VAR }}>
                      {b}
                    </span>
                  </div>
                ))}
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
  return (
    <section
      id="metodo"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">Antes × Depois</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 style={{
            fontFamily: displayFont2,
            fontSize: "clamp(44px, 6.5vw, 88px)",
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
            <BeforeAfterSlider />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
