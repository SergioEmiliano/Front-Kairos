import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

const PLANS = [
  {
    id: "estudante",
    label: "Plano Estudante",
    price: "R$ 890",
    desc: "Para doutoras em formação construindo base de pacientes.",
    features: [
      "DNA Estratégico guiado",
      "Até 20 peças de conteúdo/mês",
      "Dashboard simplificado",
      "Ajuste mensal",
    ],
    cta: "Começar Estudante",
    featured: false,
  },
  {
    id: "profissional",
    label: "Plano Profissional",
    badge: "◆ Recomendado",
    price: "R$ 2.480",
    desc: "Para clínicas estabelecidas em busca de escala previsível.",
    features: [
      "DNA Estratégico completo",
      "Conteúdo ilimitado, priorizado por IA",
      "Dashboard + Painel financeiro integrado",
      "Recalibração semanal + consultoria",
      "API proprietária de sinais de demanda",
    ],
    cta: "Começar Pro",
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section
      id="planos"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">Planos · ciclo maio 2026</span>
        </Reveal>

        <Reveal delay={1}>
          <h2
            style={{
              fontFamily: displayFont,
              fontSize: "clamp(44px, 6vw, 80px)",
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginTop: 24,
              maxWidth: "22ch",
            }}
          >
            Um sistema.{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Dois pontos de entrada.
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px]">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={(i % 2) as 0 | 1}>
              <div
                className="rounded-[var(--radius)] p-8 flex flex-col gap-6 h-full"
                style={{
                  border: plan.featured
                    ? "1px solid color-mix(in oklch, var(--gold) 60%, transparent)"
                    : "1px solid var(--line)",
                  background: plan.featured ? "var(--paper-warm)" : "var(--paper-surface)",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--mute)",
                    }}
                  >
                    {plan.label}
                  </span>
                  {plan.badge && (
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: 8,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
                        padding: "2px 7px",
                        borderRadius: 99,
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      style={{
                        fontFamily: displayFont,
                        fontSize: "clamp(48px, 6vw, 72px)",
                        fontWeight: 400,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        color: "var(--ink)",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--mute)",
                        alignSelf: "flex-end",
                        marginBottom: 6,
                        marginLeft: 4,
                      }}
                    >
                      /mês
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--ink-soft)",
                      marginTop: 8,
                    }}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--line)" }} />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-2.5">
                      <span style={{ color: "var(--gold)", fontSize: 10, flexShrink: 0 }}>◆</span>
                      <span
                        style={{
                          fontFamily: bodyFont,
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--ink)",
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kairos.med"}/cadastro`}
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[13px] font-medium transition-all hover:-translate-y-px"
                  style={
                    plan.featured
                      ? {
                          background: "var(--ink)",
                          color: "var(--paper)",
                          fontFamily: bodyFont,
                        }
                      : {
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                          background: "transparent",
                          fontFamily: bodyFont,
                        }
                  }
                >
                  {plan.cta}
                  {plan.featured && <ArrowRight className="h-3.5 w-3.5" />}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
