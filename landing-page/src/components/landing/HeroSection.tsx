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
              fontSize: "clamp(60px, 9vw, 148px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginTop: 28,
            }}
          >
            Menos improviso.
            <br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Mais estratégia.
            </span>
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
            A Kairós conecta a produção de conteúdo à geração de demanda de
            pacientes por meio de uma inteligência estrategicamente calibrada
            para a realidade do seu negócio de beleza.
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

      </div>
    </section>
  );
}
