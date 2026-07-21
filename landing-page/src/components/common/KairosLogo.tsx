import { cn } from "@/lib/utils";

interface KairosLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

// Só o letreiro (wordmark "KAIRÓS", asset v2). O símbolo da ampulheta vive
// separado na hero (HourglassMark), com animação própria.
const TEXT_RATIO = 864 / 237;

// Achata a cor cream do arquivo numa silhueta lisa: preta no claro, branca
// no escuro.
const FLATTEN = "brightness-0 dark:invert transition-[filter] duration-300";

export function KairosLogo({ size = "md", className, showTagline = false }: KairosLogoProps) {
  const heights = { sm: 22, md: 30, lg: 42 } as const;
  const taglineSizes = { sm: "text-[10px]", md: "text-[11px]", lg: "text-xs" } as const;

  const h = heights[size];
  const w = Math.round(h * TEXT_RATIO);

  return (
    <div className={cn("flex flex-col items-start gap-1 select-none", className)}>
      <img
        src="/kairos-texto.svg"
        alt="Kairós"
        width={w}
        height={h}
        className={FLATTEN}
        style={{ height: h, width: w, objectFit: "contain" }}
      />
      {showTagline && (
        <span
          className={cn("text-kairos-stone", taglineSizes[size])}
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ◆ Sistema de crescimento previsível
        </span>
      )}
    </div>
  );
}
