import { Reveal } from "@/components/common/Reveal";

// Ícones (Lucide, via allsvgicons.com) — um por motor, reforçando o conceito
// de cada card sem depender só do número.
function MotorIcon({ kind }: { kind: "calendar" | "dna" | "filter" | "trending" }) {
  const common = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      {kind === "calendar" && (
        <g {...common}>
          <path d="M8 2v4m8-4v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18M9 16l2 2l4-4" />
        </g>
      )}
      {kind === "dna" && (
        <path {...common} d="m10 16l1.5 1.5M14 8l-1.5-1.5M15 2c-1.798 1.998-2.518 3.995-2.807 5.993M16.5 10.5l1 1M17 6l-2.891-2.891M2 15c6.667-6 13.333 0 20-6m-2 0l.891.891M3.109 14.109L4 15m2.5-2.5l1 1M7 18l2.891 2.891M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      )}
      {kind === "filter" && (
        <path {...common} d="M22 3H2l8 9.46V19l4 2v-8.54z" />
      )}
      {kind === "trending" && (
        <g {...common}>
          <path d="M16 7h6v6" />
          <path d="m22 7l-8.5 8.5l-5-5L2 17" />
        </g>
      )}
    </svg>
  );
}

const MOTORS = [
  {
    n: "01",
    icon: "calendar" as const,
    title: "Onboarding detalhado",
    sub: "Calendário · Previsibilidade",
    body:
      "Uma imersão no DNA do seu negócio para transformar sua identidade em uma estratégia de conteúdo clara e consistente.",
  },
  {
    n: "02",
    icon: "dna" as const,
    title: "Curadoria de copy",
    sub: "DNA Estratégico · Tom",
    body:
      "Em vez de roteiros genéricos, a Kairós analisa seus dados e resultados para gerar conteúdos baseados no que já funciona, transformando acertos em um processo replicável e escalável.",
  },
  {
    n: "03",
    icon: "filter" as const,
    title: "Metrificação",
    sub: "Funil · Qualificação",
    body:
      "O Assistente Pessoal Kairós conecta-se à Meta Business Suite para monitorar seus resultados, identificar oportunidades de melhoria e transformar dados em direcionamentos práticos para o crescimento da sua marca.",
  },
  {
    n: "04",
    icon: "trending" as const,
    title: "Painel de receita",
    sub: "Faturamento · Conversão",
    body:
      "Com o registro diário da quantidade de leads gerados, a Kairós transforma esses dados em inteligência de crescimento, calculando indicadores como taxa de conversão, projeções de faturamento e metas necessárias para escalar os resultados de forma previsível.",
  },
];

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

export function MotorSection() {
  return (
    <section
      id="motor"
      style={{ paddingTop: 120, paddingBottom: 120, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-16">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">Infraestrutura</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1}>
              <h2
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(34px, 4.5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  marginTop: 0,
                }}
              >
                Quatro motores.{" "}
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  Um único sistema.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p
                style={{
                  fontFamily: bodyFont,
                  marginTop: 20,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                }}
              >
                Operando em diferentes camadas da estratégia, nossos motores compartilham
                o mesmo objetivo: fazer do conteúdo um ativo capaz de gerar clientes e
                impulsionar o faturamento do seu negócio.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOTORS.map((m, i) => (
            <Reveal key={m.n} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
              <div
                style={{
                  background: "var(--paper-surface)",
                  padding: "36px",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        color: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MotorIcon kind={m.icon} />
                    </span>
                    <span
                      style={{
                        fontFamily: displayFont,
                        fontSize: 36,
                        color: "var(--gold)",
                        fontStyle: "italic",
                        lineHeight: 1,
                      }}
                    >
                      {m.n}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--mute)",
                      textAlign: "right",
                    }}
                  >
                    {m.sub}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: displayFont,
                    fontSize: 26,
                    fontWeight: 400,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  {m.title}
                </h3>
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                    maxWidth: "40ch",
                  }}
                >
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
