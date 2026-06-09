"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 180 }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">KAIRÓS · 2026</span>
        </Reveal>

        <Reveal delay={1}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(72px, 12vw, 184px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginTop: 28,
            }}
          >
            O crescimento
            <br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              acontece no
            </span>
            <br />
            momento certo.
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p
            style={{
              marginTop: 36,
              fontSize: 20,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              maxWidth: "56ch",
              fontFamily: "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif",
            }}
          >
            Kairós conecta sua meta financeira à produção de conteúdo, geração
            de demanda e conversão em pacientes — com inteligência proprietária
            calibrada para medicina estética de alto valor.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#convite"
              className="inline-flex items-center gap-2.5 h-12 px-7 rounded-full text-[14px] font-medium transition-all hover:-translate-y-px"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                fontFamily: "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif",
              }}
            >
              Entrar na Kairós
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="#produto"
              className="inline-flex items-center h-12 px-7 rounded-full text-[14px] transition-all hover:border-[var(--ink)]"
              style={{
                border: "1px solid var(--line)",
                color: "var(--ink)",
                fontFamily: "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif",
              }}
            >
              Ver o sistema
            </a>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div
            className="mt-16 flex items-center gap-4"
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            <span
              className="flex-1 h-px"
              style={{ background: "var(--line)" }}
            />
            <span>Entrada por curadoria · 42 vagas</span>
            <span
              className="flex-1 h-px"
              style={{ background: "var(--line)" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
