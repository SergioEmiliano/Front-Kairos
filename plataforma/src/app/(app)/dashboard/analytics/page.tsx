"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Target, BarChart3, Calendar, Download } from "lucide-react";
import { MetricCard } from "@/components/analytics/MetricCard";
import { AIAnalystPanel } from "@/components/analytics/AIAnalystPanel";
import { FloatingAnalystButton } from "@/components/analytics/FloatingAnalystButton";
import { analyticsService } from "@/services/analytics.service";
import { useUIStore } from "@/store/ui.store";
import { AnalyticsSummary } from "@/types";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "geral" | "performance" | "receita";

// ─── Inline primitives ───────────────────────────────────────────────────────

function Badge({
  variant,
  children,
}: {
  variant: "green" | "amber" | "red" | "neutral";
  children: React.ReactNode;
}) {
  const styles: Record<string, { bg: string; color: string }> = {
    green:   { bg: "oklch(0.93 0.04 147)", color: "oklch(0.45 0.13 147)" },
    amber:   { bg: "oklch(0.95 0.04 75)",  color: "oklch(0.52 0.13 45)"  },
    red:     { bg: "oklch(0.95 0.04 28)",  color: "oklch(0.50 0.16 28)"  },
    neutral: { bg: "color-mix(in oklch, var(--line) 60%, transparent)", color: "var(--mute)" },
  };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-medium"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return <span className="kicker">{children}</span>;
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("text-[15px] font-medium text-kairos-charcoal mt-1", className)}
      style={{ letterSpacing: "-0.015em" }}
    >
      {children}
    </div>
  );
}

// ─── Tab 1 — Visão Geral ─────────────────────────────────────────────────────

