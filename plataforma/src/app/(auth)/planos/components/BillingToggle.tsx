"use client";

import type { BillingCycle } from "@/shared/lib/plans";
import { cn } from "@/shared/lib/utils";

const OPTIONS: { id: BillingCycle; label: string }[] = [
  { id: "mensal", label: "Mensal" },
  { id: "anual", label: "Anual" },
];

export function BillingToggle({
  value,
  onChange,
}: {
  value: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1"
      style={{ border: "1px solid var(--line)", background: "var(--paper-warm)" }}
    >
      {OPTIONS.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              active ? "text-kairos-paper" : "text-kairos-stone hover:text-kairos-charcoal"
            )}
            style={active ? { background: "var(--gold-dark)" } : undefined}
          >
            {opt.label}
            {opt.id === "anual" && (
              <span className="ml-1.5 opacity-80">· economize</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
