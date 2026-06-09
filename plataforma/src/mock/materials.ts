import { Material } from "@/types";

/**
 * Mock materials library — replace with API call.
 * Designed to be replaced by a CMS or Supabase storage response.
 */
export const mockMaterials: Material[] = [
  // ─── Featured ───────────────────────────────────────────────────────────────
  {
    id: "m1",
    title: "Guia Definitivo de Harmonização Facial 2026",
    description:
      "Do planejamento ao protocolo pós-procedimento: tudo que você precisa saber para oferecer resultados previsíveis e naturais.",
    category: "harmonizacao",
    type: "ebook",
    tags: ["harmonização", "protocolo", "técnica"],
    coverAccent: "var(--gold)",
    pages: 142,
    progress: 68,
    isNew: false,
    isFeatured: true,
    publishedAt: "2026-04-15",
    author: "Kairós Editorial",
  },
  {
    id: "m2",
    title: "Botox Além do Óbvio — Técnicas Avançadas",
    description:
      "Aplicações terapêuticas, zonas de risco e calibração de dose por biotipo. Atualizado com as últimas diretrizes do CFM.",
    category: "botox",
    type: "ebook",
    tags: ["botox", "avançado", "segurança"],
    coverAccent: "var(--steel)",
    pages: 98,
    progress: 100,
    isFeatured: true,
    publishedAt: "2026-03-20",
    author: "Kairós Editorial",
  },
  {
    id: "m3",
    title: "Instagram para Médicas Estéticas — Sistema de Conteúdo",
    description:
      "Estrutura os 4 pilares de conteúdo, frequência ideal e templates de caption que convertem seguidoras em pacientes.",
    category: "marketing",
    type: "guia",
    tags: ["instagram", "conteúdo", "conversão"],
    coverAccent: "oklch(0.72 0.12 320)",
    pages: 64,
    progress: 30,
    isNew: true,
    isFeatured: true,
    publishedAt: "2026-05-01",
    author: "Kairós Editorial",
  },

  // ─── Recentes ───────────────────────────────────────────────────────────────
  {
    id: "m4",
    title: "Bioestimuladores: Protocolos e Diluições",
    description:
      "Comparativo entre Sculptra, Radiesse e Ellansé com tabelas práticas de reconstituição e intervalos de aplicação.",
    category: "bioestimulador",
    type: "checklist",
    tags: ["bioestimulador", "protocolos", "diluição"],
    coverAccent: "oklch(0.70 0.09 140)",
    pages: 28,
    isNew: true,
    publishedAt: "2026-05-08",
    author: "Kairós Editorial",
  },
  {
    id: "m5",
    title: "Precificação Estratégica para Estética 2026",
    description:
      "Planilha + guia em PDF para calcular custo real de procedimentos, margem e posicionamento de mercado.",
    category: "negocios",
    type: "guia",
    tags: ["finanças", "precificação", "negócios"],
    coverAccent: "oklch(0.65 0.12 30)",
    pages: 48,
    publishedAt: "2026-04-28",
    author: "Kairós Editorial",
  },
  {
    id: "m6",
    title: "Checklist de Consulta — Harmonização Completa",
    description:
      "Fluxo passo a passo desde a anamnese até o registro fotográfico padronizado para construir portfólio de qualidade.",
    category: "protocolo",
    type: "checklist",
    tags: ["checklist", "anamnese", "fotografia"],
    coverAccent: "var(--gold-dark)",
    pages: 12,
    progress: 50,
    publishedAt: "2026-04-10",
    author: "Kairós Editorial",
  },
  {
    id: "m7",
    title: "Scripts de Atendimento para WhatsApp",
    description:
      "Templates de resposta para os 12 cenários mais comuns no atendimento de pacientes — da lead fria ao pós-procedimento.",
    category: "marketing",
    type: "guia",
    tags: ["whatsapp", "atendimento", "scripts"],
    coverAccent: "oklch(0.68 0.10 165)",
    pages: 36,
    publishedAt: "2026-03-15",
    author: "Kairós Editorial",
  },
  {
    id: "m8",
    title: "Anatomia Facial para Injetáveis",
    description:
      "Atlas visual com os principais pontos de injeção, vasos de risco e variações anatômicas relevantes para harmonização.",
    category: "harmonizacao",
    type: "ebook",
    tags: ["anatomia", "segurança", "injetáveis"],
    coverAccent: "oklch(0.55 0.08 250)",
    pages: 118,
    progress: 15,
    publishedAt: "2026-02-20",
    author: "Kairós Editorial",
  },
];

export const materialCategoryLabels: Record<string, string> = {
  harmonizacao: "Harmonização",
  botox: "Botox",
  bioestimulador: "Bioestimulador",
  negocios: "Negócios",
  marketing: "Marketing",
  protocolo: "Protocolo",
};

export const materialTypeLabels: Record<string, string> = {
  ebook: "E-book",
  guia: "Guia",
  checklist: "Checklist",
  video: "Vídeo",
};
