import { NewsItem } from "@/types";

/**
 * Mock news data — replace with API call to your news aggregation service.
 * Shape is stable; just swap `mockNewsItems` for the API response.
 */
export const mockNewsItems: NewsItem[] = [
  {
    id: "n1",
    title: "ANVISA atualiza normas para preenchimento facial com ácido hialurônico",
    summary:
      "Nova resolução estabelece critérios mais rígidos para indicação e registro de produtos injetáveis para harmonização facial.",
    category: "Regulatório",
    readingTimeMin: 4,
    publishedAt: "2026-05-10",
    isNew: true,
    url: "#",
  },
  {
    id: "n2",
    title: "Estudo: bioestimuladores colágeno tipo I superam expectativas em 12 meses",
    summary:
      "Pesquisa brasileira acompanhou 320 pacientes e demonstrou manutenção de 78% do resultado após um ano de aplicação.",
    category: "Bioestimulador",
    readingTimeMin: 6,
    publishedAt: "2026-05-08",
    isNew: true,
    url: "#",
  },
  {
    id: "n3",
    title: "Instagram lança novo formato de conteúdo médico verificado",
    summary:
      "Plataforma passa a exibir selo de profissional de saúde em conteúdos estéticos, aumentando credibilidade e alcance orgânico.",
    category: "Marketing",
    readingTimeMin: 3,
    publishedAt: "2026-05-07",
    url: "#",
  },
  {
    id: "n4",
    title: "Toxina botulínica: novas indicações aprovadas pelo CFM",
    summary:
      "Conselho Federal de Medicina amplia indicações terapêuticas da toxina, incluindo bruxismo e hiperidrose palmar.",
    category: "Botox",
    readingTimeMin: 5,
    publishedAt: "2026-05-05",
    url: "#",
  },
  {
    id: "n5",
    title: "Como precificar procedimentos estéticos em 2026 — guia atualizado",
    summary:
      "Com a alta do dólar impactando insumos importados, especialistas recomendam revisão de tabela até junho.",
    category: "Negócios",
    readingTimeMin: 7,
    publishedAt: "2026-05-03",
    url: "#",
  },
  {
    id: "n6",
    title: "IA aplicada ao diagnóstico facial: onde estamos e para onde vamos",
    summary:
      "Ferramentas de análise morfológica por inteligência artificial já são adotadas por 23% das clínicas no Brasil.",
    category: "Tecnologia",
    readingTimeMin: 5,
    publishedAt: "2026-05-01",
    url: "#",
  },
];
