import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

export function ConviteSection() {
  return (
    <section
      id="convite"
      style={{
        paddingTop: 180,
        paddingBottom: 180,
        background: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <Reveal>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                ◆ Convite
              </span>
            </Reveal>

            <Reveal delay={1}>
              <h2
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(48px, 7vw, 104px)",
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  color: "var(--paper)",
                  marginTop: 24,
                  maxWidth: "18ch",
                }}
              >
                Kairós abre em{" "}
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  janelas curtas.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "color-mix(in oklch, var(--paper) 70%, transparent)",
                  maxWidth: "52ch",
                  marginTop: 24,
                }}
              >
                Entrada por curadoria. Cada doutora admitida passa por
                calibração individual — por isso não escalamos em volume.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kairos.med"}/cadastro`}
                  className="inline-flex items-center gap-2.5 h-12 px-7 rounded-full text-[14px] font-medium transition-all hover:-translate-y-px"
                  style={{
                    background: "var(--gold)",
                    color: "var(--ink)",
                    fontFamily: bodyFont,
                  }}
                >
                  Assine agora
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#manifesto"
                  className="inline-flex items-center h-12 px-7 rounded-full text-[14px] transition-all"
                  style={{
                    border: "1px solid color-mix(in oklch, var(--paper) 25%, transparent)",
                    color: "color-mix(in oklch, var(--paper) 80%, transparent)",
                    fontFamily: bodyFont,
                  }}
                >
                  Ler o manifesto
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div
              className="rounded-[var(--radius)] p-8"
              style={{
                border: "1px solid color-mix(in oklch, var(--paper) 12%, transparent)",
                background: "color-mix(in oklch, var(--paper) 4%, transparent)",
              }}
            >
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "color-mix(in oklch, var(--paper) 50%, transparent)",
                  marginBottom: 16,
                }}
              >
                42 / 412 vagas restantes · ciclo maio 2026
              </div>

              {/* Progress bar */}
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 2, background: "color-mix(in oklch, var(--paper) 15%, transparent)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: "10%", background: "var(--gold)" }}
                />
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Calibração individual por curadora dedicada",
                  "Sem templates genéricos — DNA único por perfil",
                  "Ciclos fechados garantem atenção completa",
                  "Curadoria gratuita — pagamento após assinatura",
                ].map((item, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span style={{ color: "var(--gold)", fontSize: 10, flexShrink: 0 }}>◆</span>
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "color-mix(in oklch, var(--paper) 75%, transparent)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
