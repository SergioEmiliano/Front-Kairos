import { AnalyticsSummary, GeneratedContent, ContentFormat } from "@/shared/types";

export const mockAnalytics: AnalyticsSummary = {
  monthlyRevenueGoal: 30000,
  monthlyRevenueCurrent: 22500,
  totalDms: 64,
  totalAppointments: 23,
  totalProcedures: 15,
  revenuePercent: 75,
  weekly: [
    { week: "S1", dms: 18, appointments: 6, sales: 4, reach: 3200, engagement: 0 },
    { week: "S2", dms: 15, appointments: 5, sales: 3, reach: 2800, engagement: 0 },
    { week: "S3", dms: 21, appointments: 8, sales: 5, reach: 4100, engagement: 0 },
    { week: "S4", dms: 10, appointments: 4, sales: 3, reach: 1900, engagement: 0 },
  ],
  // Mock com dados de Instagram conectado
  igConnected: true,
  instagramUsername: "@dra.mock",
  totalReach: 32400,
  followersCount: 12850,
  profileViews: 1749,
  totalInteractions: 18200,
  accountsEngaged: 9400,
  likes: 12623,
  comments: 394,
  shares: 5176,
  saves: 7043,
  websiteClicks: 226,
  mediaInsights: [],
};

export const mockGeneratedContent: Record<ContentFormat, GeneratedContent> = {
  reel: {
    script: `🎬 ROTEIRO — REEL (30s)

CENA 1 (0-5s): Close no rosto — iluminação suave, tom pérola
Texto na tela: "Você sabia que..."

CENA 2 (5-15s): Transição elegante mostrando o procedimento
Voz: "O preenchimento natural realça sua beleza sem mudar quem você é"

CENA 3 (15-25s): Resultado — sorriso natural, olhar confiante
Texto: "Resultados que respeitam a sua essência"

CENA 4 (25-30s): Logo da clínica + CTA
Texto: "Agende sua consulta — link na bio"`,
    caption: `✨ Beleza autêntica começa com técnica e sensibilidade.

Cada procedimento é pensado para realçar o que já é lindo em você — sem exageros, sem máscaras.

É exatamente isso que ofereço nas minhas consultas: um olhar cuidadoso para o que é único em cada paciente.

👇 Pronta para descobrir o melhor de você?
Link na bio para agendar sua avaliação.`,
    hashtags: ["#harmonizacaofacial", "#preenchimento", "#belezanatural", "#autoestima", "#medicinaestética", "#reel"],
    callToAction: "Agende sua avaliação gratuita — link na bio",
  },
  post: {
    script: `📸 DIREÇÃO DE ARTE — POST ESTÁTICO

Layout: fundo creme/pérola
Tipografia: Playfair Display (título) + Inter (corpo)
Paleta: dourado + branco + bege

TEXTO PRINCIPAL:
"3 sinais de que você está pronta para a harmonização"

Subtítulos:
1. Você busca resultados naturais, não transformações drásticas
2. Quer realçar sua beleza sem perder sua identidade
3. Está pronta para um cuidado personalizado e elegante

Rodapé: @dra.anasilva | agende sua consulta`,
    caption: `Harmonização facial não é sobre mudar quem você é. É sobre revelar a melhor versão de você mesma. 🌿

Quando feita com técnica e sensibilidade, ela realça o que já é belo — de forma sutil, elegante e duradoura.

Se você se identifica com esses 3 pontos, está no lugar certo.

📩 Mande uma mensagem e vamos conversar sobre o que é possível para você.`,
    hashtags: ["#harmonizacaofacial", "#belezanatural", "#autoestima", "#medicinaestética", "#skincare", "#post"],
    callToAction: "Mande uma DM para saber mais",
  },
  story: {
    script: `📱 STORY — SEQUÊNCIA (3 slides)

Slide 1 — Pergunta/Gancho:
Fundo gradiente dourado/creme
"Você já se perguntou se a harmonização é para você?"
[Enquete: SIM / AINDA NÃO SEI]

Slide 2 — Educação:
"A harmonização ideal respeita 3 princípios:"
• Naturalidade
• Equilíbrio
• Você
[Swipe up ↑]

Slide 3 — CTA:
"Vamos descobrir juntas o que é possível para o seu rosto?"
Botão: [AGENDAR AVALIAÇÃO]`,
    caption: `Story educativo + CTA direto para agendamento.
Use a enquete para engajar e identificar leads quentes.`,
    hashtags: ["#story", "#harmonizacao", "#dicas"],
    callToAction: "Responda à enquete e identifique leads quentes",
  },
  carrossel: {
    script: `🎠 CARROSSEL — 6 SLIDES

Slide 1 (Capa):
"5 mitos sobre o Botox que você precisa parar de acreditar"
Visual: tipografia elegante em fundo pérola

Slide 2: Mito 1
"Botox deixa o rosto congelado"
Realidade: Com técnica adequada, o resultado é totalmente natural

Slide 3: Mito 2
"É só para quem já tem rugas profundas"
Realidade: O uso preventivo é cada vez mais indicado

Slide 4: Mito 3
"Dói muito"
Realidade: O desconforto é mínimo com o protocolo correto

Slide 5: Mito 4
"Vicia"
Realidade: É uma escolha pessoal — não há dependência física

Slide 6 (CTA):
"Ficou com dúvidas? Me chama no DM!"
+ perfil + link na bio`,
    caption: `Mitos e verdades sobre o Botox — um guia rápido para quem está considerando o procedimento. 🌸

Cada slide desfaz uma dúvida comum que recebo toda semana nas minhas consultas.

💬 Tem mais alguma dúvida? Me chama no DM — adoro conversar sobre isso!

Salva esse post para ter sempre à mão. 📌`,
    hashtags: ["#botox", "#mitos", "#harmonizacao", "#educacao", "#carrossel", "#beleza"],
    callToAction: "Salva para ter sempre à mão + chama no DM",
  },
};
