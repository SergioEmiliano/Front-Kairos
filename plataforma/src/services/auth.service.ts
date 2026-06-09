import { delay } from "@/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  userId?: string;
  name?: string;
  onboardingComplete?: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    if (USE_MOCK) {
      await delay(800);
      // Qualquer email/senha funciona no mock
      return {
        success: true,
        token: "mock-jwt-token",
        userId: "dr-ana-silva",
        name: "Dra. Ana Silva",
        onboardingComplete: true,
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
