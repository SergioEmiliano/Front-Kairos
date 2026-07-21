import type { Plan, BillingCycle } from "@/shared/lib/plans";
import { priceForCycle } from "@/shared/lib/plans";

export function CheckoutSummary({
  plan,
  cycle,
}: {
  plan: Plan;
  cycle: BillingCycle;
}) {
  const price = priceForCycle(plan, cycle);
  const total = cycle === "anual" ? price * 12 : price;
  return (
    <div className="card-surface flex flex-col gap-4 p-6">
      <span className="mono-label">Resumo da assinatura</span>
      <div className="flex items-center justify-between">
        <span className="text-kairos-charcoal font-medium">Plano {plan.name}</span>
        <span className="text-xs text-kairos-stone capitalize">{cycle}</span>
      </div>
      <p className="text-xs text-kairos-stone leading-snug">{plan.label}</p>
      <div className="dotted-rule my-1 text-kairos-line" />
      <div className="flex items-end justify-between">
        <span className="text-sm text-kairos-stone">
          {cycle === "anual" ? "Cobrança anual" : "Cobrança mensal"}
        </span>
        <span className="text-2xl font-medium text-kairos-charcoal">
          R$ {total.toLocaleString("pt-BR")}
          {cycle === "anual" && (
            <span className="text-xs text-kairos-stone ml-1">/ano</span>
          )}
        </span>
      </div>
    </div>
  );
}
