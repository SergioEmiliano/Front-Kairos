"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "Vocês são uma agência de marketing?",
    a: "Não. A Kairós é um sistema operacional clínico — combinamos um motor matemático de calendário, curadoria de copy calibrada ao DNA da doutora, e leitura semanal de leads e receita. A operação substitui a função de uma agência, mas o produto é infraestrutura, não serviço criativo.",
  },
  {
    q: "Como funciona o ciclo? Posso entrar a qualquer momento?",
    a: "Operamos em ciclos fechados — o próximo é maio de 2026, com 42 vagas. A curadoria abre 30 dias antes do início e fecha quando todas as vagas são preenchidas. Doutoras que não entram em um ciclo são automaticamente avaliadas para o seguinte, com prioridade.",
  },
  {
    q: "Quem produz o conteúdo é a Kairós ou eu?",
    a: "A Kairós produz, calibra e agenda. A doutora valida e grava — quando o conteúdo exige presença em vídeo. Toda a estrutura (texto, roteiro, sazonalidade, encaixe no calendário) é responsabilidade do sistema. A pessoa não administra agenda de redes.",
  },
  {
    q: "Quanto tempo até ver resultado em faturamento?",
    a: "A leitura agregada das coortes 2025 mostra inflexão entre o 60º e o 90º dia, com estabilização do funil em torno do 120º. Não prometemos resultado em 30 dias — o sistema é projetado para previsibilidade, não para picos isolados.",
  },
  {
    q: "Existe contrato mínimo?",
    a: "Sim, 90 dias. A janela é necessária para calibrar o motor matemático com dados reais da doutora — antes disso, é projeção. Após os 90 dias, a relação é mensal e cancelável a qualquer momento, sem multa.",
  },
  {
    q: "Quais especialidades vocês atendem?",
    a: "Atualmente, medicina estética com foco em harmonização, dermatologia clínica integrada e ginecologia íntima. Não atendemos cirurgia plástica nem clínicas multi-especialidade — o motor é calibrado para perfis com procedimento âncora bem definido.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-[120px] border-t border-kairos-line">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 mb-12">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="kicker">Dúvidas</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 max-w-[640px]">
            <Reveal delay={1} as="h2" className="editorial-display text-[clamp(36px,4.6vw,60px)]">
              <span className="italic-gold">Antes</span> da entrevista de curadoria.
            </Reveal>
          </div>
        </div>

        <div className="grid-12">
          <div className="col-span-12 md:col-start-5 md:col-span-8">
            <ul className="border-t border-kairos-line">
              {FAQ.map((item, i) => (
                <li key={i} className="border-b border-kairos-line">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-baseline justify-between gap-6 py-6 text-left transition-colors hover:bg-[var(--paper-warm)]/30"
                    aria-expanded={open === i}
                  >
                    <span className="text-[18px] tracking-[-0.015em] font-medium text-kairos-charcoal pr-6">
                      <span className="step-num text-[14px] mr-3 inline-block">
                        0{i + 1}
                      </span>
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full border border-kairos-line flex items-center justify-center transition-colors",
                        open === i && "border-kairos-charcoal bg-[var(--paper-warm)]"
                      )}
                    >
                      {open === i ? (
                        <Minus className="h-3.5 w-3.5 text-kairos-charcoal" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-kairos-charcoal" />
                      )}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height,opacity] duration-500"
                    style={{
                      maxHeight: open === i ? 320 : 0,
                      opacity: open === i ? 1 : 0,
                    }}
                  >
                    <p className="pb-7 pr-12 text-[14.5px] leading-[1.7] text-kairos-charcoal/80 max-w-[68ch]">
                      {item.a}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