function ImpactBanner() {
  return (
    <div
      className="rounded-[var(--radius)] p-5 flex items-center gap-5"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      {/* Main stat */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <span
          className="text-[9px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "color-mix(in oklch, var(--paper) 45%, transparent)" }}
        >
          ◆ Desde que você entrou na Kairós
        </span>
        <span
          className="text-[34px] font-medium leading-none"
          style={{ letterSpacing: "-0.03em", color: "var(--gold)", fontStyle: "italic" }}
        >
          147.320
        </span>
        <span className="text-[13px] font-medium leading-snug" style={{ letterSpacing: "-0.01em" }}>
          pessoas alcançadas pelo seu conteúdo
        </span>
        <span
          className="text-[9.5px] tracking-[0.10em] uppercase mt-0.5"
          style={{ color: "color-mix(in oklch, var(--paper) 45%, transparent)" }}
        >
          Nov 2025 – Maio 2026 · 6 meses
        </span>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch" style={{ background: "color-mix(in oklch, var(--paper) 12%, transparent)" }} />

      {/* Stat trio */}
      <div className="flex-1 flex items-center justify-around gap-4">
        {[
          { label: "Alcance", value: "+671%", sub: "vs. antes da Kairós" },
          { label: "Faturamento", value: "+214%", sub: "vs. 6 meses anteriores" },
          { label: "Leads / mês", value: "47", sub: "vs. 12 antes" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="flex flex-col gap-1">
            <span
              className="text-[9px] font-medium tracking-[0.12em] uppercase"
              style={{ color: "color-mix(in oklch, var(--paper) 40%, transparent)" }}
            >
              {label}
            </span>
            <span
              className="text-[22px] font-medium leading-none"
              style={{ letterSpacing: "-0.025em", color: "var(--gold)", fontStyle: "italic" }}
            >
              {value}
            </span>
            <span
              className="text-[10px]"
              style={{ color: "color-mix(in oklch, var(--paper) 45%, transparent)" }}
            >
              {sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreCard() {
  // SVG ring: r=29, circumference ≈ 182, 87% = ~158
  return (
    <div
      className="rounded-[var(--radius)] p-5 flex flex-col gap-4"
      style={{
        background: "var(--paper-warm)",
        border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
      }}
    >
      <div className="flex items-center justify-between">
        <SectionKicker>Score da semana</SectionKicker>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium"
          style={{
            background: "color-mix(in oklch, var(--gold) 10%, transparent)",
            border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
            color: "var(--gold-dark)",
          }}
        >
          🔥 4 semanas seguidas
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Ring */}
        <div className="relative w-[72px] h-[72px] shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r="29" fill="none" stroke="var(--line)" strokeWidth="5" />
            <circle
              cx="36" cy="36" r="29" fill="none" stroke="var(--gold)" strokeWidth="5"
              strokeDasharray="158 24" strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-medium leading-none" style={{ letterSpacing: "-0.03em", color: "var(--gold-dark)" }}>87</span>
            <span className="text-[9px] font-medium tracking-[0.06em] mt-0.5" style={{ color: "var(--mute)" }}>/100</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-[14px] font-medium leading-snug text-kairos-charcoal" style={{ letterSpacing: "-0.015em" }}>
            Sistema operando em{" "}
            <span className="italic-gold">alta performance</span>
          </div>
          <div className="text-[11.5px] text-kairos-stone leading-snug">
            5 de 6 peças publicadas · alcance 14% acima da média · 3 DMs novos
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <Badge variant="green">✓ Rotina</Badge>
            <Badge variant="green">✓ Alcance</Badge>
            <Badge variant="amber">~ DMs</Badge>
          </div>
        </div>
      </div>

      <div className="hairline" />
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Postagens", value: "5", sub: "/6" },
          { label: "Alcance", value: "8,4K", sub: null },
          { label: "DMs novos", value: "3", sub: null },
        ].map(({ label, value, sub }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="mono-label" style={{ fontSize: 9 }}>{label}</span>
            <span className="text-[16px] font-medium text-kairos-charcoal" style={{ letterSpacing: "-0.02em" }}>
              {value}
              {sub && <span className="text-[12px] font-normal text-kairos-stone">{sub}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueFunnel() {
  const steps = [
    {
      emoji: "📝",
      value: "28",
      name: "peças Kairós",
      detail: "12 Reels · 8 Posts\n5 Carrosséis · 3 Stories",
      rate: "5,8%",
      highlight: false,
    },
    {
      emoji: "👁️",
      value: "32,4K",
      name: "alcance total",
      detail: "Média avg 1.157/post\nReels: 2.140 · Posts: 641",
      rate: "5,4%",
      highlight: false,
    },
    {
      emoji: "👤",
      value: "1.749",
      name: "visitas ao perfil",
      detail: "Fonte: Instagram API\n↑ 21% vs. março",
      rate: "2,7%",
      highlight: false,
    },
    {
      emoji: "💬",
      value: "47",
      name: "DMs iniciados",
      detail: "Fonte: check-in\n↑ 11 vs. março",
      rate: "32%",
      highlight: true,
      gold: true,
    },
    {
      emoji: "📅",
      value: "15",
      name: "agendamentos",
      detail: "Ticket médio R$ 2.053\nTaxa acima da média",
      rate: "100%",
      highlight: false,
    },
    {
      emoji: "💰",
      value: "R$ 30,8K",
      name: "faturamento",
      detail: "64% da meta mensal\nProjeção: R$ 36,2K",
      rate: null,
      highlight: true,
      gold: true,
    },
  ];

  return (
    <div className="chart-wrap p-0 overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <div>
          <SectionKicker>Funil de receita</SectionKicker>
          <SectionTitle>
            Do conteúdo ao{" "}
            <span className="italic-gold">dinheiro na clínica</span>
          </SectionTitle>
        </div>
        <span className="mono-label" style={{ fontSize: 9 }}>Abril 2026</span>
      </div>

      <div className="flex">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className="flex-1 flex flex-col gap-1.5 p-4 relative"
            style={{
              borderRight: i < steps.length - 1 ? "1px solid var(--line)" : "none",
              background: step.highlight
                ? "var(--paper-warm)"
                : "transparent",
            }}
          >
            <div className="text-xl mb-0.5">{step.emoji}</div>
            <div
              className={cn(
                "text-[24px] font-medium leading-none",
                step.gold ? "italic-gold" : "text-kairos-charcoal"
              )}
              style={{ letterSpacing: "-0.025em" }}
            >
              {step.value}
            </div>
            <div className="mono-label" style={{ fontSize: 9 }}>{step.name}</div>
            <div className="text-[10px] text-kairos-stone leading-snug mt-1">
              {step.detail.split("\n").map((line, li) => (
                <span key={li} className={li > 0 ? "block" : ""}>{line}</span>
              ))}
            </div>
            {/* Conversion rate badge */}
            {step.rate && (
              <div
                className="absolute -right-[1px] top-1/2 -translate-y-1/2 z-10 px-1.5 py-0.5 rounded text-[8px] font-medium whitespace-nowrap"
                style={{
                  background: "var(--paper-surface)",
                  border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                  color: "var(--gold-dark)",
                }}
              >
                ↓ {step.rate}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AIRecommendations() {
  const recs = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
      title: "Seus Reels de caso clínico convertem 2,3× mais",
      body: "Nos últimos 30 dias, Reels com antes/depois tiveram média de 312 saves vs. 136 dos demais. Adicionei 2 Reels de caso clínico na sua próxima semana.",
      action: "Ver calendário →",
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "Taxa Perfil→DM pode subir 52%",
      body: "Sua taxa atual é 2,7%. A média das doutoras Kairós é 4,1%. Um CTA mais direto nos Stories pode fechar essa diferença.",
      action: "Gerar Story com CTA →",
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      title: "Alcance cai 23% em semanas sem terça",
      body: "Você não postou em 3 terças este mês. Historicamente, o algoritmo do seu perfil favorece conteúdo neste dia. Há um Reel agendado — não pule.",
      action: "Ver post de terça →",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SectionKicker>Próximos passos recomendados</SectionKicker>
        <span className="mono-label" style={{ fontSize: 9 }}>
          Gerado pela IA Kairós · Hoje, 06:00
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {recs.map((rec) => (
          <div
            key={rec.title}
            className="card-surface rounded-[var(--radius)] p-4 flex gap-3 items-start transition-all duration-200 hover:border-kairos-gold-light"
            style={{ cursor: "default" }}
          >
            <div
              className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center"
              style={{
                background: "color-mix(in oklch, var(--gold) 10%, transparent)",
                border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                color: "var(--gold-dark)",
              }}
            >
              {rec.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-kairos-charcoal leading-snug" style={{ letterSpacing: "-0.01em" }}>
                {rec.title}
              </div>
              <div className="text-[11.5px] text-kairos-stone leading-relaxed mt-1.5">
                {rec.body}
              </div>
              <button
                className="mt-2 text-[11px] font-medium"
                style={{ color: "var(--gold-dark)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                {rec.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 2 — Performance de Conteúdo ─────────────────────────────────────────

function FormatPerformance() {
  const formats = [
    { label: "Reel", count: 12, value: 2140, pct: 100, delta: "+44%", up: true },
    { label: "Carrossel", count: 5, value: 1180, pct: 55, delta: "+12%", up: true },
    { label: "Post", count: 8, value: 641, pct: 30, delta: "−8%", up: false },
    { label: "Story", count: 3, value: 470, pct: 22, delta: "—", up: null },
  ];

  return (
    <div className="chart-wrap flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <SectionKicker>Alcance por formato</SectionKicker>
          <SectionTitle>Média por publicação · Abril</SectionTitle>
        </div>
        <span className="mono-label" style={{ fontSize: 9 }}>28 peças no total</span>
      </div>

      <div className="flex flex-col">
        {formats.map(({ label, count, value, pct, delta, up }) => (
          <div
            key={label}
            className="flex items-center gap-3 py-2"
            style={{ borderBottom: "1px solid color-mix(in oklch, var(--line) 60%, transparent)" }}
          >
            <div className="w-[72px] shrink-0">
              <div className="text-[12px] font-medium text-kairos-charcoal">{label}</div>
              <div className="text-[9.5px] text-kairos-stone mt-0.5">{count} publicados</div>
            </div>
            <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: "color-mix(in oklch, var(--line) 70%, transparent)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: pct >= 50 ? "var(--gold)" : "color-mix(in oklch, var(--gold) 50%, var(--line))",
                }}
              />
            </div>
            <div className="w-[46px] text-right text-[12.5px] font-medium text-kairos-charcoal shrink-0" style={{ letterSpacing: "-0.01em" }}>
              {value.toLocaleString("pt-BR")}
            </div>
            <div
              className="w-[38px] text-right text-[10px] font-medium shrink-0"
              style={{
                color:
                  up === true
                    ? "oklch(0.50 0.13 147)"
                    : up === false
                    ? "var(--error)"
                    : "var(--mute)",
              }}
            >
              {delta}
            </div>
          </div>
        ))}
      </div>

      <div className="hairline" />
      <div
        className="rounded-[10px] p-3"
        style={{
          background: "color-mix(in oklch, var(--gold) 8%, transparent)",
          border: "1px solid color-mix(in oklch, var(--gold) 25%, transparent)",
        }}
      >
        <div className="text-[11.5px] font-medium text-kairos-charcoal">💡 Insight</div>
        <div className="text-[11.5px] text-kairos-stone mt-1 leading-relaxed">
          Reels têm <strong className="text-kairos-charcoal">3,3× mais alcance</strong> que Posts estáticos. O calendário Kairós já priorizou 14 Reels para maio.
        </div>
      </div>
    </div>
  );
}

function PillarPerformance() {
  const pillars = [
    { name: "Autoridade", pct: 38, reach: "avg 1.842 alcance", fill: 100, hi: true },
    { name: "Educação", pct: 28, reach: "avg 1.410 alcance", fill: 72, hi: false },
    { name: "Conexão", pct: 21, reach: "avg 890 alcance", fill: 42, hi: false, steel: true },
    { name: "Conversão", pct: 13, reach: "avg 610 alcance", fill: 28, hi: false, faded: true },
  ];

  return (
    <div className="chart-wrap flex flex-col gap-4">
      <div>
        <SectionKicker>Performance por pilar</SectionKicker>
        <SectionTitle>Alcance médio por tipo de conteúdo</SectionTitle>
      </div>

      <div className="flex flex-col gap-4">
        {pillars.map(({ name, pct, reach, fill, hi, steel, faded }) => (
          <div key={name} className="flex items-center gap-3">
            <div className="w-[78px] text-[12px] font-medium text-kairos-charcoal shrink-0">{name}</div>
            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "color-mix(in oklch, var(--line) 60%, transparent)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${fill}%`,
                  background: steel
                    ? "var(--steel)"
                    : faded
                    ? "color-mix(in oklch, var(--steel) 60%, var(--line))"
                    : "var(--gold)",
                }}
              />
            </div>
            <div className="flex flex-col items-end w-[74px] shrink-0">
              <span
                className={cn("text-[15px] font-medium leading-none", hi ? "italic-gold" : "text-kairos-charcoal")}
                style={{ letterSpacing: "-0.02em" }}
              >
                {pct}%
              </span>
              <span className="text-[9.5px] text-kairos-stone font-medium mt-0.5" style={{ letterSpacing: "0.04em" }}>
                {reach}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="hairline" />
      <div className="text-[11px] text-kairos-stone leading-relaxed">
        Conteúdo de <strong className="text-kairos-charcoal">Autoridade clínica</strong> gera 3× mais saves e visitas ao perfil que os demais pilares — sinal claro de intenção de compra.
      </div>
    </div>
  );
}

function ReelDiagnostic() {
  const reels = [
    { title: "Antes/depois preenchimento labial", meta: "Reel · 24 Abr · Autoridade", reach: "3.841", saves: 312, savesGold: true, skip: "12%", skipV: "green", watch: 82, watchSec: "18s", status: "Repetir", statusV: "green" as const },
    { title: "3 mitos sobre o botox preventivo", meta: "Reel · 18 Abr · Educação", reach: "2.610", saves: 241, savesGold: true, skip: "18%", skipV: "green", watch: 70, watchSec: "15s", status: "Repetir", statusV: "green" as const },
    { title: "Rotina de skincare que prescevo", meta: "Reel · 15 Abr · Conexão", reach: "1.980", saves: 98, savesGold: false, skip: "31%", skipV: "amber", watch: 60, watchSec: "13s", status: "Ajustar hook", statusV: "amber" as const },
    { title: "Por dentro da minha clínica", meta: "Reel · 08 Abr · Bastidores", reach: "1.240", saves: 44, savesGold: false, skip: "54%", skipV: "red", watch: 28, watchSec: "6s", status: "Reformular", statusV: "red" as const },
    { title: "Bioestimulador — o que é e quando indicar", meta: "Reel · 03 Abr · Autoridade", reach: "2.190", saves: 178, savesGold: true, skip: "15%", skipV: "green", watch: 75, watchSec: "16s", status: "Repetir", statusV: "green" as const },
  ];

  return (
    <div className="chart-wrap">
      <div className="flex items-start justify-between mb-4">
        <div>
          <SectionKicker>Diagnóstico de Reels</SectionKicker>
          <SectionTitle>Hook · Retenção · Classificação · Abril 2026</SectionTitle>
        </div>
        <div className="flex gap-3 items-center">
          {[
            { label: "Hook forte", color: "oklch(0.50 0.13 147)" },
            { label: "Médio", color: "oklch(0.52 0.13 45)" },
            { label: "Hook fraco", color: "oklch(0.50 0.16 28)" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] text-kairos-stone font-medium">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Reel", "Alcance", "Saves", "Hook (skip 3s)", "Watch time", "Status"].map((h, i) => (
              <th
                key={h}
                className="mono-label pb-3 text-left"
                style={{
                  fontSize: 9,
                  borderBottom: "1px solid var(--line)",
                  paddingLeft: i > 0 ? 12 : 0,
                  width: i === 0 ? "32%" : i === 3 ? "16%" : i === 4 ? "16%" : "10%",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reels.map((r, ri) => (
            <tr key={ri}>
              <td className="py-2.5 text-[12.5px]" style={{ borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
                <div className="font-medium text-kairos-charcoal leading-snug">{r.title}</div>
                <div className="text-[10.5px] text-kairos-stone mt-0.5">{r.meta}</div>
              </td>
              <td className="font-medium text-[12.5px] text-kairos-charcoal" style={{ paddingLeft: 12, borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
                {r.reach}
              </td>
              <td
                className="text-[12.5px] font-medium"
                style={{
                  paddingLeft: 12,
                  borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)",
                  color: r.savesGold ? "var(--gold-dark)" : "var(--mute)",
                  fontStyle: r.savesGold ? "italic" : "normal",
                }}
              >
                {r.saves}
              </td>
              <td style={{ paddingLeft: 12, borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
                <Badge variant={r.skipV as "green" | "amber" | "red"}>
                  {r.skipV === "green" ? "✓" : r.skipV === "amber" ? "~" : "✗"} {r.skip} skip
                </Badge>
              </td>
              <td style={{ paddingLeft: 12, borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-[60px] h-1 rounded-full overflow-hidden" style={{ background: "color-mix(in oklch, var(--line) 60%, transparent)" }}>
                    <div className="h-full rounded-full" style={{ width: `${r.watch}%`, background: "var(--gold)" }} />
                  </div>
                  <span className="text-[11px] font-medium text-kairos-charcoal">{r.watchSec}</span>
                </div>
              </td>
              <td style={{ paddingLeft: 12, borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
                <Badge variant={r.statusV}>{r.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopSaves() {
  const posts = [
    { rank: "#1", emoji: "📋", title: "Antes/depois preenchimento labial", meta: "Reel · Autoridade · 24 Abr", saves: 312 },
    { rank: "#2", emoji: "📚", title: "3 mitos sobre botox preventivo", meta: "Reel · Educação · 18 Abr", saves: 241 },
    { rank: "#3", emoji: "🔬", title: "Bioestimulador — o que é e quando indicar", meta: "Reel · Autoridade · 03 Abr", saves: 178 },
    { rank: "#4", emoji: "💆", title: "Protocolo completo harmonização facial", meta: "Carrossel · Autoridade · 12 Abr", saves: 156 },
    { rank: "#5", emoji: "🩺", title: "Como escolher uma boa médica estética", meta: "Carrossel · Educação · 07 Abr", saves: 134 },
  ];

  return (
    <div className="chart-wrap">
      <div className="flex items-start justify-between mb-3">
        <div>
          <SectionKicker>Top posts por saves</SectionKicker>
          <SectionTitle>Intenção de retorno · indicador de lead</SectionTitle>
        </div>
        <span className="mono-label" style={{ fontSize: 9 }}>Save = lead qualificada</span>
      </div>

      {posts.map(({ rank, emoji, title, meta, saves }) => (
        <div
          key={rank}
          className="flex items-center gap-3 py-2.5"
          style={{ borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}
        >
          <span className="text-[9px] font-medium text-kairos-stone w-5 shrink-0">{rank}</span>
          <div
            className="w-10 h-10 rounded-[6px] flex items-center justify-center text-base shrink-0"
            style={{ background: "var(--paper-warm)", border: "1px solid var(--line)" }}
          >
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-medium text-kairos-charcoal leading-snug truncate">{title}</div>
            <div className="text-[10.5px] text-kairos-stone mt-0.5">{meta}</div>
          </div>
          <div className="text-[18px] font-medium shrink-0 italic-gold" style={{ letterSpacing: "-0.02em" }}>
            {saves}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentInsightPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-[var(--radius)] p-4 flex flex-col gap-3"
        style={{ background: "var(--paper-warm)", border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)" }}
      >
        <SectionKicker>Padrão identificado</SectionKicker>
        <div className="text-[15px] font-medium text-kairos-charcoal leading-snug mt-1" style={{ letterSpacing: "-0.015em" }}>
          Posts de <span className="italic-gold">Autoridade clínica</span> dominam os saves
        </div>
        <div className="text-[12px] text-kairos-stone leading-relaxed">
          4 dos 5 posts mais salvos são do pilar Autoridade. Saves indicam que a audiência quer revisitar o conteúdo — sinal claro de intenção de agendamento futuro.
        </div>
        <div className="hairline" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="mono-label" style={{ fontSize: 9 }}>Total saves / mês</span>
            <span className="text-[22px] font-medium italic-gold" style={{ letterSpacing: "-0.025em" }}>1.021</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="mono-label" style={{ fontSize: 9 }}>Avg por Reel</span>
            <span className="text-[22px] font-medium text-kairos-charcoal" style={{ letterSpacing: "-0.025em" }}>85</span>
          </div>
        </div>
      </div>

      <div className="chart-wrap flex flex-col gap-3 flex-1">
        <SectionKicker>Engajamento profundo</SectionKicker>
        <div className="text-[13px] text-kairos-stone leading-relaxed mt-1">
          Shares e saves somados representam o engajamento de{" "}
          <strong className="text-kairos-charcoal">intenção</strong> — mais valioso que likes para gerar leads.
        </div>
        <div className="hairline" />
        <div className="flex items-center gap-5">
          {[
            { label: "Shares", value: "289", muted: false },
            { label: "Saves", value: "1.021", muted: false },
            { label: "Likes", value: "2.840", muted: true },
          ].map(({ label, value, muted }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="mono-label" style={{ fontSize: 9 }}>{label}</span>
              <span
                className="text-[20px] font-medium"
                style={{ letterSpacing: "-0.025em", color: muted ? "var(--mute)" : "var(--ink)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3 — Receita e Leads ──────────────────────────────────────────────────

function BeforeAfterChart() {
  return (
    <div className="chart-wrap">
      <div className="flex items-start justify-between mb-4">
        <div>
          <SectionKicker>Antes × Depois da Kairós</SectionKicker>
          <SectionTitle>Alcance mensal desde novembro 2025</SectionTitle>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1.5 text-[10px] text-kairos-stone font-medium">
            <div className="w-5 h-0.5 rounded-full" style={{ background: "var(--gold)" }} />
            Alcance mensal
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-kairos-stone font-medium">
            <div className="w-0.5 h-3.5 rounded-full" style={{ background: "color-mix(in oklch, var(--gold) 40%, transparent)" }} />
            Entrada Kairós (Jan 2026)
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 680 200"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: 180, overflow: "visible" }}
      >
        <defs>
          <linearGradient id="areaGradAnalytics" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.718 0.082 74)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.718 0.082 74)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Y-axis labels */}
        {[
          { y: 26, label: "35K" }, { y: 62, label: "25K" },
          { y: 98, label: "15K" }, { y: 134, label: "8K" }, { y: 163, label: "0" },
        ].map(({ y, label }) => (
          <text key={label} x="36" y={y} fontFamily="Inter Tight,system-ui" fontSize="9"
            fill="oklch(0.55 0.010 72)" textAnchor="end" letterSpacing="0.05em">{label}</text>
        ))}

        {/* Grid lines */}
        {[24, 60, 96, 132, 162].map((y) => (
          <line key={y} x1="44" y1={y} x2="666" y2={y}
            stroke={y === 162 ? "oklch(0.868 0.014 72)" : "oklch(0.920 0.008 74)"}
            strokeWidth="1" strokeDasharray={y === 162 ? "0" : "3 4"} />
        ))}

        {/* Kairós vertical marker */}
        <line x1="323" y1="16" x2="323" y2="162" stroke="oklch(0.718 0.082 74)"
          strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <rect x="280" y="8" width="88" height="16" rx="4" fill="oklch(0.718 0.082 74)" opacity="0.15" />
        <text x="324" y="19" fontFamily="Inter Tight,system-ui" fontSize="8.5"
          fill="oklch(0.560 0.092 68)" textAnchor="middle" fontWeight="500" letterSpacing="0.08em">◆ KAIRÓS</text>

        {/* Area fill */}
        <path
          d="M100,146 C115,144 148,140 161,139 C176,138 208,136 222,133 C240,128 268,116 283,107 C300,96 330,80 344,71 C358,61 388,43 405,36 C420,30 450,20 466,14 L466,162 L100,162 Z"
          fill="url(#areaGradAnalytics)"
        />

        {/* Line */}
        <path
          d="M100,146 C115,144 148,140 161,139 C176,138 208,136 222,133 C240,128 268,116 283,107 C300,96 330,80 344,71 C358,61 388,43 405,36 C420,30 450,20 466,14"
          fill="none" stroke="oklch(0.718 0.082 74)" strokeWidth="2" strokeLinecap="round"
        />

        {/* Projected dashed extension */}
        <path
          d="M466,14 C490,8 550,6 600,5"
          fill="none" stroke="oklch(0.718 0.082 74)" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" opacity="0.55"
        />

        {/* Data points */}
        {[
          [100, 146], [161, 139], [222, 133], [283, 107], [344, 71],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5"
            fill="oklch(0.978 0.005 75)" stroke="oklch(0.718 0.082 74)" strokeWidth="1.5" />
        ))}
        <circle cx="405" cy="36" r="4.5" fill="oklch(0.718 0.082 74)" />
        <circle cx="466" cy="14" r="3.5" fill="oklch(0.978 0.005 75)"
          stroke="oklch(0.718 0.082 74)" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* X-axis labels */}
        {[
          [100, "NOV"], [161, "DEZ"], [222, "JAN"], [283, "FEV"],
          [344, "MAR"], [405, "ABR"], [466, "MAI →"],
        ].map(([x, label]) => (
          <text key={String(label)} x={x} y="178" fontFamily="Inter Tight,system-ui" fontSize="9"
            fill={label === "JAN" ? "oklch(0.560 0.092 68)" : "oklch(0.55 0.010 72)"}
            fontWeight={label === "JAN" ? "500" : "400"}
            textAnchor="middle" letterSpacing="0.05em"
            opacity={label === "MAI →" ? 0.55 : 1}>{label}</text>
        ))}

        {/* Callout for current month */}
        <rect x="368" y="16" width="80" height="38" rx="6"
          fill="oklch(0.978 0.005 75)" stroke="oklch(0.868 0.014 72)" strokeWidth="1" />
        <text x="408" y="31" fontFamily="Inter Tight,system-ui" fontSize="8.5"
          fill="oklch(0.55 0.010 72)" textAnchor="middle" letterSpacing="0.08em">ABRIL</text>
        <text x="408" y="47" fontFamily="Inter Tight,system-ui" fontSize="13"
          fill="oklch(0.560 0.092 68)" textAnchor="middle" fontWeight="500" fontStyle="italic">32,4K</text>
      </svg>
    </div>
  );
}

function RevenueProjection() {
  return (
    <div className="chart-wrap flex flex-col gap-4">
      <div>
        <SectionKicker>Projeção · Maio 2026</SectionKicker>
        <SectionTitle>
          Faturamento estimado até{" "}
          <span className="italic-gold">fim do mês</span>
        </SectionTitle>
      </div>

      {/* Projection highlight */}
      <div
        className="rounded-[10px] p-4"
        style={{
          background: "var(--paper-warm)",
          border: "1px solid color-mix(in oklch, var(--gold) 35%, transparent)",
        }}
      >
        <span className="mono-label" style={{ fontSize: 9 }}>Projeção baseada no funil atual</span>
        <div className="text-[34px] font-medium italic-gold mt-1 leading-none" style={{ letterSpacing: "-0.03em" }}>
          R$ 36.200
        </div>
        <div className="text-[11px] text-kairos-stone mt-1">Intervalo: R$ 31.000 – R$ 42.000</div>
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
          <div className="h-full rounded-full" style={{ width: "72%", background: "var(--gold)" }} />
        </div>
        <div className="text-[10px] text-kairos-stone mt-1.5">72% da meta de R$ 50.000</div>
      </div>

      {/* Projection rows */}
      {[
        { active: true, label: "DMs ativos no momento", value: "12 conversas" },
        { active: true, label: "Taxa histórica DM → Agenda sua", value: "32%" },
        { active: false, label: "Novos agendamentos projetados", value: "~4 procedimentos" },
        { active: false, label: "Ticket médio histórico", value: "R$ 2.053" },
        { active: true, label: "Receita adicional potencial", value: "R$ 8.212", bold: true },
      ].map(({ active, label, value, bold }) => (
        <div key={label} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
          <div
            className="w-2 h-2 rounded-full shrink-0 mt-0.5"
            style={{ background: active ? "var(--gold)" : "var(--line)" }}
          />
          <div className="flex-1 text-[12.5px] text-kairos-charcoal leading-snug" style={{ fontWeight: bold ? 500 : 400 }}>
            {label}
          </div>
          <div
            className="shrink-0 italic-gold font-medium"
            style={{ fontSize: bold ? 17 : 14, letterSpacing: "-0.015em" }}
          >
            {value}
          </div>
        </div>
      ))}

      <div
        className="rounded-[8px] p-3"
        style={{
          background: "color-mix(in oklch, oklch(0.58 0.13 147) 8%, transparent)",
          border: "1px solid color-mix(in oklch, oklch(0.58 0.13 147) 25%, transparent)",
        }}
      >
        <div className="text-[11.5px] font-medium text-kairos-charcoal">💡 Para garantir a projeção</div>
        <div className="text-[11px] text-kairos-stone mt-1 leading-relaxed">
          Responder os 12 DMs em aberto hoje pode adicionar até R$ 8.2K ao faturamento do mês.
        </div>
      </div>
    </div>
  );
}

function BenchmarkPanel() {
  const rows = [
    { label: "Alcance mensal", youPct: 82, avgPct: 58, youVal: "32,4K", avgVal: "23,1K", warn: false },
    { label: "Leads / mês", youPct: 72, avgPct: 60, youVal: "47", avgVal: "39", warn: false },
    { label: "Conv. DM→Agenda", youPct: 80, avgPct: 52, youVal: "32%", avgVal: "22%", warn: false },
    { label: "Saves / post", youPct: 70, avgPct: 47, youVal: "85", avgVal: "57", warn: false },
    { label: "Watch time Reels", youPct: 60, avgPct: 50, youVal: "13,2s", avgVal: "11,8s", warn: false },
    { label: "Perfil→DM", youPct: 42, avgPct: 65, youVal: "2,7%", avgVal: "4,1%", warn: true },
  ];

  return (
    <div className="chart-wrap flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <SectionKicker>Benchmark anônimo</SectionKicker>
          <SectionTitle>Você vs. doutoras similares na Kairós</SectionTitle>
        </div>
        <div className="flex gap-3 items-center">
          {[
            { label: "Média", color: "var(--steel)" },
            { label: "Você", color: "var(--gold)" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] text-kairos-stone font-medium">
              <div className="w-4 h-0.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {rows.map(({ label, youPct, avgPct, youVal, avgVal, warn }) => (
          <div key={label} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid color-mix(in oklch, var(--line) 50%, transparent)" }}>
            <div className="w-[120px] text-[12px] font-medium text-kairos-charcoal shrink-0">{label}</div>
            <div className="flex-1 relative h-1 rounded-full" style={{ background: "color-mix(in oklch, var(--line) 60%, transparent)" }}>
              <div className="absolute top-0 left-0 h-1 rounded-full" style={{ width: `${avgPct}%`, background: "var(--steel)" }} />
              <div className="absolute top-0 left-0 h-1 rounded-full" style={{ width: `${youPct}%`, background: "var(--gold)" }} />
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <span className="text-[12px] font-medium" style={{ color: warn ? "oklch(0.52 0.13 45)" : "var(--gold-dark)" }}>{youVal}</span>
              <span className="text-[12px] font-medium text-kairos-stone">{avgVal}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-[8px] p-3"
        style={{
          background: "color-mix(in oklch, oklch(0.65 0.13 45) 8%, transparent)",
          border: "1px solid color-mix(in oklch, oklch(0.65 0.13 45) 25%, transparent)",
        }}
      >
        <div className="text-[11.5px] font-medium text-kairos-charcoal">⚠️ Única métrica abaixo da média</div>
        <div className="text-[11px] text-kairos-stone mt-1 leading-relaxed">
          Perfil→DM em 2,7% vs. média de 4,1%. Melhorar o CTA na bio e nos Stories é a maior alavanca disponível agora.
        </div>
      </div>
    </div>
  );
}

function ConsistencyCalendar() {
  // April 2026: starts on Wednesday (day 3), 30 days
  // We'll map days with post / hot post / empty
  const days = [
    null, null, // padding (Mon, Tue before Apr 1st)
    { d: 1, post: true, hot: true },
    { d: 2, post: false },
    { d: 3, post: true },
    { d: 4, post: false },
    { d: 5, post: true },
    { d: 6, post: false },
    { d: 7, post: true },
    { d: 8, post: false },
    { d: 9, post: true, hot: true },
    { d: 10, post: false },
    { d: 11, post: true },
    { d: 12, post: false },
    { d: 13, post: true },
    { d: 14, post: true, hot: true },
    { d: 15, post: false },
    { d: 16, post: true },
    { d: 17, post: true },
    { d: 18, post: true, hot: true },
    { d: 19, post: false },
    { d: 20, post: true },
    { d: 21, post: true },
    { d: 22, post: true },
    { d: 23, post: false },
    { d: 24, post: true, hot: true },
    { d: 25, post: true },
    { d: 26, post: false },
    { d: 27, post: true },
    { d: 28, post: true, hot: true },
    { d: 29, post: false },
    { d: 30, post: true },
    null, null, null, null, // padding to complete last row
  ];

  return (
    <div className="chart-wrap">
      <div className="flex items-start justify-between mb-4">
        <div>
          <SectionKicker>Consistência de postagem</SectionKicker>
          <SectionTitle>
            Abril 2026 ·{" "}
            <span className="italic-gold">5 de 6 semanas completas</span>
          </SectionTitle>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium"
            style={{
              background: "color-mix(in oklch, var(--gold) 10%, transparent)",
              border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
              color: "var(--gold-dark)",
            }}
          >
            🔥 18 dias consecutivos postando
          </span>
          <span className="text-[11px] text-kairos-stone">Semanas completas → +47% alcance</span>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid gap-[3px] mb-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
          <div key={d} className="text-center text-[9px] font-medium tracking-widest uppercase text-kairos-stone pb-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
        {days.map((day, i) => {
          if (day === null) {
            return <div key={i} className="aspect-square rounded-[5px]" style={{ background: "transparent" }} />;
          }
          return (
            <div
              key={i}
              className="aspect-square rounded-[5px] flex items-center justify-center text-[9.5px] font-medium transition-all duration-150"
              style={{
                background: day.hot
                  ? "color-mix(in oklch, var(--gold) 55%, transparent)"
                  : day.post
                  ? "color-mix(in oklch, var(--gold) 22%, transparent)"
                  : "color-mix(in oklch, var(--line) 50%, transparent)",
                color: day.post ? "var(--gold-dark)" : "var(--mute)",
                fontWeight: day.hot ? 600 : 500,
              }}
            >
              {day.d}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className="flex items-center justify-between mt-4 pt-4"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <div className="flex items-center gap-4">
          {[
            { label: "Post publicado (alcance alto)", hot: true },
            { label: "Post publicado", hot: false, post: true },
            { label: "Sem post", hot: false, post: false },
          ].map(({ label, hot, post }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] text-kairos-stone">
              <div
                className="w-3.5 h-3.5 rounded-[4px] shrink-0"
                style={{
                  background: hot
                    ? "color-mix(in oklch, var(--gold) 55%, transparent)"
                    : (post ?? false)
                    ? "color-mix(in oklch, var(--gold) 22%, transparent)"
                    : "color-mix(in oklch, var(--line) 50%, transparent)",
                }}
              />
              {label}
            </div>
          ))}
        </div>
        <span className="text-[11px] text-kairos-stone">20 posts em 22 dias úteis · 91% de consistência</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("geral");

  const analystPanelOpen = useUIStore((s) => s.analystPanelOpen);
  const setAnalystPanelOpen = useUIStore((s) => s.setAnalystPanelOpen);

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    analyticsService.getSummary(month).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "geral", label: "Visão Geral" },
    { id: "performance", label: "Performance de Conteúdo" },
    { id: "receita", label: "Receita e Leads" },
  ];

  if (loading || !data) {
    return (
      <div className="flex-1 overflow-y-auto kairos-scroll p-6">
        <div className="grid grid-cols-4 gap-4 max-w-[1400px] mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-[var(--radius)] shimmer-bar"
              style={{ border: "1px solid var(--line)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto kairos-scroll">
        <div className="p-6 flex flex-col gap-5" style={{ maxWidth: 1400, margin: "0 auto" }}>

          {/* ── Page header ─────────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="kicker">Dashboard · Performance</span>
              <h1
                className="text-[30px] text-kairos-charcoal leading-[1.05] mt-2.5 font-medium"
                style={{ letterSpacing: "-0.025em" }}
              >
                Sinais de <span className="italic-gold">demanda</span>, não de vaidade.
              </h1>
            </div>
            <div className="flex items-center gap-2.5 mt-1 shrink-0">
              {/* Instagram badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium"
                style={{
                  border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
                  background: "color-mix(in oklch, var(--gold) 6%, transparent)",
                  color: "var(--gold-dark)",
                  letterSpacing: "0.06em",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(0.58 0.13 147)" }} />
                Instagram conectado
              </div>

              {/* Month picker */}
              <button
                className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full border text-[12.5px] font-medium transition-colors hover:border-kairos-charcoal"
                style={{ borderColor: "var(--line)", color: "var(--ink)", background: "transparent" }}
              >
                <Calendar className="h-3 w-3" strokeWidth={1.6} />
                Abril 2026
              </button>

              {/* Export */}
              <button
                className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-[12.5px] font-medium transition-all"
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  border: "1px solid var(--ink)",
                }}
              >
                <Download className="h-3 w-3" strokeWidth={2} />
                Exportar
              </button>
            </div>
          </div>

          {/* ── Tab navigation ──────────────────────────────────────────── */}
          <div
            className="flex gap-0"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="relative px-4 py-2.5 text-[12.5px] font-medium transition-colors"
                style={{
                  color: activeTab === id ? "var(--ink)" : "var(--mute)",
                  background: "transparent",
                  border: "none",
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                }}
              >
                {label}
                {activeTab === id && (
                  <span
                    className="absolute left-0 right-0 bottom-[-1px] h-[1.5px] rounded-full"
                    style={{ background: "var(--ink)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Tab 1 — Visão Geral ──────────────────────────────────────── */}
          {activeTab === "geral" && (
            <div className="flex flex-col gap-4 animate-fade-in">

              {/* Impact banner + Score card */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
                <ImpactBanner />
                <ScoreCard />
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-4 gap-4">
                <MetricCard title="Alcance mensal" value="32,4K" subtitle="+38% VS MARÇO · API META" icon={TrendingUp} progress={76} index={0} />
                <MetricCard title="Leads qualificadas" value="47" subtitle="72% DA PROJEÇÃO · CHECK-IN" icon={Users} progress={72} index={1} italic />
                <MetricCard title="Conversão agenda" value="32%" subtitle="+4 PTS VS MÊS -1 · CHECK-IN" icon={Target} progress={64} index={2} />
                <MetricCard title="Faturamento" value="R$ 30,8K" subtitle="64% DA META · CHECK-IN" icon={BarChart3} progress={64} index={3} italic />
              </div>

              {/* Revenue funnel */}
              <RevenueFunnel />

              {/* AI recommendations */}
              <AIRecommendations />
            </div>
          )}

          {/* ── Tab 2 — Performance de Conteúdo ─────────────────────────── */}
          {activeTab === "performance" && (
            <div className="flex flex-col gap-4 animate-fade-in">

              {/* Format + Pillar side by side */}
              <div className="grid grid-cols-2 gap-4">
                <FormatPerformance />
                <PillarPerformance />
              </div>

              {/* Reel diagnostic */}
              <ReelDiagnostic />

              {/* Top saves + insight panel */}
              <div className="grid grid-cols-2 gap-4">
                <TopSaves />
                <ContentInsightPanel />
              </div>
            </div>
          )}

          {/* ── Tab 3 — Receita e Leads ──────────────────────────────────── */}
          {activeTab === "receita" && (
            <div className="flex flex-col gap-4 animate-fade-in">

              {/* Before/after chart */}
              <BeforeAfterChart />

              {/* Projection + Benchmark */}
              <div className="grid grid-cols-2 gap-4">
                <RevenueProjection />
                <BenchmarkPanel />
              </div>

              {/* Consistency calendar */}
              <ConsistencyCalendar />
            </div>
          )}

        </div>
      </div>

      {/* ── Floating analyst button + panel ─────────────────────────────── */}
      <FloatingAnalystButton
        open={analystPanelOpen}
        onClick={() => setAnalystPanelOpen(!analystPanelOpen)}
      />
      <AIAnalystPanel
        open={analystPanelOpen}
        onClose={() => setAnalystPanelOpen(false)}
      />
    </>
  );
}
