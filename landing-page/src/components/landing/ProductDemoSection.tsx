"use client";

import { useState } from "react";
import { Reveal } from "@/components/common/Reveal";

// ─── Font stacks ──────────────────────────────────────────────────────────────
const dFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const mFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const sFont = "'Inter Tight', system-ui, sans-serif";

// ─── Nav sections ─────────────────────────────────────────────────────────────
type Sec = "calendario" | "analises" | "checkin" | "materiais" | "config";

const NAV: { id: Sec; label: string }[] = [
  { id: "calendario", label: "Calendário"   },
  { id: "analises",   label: "Análises"     },
  { id: "checkin",    label: "Check-in"     },
  { id: "materiais",  label: "Materiais"    },
  { id: "config",     label: "Configurações"},
];

// ─── Shared primitives ────────────────────────────────────────────────────────
function Kicker({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: mFont, fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--mute)" }}>
      {children}
    </span>
  );
}

function SectionH1({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: sFont, fontSize: 22, fontWeight: 500, letterSpacing: "-0.025em", color: "var(--ink)", marginTop: 4 }}>
      {children}
    </div>
  );
}

function Hairline() {
  return <div style={{ height: 1, background: "var(--line)" }} />;
}

// ─── Window chrome ────────────────────────────────────────────────────────────
function WindowChrome() {
  return (
    <div style={{
      height: 32, background: "var(--paper-surface)", borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", padding: "0 14px", gap: 6,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.80 0.14 25)" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.80 0.10 62)" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(0.72 0.14 148)" }} />
      <span style={{ fontFamily: mFont, fontSize: 9.5, color: "var(--mute)", marginLeft: 10, letterSpacing: "0.04em" }}>
        kairos.app / dashboard
      </span>
    </div>
  );
}

// ─── TopBar with interactive nav ──────────────────────────────────────────────
function TopBar({ active, onNav }: { active: Sec; onNav: (s: Sec) => void }) {
  return (
    <div style={{
      height: 48, background: "var(--paper-surface)", borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0,
    }}>
      {/* Logo mark */}
      <div style={{ width: 22, height: 22, borderRadius: 4, background: "var(--ink)", flexShrink: 0, marginRight: 18, opacity: 0.92 }} />

      {/* Nav items */}
      {NAV.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onNav(id)}
          style={{
            position: "relative",
            padding: "13px 11px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: sFont,
            fontSize: 12,
            fontWeight: active === id ? 500 : 400,
            color: active === id ? "var(--ink)" : "var(--mute)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            transition: "color 0.15s",
          }}
        >
          {label}
          {active === id && (
            <span style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5,
              background: "var(--ink)",
            }} />
          )}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: mFont, fontSize: 8.5, color: "var(--mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>◆ ao vivo</span>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "3px 10px 3px 4px", borderRadius: 99,
          border: "1px solid var(--line)", background: "var(--paper-warm)",
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: "color-mix(in oklch, var(--gold) 18%, var(--paper))",
            border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: sFont, fontSize: 9, fontWeight: 600, color: "var(--gold-dark)",
          }}>M</div>
          <span style={{ fontFamily: sFont, fontSize: 11, color: "var(--ink)", fontWeight: 500 }}>Dra. Marina</span>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar (constant across all sections) ───────────────────────────────────
