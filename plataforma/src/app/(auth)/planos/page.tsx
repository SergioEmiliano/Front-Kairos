"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PLANS, type Plan, type BillingCycle } from "@/shared/lib/plans";
import { KairosLogo } from "@/shared/components/KairosLogo";
import { LoginBackdrop } from "@/app/(auth)/login/components/LoginBackdrop";
import { BillingToggle } from "./components/BillingToggle";
import { PlanCard } from "./components/PlanCard";

export default function PlanosPage() {
  const router = useRouter();
  const [cycle, setCycle] = useState<BillingCycle>("mensal");

  function handleSubscribe(plan: Plan) {
    router.push(`/checkout?plano=${plan.id}&ciclo=${cycle}`);
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-kairos-paper">
      <LoginBackdrop />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 gap-8">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="self-start inline-flex items-center gap-1.5 text-xs text-kairos-stone hover:text-kairos-charcoal transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao login
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <KairosLogo markOnly className="!h-12 !w-12" />
          <h1 className="text-[28px] font-medium text-kairos-charcoal leading-tight">
            Escolha seu <span className="italic-gold">plano</span>
          </h1>
          <p className="text-sm text-kairos-stone max-w-md">
            Sua conta é criada após a confirmação do pagamento. Você recebe um
            link de primeiro acesso para começar.
          </p>
          <BillingToggle value={cycle} onChange={setCycle} />
        </div>

        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
