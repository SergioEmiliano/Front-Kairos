/**
 * Motor Matemático — cálculo da meta de geração de demanda
 * TypeScript puro, sem side-effects — portável para o backend
 */

export interface FinancialGoal {
  monthlyRevenue: number;
  averageTicket: number;
  workingDaysPerMonth: number;
  sessionsPerDay: number;
}

export interface DemandResult {
  proceduresNeeded: number;
  patientsPerDay: number;
  dmGoal: number;
  appointmentGoal: number;
  conversionRateDmToAppointment: number;
  conversionRateAppointmentToProcedure: number;
  contentPiecesNeeded: number;
  postsPerWeek: number;
}

// Taxas de conversão padrão do setor
const CONVERSION_DM_TO_APPOINTMENT = 0.35;
const CONVERSION_APPOINTMENT_TO_PROCEDURE = 0.65;
const REACH_PER_POST = 500;
const DM_RATE_FROM_REACH = 0.04;

export function calculateDemand(goal: FinancialGoal): DemandResult {
  const proceduresNeeded = Math.ceil(goal.monthlyRevenue / goal.averageTicket);
  const patientsPerDay = proceduresNeeded / goal.workingDaysPerMonth;
  const appointmentGoal = Math.ceil(proceduresNeeded / CONVERSION_APPOINTMENT_TO_PROCEDURE);
  const dmGoal = Math.ceil(appointmentGoal / CONVERSION_DM_TO_APPOINTMENT);
  const reachNeeded = Math.ceil(dmGoal / DM_RATE_FROM_REACH);
  const contentPiecesNeeded = Math.ceil(reachNeeded / REACH_PER_POST);
  const postsPerWeek = Math.ceil(contentPiecesNeeded / 4.33);

  return {
    proceduresNeeded,
    patientsPerDay: parseFloat(patientsPerDay.toFixed(1)),
    dmGoal,
    appointmentGoal,
    conversionRateDmToAppointment: CONVERSION_DM_TO_APPOINTMENT,
    conversionRateAppointmentToProcedure: CONVERSION_APPOINTMENT_TO_PROCEDURE,
    contentPiecesNeeded,
    postsPerWeek,
  };
}
