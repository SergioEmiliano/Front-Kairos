import { ContentEntry, TaskItem, IdeaItem } from "@/shared/types";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");

function d(day: number) {
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

export const mockContentEntries: ContentEntry[] = [
  {
    id: "c1",
    date: d(3),
    format: "reel",
    idea: "Antes e depois do preenchimento labial natural",
    script:
      "Hook (00:00): \"Você sabe qual é a diferença entre um preenchimento labial natural e um artificial?\"\n\nCorpo (00:06): Mostrar a diferença entre técnicas de diluição. Enfatizar que o segredo está na calibração individualizada — não na quantidade.\n\nResultado (00:28): Exibir transformação sutil, valorizando a essência da paciente.\n\nFechamento (00:42): \"Técnica não se repete. Se calibra.\"",
    caption:
      "Resultados que falam por si ✨\n\nO preenchimento labial bem calibrado não muda quem você é — realça o que já é naturalmente lindo.\n\nCada paciente tem seu mapa. Agende sua avaliação pelo link na bio.",
    hashtags: ["#harmonizacao", "#preenchimento", "#natural", "#medicinaestetica", "#dramarinavasconcellos"],
    status: "publicado",
    color: "#B5883A",
    platform: "instagram",
    suggestedTime: "10:00",
    objective: "Prova social + autoridade técnica",
    cta: "Agende sua avaliação pelo link na bio →",
  },
  {
    id: "c2",
    date: d(5),
    format: "post",
    idea: "3 mitos sobre o botox que você precisa parar de acreditar",
    script:
      "Slide 1 — Título: \"3 mitos sobre botox que toda paciente já ouviu\"\n\nSlide 2 — Mito 1: \"Botox deixa a face sem expressão\"\nVerdade: Quando aplicado corretamente, o botox é dosado para relaxar apenas os músculos-alvo, preservando expressividade natural.\n\nSlide 3 — Mito 2: \"Botox vicia\"\nVerdade: Não existe dependência física. O músculo simplesmente retorna ao estado anterior após 4-6 meses.\n\nSlide 4 — Mito 3: \"Só é para quem tem muita ruga\"\nVerdade: O uso preventivo, a partir dos 25-30 anos, é cada vez mais recomendado para retardar o envelhecimento.",
    caption:
      "Antes de agendar, entenda o que é mito e o que é verdade sobre a toxina botulínica 🧬\n\nA desinformação é o maior obstáculo entre você e o resultado que sempre quis. Salve esse post e compartilhe com quem precisa.",
    hashtags: ["#botox", "#toxinabotulínica", "#harmonizacaofacial", "#medicinaestetica", "#mitos"],
    status: "publicado",
    color: "#8A6420",
    platform: "instagram",
    suggestedTime: "12:00",
    objective: "Educação + autoridade clínica",
    cta: "Salve e compartilhe com uma amiga →",
  },
  {
    id: "c3",
    date: d(8),
    format: "carrossel",
    idea: "Guia completo: como se preparar para sua primeira consulta",
    script:
      "Slide 1 — Capa: \"Sua primeira consulta de harmonização — guia completo\"\n\nSlide 2 — Antes de ir: Evite álcool 48h antes · Não tome AAS ou anticoagulantes · Fotografe o rosto sem maquiagem\n\nSlide 3 — Na consulta: Anamnese detalhada · Análise morfológica · Planejamento personalizado\n\nSlide 4 — O que esperar: Resultados graduais · Possível edema nos primeiros dias · Retorno em 14 dias\n\nSlide 5 — CTA: \"Pronta para dar o próximo passo?\"",
    caption:
      "A primeira consulta é o passo mais importante da sua jornada estética 🌟\n\nEsse guia foi preparado para que você chegue tranquila, informada e pronta para o melhor resultado possível.",
    hashtags: ["#primeiaconsulta", "#harmonizacao", "#medicinaestetica", "#guia", "#esteticafacial"],
    status: "publicado",
    color: "#D4A85A",
    platform: "instagram",
    suggestedTime: "09:00",
    objective: "Educação + captação de pacientes inexperientes",
    cta: "Agende sua primeira consulta pelo link na bio →",
  },
  {
    id: "c4",
    date: d(10),
    format: "story",
    idea: "Bastidores da clínica — um dia de atendimento",
    script:
      "Frame 1 (08:00): Chegada à clínica, café e rotina de abertura — humanização\nFrame 2 (09:30): Consultório organizado, instrumentos dispostos — profissionalismo\nFrame 3 (11:00): Atendimento em andamento (sem identificar paciente) — processo\nFrame 4 (14:00): Resultado do procedimento da manhã (com autorização) — prova social\nFrame 5 (17:30): Encerramento — \"Mais um dia de transformações calibradas.\"",
    caption: "Bastidores do consultório 🏥",
    hashtags: ["#bastidores", "#clinicaestetica", "#dramarinavasconcellos"],
    status: "publicado",
    color: "#B5883A",
    platform: "instagram",
    suggestedTime: "18:00",
    objective: "Humanização + conexão com a audiência",
    cta: "Responda: qual procedimento você teria curiosidade de ver?",
  },
  {
    id: "c5",
    date: d(12),
    format: "reel",
    idea: "Técnica de bioestimulação — como funciona?",
    script:
      "Hook (00:00): \"Por que bioestimulador é diferente de tudo que você já viu em estética?\"\n\nCorpo (00:05): Explicação visual da ação do colágeno tipo I. Como o produto estimula o próprio organismo a produzir sustentação.\n\nComparação (00:22): Diferença entre preenchimento imediato vs. bioestimulação progressiva — qual é melhor para você?\n\nFechamento (00:42): \"Colágeno que você mesmo produz. Resultado que dura.\"",
    caption:
      "O bioestimulador não preenche — ele faz você mesma produzir o que precisa ✨\n\nResultado mais natural, progressivo e duradouro. Agende sua avaliação.",
    hashtags: ["#bioestimulador", "#colageno", "#harmonizacao", "#sculptra", "#radiesse"],
    status: "publicado",
    color: "#8A6420",
    platform: "instagram",
    suggestedTime: "10:00",
    objective: "Educação sobre bioestimulador + diferenciação técnica",
    cta: "Agende sua avaliação →",
  },
  {
    id: "c6",
    date: d(15),
    format: "post",
    idea: "O que é harmonização facial e para quem é indicada",
    script:
      "Post estático com design editorial.\n\nTexto principal: \"Harmonização facial não é sobre mudar — é sobre equilibrar.\"\n\nSubtexto: Harmonização trabalha proporções naturais do rosto para criar equilíbrio e sofisticação. Não é uma única técnica, mas um conjunto personalizado de procedimentos.",
    caption:
      "Harmonização facial não é uma tendência. É ciência aplicada à beleza individual 🔬\n\nCada rosto tem proporções únicas — a harmonização respeita e realça o que já existe. Sem exageros. Sem padrões.\n\nQual dúvida você tem sobre harmonização? Comenta aqui 👇",
    hashtags: ["#harmonizacaofacial", "#esteticafacial", "#medicinaestetica", "#belezanatural"],
    status: "publicado",
    color: "#D4A85A",
    platform: "instagram",
    suggestedTime: "12:00",
    objective: "Educação + posicionamento como referência",
    cta: "Comenta sua dúvida aqui 👇",
  },
  {
    id: "c7",
    date: d(17),
    format: "carrossel",
    idea: "Resultados do mês — pacientes satisfeitas",
    script:
      "Slide 1 — Capa: \"Abril em números — resultados reais\"\nSlide 2 — Antes/depois paciente 1 (harmonização completa)\nSlide 3 — Depoimento paciente 1\nSlide 4 — Antes/depois paciente 2 (bioestimulador)\nSlide 5 — Depoimento paciente 2\nSlide 6 — CTA: \"Quer ser o próximo case?\"",
    caption:
      "Cada transformação aqui é um planejamento único 💛\n\nResultados reais, técnica calibrada, satisfação genuína. Agende sua avaliação e descubra o que é possível para o SEU rosto.",
    hashtags: ["#antesedepois", "#resultados", "#harmonizacao", "#prova social"],
    status: "planejado",
    color: "#B5883A",
    platform: "instagram",
    suggestedTime: "14:00",
    objective: "Prova social + conversão",
    cta: "Agende sua avaliação pelo link na bio →",
  },
  {
    id: "c8",
    date: d(19),
    format: "reel",
    idea: "Dúvidas frequentes sobre preenchimento de olheiras",
    script:
      "Hook (00:00): \"A dúvida que mais recebo no direct — vou responder de uma vez por todas.\"\n\nPergunta 1 (00:06): Dói? — Resposta: protocolo de anestesia + técnica atraumática\nPergunta 2 (00:14): Fica inchado? — Resposta: edema normal nos primeiros 3-5 dias\nPergunta 3 (00:22): Quanto dura? — Resposta: 12-18 meses dependendo do metabolismo\nPergunta 4 (00:30): Para quem é indicado? — Resposta: olheiras de volume (não pigmentadas)\n\nFechamento (00:40): \"Se a sua é de volume, posso te ajudar.\"",
    caption:
      "Olheiras de volume? Esse reel é pra você 👇\n\nRespondi as 4 perguntas que mais chegam no meu direct sobre preenchimento de olheiras. Salve para não esquecer.",
    hashtags: ["#olheiras", "#preenchimento", "#harmonizacao", "#duvidasfrequentes"],
    status: "planejado",
    color: "#D4A85A",
    platform: "instagram",
    suggestedTime: "19:00",
    objective: "Educação + captação de paciente qualificada",
    cta: "Salve esse reel →",
  },
  {
    id: "c9",
    date: d(22),
    format: "post",
    idea: "Cuidados pós-procedimento: o que fazer e o que evitar",
    script:
      "Post estático ou minimalista com lista.\n\n✅ O QUE FAZER:\n· Aplicar gelo nas primeiras 24h\n· Dormir com cabeceira elevada\n· Hidratação reforçada\n· Protetor solar diariamente\n\n❌ O QUE EVITAR:\n· Exercícios intensos por 48h\n· Calor excessivo (sauna, sol)\n· Álcool nas primeiras 24h\n· Manipular a área tratada",
    caption:
      "O resultado começa na sala de tratamento — mas se consolida no pós-procedimento 🌿\n\nGuarde esse checklist e siga à risca para potencializar seu resultado.",
    hashtags: ["#posprocedimento", "#cuidados", "#harmonizacao", "#dicas"],
    status: "rascunho",
    color: "#8A6420",
    platform: "instagram",
    suggestedTime: "10:00",
    objective: "Educação + fidelização de pacientes",
    cta: "Salve e compartilhe com sua médica →",
  },
  {
    id: "c10",
    date: d(24),
    format: "story",
    idea: "Enquete: qual procedimento você tem mais interesse?",
    script:
      "Frame 1: Fundo elegante da clínica + texto \"Deixa eu te conhecer melhor 👇\"\nFrame 2: Enquete — \"Qual procedimento você tem mais curiosidade?\"\nOpção A: Harmonização completa\nOpção B: Botox / Toxina\nOpção C: Bioestimulador\nOpção D: Preenchimento labial\nFrame 3 (no dia seguinte): Resultado + CTA para agendar",
    caption: "Enquete interativa 📊",
    hashtags: ["#enquete", "#harmonizacao", "#botox"],
    status: "rascunho",
    color: "#B5883A",
    platform: "instagram",
    suggestedTime: "17:00",
    objective: "Engajamento + inteligência de demanda",
    cta: "Agende pelo link na bio após votar →",
  },
];

export const mockTasks: TaskItem[] = [
  {
    id: "t1",
    title: "Publicar reel de antes e depois",
    description: "Finalizar edição e publicar no Instagram",
    priority: "alta",
    status: "pendente",
    dueDate: d(today.getDate()),
  },
  {
    id: "t2",
    title: "Responder DMs do post de ontem",
    priority: "alta",
    status: "em_progresso",
    dueDate: d(today.getDate()),
  },
  {
    id: "t3",
    title: "Criar carrossel de dúvidas frequentes",
    priority: "media",
    status: "pendente",
    dueDate: d(today.getDate() + 2),
  },
  {
    id: "t4",
    title: "Agendar fotos de paciente satisfeita",
    priority: "media",
    status: "pendente",
    dueDate: d(today.getDate() + 3),
  },
  {
    id: "t5",
    title: "Revisar legenda do próximo post",
    priority: "baixa",
    status: "pendente",
    dueDate: d(today.getDate() + 4),
  },
];

export const mockIdeas: IdeaItem[] = [
  {
    id: "i1",
    title: "Série: Mitos e verdades da harmonização",
    description: "Carrossel desmistificando os principais medos das pacientes",
    format: "carrossel",
    tags: ["educativo", "harmonizacao", "série"],
  },
  {
    id: "i2",
    title: "Reel do processo de atendimento completo",
    description: "Mostrar desde a chegada até o resultado final de forma elegante",
    format: "reel",
    tags: ["bastidores", "processo", "confiança"],
  },
  {
    id: "i3",
    title: "Depoimento em vídeo: paciente VIP",
    description: "Reel curto com depoimento autêntico de paciente fidelizada",
    format: "reel",
    tags: ["prova-social", "depoimento"],
  },
  {
    id: "i4",
    title: "Post: Por que resultados naturais são mais duradouros?",
    description: "Conteúdo educativo sobre a filosofia da clínica",
    format: "post",
    tags: ["educativo", "posicionamento"],
  },
];
