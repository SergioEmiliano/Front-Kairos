"use client";

import { useState, useCallback } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── Benefits at risk ─────────────────────────────────────────────────────────

const BENEFITS_AT_RISK = [
  "Acesso ao calendário de conteúdo com IA",
  "Geração de roteiros e legendas personalizadas",
  "Dashboard de análise de performance",
  "Curadoria mensal de estratégia",
  "Materiais e guias exclusivos para médicas",
  "Suporte prioritário da equipe Kairós",
];

// ─── Flow steps ───────────────────────────────────────────────────────────────

type CancelStep = "retention" | "confirm" | "done";

// ─── CancelSubscriptionModal ──────────────────────────────────────────────────

interface CancelSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

export function CancelSubscriptionModal({
  open,
  onClose,
}: CancelSubscriptionModalProps) {
  const [step, setStep] = useState<CancelStep>("retention");
  const [confirmText, setConfirmText] = useState("");
  const [reason, setReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmPhrase = "cancelar";
  const isConfirmValid = confirmText.toLowerCase() === confirmPhrase;

  const handleClose = useCallback(() => {
    onClose();
    // Reset state after animation completes
    setTimeout(() => {
      setStep("retention");
      setConfirmText("");
      setReason("");
    }, 300);
  }, [onClose]);

  const handleFinalCancel = useCallback(async () => {
    if (!isConfirmValid) return;
    setIsProcessing(true);
    // Replace with actual cancellation API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setStep("done");
  }, [isConfirmValid]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[520px]",
            "card-surface rounded-[var(--radius)]",
            "shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          {/* ── Close button ─────────────────────────────────────────────── */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-charcoal transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* ── Step: Retention ──────────────────────────────────────────── */}
          {step === "retention" && (
            <div className="p-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="kicker" style={{ color: "var(--error)" }}>
                  Cancelar assinatura
                </span>
                <DialogPrimitive.Title
                  className="text-[22px] text-kairos-charcoal font-medium leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Sentiremos sua falta,{" "}
                  <span className="italic-gold">doutora.</span>
                </DialogPrimitive.Title>
                <p className="text-[13px] text-kairos-stone leading-[1.55]">
                  Antes de continuar, gostaríamos que você soubesse o que perderá
                  ao cancelar sua assinatura Kairós.
                </p>
              </div>

              {/* Benefits list */}
              <div
                className="rounded-[var(--radius)] p-4 flex flex-col gap-2"
                style={{
                  background: "color-mix(in oklch, var(--paper-warm) 60%, transparent)",
                  border: "1px solid var(--line)",
                }}
              >
                <p className="mono-label mb-1" style={{ color: "var(--gold-dark)" }}>
                  ◆ O que você perderá imediatamente
                </p>
                {BENEFITS_AT_RISK.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 mt-0.5"
                      style={{ color: "var(--gold-dark)" }}
                    />
                    <span className="text-[12px] text-kairos-charcoal leading-[1.4]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Retention message */}
              <div
                className="rounded-[var(--radius)] px-4 py-3"
                style={{
                  background: "color-mix(in oklch, var(--steel) 12%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--steel) 40%, transparent)",
                }}
              >
                <p className="text-[12px] leading-[1.55]" style={{ color: "var(--ink-soft)" }}>
                  <strong className="font-medium">Você está na curadoria de maio</strong> — seu slot foi
                  reservado e a reentrada depende da próxima janela aberta. Cancelando agora, você
                  perde esse lugar.
                </p>
              </div>

              {/* Optional reason */}
              <div className="flex flex-col gap-1.5">
                <Label className="mono-label" style={{ fontSize: 9 }}>
                  Motivo do cancelamento (opcional)
                </Label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={cn(
                    "h-10 px-3 rounded-[var(--radius)] border border-kairos-line",
                    "bg-kairos-paper text-kairos-charcoal text-[13px]",
                    "focus:outline-none focus:border-kairos-charcoal transition-colors"
                  )}
                >
                  <option value="">Selecione um motivo…</option>
                  <option value="financial">Questão financeira</option>
                  <option value="time">Falta de tempo para usar</option>
                  <option value="features">Funcionalidades não atendem</option>
                  <option value="competitor">Migrei para outra solução</option>
                  <option value="pause">Vou fazer uma pausa</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Manter assinatura
                </Button>
                <button
                  onClick={() => setStep("confirm")}
                  className="text-[11px] text-kairos-stone hover:text-kairos-charcoal transition-colors px-3 underline-offset-4 hover:underline"
                >
                  Continuar cancelamento
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Final confirmation ──────────────────────────────────── */}
          {step === "confirm" && (
            <div className="p-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle
                    className="h-4 w-4"
                    style={{ color: "var(--error)" }}
                  />
                  <span className="mono-label" style={{ color: "var(--error)" }}>
                    Confirmação final
                  </span>
                </div>
                <DialogPrimitive.Title
                  className="text-[20px] text-kairos-charcoal font-medium leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Esta ação não pode ser desfeita.
                </DialogPrimitive.Title>
                <p className="text-[13px] text-kairos-stone leading-[1.55]">
                  Sua assinatura será cancelada ao final do ciclo atual
                  (15/05/2026). Você não será cobrada novamente.
                </p>
              </div>

              {/* Confirmation input */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-cancel" className="mono-label text-[12px] leading-[1.5]">
                  Para confirmar, digite{" "}
                  <code
                    className="px-1.5 py-0.5 rounded text-[11px]"
                    style={{
                      background: "color-mix(in oklch, var(--error) 8%, transparent)",
                      border: "1px solid color-mix(in oklch, var(--error) 30%, transparent)",
                      color: "var(--error)",
                    }}
                  >
                    cancelar
                  </code>{" "}
                  no campo abaixo:
                </Label>
                <Input
                  id="confirm-cancel"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="cancelar"
                  autoComplete="off"
                  autoFocus
                  className={cn(
                    "transition-colors",
                    isConfirmValid && "border-red-400"
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setStep("retention")}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  ← Voltar
                </Button>
                <button
                  onClick={handleFinalCancel}
                  disabled={!isConfirmValid || isProcessing}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[13px] font-medium transition-all border",
                    "inline-flex items-center gap-2",
                    isConfirmValid && !isProcessing
                      ? "border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      : "border-kairos-line text-kairos-stone opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="kairos-spinner scale-50 -mx-1" style={{ borderTopColor: "var(--error)" }} />
                      Processando…
                    </>
                  ) : (
                    "Confirmar cancelamento"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Done ────────────────────────────────────────────────── */}
          {step === "done" && (
            <div className="p-8 flex flex-col items-center gap-5 text-center">
              <div
                className="w-14 h-14 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--paper-warm)",
                }}
              >
                <CheckCircle2 className="h-6 w-6" style={{ color: "var(--gold-dark)" }} />
              </div>

              <div className="flex flex-col gap-2">
                <DialogPrimitive.Title
                  className="text-[20px] text-kairos-charcoal font-medium"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Assinatura cancelada.
                </DialogPrimitive.Title>
                <p className="text-[13px] text-kairos-stone leading-[1.55] max-w-[320px]">
                  Você continuará com acesso até{" "}
                  <strong className="font-medium text-kairos-charcoal">15/05/2026</strong>.
                  Após essa data, seu acesso será encerrado.
                </p>
                <p className="text-[12px] text-kairos-stone mt-1">
                  Se mudar de ideia, entre em contato com nossa equipe antes do
                  encerramento.
                </p>
              </div>

              <Button onClick={handleClose} className="mt-2">
                Entendido
              </Button>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
