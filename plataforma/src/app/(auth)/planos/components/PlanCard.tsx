"use client";

import { Check } from "lucide-react";
import type { Plan, BillingCycle } from "@/shared/lib/plans";
import { priceForCycle } from "@/shared/lib/plans";
import { GoldButton } from "@/shared/components/GoldButton";
import { cn } from "@/shared/lib/utils";

export function PlanCard({
  plan,
  cycle,
  onSubscribe,
}: {
  plan: Plan;
  cycle: BillingCycle;
  onSubscribe: (plan: Plan) => void;
}) {
  const price = priceForCycle(plan, cycle);
  return (
    <div
      className={cn(
        "card-surface relative flex flex-col gap-5 p-7",
        plan.highlight && "ring-1"
      )}
      style={
        plan.highlight
          ? ({ "--tw-ring-color": "var(--gold)" } as React.CSSProperties)
          : undefined
      }
    >
      {plan.highlight && (
        <span
          className="mono-label absolute -top-2.5 left-7 px-2 py-0.5 rounded-full"
          style={{ background: "var(--gold-dark)", color: "var(--paper)" }}
        >
          Mais escolhido
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-medium text-kairos-charcoal">{plan.name}</h3>
        <p className="text-xs text-kairos-stone leading-snug">{plan.label}</p>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-medium text-kairos-charcoal">
          R$ {price}
        </span>
        <span className="text-xs text-kairos-stone mb-1.5">/mês</span>
      </div>

      <ul className="flex flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-kairos-charcoal/90">
            <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--gold-dark)" }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <GoldButton
        type="button"
        fullWidth
        onClick={() => onSubscribe(plan)}
        className="mt-auto"
      >
        Assinar {plan.name}
      </GoldButton>
    </div>
  );
}
