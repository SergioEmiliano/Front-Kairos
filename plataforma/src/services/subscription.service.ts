import { delay } from "@/shared/lib/utils";
import type { BillingCycle, PlanId } from "@/shared/lib/plans";
import type { AuthResult } from "@/services/auth.service";

export interface CreateSubscriptionInput {
  planId: PlanId;
  cycle: BillingCycle;
}

export interface CreateSubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  status?: "active";
}

export const subscriptionService = {
  // Cria a assinatura. Sempre usa mock: o backend de pagamento (Asaas/AbacatePay)
  // ainda não está implementado — provisionamento real virá por webhook do gateway.
  async createSubscription(
    input: CreateSubscriptionInput
  ): Promise<CreateSubscriptionResult> {
    await delay(1400);
    return {
      success: true,
      subscriptionId: `sub_mock_${input.planId}_${input.cycle}`,
      status: "active",
    };
  },

  // Simula o "primeiro acesso" liberado após o pagamento.
  // Sempre usa mock: /api/auth/first-access não existe no backend ainda —
  // o fluxo real virá por webhook do gateway + magic-link por e-mail.
  async simulateFirstAccessGrant(): Promise<AuthResult> {
    await delay(400);
    return {
      success: true,
      token: "mock-jwt-token",
      userId: "dr-novo-acesso",
      name: "Dra. Marina Vasconcellos",
      subscriptionStatus: "active",
      firstAccessCompleted: false,
    };
  },
};
