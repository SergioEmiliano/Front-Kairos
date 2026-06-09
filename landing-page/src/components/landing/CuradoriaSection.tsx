import { Reveal } from "@/components/common/Reveal";

const CRITERIA = [
  {
    title: "Especialidade clínica consolidada",
    body:
      "Médica com formação em medicina estética e prática mínima de 18 meses em consultório próprio ou compartilhado.",
  },
  {
    title: "Posicionamento já decidido",
    body:
      "Não precisa estar polido — precisa estar claro. Sabemos para quem você quer falar e qual o procedimento âncora.",
  },
  {
    title: "Operação ativa, não em pausa",
    body:
      "A Kairós calibra um motor em movimento. Doutoras em sabático, mudança de cidade ou pausa clínica não compõem o ciclo.",
  },
  {
    title: "Disposição para revisão semanal",
    body:
      "30 minutos por semana com a curadora dedicada, fora ciclos de leitura mensal. Sem isso, o sistema descalibra.",
  },
];

export function CuradoriaSection() {
  return (
    <section id="curadoria" className="py-[120px] border-t border-kairos-line">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-14">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">Curadoria</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1} as="h2" className="editorial-display text-[clamp(36px,4.6vw,60px)]">
              Quem entra na <span className="italic-gold">Kairós</span>.
            </Reveal>
            <Reveal delay={2} as="p" className="mt-5 text-[15px] leading-[1.65] text-kairos-charcoal/80">
              A entrada não é por compra — é por fit. Quatro critérios definem
              se uma doutora é integrada ao ciclo. Quando não há fit, devolvemos
              direção, não silêncio.
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CRITERIA.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-7">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="italic-gold text-[15px]">◆</span>
                  <h3 className="text-[18px] tracking-[-0.015em] font-medium text-kairos-charcoal">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[14.5px] leading-[1.65] text-kairos-charcoal/80 pl-6">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
