import { delay } from "@/shared/lib/utils";
import type { SubscriptionStatus } from "@/shared/types";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Motivo de uma falha de login, usado pela UI para escolher a mensagem certa.
export type LoginFailureReason =
  | "invalid_credentials"
  | "pending_approval" // assinatura confirmada, aguardando aprovação do admin
  | "subscription_inactive"; // cancelada / past_due / pagamento pendente

export interface AuthResult {
  success: boolean;
  reason?: LoginFailureReason;
  token?: string;
  userId?: string;
  name?: string;
  subscriptionStatus?: SubscriptionStatus;
  // false → primeiro acesso: a médica deve ser levada ao onboarding.
  firstAccessCompleted?: boolean;
}

// ─── Cenários de mock ────────────────────────────────────────────────────────
// Como o backend ainda não existe, e-mails de teste disparam cada estado para
// que as telas de erro e o fluxo de primeiro acesso sejam demonstráveis.
// Qualquer outro e-mail válido → assinatura ativa e onboarding já concluído.
const MOCK_SCENARIOS: Record<string, AuthResult> = {
  "pendente@kairos.com": {
    success: false,
    reason: "pending_approval",
    subscriptionStatus: "pending_approval",
  },
  "cancelada@kairos.com": {
    success: false,
    reason: "subscription_inactive",
    subscriptionStatus: "canceled",
  },
  "primeiroacesso@kairos.com": {
    success: true,
    token: "mock-jwt-token",
    userId: "dr-novo-acesso",
    name: "Dra. Marina Vasconcellos",
    subscriptionStatus: "active",
    firstAccessCompleted: false,
  },
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    if (USE_MOCK) {
      await delay(800);

      const scenario = MOCK_SCENARIOS[credentials.email.trim().toLowerCase()];
      if (scenario) return scenario;

      // Caso padrão: assinatura ativa, onboarding já concluído.
      return {
        success: true,
        token: "mock-jwt-token",
        userId: "dr-ana-silva",
        name: "Dra. Ana Silva",
        subscriptionStatus: "active",
        firstAccessCompleted: true,
      };
    }
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  async logout(): Promise<void> {
    if (USE_MOCK) {
      await delay(200);
      return;
    }
    await fetch("/api/auth/logout", { method: "POST" });
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("kairos-auth");
  },

  setAuth(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("kairos-auth", token);
  },

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("kairos-auth");
  },
};
