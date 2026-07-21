// Fonte única dos planos Kairós. Preços conforme o plano de negócio.
// Consumida por /planos e /checkout — não duplicar valores em outro lugar.

export type BillingCycle = "mensal" | "anual";

export type PlanId = "estudante" | "pro" | "proPlus";

export interface Plan {
  id: PlanId;
  name: string;
  priceMensal: number;
  priceAnual: number; // preço por mês no plano anual (cobrado de uma vez)
  label: string;
  features: string[];
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "estudante",
    name: "Estudante",
    priceMensal: 117,
    priceAnual: 99,
    label: "Para doutoras em formação construindo base de pacientes",
    features: [
      "Check-in de rotina e metas",
      "Calendário de conteúdo editorial",
      "Analytics básico de alcance",
      "Biblioteca de materiais",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMensal: 287,
    priceAnual: 269,
    label: "Para clínicas estabelecidas em busca de escala previsível",
    features: [
      "Tudo do Estudante",
      "Geração de conteúdo por IA",
      "Analytics completo (benchmarks e funil)",
      "Integrações: Instagram, WhatsApp, Calendar",
      "IA analista de performance",
    ],
    highlight: true,
  },
  {
    id: "proPlus",
    name: "Pro+",
    priceMensal: 647,
    priceAnual: 597,
    label: "Para operações de maior porte / multi-perfil",
    features: [
      "Tudo do Pro",
      "Múltiplos perfis / unidades",
      "Cota ampliada de geração por IA",
      "Suporte e consultoria estratégica prioritária",
    ],
  },
];

export function priceForCycle(plan: Plan, cycle: BillingCycle): number {
  return cycle === "anual" ? plan.priceAnual : plan.priceMensal;
}

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
