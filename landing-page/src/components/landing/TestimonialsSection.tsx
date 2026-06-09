"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

const TESTIMONIALS = [
  {
    n: "01",
    quote:
      "Parei de postar no escuro. A Kairós me devolveu a clareza do que cada publicação tem que gerar — e em que semana.",
    name: "Dra. Marina Vasconcelos",
    role: "Harmonização facial · São Paulo",
  },
  {
    n: "02",
    quote:
      "Em quatro meses, minha agenda saiu de irregular para previsível. Não é marketing: é arquitetura.",
    name: "Dra. Helena Ribeiro",
    role: "Medicina estética avançada · Curitiba",
  },
  {
    n: "03",
    quote:
      "É a primeira ferramenta que entende que meu ticket médio não cabe em template genérico. Ela fala a minha língua.",
    name: "Dra. Beatriz Almeida",
    role: "Dermatologia clínica · Belo Horizonte",
  },
  {
    n: "04",
    quote:
      "O sistema recalcula enquanto eu atendo. Chego no fim da semana e o plano já se ajustou sozinho. É silencioso e correto.",
    name: "Dra. Camila Nobre",
    role: "Harmonização premium · Rio de Janeiro",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="depoimentos"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="flex items-start justify-between flex-wrap gap-8 mb-16">
          <div>
            <Reveal>
              <span className="kicker">Doutoras na Kairós</span>
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
                  marginTop: 20,
                  maxWidth: "22ch",
                }}
              >
                A palavra de quem opera dentro do{" "}
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  sistema.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2 mt-auto">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ border: "1px solid var(--line)" }}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" style={{ color: "var(--ink)" }} />
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ border: "1px solid var(--line)" }}
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" style={{ color: "var(--ink)" }} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div
                className="rounded-[var(--radius)] p-8 md:p-10 flex flex-col gap-6 cursor-pointer transition-all"
                style={{
                  border: active === i
                    ? "1px solid color-mix(in oklch, var(--gold) 50%, transparent)"
                    : "1px solid var(--line)",
                  background: active === i ? "var(--paper-warm)" : "var(--paper-surface)",
                }}
                onClick={() => setActive(i)}
              >
                {/* Opening quote */}
                <span
                  style={{
                    fontFamily: displayFont,
                    fontSize: 64,
                    lineHeight: 0.7,
                    color: "var(--gold)",
                    fontStyle: "italic",
                    display: "block",
                  }}
                >
                  &ldquo;
                </span>

                <p
                  style={{
                    fontFamily: displayFont,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    maxWidth: "40ch",
                  }}
                >
                  {t.quote}
                </p>

                <div
                  style={{
                    paddingTop: 20,
                    borderTop: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: bodyFont,
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ink)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: monoFont,
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--mute)",
                        marginTop: 4,
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: displayFont,
                      fontSize: 36,
                      color: active === i ? "var(--gold)" : "color-mix(in oklch, var(--mute) 50%, transparent)",
                      lineHeight: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {t.n}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
