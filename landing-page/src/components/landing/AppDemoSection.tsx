"use client";

import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

type ViewKey = "calendar" | "metrics" | "content";

const VIEWS: { key: ViewKey; label: string; sub: string; icon: typeof CalendarIcon }[] = [
  { key: "calendar", label: "Calendário", sub: "Motor matemático · semana 17", icon: CalendarIcon },
  { key: "metrics", label: "Indicadores", sub: "Painel de receita · abril", icon: TrendingUp },
  { key: "content", label: "Conteúdo IA", sub: "Curadoria de copy · 12 peças", icon: Sparkles },
];

const CYCLE_MS = 4500;

export function AppDemoSection() {
  const [view, setView] = useState<ViewKey>("calendar");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setView((v) => {
        const idx = VIEWS.findIndex((x) => x.key === v);
        return VIEWS[(idx + 1) % VIEWS.length].key;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="demonstracao"
      className="py-[120px] bg-[var(--paper-warm)]/50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-14">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">A plataforma · viva</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1} as="h2" className="editorial-display text-[clamp(36px,4.6vw,60px)]">
              O sistema operando{" "}
              <span className="italic-gold">em tempo real.</span>
            </Reveal>
            <Reveal delay={2} as="p" className="mt-5 text-[15px] leading-[1.65] text-kairos-charcoal/80">
              Calendário, indicadores e curadoria de copy convivem em uma só
              superfície. Abaixo, três das vistas que sua doutora abrirá toda
              segunda-feira.
            </Reveal>
          </div>
        </div>

        <Reveal delay={2}>
          <div className="relative">
            <div className="card-surface overflow-hidden p-0">
              {/* window chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-kairos-line">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in oklch, var(--ink) 12%, transparent)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "color-mix(in oklch, var(--ink) 12%, transparent)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="mono-label ml-3">kairos.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mono-label">◆ AO VIVO</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-dark)] animate-pulse" />
                </div>
              </div>

              {/* tab strip */}
              <div className="flex border-b border-kairos-line">
                {VIEWS.map((v) => {
                  const Icon = v.icon;
                  const isActive = v.key === view;
                  return (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => setView(v.key)}
                      className={cn(
                        "flex items-center gap-2.5 px-6 py-4 text-[13px] tracking-[-0.005em] transition-colors relative",
                        isActive
                          ? "text-kairos-charcoal"
                          : "text-kairos-charcoal/55 hover:text-kairos-charcoal/85"
                      )}
                    >
                      <Icon className={cn("h-3.5 w-3.5", isActive && "text-[var(--gold-dark)]")} />
                      <span className="font-medium">{v.label}</span>
                      <span className="mono-label hidden md:inline">{v.sub}</span>
                      {isActive && (
                        <span
                          className="absolute inset-x-3 -bottom-px h-px"
                          style={{ background: "var(--gold-dark)" }}
                        />
                      )}
                    </button>
                  );
                })}
                <div className="ml-auto flex items-center gap-2 px-5">
                  <span className="mono-label">CICLA EM</span>
                  <span className="block w-20 h-1 rounded-full bg-kairos-line overflow-hidden">
                    <span
                      key={view + (paused ? "p" : "r")}
                      className="block h-full"
                      style={{
                        width: "100%",
                        background: "var(--gold)",
                        animation: paused
                          ? "none"
                          : `appdemo-progress ${CYCLE_MS}ms linear forwards`,
                      }}
                    />
                  </span>
                </div>
              </div>

              {/* views */}
              <div className="relative min-h-[440px]">
                <DemoCalendar visible={view === "calendar"} />
                <DemoMetrics visible={view === "metrics"} />
                <DemoContent visible={view === "content"} />
              </div>
            </div>

            <style jsx global>{`
              @keyframes appdemo-progress {
                from { width: 0%; }
                to { width: 100%; }
              }
              @keyframes appdemo-fade {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DemoFrame({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 p-7 md:p-9 transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        animation: visible ? "appdemo-fade 0.6s ease-out" : "none",
      }}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

function DemoCalendar({ visible }: { visible: boolean }) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const accents = new Set([2, 5, 9, 12, 14, 18, 22, 25]);
  const ideas = new Set([4, 8, 17, 21, 27]);

  return (
    <DemoFrame visible={visible}>
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="kicker">Calendário · abril 2026</span>
          <h3 className="editorial-display text-[26px] mt-2">
            Semana <span className="italic-gold">17</span> · 4 peças encaixadas
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label">Recalibrado · 02 min</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
          <span key={i} className="mono-label text-center">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => {
          const isAccent = accents.has(d);
          const isIdea = ideas.has(d);
          return (
            <div
              key={d}
              className="aspect-square rounded-md border flex items-end justify-end p-1.5 relative"
              style={{
                borderColor: isAccent
                  ? "color-mix(in oklch, var(--gold) 70%, transparent)"
                  : "var(--line)",
                background: isAccent
                  ? "color-mix(in oklch, var(--gold) 10%, transparent)"
                  : "transparent",
              }}
            >
              <span
                className={cn("text-[11px] tracking-[-0.01em]", isAccent && "italic-gold not-italic")}
              >
                {String(d).padStart(2, "0")}
              </span>
              {isIdea && (
                <span
                  className="absolute top-1 left-1 w-1 h-1 rounded-full"
                  style={{ background: "color-mix(in oklch, var(--mute) 60%, transparent)" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-2"><span className="h-px w-3" style={{ background: "var(--gold)" }} /><span className="mono-label">Publicado · agendado</span></div>
        <div className="flex items-center gap-2"><span className="h-px w-3" style={{ background: "color-mix(in oklch, var(--mute) 50%, transparent)" }} /><span className="mono-label">Ideia · não confirmado</span></div>
        <span className="mono-label ml-auto">◆ Próxima leitura · 5 dias</span>
      </div>
    </DemoFrame>
  );
}

function DemoMetrics({ visible }: { visible: boolean }) {
  const kpis = [
    { l: "Faturamento", v: "R$ 38,4k", sub: "80% DE R$ 48K", italic: true, pct: 80 },
    { l: "Procedimentos", v: "12", sub: "DE 15 AGENDADOS", italic: false, pct: 80 },
    { l: "Leads qualificadas", v: "58", sub: "DE 65 PROJETADAS", italic: false, pct: 89 },
    { l: "Conversão", v: "34%", sub: "+6PTS VS MARÇO", italic: true, pct: 88 },
  ];
  const points = [22, 28, 26, 34, 41, 38, 44, 52, 49, 56, 62, 68, 64, 72];
  const max = Math.max(...points);

  return (
    <DemoFrame visible={visible}>
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="kicker">Painel de receita</span>
          <h3 className="editorial-display text-[26px] mt-2">
            Abril em <span className="italic-gold">leitura</span>.
          </h3>
        </div>
        <span className="mono-label">Atualizado · 09:12</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div
            key={k.l}
            className="pr-5"
            style={{ borderRight: i < 3 ? "1px solid var(--line)" : "none" }}
          >
            <div className="mono-label mb-2">{k.l}</div>
            <div
              className={cn("font-medium", k.italic ? "italic-gold not-italic" : "text-kairos-charcoal")}
              style={{ fontSize: 28, letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              {k.v}
            </div>
            <div className="mono-label mt-1.5" style={{ fontSize: 9 }}>{k.sub}</div>
            <div className="h-px bg-kairos-line mt-2.5 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: visible ? `${k.pct}%` : "0%",
                  background: "var(--gold)",
                  transition: "width 1.1s cubic-bezier(.2,.7,.2,1)",
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-kairos-line pt-4">
        <div className="flex items-baseline justify-between mb-3">
          <span className="mono-label">Leads qualificadas · semanas 14 a 17</span>
          <span className="mono-label italic-gold not-italic">+38% vs março</span>
        </div>
        <svg viewBox="0 0 700 130" className="w-full h-[110px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const w = 700;
            const h = 130;
            const step = w / (points.length - 1);
            const path = points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * (h - 14) - 6}`)
              .join(" ");
            const fill = `${path} L ${w} ${h} L 0 ${h} Z`;
            return (
              <>
                <path d={fill} fill="url(#goldGrad)" />
                <path d={path} stroke="var(--gold-dark)" strokeWidth="1.5" fill="none" />
                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={i * step}
                    cy={h - (p / max) * (h - 14) - 6}
                    r={i === points.length - 1 ? 4 : 2}
                    fill={i === points.length - 1 ? "var(--gold-dark)" : "var(--paper)"}
                    stroke="var(--gold-dark)"
                    strokeWidth="1.2"
                  />
                ))}
              </>
            );
          })()}
        </svg>
      </div>
    </DemoFrame>
  );
}

