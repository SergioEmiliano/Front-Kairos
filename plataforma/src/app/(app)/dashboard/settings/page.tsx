"use client";

import { useState } from "react";
import { User, MessageCircle, Calendar, BarChart3, Target, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CancelSubscriptionModal } from "@/components/settings/CancelSubscriptionModal";
import { DnaModal } from "@/components/settings/DnaModal";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button" role="switch" aria-checked={on}
      onClick={() => onChange(!on)}
      className={on ? "toggle-pill on" : "toggle-pill"}
    />
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-kairos-line-soft last:border-b-0">
      <span className="mono-label">{l}</span>
      <span className="text-[13px] text-kairos-charcoal">{v}</span>
    </div>
  );
}

function NotifRow({ label, sub, defaultOn }: { label: string; sub: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex justify-between items-center py-3 border-b border-kairos-line-soft last:border-b-0">
      <div>
        <div className="text-[13px] text-kairos-charcoal">{label}</div>
        <div className="mono-label mt-0.5" style={{ fontSize: 9 }}>{sub}</div>
      </div>
      <Toggle on={on} onChange={setOn} />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const integrations: {
  name: string; acc: string;
  status: "conectada" | "desconectada" | "pendente";
  icon: LucideIcon;
}[] = [
  { name: "Instagram Business",  acc: "@dra.marinavasconcellos",          status: "conectada",    icon: MessageCircle },
  { name: "WhatsApp Business",   acc: "+55 11 9•••• 4492",                status: "conectada",    icon: User },
  { name: "Google Agenda",       acc: "marina@clinicavasconcellos.br",    status: "conectada",    icon: Calendar },
  { name: "Stripe · Pagamentos", acc: "—",                                status: "desconectada", icon: BarChart3 },
  { name: "Meta Pixel",          acc: "Aguardando token",                  status: "pendente",     icon: Target },
  { name: "TikTok Business",     acc: "—",                                status: "desconectada", icon: Video },
];

// DNA identity preview — reflects what was set in the onboarding
const DNA_PREVIEW = [
  { l: "Posicionamento",    v: "Sofisticada · Premium" },
  { l: "Estilo",            v: "Elegante" },
  { l: "Público",           v: "Mulheres 35–50" },
  { l: "Objetivo",          v: "Posicionamento premium" },
  { l: "Destaque",          v: "Harmonização facial" },
];

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [tab, setTab] = useState("perfil");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [dnaModalOpen, setDnaModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden p-6 gap-4">
      {/* Header */}
      <div className="shrink-0">
        <span className="kicker">Configurações</span>
        <h1
          className="text-[32px] text-kairos-charcoal leading-[1.05] mt-2.5 font-medium"
          style={{ letterSpacing: "-0.025em" }}
        >
          Ajuste o <span className="italic-gold">sistema</span>.
        </h1>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex-1 min-h-0 flex flex-col">
        <TabsList className="shrink-0">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="notifs">Notificações</TabsTrigger>
          <TabsTrigger value="integra">Integrações</TabsTrigger>
          <TabsTrigger value="conta">Conta</TabsTrigger>
        </TabsList>

        {/* ── Perfil ────────────────────────────────────────────────────────── */}
        <TabsContent value="perfil" className="flex-1 min-h-0 mt-4 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4 h-full">

            {/* Dados profissionais */}
            <div className="card-surface rounded-[var(--radius)] p-6 overflow-hidden flex flex-col">
              <h2 className="text-[20px] text-kairos-charcoal mb-0.5 font-medium" style={{ letterSpacing: "-0.02em" }}>
                Dados <span className="italic-gold">profissionais</span>
              </h2>
              <p className="text-[12px] text-kairos-stone mb-4">
                Essas informações calibram o tom do sistema.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="mono-label">Nome</Label>
                  <Input defaultValue="Dra. Marina Vasconcellos" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="mono-label">Especialidade</Label>
                  <Input defaultValue="Harmonização facial · bioestimulador" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="mono-label">CRM</Label>
                  <Input defaultValue="CRM-SP 174.992" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="mono-label">Clínica</Label>
                  <Input defaultValue="Clínica Vasconcellos · Jardins, SP" />
                </div>
              </div>
            </div>

            {/* DNA Estratégico card */}
            <div className="card-surface rounded-[var(--radius)] p-6 flex flex-col overflow-hidden">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-[20px] text-kairos-charcoal font-medium" style={{ letterSpacing: "-0.02em" }}>
                  DNA <span className="italic-gold">estratégico</span>
                </h2>
                {/* Completion badge */}
                <span
                  className="mono-label shrink-0 mt-1 px-2 py-0.5 rounded-full"
                  style={{
                    background: "color-mix(in oklch, var(--gold) 10%, transparent)",
                    border: "1px solid color-mix(in oklch, var(--gold) 28%, transparent)",
                    color: "var(--gold-dark)",
                    fontSize: 9,
                  }}
                >
                  2/10 blocos
                </span>
              </div>
              <p className="text-[12px] text-kairos-stone mb-4">
                Quanto mais completo, mais precisa fica sua IA.
              </p>

              {/* Identity preview */}
              <div className="flex flex-col flex-1">
                {DNA_PREVIEW.map(({ l, v }, i) => (
                  <div
                    key={l}
                    className="flex justify-between items-center py-2.5"
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--line-soft)" }}
                  >
                    <span className="mono-label">{l}</span>
                    <span className="text-[13px] font-medium" style={{ color: "var(--ink-soft)" }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div
                className="mt-3 mb-4 relative overflow-hidden rounded-full"
                style={{ height: 2, background: "var(--line)" }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: "20%", background: "var(--gold)", transition: "width 0.6s ease" }}
                />
              </div>

              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => setDnaModalOpen(true)}
              >
                Completar DNA estratégico →
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Notificações ──────────────────────────────────────────────────── */}
        <TabsContent value="notifs" className="flex-1 min-h-0 mt-4 overflow-hidden">
          <div className="card-surface rounded-[var(--radius)] p-6 max-w-[720px] h-full overflow-hidden flex flex-col">
            <h2 className="text-[20px] text-kairos-charcoal mb-4 font-medium" style={{ letterSpacing: "-0.02em" }}>
              Notificações <span className="italic-gold">essenciais</span>
            </h2>
            <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll">
              {[
                { label: "Lembrete de gravação",      sub: "Manhã · 8:30",           defaultOn: true },
                { label: "Recalibração semanal",       sub: "Sexta · 17:00",          defaultOn: true },
                { label: "Nova lead captada",          sub: "Imediata",               defaultOn: true },
                { label: "Resumo de performance",      sub: "Domingo · 20:00",        defaultOn: false },
                { label: "Alerta de meta",             sub: "Quando abaixo de 60%",   defaultOn: true },
                { label: "Janela de curadoria aberta", sub: "Eventos especiais",       defaultOn: false },
              ].map((n) => <NotifRow key={n.label} {...n} />)}
            </div>
          </div>
        </TabsContent>

        {/* ── Integrações ───────────────────────────────────────────────────── */}
        <TabsContent value="integra" className="flex-1 min-h-0 mt-4 overflow-hidden">
          <div className="grid grid-cols-3 gap-3 h-full">
            {integrations.map(({ name, acc, status, icon: Icon }) => {
              const connected = status === "conectada";
              const pending   = status === "pendente";
              return (
                <div key={name} className="card-surface rounded-[var(--radius)] p-4 flex flex-col gap-2.5 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full border border-kairos-line inline-flex items-center justify-center text-kairos-charcoal/80">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.4} />
                    </span>
                    <span
                      className="mono-label inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                      style={{
                        fontSize: 9,
                        border: `1px solid ${connected ? "color-mix(in oklch, var(--gold) 40%, transparent)" : "var(--line)"}`,
                        color: connected ? "var(--gold-dark)" : "var(--mute)",
                      }}
                    >
                      {connected ? "◆ Conectada" : pending ? "Pendente" : "Desconectada"}
                    </span>
                  </div>
                  <div className="text-[15px] text-kairos-charcoal font-medium truncate" style={{ letterSpacing: "-0.01em" }}>
                    {name}
                  </div>
                  <div className="mono-label truncate" style={{ fontSize: 10 }}>{acc}</div>
                  <div className="hairline mt-auto" />
                  <button className="text-[11px] text-kairos-charcoal text-left hover:underline decoration-kairos-gold underline-offset-4">
                    {connected ? "Gerenciar →" : "Conectar →"}
                  </button>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── Conta ─────────────────────────────────────────────────────────── */}
        <TabsContent value="conta" className="flex-1 min-h-0 mt-4 overflow-hidden">
          <div className="max-w-[560px]">
            <div className="card-surface rounded-[var(--radius)] p-6 flex flex-col">
              <h2 className="text-[20px] text-kairos-charcoal mb-3 font-medium" style={{ letterSpacing: "-0.02em" }}>
                Assinatura <span className="italic-gold">Kairós</span>
              </h2>
              <div className="flex flex-col text-[13px]">
                <Row l="Plano"           v="Kairós · Sistema Completo" />
                <Row l="Próxima cobrança" v="15 maio 2026 · R$ 1.480" />
                <Row l="Método"          v="Cartão · final 4418" />
                <Row l="Ciclo"           v="Mensal · 8 meses em operação" />
                <Row l="Curadoria"       v="Confirmada · ciclo maio" />
              </div>
              <Button variant="outline" className="w-full justify-center mt-4">
                Gerenciar pagamento →
              </Button>
              <div className="mt-3 text-center">
                <button
                  onClick={() => setCancelModalOpen(true)}
                  className="text-[11px] text-kairos-stone/70 hover:text-kairos-stone transition-colors underline-offset-4 hover:underline"
                >
                  Cancelar assinatura
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CancelSubscriptionModal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)} />
      <DnaModal open={dnaModalOpen} onClose={() => setDnaModalOpen(false)} />
    </div>
  );
}
