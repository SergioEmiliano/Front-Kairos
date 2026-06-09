import { Reveal } from "@/components/common/Reveal";

const MOTORS = [
  {
    n: "01",
    title: "Motor matemático",
    sub: "Calendário · Previsibilidade",
    body:
      "Calibragem semanal de calendário com base no seu DNA estratégico, sazonalidade e histórico de leads. Cada peça é encaixada onde tem maior probabilidade de converter.",
  },
  {
    n: "02",
    title: "Curadoria de copy",
    sub: "DNA Estratégico · Tom",
    body:
      "Em vez de templates genéricos, sua linha editorial é mapeada em 6 etapas. O sistema gera conteúdo que soa como você — em formalidade, técnica e cadência.",
  },
  {
    n: "03",
    title: "Calibragem de leads",
    sub: "Funil · Qualificação",
    body:
      "Revisão semanal das leads recebidas, classificação por intenção e procedimento, e devolutiva dos pontos de fricção do funil — antes que virem perda de receita.",
  },
  {
    n: "04",
    title: "Painel de receita",
    sub: "Faturamento · Conversão",
    body:
      "Não medimos seguidores. Medimos faturamento mensal, conversão por procedimento, custo por lead qualificada e tempo recuperado em sua agenda clínica.",
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
                Cada motor opera em uma frequência diferente — diária, semanal, mensal —
                mas todos calibram o mesmo objetivo: receita previsível na sua clínica.
              </p>
            </Reveal>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)]"
          style={{ background: "var(--line)", border: "1px solid var(--line)" }}
        >
          {MOTORS.map((m, i) => (
            <Reveal key={m.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div style={{ background: "var(--paper-surface)", padding: "36px" }}>
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