function DemoContent({ visible }: { visible: boolean }) {
  const items = [
    { tag: "Reels", title: "Por que harmonização não é estética — é leitura clínica.", state: "Aprovado · 22 abr" },
    { tag: "Carrossel", title: "Três sinais que indicam que o paciente não é seu fit.", state: "Em revisão" },
    { tag: "Story", title: "Bastidor · calibragem do procedimento âncora.", state: "Rascunho IA" },
    { tag: "Reels", title: "O que muda quando o conteúdo gera consulta, não like.", state: "Agendado · 26 abr" },
  ];
  return (
    <DemoFrame visible={visible}>
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="kicker">Curadoria de copy</span>
          <h3 className="editorial-display text-[26px] mt-2">
            <span className="italic-gold">12 peças</span> calibradas esta semana.
          </h3>
        </div>
        <span className="mono-label">DNA · v3 · março 2026</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="border border-kairos-line rounded-[var(--radius)] p-5 flex flex-col gap-3 transition-colors hover:border-kairos-charcoal/50"
            style={{ background: "var(--paper-surface)" }}
          >
            <div className="flex items-baseline justify-between">
              <span className="mono-label italic-gold not-italic">{it.tag}</span>
              <span className="mono-label">{it.state}</span>
            </div>
            <p className="text-[15.5px] leading-[1.45] text-kairos-charcoal tracking-[-0.01em] max-w-[36ch]">
              {it.title}
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="mono-label">◆ Tom · clínico-direto</span>
              <ChevronRight className="h-3.5 w-3.5 text-kairos-charcoal/50" />
            </div>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
