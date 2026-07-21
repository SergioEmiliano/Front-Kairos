"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { HourglassMark } from "@/components/common/HourglassMark";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://kairos.app";

export function HeroSection() {
  const markRef = useRef<HTMLDivElement>(null);

  // Transição para o login: a ampulheta da hero encolhe e vai ao centro da
  // tela enquanto o fundo escurece (na cor do login); só então navega. A tela
  // de login já inicia com a marca no centro, dando continuidade ao movimento.
  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.href;
    const svg = markRef.current?.querySelector("svg");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!svg || reduce) return; // deixa o link navegar normalmente

    e.preventDefault();
    const rect = svg.getBoundingClientRect();

    // Fundo que sobe cobrindo a página, na cor do login (espresso escuro).
    const backdrop = document.createElement("div");
    Object.assign(backdrop.style, {
      position: "fixed", inset: "0", background: "oklch(0.22 0.015 50)",
      opacity: "0", zIndex: "9998", pointerEvents: "none",
    } as CSSStyleDeclaration);
    document.body.appendChild(backdrop);

    // Clone da ampulheta que voa para o centro. Cor clara para ler no fundo
    // escuro; sem a classe de animação (fica como contorno estático).
    const clone = svg.cloneNode(true) as SVGElement;
    clone.classList.remove("hourglass-draw");
    Object.assign(clone.style, {
      position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
      width: `${rect.width}px`, height: `${rect.height}px`, margin: "0",
      color: "oklch(0.95 0.006 82)", zIndex: "9999", pointerEvents: "none",
      transformOrigin: "center",
      filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.35))",
    } as CSSStyleDeclaration);
    document.body.appendChild(clone);
    svg.style.visibility = "hidden";

    const target = 96; // ≈ tamanho da marca no intro do login
    const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
    const scale = target / rect.width;

    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 650, easing: "ease", fill: "forwards",
    });
    const anim = clone.animate(
      [
        { transform: "translate(0px,0px) scale(1)" },
        { transform: `translate(${dx}px,${dy}px) scale(${scale})` },
      ],
      { duration: 800, easing: "cubic-bezier(0.6,0,0.2,1)", fill: "forwards" }
    );
    anim.onfinish = () => { window.location.href = href; };
  }

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="max-w-[1240px] mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center"
        style={{ paddingTop: 64, paddingBottom: 64 }}
      >
        <div>
        <Reveal>
          <span className="kicker">KAIRÓS · 2026</span>
        </Reveal>

        <Reveal delay={1}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginTop: 20,
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
              marginTop: 24,
              fontSize: 17,
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
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`${APP_URL}/login`}
              onClick={handleEnter}
              className="inline-flex items-center gap-2.5 h-11 px-6 rounded-full text-[13.5px] font-medium transition-all hover:-translate-y-px"
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
              href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://kairos.app"}/planos`}
              className="inline-flex items-center h-11 px-6 rounded-full text-[13.5px] transition-all hover:border-[var(--ink)]"
              style={{
                border: "1px solid var(--line)",
                color: "var(--ink)",
                fontFamily: "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif",
              }}
            >
              Conhecer planos
            </a>
          </div>
        </Reveal>
        </div>

        {/* Coluna direita: símbolo da ampulheta com traçado ao inicializar. */}
        <div ref={markRef} className="hidden lg:flex items-center justify-center">
          <HourglassMark animate className="w-full" style={{ maxWidth: 300 }} />
        </div>

      </div>

      {/* Transição para a próxima seção: indicador de continuidade centralizado
          no rodapé da hero. Uma linha vertical com um brilho dourado que desce
          continuamente, sinalizando que há mais conteúdo abaixo. */}
      <a
        href="#problema"
        aria-label="Rolar para ver mais"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="scroll-flow" style={{ display: "block", width: 2, height: 56 }} />
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="scroll-cue" aria-hidden="true">
          <path d="M2 2l6 6 6-6" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
