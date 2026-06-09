import { Reveal } from "@/components/common/Reveal";

export function ManifestoSection() {
  return (
    <section id="manifesto" className="py-[120px] border-t border-kairos-line">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 grid-12">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <span className="kicker">Manifesto</span>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-9 max-w-[760px]">
          <Reveal delay={1} as="p" className="pull-quote text-[clamp(28px,3.4vw,40px)] mb-10">
            Kairós é o tempo do instante certo. Não o tempo do calendário —
            o tempo da <span className="italic-gold">decisão clínica</span>.
          </Reveal>

          <Reveal delay={2} as="p" className="text-[16px] leading-[1.7] text-kairos-charcoal/85 mb-6">
            Você não precisa de mais uma agência. Não precisa de mais um curso.
            Precisa de um sistema que organize a sua presença, gere o conteúdo
            certo na semana certa, calibre o discurso ao seu DNA estratégico —
            e mostre, número a número, onde está o seu próximo faturamento.
          </Reveal>

          <Reveal delay={3} as="p" className="text-[16px] leading-[1.7] text-kairos-charcoal/85 mb-6">
            A Kairós não vende exposição. Vende previsibilidade. Cada doutora
            que entra passa por curadoria — não por acaso, e não por volume.
            Operamos em ciclos fechados, com vagas limitadas, para garantir
            que cada perfil receba calibragem dedicada.
          </Reveal>

          <Reveal delay={4} as="p" className="text-[16px] leading-[1.7] text-kairos-charcoal/85">
            Um sistema. Não uma agência.
            <br />
            <span className="italic-gold">Crescimento previsível.</span> Não promessa de viralidade.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
