import { Reveal } from "@/components/common/Reveal";

const KPIS = [
  { v: "+42%", italic: false, label: "Faturamento médio em 90 dias", sub: "Coorte 2025 · n=68" },
  { v: "3,8×", italic: true, label: "Leads qualificadas / mês", sub: "Vs. baseline pré-Kairós" },
  { v: "32%", italic: false, label: "Conversão lead → consulta", sub: "Mediana operacional" },
  { v: "11h", italic: true, label: "Recuperadas / semana", sub: "Tempo da doutora em conteúdo" },
];

export function IndicatorsSection() {
  return (
    <section id="indicadores" className="py-[120px] border-t border-kairos-line bg-[var(--paper-warm)]/40">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-14">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">Indicadores médios</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1} as="h2" className="editorial-display text-[clamp(36px,4.6vw,60px)]">
              Não medimos seguidores.{" "}
              <span className="italic-gold">Medimos faturamento.</span>
            </Reveal>
            <Reveal delay={2} as="p" className="mt-5 text-[15px] leading-[1.65] text-kairos-charcoal/80">
              Dados consolidados das doutoras ativas em ciclos 2025. Cada perfil
              recebe relatório mensal próprio — abaixo, a leitura agregada.
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {KPIS.map((k, i) => (
            <Reveal key={k.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="metric-card">
                <span className="mono-label">{k.label}</span>
                <span className={`v ${k.italic ? "italic" : ""}`}>{k.v}</span>
                <div className="dotted-rule text-kairos-line my-1" />
                <span className="mono-label">{k.sub}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
