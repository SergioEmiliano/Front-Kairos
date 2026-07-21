"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { getPlan, type BillingCycle } from "@/shared/lib/plans";
import { subscriptionService } from "@/services/subscription.service";
import { LoginBackdrop } from "@/app/(auth)/login/components/LoginBackdrop";
import { GoldButton } from "@/shared/components/GoldButton";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentSuccess } from "./components/PaymentSuccess";

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = getPlan(params.get("plano") ?? "");
  const cycleParam = params.get("ciclo");
  const cycle: BillingCycle = cycleParam === "anual" ? "anual" : "mensal";

  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  // Query inválida/ausente → volta para a seleção de planos.
  useEffect(() => {
    if (!plan) router.replace("/planos");
  }, [plan, router]);

  if (!plan) return null;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setPaying(true);
    const result = await subscriptionService.createSubscription({
      planId: plan!.id,
      cycle,
    });
    if (result.success) {
      setPaid(true);
      return;
    }
    setPaying(false);
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-kairos-paper">
      <LoginBackdrop />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 gap-8">
        {paid ? (
          <PaymentSuccess />
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-6">
            <button
              type="button"
              onClick={() => router.push("/planos")}
              className="self-start inline-flex items-center gap-1.5 text-xs text-kairos-stone hover:text-kairos-charcoal transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Trocar de plano
            </button>

            <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
              <CheckoutSummary plan={plan} cycle={cycle} />

              <form onSubmit={handlePay} className="card-surface flex flex-col gap-4 p-6">
                <span className="mono-label">Dados de cobrança</span>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="nome" className="mono-label">Nome completo</Label>
                  <Input id="nome" placeholder="Dra. Marina Vasconcellos" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="mono-label">E-mail profissional</Label>
                  <Input id="email" type="email" placeholder="dra.marina@clinica.com.br" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cpf" className="mono-label">CPF</Label>
                  <Input id="cpf" inputMode="numeric" placeholder="000.000.000-00" required />
                </div>

                <p className="text-[11px] text-kairos-stone flex items-center gap-1.5 leading-snug">
                  <Lock className="h-3 w-3 shrink-0" />
                  Pagamento processado pelo Asaas. A Kairós não armazena dados de cartão.
                </p>

                <GoldButton type="submit" fullWidth disabled={paying} className="btn-glow mt-1">
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Processando pagamento…
                    </span>
                  ) : (
                    "Pagar e criar minha conta"
                  )}
                </GoldButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
