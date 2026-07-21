import { DoctorProfile } from "@/shared/types";

export const mockDoctor: DoctorProfile = {
  id: "dr-ana-silva",
  name: "Dra. Ana Silva",
  email: "ana.silva@clinica.com.br",
  instagram: "@dra.anasilva",
  avatarUrl: undefined,
  firstAccessCompleted: true,
  procedures: ["harmonizacao", "botox", "preenchimento"],
  monthlyRevenue: 30000,
  averageTicket: 1500,
  workingDays: [1, 2, 3, 4, 5],
  sessionsPerDay: 4,
  teamSize: 2,
  toneOfVoice: "sofisticado",
  formalityLevel: "semiformal",
  targetAudience: "Mulheres entre 30-45 anos, profissionais liberais, que buscam resultados naturais e elegantes",
  uniqueValue: "Técnica exclusiva que garante resultados naturais e personalizados, com atendimento acolhedor e discreto",
  proceduresGoal: 20,
  dmGoal: 88,
  appointmentGoal: 31,
  postsPerWeek: 5,
};
