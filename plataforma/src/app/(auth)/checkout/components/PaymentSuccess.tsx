"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { subscriptionService } from "@/services/subscription.service";
import { authService } from "@/services/auth.service";
import { useAppStore } from "@/store/app.store";
import { GoldButton } from "@/shared/components/GoldButton";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export function PaymentSuccess() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setFirstAccessCompleted = useAppStore((s) => s.setFirstAccessCompleted);
  const [loading, setLoading] = useState(false);

  async function handleFirstAccess() {
    setLoading(true);
    const grant = await subscriptionService.simulateFirstAccessGrant();
    if (grant.success) {
      // Em modo real não grava o token simulado no localStorage — preserva o JWT
      // real do usuário. O estado Zustand é suficiente para rotear ao onboarding.
      if (USE_MOCK && grant.token) {
        authService.setAuth(grant.token);
      }
      setAuthenticated(true);
      setFirstAccessCompleted(grant.firstAccessCompleted ?? false);
      router.push("/onboarding");
      return;
    }
    setLoading(false);
  }

  return (
    <div className="card-surface flex flex-col items-center gap-5 p-10 text-center max-w-md">
      <CheckCircle2 className="h-12 w-12" style={{ color: "var(--gold-dark)" }} />
      <h2 className="text-2xl font-medium text-kairos-charcoal">
        Pagamento <span className="italic-gold">aprovado</span>
      </h2>
      <p className="text-sm text-kairos-stone leading-relaxed">
        Sua conta foi criada. Enviamos um link de primeiro acesso para o seu
        e-mail. (Nesta versão de demonstração, use o botão abaixo.)
      </p>
      <GoldButton
        type="button"
        fullWidth
        disabled={loading}
        onClick={handleFirstAccess}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Preparando…
          </span>
        ) : (
          <>
            Acessar e configurar minha conta <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </GoldButton>
    </div>
  );
}
