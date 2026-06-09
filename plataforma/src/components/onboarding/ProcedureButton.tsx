import { cn } from "@/lib/utils";
import { Procedure } from "@/types";
import { Sparkles, Zap, Droplets, Leaf, Scissors, Plus } from "lucide-react";

const procedureConfig: Record<Procedure, { label: string; icon: React.ElementType; description: string }> = {
  harmonizacao: { label: "Harmonização", icon: Sparkles, description: "Facial completa" },
  botox: { label: "Botox", icon: Zap, description: "Toxina botulínica" },
  preenchimento: { label: "Preenchimento", icon: Droplets, description: "Ácido hialurônico" },
  bioestimulador: { label: "Bioestimulador", icon: Leaf, description: "Estimulação colágeno" },
  depilacao: { label: "Depilação", icon: Scissors, description: "A laser" },
  outro: { label: "Outro", icon: Plus, description: "Procedimento" },
};

interface ProcedureButtonProps {
  procedure: Procedure;
  selected: boolean;
  onToggle: (p: Procedure) => void;
}

export function ProcedureButton({ procedure, selected, onToggle }: ProcedureButtonProps) {
  const { label, icon: Icon, description } = procedureConfig[procedure];

  return (
    <button
      type="button"
      onClick={() => onToggle(procedure)}
      className={cn(
        "relative flex flex-col items-start gap-3 p-5 rounded-[var(--radius)] border text-left transition-all duration-200 group",
        selected
          ? "border-kairos-gold bg-kairos-paper"
          : "border-kairos-line bg-transparent hover:border-kairos-charcoal/50"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full border transition-colors",
        selected
          ? "border-kairos-gold text-kairos-gold"
          : "border-kairos-line text-kairos-stone group-hover:text-kairos-charcoal"
      )}>
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className={cn(
          "font-serif-display text-lg leading-tight",
          selected ? "text-kairos-charcoal" : "text-kairos-charcoal"
        )}>
          {label}
        </p>
        <p className="mono-label text-kairos-stone mt-1">{description}</p>
      </div>

      {/* Check / gold diamond accent */}
      <span
        className={cn(
          "absolute top-4 right-4 text-xs transition-opacity",
          selected ? "opacity-100 text-kairos-gold" : "opacity-0"
        )}
        aria-hidden
      >
        ◆
      </span>
    </button>
  );
}
