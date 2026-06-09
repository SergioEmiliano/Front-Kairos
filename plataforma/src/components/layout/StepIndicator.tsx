import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const n = i + 1;
        const state = n === currentStep ? "active" : n < currentStep ? "done" : "pending";
        return (
          <div key={i} className="flex items-center gap-3">
            <span
              className={cn(
                "mono-label transition-colors",
                state === "active" && "text-kairos-gold",
                state === "done" && "text-kairos-charcoal",
                state === "pending" && "text-kairos-stone/60"
              )}
            >
              {String(n).padStart(2, "0")}
            </span>
            {i < totalSteps - 1 && (
              <span
                className={cn(
                  "h-px w-6 transition-colors",
                  state === "done" ? "bg-kairos-gold/60" : "bg-kairos-line"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
