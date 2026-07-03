import { Reveal } from "@/components/common/Reveal";

const MOTORS = [
  {
    n: "01",
    title: "Onboarding detalhado",
    sub: "Calendário · Previsibilidade",
    body:
      "Uma imersão no DNA do seu negócio para transformar sua identidade em uma estratégia de conteúdo clara e consistente.",
  },
  {
    n: "02",
    title: "Curadoria de copy",
    sub: "DNA Estratégico · Tom",
    body:
      "Em vez de roteiros genéricos, a Kairós analisa seus dados e resultados para gerar conteúdos baseados no que já funciona, transformando acertos em um processo replicável e escalável.",
  },
  {
    n: "03",
    title: "Metrificação",
    sub: "Funil · Qualificação",
    body:
      "O Assistente Pessoal Kairós conecta-se à Meta Business Suite para monitorar seus resultados, identificar oportunidades de melhoria e transformar dados em direcionamentos práticos para o crescimento da sua marca.",
  },
  {
    n: "04",
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
      id="manifesto"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
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
                  fontSize: "clamp(44px, 6vw, 80px)",
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
                <div className="flex items-baseline justify-between mb-6">
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