function Sidebar() {
  const tasks = [
    { text: "Gravar Reel de skincare", done: false },
    { text: "Revisar briefing S05",     done: true  },
    { text: "Responder 3 DMs",          done: false },
    { text: "Aprovar carrossel botox",  done: false },
    { text: "Check-in do dia",          done: false },
  ];
  const news = [
    "Instagram atualizou o algoritmo de Reels",
    "Nova janela de curadoria · ciclo 04",
    "Meta de maio 72% completa",
  ];

  return (
    <div style={{
      width: 190, flexShrink: 0,
      borderRight: "1px solid var(--line)",
      background: "var(--paper-surface)",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid var(--line)" }}>
        <Kicker>Tarefas pendentes</Kicker>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 7 }}>
          {tasks.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
              <div style={{
                width: 12, height: 12, borderRadius: 3, marginTop: 1, flexShrink: 0,
                border: `1.5px solid ${t.done ? "var(--gold)" : "var(--line)"}`,
                background: t.done ? "color-mix(in oklch, var(--gold) 20%, transparent)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {t.done && <span style={{ fontSize: 7, color: "var(--gold-dark)" }}>✓</span>}
              </div>
              <span style={{
                fontFamily: sFont, fontSize: 10.5, lineHeight: 1.35,
                color: t.done ? "var(--mute)" : "var(--ink)",
                textDecoration: t.done ? "line-through" : "none",
              }}>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        <Kicker>Notícias</Kicker>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {news.map((n, i) => (
            <div key={i} style={{
              fontFamily: sFont, fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.35,
              paddingLeft: 8,
              borderLeft: "2px solid color-mix(in oklch, var(--gold) 45%, transparent)",
            }}>{n}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW — CALENDÁRIO
// ═══════════════════════════════════════════════════════════════════════════════

type Status = "publicado" | "planejado" | "rascunho";
const STATUS_LINE: Record<Status, string> = {
  publicado: "var(--gold)",
  planejado:  "color-mix(in oklch, var(--gold) 50%, transparent)",
  rascunho:   "color-mix(in oklch, var(--mute) 50%, transparent)",
};

const JUNE_CONTENT: Record<number, { format: string; status: Status }[]> = {
  2:  [{ format: "Reel",      status: "publicado" }],
  5:  [{ format: "Post",      status: "publicado" }],
  9:  [{ format: "Carrossel", status: "publicado" }, { format: "Story",    status: "planejado" }],
  12: [{ format: "Reel",      status: "publicado" }],
  14: [{ format: "Post",      status: "publicado" }],
  16: [{ format: "Carrossel", status: "planejado" }],
  17: [{ format: "Story",     status: "rascunho"  }],
  19: [{ format: "Post",      status: "planejado" }],
  23: [{ format: "Reel",      status: "rascunho"  }],
  24: [{ format: "Carrossel", status: "planejado" }],
  26: [{ format: "Story",     status: "rascunho"  }],
  28: [{ format: "Post",      status: "rascunho"  }],
};

// June 2026: starts Monday (idx 1 in Sun-first), 30 days → 1 leading + 4 trailing = 35 cells
const JUNE_CELLS = [null, ...Array.from({ length: 30 }, (_, i) => i + 1), null, null, null, null];
const WEEK_DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const TODAY = 14;

function ViewCalendario() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Dashboard header */}
      <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
        <Kicker>Dashboard · Calendário editorial</Kicker>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ fontFamily: dFont, fontSize: 21, fontWeight: 400, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Olá, Marina. <em style={{ fontStyle: "italic", color: "var(--gold-dark)" }}>Seu mês em estrutura.</em>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {[{ l: "Peças", v: "12" }, { l: "Leads", v: "47" }, { l: "Alcance", v: "32,4K" }].map(({ l, v }) => (
              <div key={l} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)" }}>{l}</div>
                <div style={{ fontFamily: dFont, fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)", fontStyle: "italic" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar card */}
      <div style={{
        flex: 1, margin: 12, border: "1px solid var(--line)", borderRadius: 8,
        background: "var(--paper-surface)", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0,
      }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", padding: "9px 14px", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--ink)" }}>‹</div>
            <div>
              <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)" }}>CICLO 04 · 2026</div>
              <div style={{ fontFamily: sFont, fontSize: 15, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                Junho <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>2026</em>
              </div>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--ink)" }}>›</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid var(--line)", fontFamily: sFont, fontSize: 11, color: "var(--ink)" }}>● Planejar semana</div>
            <div style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid var(--line)", fontFamily: sFont, fontSize: 11, color: "var(--ink)" }}>⊞ Ver semana</div>
            <div style={{ padding: "5px 12px", borderRadius: 99, background: "var(--ink)", color: "var(--paper)", fontFamily: sFont, fontSize: 11, fontWeight: 600 }}>+ Gerar conteúdo</div>
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
          {WEEK_DAYS.map((d) => (
            <div key={d} style={{
              textAlign: "center", padding: "5px 0",
              fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)",
              borderRight: "1px solid var(--line)",
            }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(5, 1fr)", overflow: "hidden" }}>
          {JUNE_CELLS.map((day, i) => {
            const isToday = day === TODAY;
            const pills = day ? JUNE_CONTENT[day] : null;
            return (
              <div key={i} style={{
                borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
                padding: "4px 6px",
                background: isToday ? "color-mix(in oklch, var(--gold) 5%, transparent)" : "transparent",
                display: "flex", flexDirection: "column", gap: 3, overflow: "hidden",
              }}>
                {day && (
                  <span style={{
                    fontFamily: mFont, fontSize: 8.5,
                    fontWeight: isToday ? 700 : 400,
                    color: isToday ? "var(--gold-dark)" : "var(--mute)",
                    fontStyle: isToday ? "italic" : "normal",
                  }}>{day}</span>
                )}
                {pills?.map((p, pi) => (
                  <div key={pi} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 11, height: 1.5, borderRadius: 1, background: STATUS_LINE[p.status], flexShrink: 0 }} />
                    <span style={{ fontFamily: sFont, fontSize: 8.5, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.format}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px", borderTop: "1px solid var(--line)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { label: "PUBLICADO / AGENDADO", color: "var(--gold)" },
              { label: "RASCUNHO IA",          color: "color-mix(in oklch, var(--mute) 45%, transparent)" },
              { label: "IDEIA · NÃO CONFIRMADO", color: "color-mix(in oklch, var(--line) 90%, transparent)" },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 13, height: 1.5, borderRadius: 1, background: color }} />
                <span style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)" }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ fontFamily: mFont, fontSize: 8, color: "var(--mute)", letterSpacing: "0.06em" }}>Ir para hoje →</span>
            <span style={{ fontFamily: mFont, fontSize: 8, color: "var(--gold-dark)", letterSpacing: "0.08em" }}>◆ Recalibrado há 02 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW — ANÁLISES
// ═══════════════════════════════════════════════════════════════════════════════

function ViewAnalises() {
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "auto", height: "100%" }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <Kicker>Dashboard · Performance</Kicker>
          <SectionH1>Sinais de <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>demanda</em>, não de vaidade.</SectionH1>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          <span style={{
            padding: "4px 10px", borderRadius: 99,
            border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
            background: "color-mix(in oklch, var(--gold) 6%, transparent)",
            fontFamily: mFont, fontSize: 8, letterSpacing: "0.1em", color: "var(--gold-dark)", textTransform: "uppercase",
          }}>◆ Instagram conectado</span>
          <div style={{ padding: "4px 10px", borderRadius: 99, border: "1px solid var(--line)", fontFamily: sFont, fontSize: 11, color: "var(--ink)" }}>Abril 2026</div>
        </div>
      </div>

      {/* Sub-tab navigation (static — "Visão Geral" active) */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)" }}>
        {["Visão Geral", "Performance de Conteúdo", "Receita e Leads"].map((t, i) => (
          <div key={t} style={{
            position: "relative", padding: "7px 14px",
            fontFamily: sFont, fontSize: 12,
            fontWeight: i === 0 ? 500 : 400,
            color: i === 0 ? "var(--ink)" : "var(--mute)",
          }}>
            {t}
            {i === 0 && <span style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1.5, background: "var(--ink)" }} />}
          </div>
        ))}
      </div>

      {/* Impact banner */}
      <div style={{ borderRadius: 8, padding: "14px 16px", background: "var(--ink)", display: "flex", gap: 16, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "color-mix(in oklch, var(--paper) 42%, transparent)", marginBottom: 4 }}>◆ Desde que você entrou na Kairós</div>
          <div style={{ fontFamily: dFont, fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--gold)", fontStyle: "italic", lineHeight: 1 }}>147.320</div>
          <div style={{ fontFamily: sFont, fontSize: 12, color: "var(--paper)", marginTop: 4 }}>pessoas alcançadas pelo seu conteúdo</div>
          <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "color-mix(in oklch, var(--paper) 40%, transparent)", marginTop: 4 }}>Nov 2025 – Maio 2026 · 6 meses</div>
        </div>
        <div style={{ width: 1, alignSelf: "stretch", background: "color-mix(in oklch, var(--paper) 12%, transparent)" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
          {[
            { label: "Alcance",     value: "+671%" },
            { label: "Faturamento", value: "+214%" },
            { label: "Leads / mês", value: "47"    },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "color-mix(in oklch, var(--paper) 40%, transparent)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: dFont, fontSize: 20, fontWeight: 500, letterSpacing: "-0.025em", color: "var(--gold)", fontStyle: "italic" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {[
          { title: "Alcance mensal",     value: "32,4K",   sub: "+38% vs. março",    italic: false, pct: 76 },
          { title: "Leads qualificadas", value: "47",       sub: "72% da projeção",   italic: true,  pct: 72 },
          { title: "Conversão agenda",   value: "32%",      sub: "+4 pts vs. mês −1", italic: false, pct: 64 },
          { title: "Faturamento",        value: "R$ 30,8K", sub: "64% da meta",       italic: true,  pct: 64 },
        ].map(({ title, value, sub, italic, pct }) => (
          <div key={title} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "10px 12px", background: "var(--paper-surface)" }}>
            <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)" }}>{title}</div>
            <div style={{ marginTop: 6, fontFamily: dFont, fontSize: 24, fontWeight: 500, letterSpacing: "-0.025em", color: italic ? "var(--gold-dark)" : "var(--ink)", fontStyle: italic ? "italic" : "normal", lineHeight: 1 }}>{value}</div>
            <div style={{ marginTop: 3, fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mute)" }}>{sub}</div>
            <div style={{ marginTop: 8, height: 2, background: "var(--line)", borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--gold)", borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue funnel */}
      <div style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden", background: "var(--paper-surface)" }}>
        <div style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Kicker>Funil de receita</Kicker>
            <div style={{ fontFamily: sFont, fontSize: 12.5, fontWeight: 500, color: "var(--ink)", marginTop: 2 }}>
              Do conteúdo ao <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>dinheiro na clínica</em>
            </div>
          </div>
          <Kicker>Abril 2026</Kicker>
        </div>
        <div style={{ display: "flex" }}>
          {[
            { emoji: "📝", value: "28",       label: "peças Kairós",      hi: false },
            { emoji: "👁️", value: "32,4K",   label: "alcance total",     hi: false },
            { emoji: "👤", value: "1.749",    label: "visitas ao perfil", hi: false },
            { emoji: "💬", value: "47",        label: "DMs iniciados",     hi: true  },
            { emoji: "📅", value: "15",        label: "agendamentos",      hi: false },
            { emoji: "💰", value: "R$ 30,8K",  label: "faturamento",       hi: true  },
          ].map(({ emoji, value, label, hi }, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 10px",
              borderRight: i < 5 ? "1px solid var(--line)" : "none",
              background: hi ? "var(--paper-warm)" : "transparent",
            }}>
              <div style={{ fontSize: 15, marginBottom: 4 }}>{emoji}</div>
              <div style={{ fontFamily: dFont, fontSize: 18, fontWeight: 500, letterSpacing: "-0.025em", color: hi ? "var(--gold-dark)" : "var(--ink)", fontStyle: hi ? "italic" : "normal", lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)", marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendations */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <Kicker>Próximos passos recomendados</Kicker>
          <Kicker>Gerado pela IA Kairós · Hoje, 06:00</Kicker>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[
            { title: "Seus Reels de caso clínico convertem 2,3× mais", body: "Nos últimos 30 dias, Reels com antes/depois tiveram média de 312 saves vs. 136 dos demais formatos." },
            { title: "Taxa Perfil→DM pode subir 52%", body: "Sua taxa atual é 2,7%. A média das doutoras Kairós é 4,1%. Um CTA mais direto nos Stories pode fechar essa diferença." },
            { title: "Alcance cai 23% em semanas sem terça", body: "Você não postou em 3 terças este mês. O algoritmo do seu perfil favorece esse dia. Há um Reel agendado — não pule." },
          ].map((r, i) => (
            <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "10px 12px", background: "var(--paper-surface)", display: "flex", gap: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                background: "color-mix(in oklch, var(--gold) 10%, transparent)",
                border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "var(--gold-dark)",
              }}>◆</div>
              <div>
                <div style={{ fontFamily: sFont, fontSize: 11, fontWeight: 500, color: "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{r.title}</div>
                <div style={{ fontFamily: sFont, fontSize: 10, color: "var(--mute)", marginTop: 3, lineHeight: 1.4 }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW — CHECK-IN
// ═══════════════════════════════════════════════════════════════════════════════

function ViewCheckin() {
  return (
    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, height: "100%", overflow: "hidden" }}>
      <div style={{ flexShrink: 0 }}>
        <Kicker>Check-in diário · 23 abr</Kicker>
        <SectionH1>Os números de <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>hoje</em>.</SectionH1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
        {/* Left: form */}
        <div style={{
          border: "1px solid var(--line)", borderRadius: 8, padding: "14px 14px",
          background: "var(--paper-surface)", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Kicker>Registro do dia</Kicker>
            <span style={{ fontFamily: mFont, fontSize: 7.5, color: "var(--mute)", letterSpacing: "0.08em" }}>◆ Salvamento auto · 12s atrás</span>
          </div>
          <Hairline />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Consultas atendidas",     value: "6"    },
              { label: "Procedimentos fechados",  value: "2"    },
              { label: "Leads (DM + WhatsApp)",   value: "9"    },
              { label: "Faturamento do dia (R$)", value: "7800" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 4 }}>{label}</div>
                <div style={{
                  height: 32, borderRadius: 6, border: "1px solid var(--line)",
                  background: "var(--paper)", display: "flex", alignItems: "center",
                  padding: "0 10px", fontFamily: sFont, fontSize: 13, color: "var(--ink)",
                }}>{value}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 6 }}>Conteúdo publicado hoje</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{ c: "Reel", on: true }, { c: "Carrossel", on: true }, { c: "Story", on: false }, { c: "Post", on: false }].map(({ c, on }) => (
                <div key={c} style={{
                  padding: "4px 11px", borderRadius: 99, fontSize: 11, fontFamily: sFont,
                  fontWeight: on ? 500 : 400,
                  border: `1px solid ${on ? "color-mix(in oklch, var(--gold) 50%, transparent)" : "var(--line)"}`,
                  background: on ? "color-mix(in oklch, var(--gold) 8%, transparent)" : "transparent",
                  color: on ? "var(--ink)" : "var(--mute)",
                }}>{on ? "◆ " : ""}{c}</div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minHeight: 0 }}>
            <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)" }}>Observação do dia</div>
            <div style={{
              flex: 1, borderRadius: 6, border: "1px solid var(--line)", padding: "8px 10px",
              fontFamily: sFont, fontSize: 11, color: "var(--ink)", background: "var(--paper)", lineHeight: 1.45,
            }}>
              Paula fechou bioestimulador de 4 sessões. Reel de antes/depois gerou 7 DMs qualificadas em 3h.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{
              padding: "7px 18px", borderRadius: 99, background: "var(--ink)", color: "var(--paper)",
              fontFamily: sFont, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>Fechar o dia ✓</div>
          </div>
        </div>

        {/* Right: summary + history */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          {/* Weekly summary */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "12px 14px", background: "var(--paper-surface)", flexShrink: 0 }}>
            <Kicker>Resumo semanal · S04</Kicker>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: 8 }}>
              {[
                { label: "Consultas",   value: "28",       sub: "DE 30",            italic: false },
                { label: "Faturamento", value: "R$ 14,2K", sub: "72% DA META SEM.", italic: true  },
                { label: "Leads",       value: "39",       sub: "+6 VS S03",        italic: false },
                { label: "Posts",       value: "06",       sub: "DE 07",            italic: false },
              ].map(({ label, value, sub, italic }, i) => (
                <div key={label} style={{
                  padding: "10px 10px",
                  borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                  borderTop: i >= 2 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: dFont, fontSize: 20, fontWeight: 500, letterSpacing: "-0.025em", color: italic ? "var(--gold-dark)" : "var(--ink)", fontStyle: italic ? "italic" : "normal", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)", marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "12px 14px", background: "var(--paper-surface)", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexShrink: 0 }}>
              <Kicker>Histórico recente</Kicker>
              <span style={{ fontFamily: sFont, fontSize: 11, color: "var(--mute)" }}>Ver todos →</span>
            </div>
            {[
              { d: "22 abr", dow: "Ter", info: "05 consultas · 02 fechados", fat: "R$ 6.400" },
              { d: "19 abr", dow: "Sáb", info: "—",                           fat: "—"         },
              { d: "18 abr", dow: "Sex", info: "07 consultas · 03 fechados", fat: "R$ 9.800" },
              { d: "17 abr", dow: "Qui", info: "06 consultas · 02 fechados", fat: "R$ 7.200" },
            ].map(({ d, dow, info, fat }, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "56px 30px 1fr auto", gap: 8,
                padding: "8px 0",
                borderTop: "1px solid color-mix(in oklch, var(--line) 60%, transparent)",
                alignItems: "baseline",
              }}>
                <span style={{ fontFamily: sFont, fontSize: 13, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em" }}>{d}</span>
                <span style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", color: "var(--mute)", textTransform: "uppercase" }}>{dow}</span>
                <span style={{ fontFamily: sFont, fontSize: 11, color: info === "—" ? "var(--mute)" : "var(--ink-soft)" }}>{info}</span>
                <span style={{ fontFamily: sFont, fontSize: 11, color: fat === "—" ? "var(--mute)" : "var(--ink)" }}>{fat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW — MATERIAIS
// ═══════════════════════════════════════════════════════════════════════════════

const MATERIALS = [
  { accent: "oklch(0.52 0.14 148)", title: "Guia completo de harmonização facial 2026",          type: "E-book",    cat: "Harmonização",    isNew: true,  progress: 65  },
  { accent: "oklch(0.58 0.10 200)", title: "Botox preventivo: protocolo e indicações clínicas",  type: "Guia",      cat: "Botox",           isNew: false, progress: undefined },
  { accent: "oklch(0.68 0.09 55)",  title: "Checklist de captação de leads no Instagram",        type: "Checklist", cat: "Marketing",       isNew: true,  progress: undefined },
  { accent: "oklch(0.50 0.14 290)", title: "Bioestimuladores: mecanismo e resultados",            type: "E-book",    cat: "Bioestimulador",  isNew: false, progress: 30  },
  { accent: "oklch(0.58 0.12 20)",  title: "Como precificar seus procedimentos em 2026",         type: "Guia",      cat: "Negócios",        isNew: false, progress: 100 },
  { accent: "oklch(0.60 0.10 170)", title: "Protocolo editorial para médicas estéticas",         type: "Vídeo",     cat: "Marketing",       isNew: true,  progress: undefined },
  { accent: "oklch(0.58 0.12 60)",  title: "Roteiro de vendas via DM: 7 scripts validados",     type: "Guia",      cat: "Negócios",        isNew: false, progress: undefined },
  { accent: "oklch(0.52 0.08 240)", title: "Filler labial: guia de consentimento e pós-cuidado", type: "E-book",   cat: "Harmonização",    isNew: false, progress: undefined },
];

function ViewMateriais() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Hero */}
      <div style={{
        padding: "16px 18px 14px", flexShrink: 0,
        background: "linear-gradient(to bottom, color-mix(in oklch, var(--gold) 5%, var(--paper)), var(--paper))",
        borderBottom: "1px solid var(--line)",
      }}>
        <Kicker>Biblioteca · Materiais exclusivos</Kicker>
        <SectionH1>Conhecimento que <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>converte</em>.</SectionH1>
        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
          {[{ value: String(MATERIALS.length), label: "materiais" }, { value: "2", label: "em progresso" }, { value: "1", label: "concluídos" }].map(({ value, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: dFont, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--gold-dark)", fontStyle: "italic" }}>{value}</span>
              <span style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search + category pills */}
      <div style={{ padding: "8px 18px", borderBottom: "1px solid var(--line)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ position: "relative", maxWidth: 280 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--mute)" }}>🔍</span>
          <div style={{ width: "100%", height: 30, paddingLeft: 28, paddingRight: 12, borderRadius: 99, border: "1px solid var(--line)", fontFamily: sFont, fontSize: 12, color: "var(--mute)", background: "var(--paper)", display: "flex", alignItems: "center" }}>Buscar materiais…</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Todos", "Harmonização", "Botox", "Bioestimulador", "Marketing", "Negócios"].map((cat, i) => (
            <div key={cat} style={{
              padding: "3px 10px", borderRadius: 99, fontSize: 11, fontFamily: sFont, fontWeight: i === 0 ? 500 : 400,
              border: `1px solid ${i === 0 ? "color-mix(in oklch, var(--gold) 50%, transparent)" : "var(--line)"}`,
              background: i === 0 ? "color-mix(in oklch, var(--gold) 8%, transparent)" : "transparent",
              color: i === 0 ? "var(--ink)" : "var(--mute)",
            }}>{cat}</div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 18px" }}>
        <Kicker>Biblioteca completa</Kicker>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 8 }}>
          {MATERIALS.map((m, i) => (
            <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden", background: "var(--paper-surface)", display: "flex", flexDirection: "column" }}>
              {/* Cover */}
              <div style={{
                height: 72, padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between",
                background: `linear-gradient(135deg, ${m.accent}, color-mix(in oklch, ${m.accent} 45%, oklch(0.14 0.008 60)))`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {m.isNew
                    ? <span style={{ fontFamily: mFont, fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", color: "white", background: "rgba(255,255,255,0.2)", padding: "2px 5px", borderRadius: 99 }}>✦ Novo</span>
                    : <span />
                  }
                  <span style={{ fontFamily: mFont, fontSize: 7, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.25)", padding: "2px 5px", borderRadius: 99 }}>{m.type}</span>
                </div>
                <span style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{m.cat}</span>
              </div>
              {/* Progress */}
              {m.progress !== undefined && (
                <div style={{ height: 2, background: "var(--line)" }}>
                  <div style={{ height: "100%", width: `${m.progress}%`, background: "var(--gold)" }} />
                </div>
              )}
              {/* Body */}
              <div style={{ padding: "8px 10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontFamily: sFont, fontSize: 10.5, fontWeight: 500, color: "var(--ink)", lineHeight: 1.35, letterSpacing: "-0.01em" }}>{m.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--line)" }}>
                  <span style={{ fontFamily: mFont, fontSize: 7.5, color: m.progress === 100 ? "var(--gold-dark)" : "var(--mute)", letterSpacing: "0.06em" }}>
                    {m.progress === 100 ? "◆ Concluído" : m.progress !== undefined ? `${m.progress}% lido` : "Kairós"}
                  </span>
                  <span style={{ fontFamily: sFont, fontSize: 10, color: "var(--gold-dark)", fontWeight: 500 }}>
                    {m.progress === 100 ? "Reler" : m.progress !== undefined ? "Continuar" : "Acessar"} →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW — CONFIGURAÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

function ViewConfiguracoes() {
  return (
    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, height: "100%", overflow: "hidden" }}>
      <div style={{ flexShrink: 0 }}>
        <Kicker>Configurações</Kicker>
        <SectionH1>Ajuste o <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>sistema</em>.</SectionH1>
      </div>

      {/* Sub-tabs (Perfil active) */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
        {["Perfil", "Notificações", "Integrações", "Conta"].map((t, i) => (
          <div key={t} style={{
            position: "relative", padding: "7px 14px",
            fontFamily: sFont, fontSize: 12,
            fontWeight: i === 0 ? 500 : 400,
            color: i === 0 ? "var(--ink)" : "var(--mute)",
          }}>
            {t}
            {i === 0 && <span style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1.5, background: "var(--ink)" }} />}
          </div>
        ))}
      </div>

      {/* Perfil tab content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
        {/* Dados profissionais */}
        <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 14, background: "var(--paper-surface)", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          <div>
            <div style={{ fontFamily: sFont, fontSize: 16, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              Dados <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>profissionais</em>
            </div>
            <div style={{ fontFamily: sFont, fontSize: 11, color: "var(--mute)", marginTop: 2 }}>Essas informações calibram o tom do sistema.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Nome",          value: "Dra. Marina Vasconcellos"             },
              { label: "Especialidade", value: "Harmonização facial · bioestimulador"  },
              { label: "CRM",           value: "CRM-SP 174.992"                        },
              { label: "Clínica",       value: "Clínica Vasconcellos · Jardins, SP"    },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: mFont, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 4 }}>{label}</div>
                <div style={{ height: 30, borderRadius: 6, border: "1px solid var(--line)", background: "var(--paper)", display: "flex", alignItems: "center", padding: "0 10px", fontFamily: sFont, fontSize: 12, color: "var(--ink)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DNA estratégico */}
        <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 14, background: "var(--paper-surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: sFont, fontSize: 16, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              DNA <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>estratégico</em>
            </div>
            <div style={{ fontFamily: sFont, fontSize: 11, color: "var(--mute)", marginTop: 2 }}>Resumo calibrado · recalibre a qualquer momento.</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {[
              { l: "Meta mensal",          v: "R$ 48.000",               italic: true  },
              { l: "Ticket médio",         v: "R$ 3.267",                italic: false },
              { l: "Dias de atendimento",  v: "5 × semana",              italic: false },
              { l: "Tom editorial",        v: "Editorial clínica",       italic: false },
              { l: "Formalidade",          v: "Profissional equilibrada", italic: false },
            ].map(({ l, v, italic }, i) => (
              <div key={l} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0",
                borderTop: i > 0 ? "1px solid color-mix(in oklch, var(--line) 55%, transparent)" : "none",
              }}>
                <span style={{ fontFamily: mFont, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)" }}>{l}</span>
                <span style={{ fontFamily: sFont, fontSize: 12.5, fontWeight: 500, color: italic ? "var(--gold-dark)" : "var(--ink)", fontStyle: italic ? "italic" : "normal" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 10, padding: "7px 0", textAlign: "center",
            border: "1px solid var(--line)", borderRadius: 6,
            fontFamily: sFont, fontSize: 12, color: "var(--ink)",
          }}>
            Recalibrar DNA →
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export function ProductDemoSection() {
  const [active, setActive] = useState<Sec>("calendario");

  return (
    <section
      id="produto"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">Produto em ação</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 style={{
            fontFamily: dFont,
            fontSize: "clamp(44px, 6.5vw, 88px)",
            fontWeight: 400, lineHeight: 0.94,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
            marginTop: 24, maxWidth: "26ch",
          }}>
            O sistema que pensa junto com a sua agenda.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div style={{ marginTop: 64, borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--line)", background: "var(--paper-surface)" }}>
            <WindowChrome />
            <TopBar active={active} onNav={setActive} />
            <div style={{ display: "flex", height: 570 }}>
              <Sidebar />
              <div style={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {active === "calendario" && <ViewCalendario />}
                {active === "analises"   && <ViewAnalises />}
                {active === "checkin"    && <ViewCheckin />}
                {active === "materiais"  && <ViewMateriais />}
                {active === "config"     && <ViewConfiguracoes />}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
