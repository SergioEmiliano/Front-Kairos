import { Reveal } from "@/components/common/Reveal";

const STEPS = [
  {
    n: "01",
    label: "Curadoria",
    duration: "5 a 7 dias",
    title: "Entrevista e fit clínico.",
    body:
      "Seu perfil é avaliado por nossa equipe — não há compra de acesso. Validamos especialidade, posicionamento e maturidade clínica antes de qualquer proposta.",
  },
  {
    n: "02",
    label: "DNA Estratégico",
    duration: "90 minutos · 6 etapas",
    title: "Mapeamento do seu sistema.",
    body:
      "Definimos juntas tom, autoridade, procedimentos âncora, gatilhos sazonais e métricas-alvo. Esse DNA alimenta cada peça gerada e cada cálculo do motor.",
  },
  {
    n: "03",
    label: "Calibragem",
    duration: "7 dias",
    title: "O sistema é montado.",
    body:
      "Calendário inicial, primeiras 30 peças geradas, painel conectado às suas métricas, integrações de captação e revisão final em vídeo com a curadora dedicada.",
  },
  {
    n: "04",
    label: "Operação contínua",
    duration: "Mensal · indefinido",
    title: "Execução, leitura, calibragem.",
    body:
      "Cada semana traz peças novas, leitura do painel e ajustes ao DNA. A cada 4 semanas, sessão de leitura estratégica — para mover o sistema com você, não em torno de você.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="trajetoria" className="py-[120px] border-t border-kairos-line">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-14">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">Trajetória</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1} as="h2" className="editorial-display text-[clamp(36px,4.6vw,60px)]">
              Da <span className="italic-gold">entrevista</span> à operação,{" "}
              em quatro tempos.
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid-12 py-9 border-t border-kairos-line">
                <div className="col-span-12 md:col-span-2">
                  <span className="step-num text-[44px] block leading-none">{s.n}</span>
                  <span className="mono-label mt-3 block">{s.label}</span>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h3 className="text-[26px] tracking-[-0.025em] font-medium text-kairos-charcoal max-w-[24ch]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-kairos-charcoal/80 max-w-[60ch]">
                    {s.body}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 md:text-right">
                  <span className="mono-label">Duração</span>
                  <div className="mt-2 text-[14px] text-kairos-charcoal/85">{s.duration}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-kairos-line" />
        </div>
      </div>
    </section>
  );
}
