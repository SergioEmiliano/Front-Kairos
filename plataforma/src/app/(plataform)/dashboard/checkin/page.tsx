"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { GoldButton } from "@/shared/components/GoldButton";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { checkinService } from "@/services/checkin.service";
import { cn } from "@/shared/lib/utils";

const checkinSchema = z.object({
  dmsReceived: z.number().min(0),
  appointmentsScheduled: z.number().min(0),
  proceduresDone: z.number().min(0),
  revenueEarned: z.number().min(0),
  notes: z.string().optional(),
});
type CheckinForm = z.infer<typeof checkinSchema>;

const contentChips = ["Reel", "Carrossel", "Story", "Post"] as const;
const weeklySummary = [
  { label: "Consultas", value: "28", sub: "DE 30", italic: false },
  { label: "Faturamento", value: "R$ 14,2K", sub: "72% DA META SEM.", italic: true },
  { label: "Leads", value: "39", sub: "+6 VS S03", italic: false },
  { label: "Posts", value: "06", sub: "DE 07", italic: false },
];
const history = [
  { d: "22 abr", dow: "Ter", info: "05 consultas · 02 fechados", fat: "R$ 6.400" },
  { d: "19 abr", dow: "Sáb", info: "—", fat: "—" },
  { d: "18 abr", dow: "Sex", info: "07 consultas · 03 fechados", fat: "R$ 9.800" },
  { d: "17 abr", dow: "Qui", info: "06 consultas · 02 fechados", fat: "R$ 7.200" },
];

export default function CheckinPage() {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState<Set<string>>(new Set(["Reel", "Carrossel"]));
  const { register, handleSubmit } = useForm<CheckinForm>({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      dmsReceived: 9,
      appointmentsScheduled: 6,
      proceduresDone: 2,
      revenueEarned: 7800,
    },
  });

  async function onSubmit(data: CheckinForm) {
    setLoading(true);
    try {
      await checkinService.submitCheckin({
        ...data,
        contentPublished: published.size,
        date: new Date().toISOString().split("T")[0],
      });
    } finally {
      setLoading(false);
    }
  }

  const toggleChip = (chip: string) => {
    setPublished((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden p-6 gap-4">
      <div className="shrink-0">
        <span className="kicker">Check-in diário · 23 abr</span>
        <h1
          className="text-[32px] text-kairos-charcoal leading-[1.05] mt-2.5 font-medium"
          style={{ letterSpacing: "-0.025em" }}
        >
          Os números de <span className="italic-gold">hoje</span>.
        </h1>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr] gap-4 flex-1 min-h-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-surface rounded-[var(--radius)] p-6 flex flex-col gap-4 overflow-hidden"
        >
          <div className="flex items-center justify-between shrink-0">
            <span className="kicker">Registro do dia</span>
            <span className="mono-label">◆ Salvamento auto · 12s atrás</span>
          </div>
          <div className="hairline shrink-0" />

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="flex flex-col gap-1.5">
              <Label className="mono-label">Consultas atendidas</Label>
              <Input type="number" {...register("appointmentsScheduled", { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="mono-label">Procedimentos fechados</Label>
              <Input type="number" {...register("proceduresDone", { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="mono-label">Leads (DM + WhatsApp)</Label>
              <Input type="number" {...register("dmsReceived", { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="mono-label">Faturamento do dia (R$)</Label>
              <Input type="number" {...register("revenueEarned", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <Label className="mono-label">Conteúdo publicado hoje</Label>
            <div className="flex gap-2 flex-wrap">
              {contentChips.map((chip) => {
                const active = published.has(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={cn("chip-circle", active && "on")}
                    style={{ width: "auto", padding: "0 14px", height: 32, fontSize: 12 }}
                  >
                    {active && <span className="mr-1.5" style={{ color: "var(--gold-dark)" }}>◆</span>}
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-h-0">
            <Label className="mono-label">Observação do dia (opcional)</Label>
            <Textarea
              rows={2}
              className="flex-1 min-h-0"
              defaultValue="Paula fechou bioestimulador de 4 sessões. Reel de antes/depois gerou 7 DMs qualificadas em 3h."
              {...register("notes")}
            />
          </div>

          <div className="flex justify-end shrink-0">
            <GoldButton type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Fechando…</>
              ) : (
                <>Fechar o dia <Check className="h-3.5 w-3.5" /></>
              )}
            </GoldButton>
          </div>
        </form>

        <div className="flex flex-col gap-4 min-h-0">
          <div className="card-surface rounded-[var(--radius)] p-5 shrink-0">
            <span className="kicker mb-4 block">Resumo semanal · S04</span>
            <div className="grid grid-cols-2">
              {weeklySummary.map(({ label, value, sub, italic }, i) => (
                <div
                  key={label}
                  className="px-3 py-3"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                    borderTop: i >= 2 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div className="mono-label mb-2" style={{ fontSize: 9 }}>{label}</div>
                  <div
                    className={italic ? "italic-gold" : "text-kairos-charcoal"}
                    style={{ fontSize: 26, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500 }}
                  >
                    {value}
                  </div>
                  <div className="mono-label mt-1.5" style={{ fontSize: 9 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-[var(--radius)] p-5 flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <span className="kicker">Histórico recente</span>
              <button className="text-xs text-kairos-stone border-b border-kairos-line hover:text-kairos-charcoal hover:border-kairos-charcoal transition-colors">
                Ver todos →
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll">
              {history.map(({ d, dow, info, fat }) => (
                <div
                  key={d}
                  className="grid items-baseline gap-3 py-2.5 border-t border-kairos-line-soft"
                  style={{ gridTemplateColumns: "60px 36px 1fr auto" }}
                >
                  <span className="text-kairos-charcoal font-medium" style={{ fontSize: 16, letterSpacing: "-0.01em" }}>{d}</span>
                  <span className="mono-label">{dow}</span>
                  <span
                    className="text-[12px] truncate"
                    style={{ color: info === "—" ? "var(--mute)" : "var(--ink-soft)" }}
                  >
                    {info}
                  </span>
                  <span
                    className="text-[12px] font-mono-label"
                    style={{
                      letterSpacing: "0.02em",
                      color: fat === "—" ? "var(--mute)" : "var(--ink)",
                    }}
                  >
                    {fat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <div className="hairline mb-4" />
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
          <span className="kicker whitespace-nowrap pt-0.5 shrink-0">◆ Por que registrar?</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {[
              {
                label: "Alimenta o Analytics",
                desc: "Faturamento, leads e agendamentos que você registra aqui aparecem em tempo real nos relatórios de análise fechando o ciclo entre conteúdo e receita.",
              },
              {
                label: "Fecha o ciclo",
                desc: "Conecta o que você publicou ao resultado que ele gerou. Alcance, DMs e conversão em uma única visão para você ver o que funciona.",
              },
              {
                label: "IA mais precisa",
                desc: "Cada check-in calibra a inteligência da Kairós. Quanto mais consistente o registro, mais certeiras ficam as recomendações semanais.",
              },
            ].map(({ label, desc }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="mono-label">{label}</span>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
