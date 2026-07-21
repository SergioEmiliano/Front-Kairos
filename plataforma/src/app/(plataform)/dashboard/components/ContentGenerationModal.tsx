"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Film, Image as ImageIcon, BookOpen, LayoutGrid, ArrowRight, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/shared/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { GoldButton } from "@/shared/components/GoldButton";
import { ContentFormat } from "@/shared/types";
import { formatFullDate } from "@/shared/lib/date-utils";
import { cn } from "@/shared/lib/utils";

interface ContentGenerationModalProps {
  open: boolean;
  onClose: () => void;
  date: string | null;
}

type FormatOption = { value: ContentFormat; label: string; sub: string; icon: LucideIcon };

const FORMATS: FormatOption[] = [
  { value: "reel", label: "Reel", sub: "30-60s · Vídeo", icon: Film },
  { value: "post", label: "Post", sub: "Feed · 1:1", icon: ImageIcon },
  { value: "story", label: "Story", sub: "Vertical · 9:16", icon: BookOpen },
  { value: "carrossel", label: "Carrossel", sub: "5-7 slides", icon: LayoutGrid },
];

type LoadState = "idle" | "loading" | "result";

export function ContentGenerationModal({ open, onClose, date }: ContentGenerationModalProps) {
  const [format, setFormat] = useState<ContentFormat>("reel");
  const [idea, setIdea] = useState(
    "Bioestimulador: diferença entre resultado artificial e calibrado — série para público 40+"
  );
  const [state, setState] = useState<LoadState>("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function handleGenerate() {
    setState("loading");
    setTimeout(() => setState("result"), 1600);
  }

  function handleCopy(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  function handleClose() {
    setIdea("Bioestimulador: diferença entre resultado artificial e calibrado — série para público 40+");
    setState("idle");
    onClose();
  }

  const formattedDate = date
    ? (() => {
        try {
          return formatFullDate(new Date(date + "T12:00:00"));
        } catch {
          return date;
        }
      })()
    : "";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[900px] max-h-[92vh] overflow-y-auto kairos-scroll",
            "card-surface rounded-[var(--radius)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          {/* Header */}
          <div className="px-9 py-7 border-b border-kairos-line flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <span className="kicker">Gerador de conteúdo</span>
              <DialogPrimitive.Title className="font-serif-display text-[26px] text-kairos-charcoal leading-tight" style={{ letterSpacing: "-0.015em" }}>
                Uma ideia, <span className="italic-gold">roteiro completo</span>.
              </DialogPrimitive.Title>
              {formattedDate && (
                <span className="mono-label capitalize">{formattedDate}</span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-charcoal transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-9 flex flex-col gap-7">
            {/* Format selector */}
            <div>
              <div className="mono-label mb-3.5">◆ 01 · Formato</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {FORMATS.map(({ value, label, sub, icon: Icon }) => {
                  const active = format === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setFormat(value);
                        setState("idle");
                      }}
                      className={cn("proc-card text-left", active && "on")}
                    >
                      <span className="tick">{active ? "◆" : "◇"}</span>
                      <div className="icon-circle">
                        <Icon className="h-4 w-4" strokeWidth={1.4} />
                      </div>
                      <div className="proc-title" style={{ fontSize: 20 }}>{label}</div>
                      <div className="proc-sub">{sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Idea input */}
            <div className="flex flex-col gap-2">
              <Label className="mono-label">◆ 02 · Sobre o que você quer falar? (opcional)</Label>
              <Textarea rows={3} value={idea} onChange={(e) => setIdea(e.target.value)} />
              <div className="mono-label" style={{ fontSize: 9, marginTop: 4 }}>
                Sem ideia? A Kairós sugere um tema alinhado ao seu foco da semana. · Pilar atual:{" "}
                <span style={{ color: "var(--gold-dark)" }}>Autoridade</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <GoldButton onClick={handleGenerate} disabled={state === "loading"}>
                {state === "loading" ? (
                  "Calibrando…"
                ) : (
                  <>
                    Gerar roteiro <Sparkles className="h-3.5 w-3.5" />
                  </>
                )}
              </GoldButton>
            </div>

            {/* Loading */}
            {state === "loading" && (
              <div className="py-10 flex flex-col items-center gap-4.5 border-t border-kairos-line">
                <div className="kairos-spinner" />
                <div className="mono-label" style={{ color: "var(--gold-dark)" }}>
                  ◆ Motor calibrando sua voz + pilar da semana
                </div>
                <div className="w-full max-w-[420px]">
                  <div className="shimmer-bar h-px" />
                </div>
                <span className="font-serif-display italic text-[17px] text-kairos-charcoal/70">
                  &ldquo;O sistema já operou 3.412 peças desse pilar.&rdquo;
                </span>
              </div>
            )}

            {/* Result */}
            {state === "result" && (
              <div className="border-t border-kairos-line pt-7 flex flex-col gap-4.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="kicker">Roteiro Estratégico</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setState("idle")}>
                      Regenerar
                    </Button>
                    <Button size="sm">
                      Agendar no calendário <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {(
                  [
                    {
                      id: "roteiro",
                      label: "01 · Roteiro do reel",
                      content: (
                        <div className="flex flex-col gap-2.5 text-[14px] text-kairos-charcoal leading-[1.6]">
                          <p>
                            <span className="mono-label">Hook · 00:00</span>
                            <br />
                            &ldquo;Você não quer <span className="italic-gold">parecer feita</span>. Quer parecer descansada.&rdquo;
                          </p>
                          <p>
                            <span className="mono-label">Corpo · 00:08</span>
                            <br />A diferença entre bioestimulador bem calibrado e aplicação agressiva está no protocolo de diluição — não na quantidade.
                          </p>
                          <p>
                            <span className="mono-label">Fechamento · 00:38</span>
                            <br />
                            &ldquo;Técnica não se repete. Se calibra.&rdquo;
                          </p>
                        </div>
                      ),
                      copy: "Hook: Você não quer parecer feita. Quer parecer descansada...",
                    },
                    {
                      id: "legenda",
                      label: "02 · Legenda",
                      content: (
                        <p className="text-[14px] text-kairos-charcoal/80 leading-[1.6]">
                          Cada paciente tem um mapa próprio. Dois rostos com a mesma indicação pedem protocolos distintos — porque colágeno não responde a fórmula, responde a{" "}
                          <span className="italic-gold">calibração</span>. Agende sua avaliação pelo link na bio.
                        </p>
                      ),
                      copy: "Cada paciente tem um mapa próprio...",
                    },
                    {
                      id: "hashtags",
                      label: "03 · Hashtags",
                      content: (
                        <p
                          className="font-mono-label text-kairos-stone leading-[1.8]"
                          style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "none" }}
                        >
                          #bioestimulador #harmonizacaofacial #medicinaesteticasp #dramarinavasconcellos #jardinssp #colagenonatural #protocolocalibrado
                        </p>
                      ),
                      copy: "#bioestimulador #harmonizacaofacial #medicinaesteticasp",
                    },
                    {
                      id: "cta",
                      label: "04 · CTA sugerido",
                      content: (
                        <div className="text-[14px] text-kairos-charcoal/80">
                          <span className="italic-gold" style={{ fontSize: 18 }}>
                            &ldquo;Fale com minha equipe.&rdquo;
                          </span>{" "}
                          — encaminha para WhatsApp de curadoria de pacientes. Conversão média desta CTA:{" "}
                          <strong>4,1%</strong>.
                        </div>
                      ),
                      copy: "Fale com minha equipe.",
                    },
                  ] as const
                ).map((b) => (
                  <div
                    key={b.id}
                    className="card-surface rounded-[var(--radius)] p-6 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="mono-label" style={{ color: "var(--gold-dark)" }}>◆ {b.label}</span>
                      <button
                        onClick={() => handleCopy(b.copy, b.id)}
                        className="w-7 h-7 rounded-full border border-kairos-line inline-flex items-center justify-center text-kairos-charcoal/80 hover:border-kairos-charcoal transition-colors"
                        aria-label="Copiar"
                      >
                        {copiedField === b.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="hairline" />
                    {b.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
