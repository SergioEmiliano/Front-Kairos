"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Check,
  Lock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { KairosLogo } from "@/components/common/KairosLogo";
import { GoldButton } from "@/components/common/GoldButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { useAppStore } from "@/store/app.store";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Step = "conta" | "plano" | "pagamento" | "confirmacao";

const STEPS: { id: Step; label: string }[] = [
  { id: "conta", label: "Conta" },
  { id: "plano", label: "Plano" },
  { id: "pagamento", label: "Pagamento" },
  { id: "confirmacao", label: "Pronto" },
];

// ─── Schemas ───────────────────────────────────────────────────────────────────

const contaSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(8, "Mínimo 8 caracteres"),
    confirmaSenha: z.string(),
  })
  .refine((d) => d.senha === d.confirmaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmaSenha"],
  });

const pagamentoSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato: 000.000.000-00"),
  telefone: z
    .string()
    .min(14, "Telefone inválido")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (00) 00000-0000"),
});

type ContaForm = z.infer<typeof contaSchema>;
type PagamentoForm = z.infer<typeof pagamentoSchema>;

// ─── Plans ─────────────────────────────────────────────────────────────────────

interface Plan {
  id: string;
  name: string;
  price: number;
  label: string;
  features: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "estudante",
    name: "Estudante",
    price: 197,
    label: "Para médicas em formação e residência",
    features: [
      "Calendário de conteúdo editorial",
      "Análises mensais de alcance",
      "1 perfil do Instagram conectado",
      "Check-in semanal guiado",
      "Suporte por e-mail",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 497,
    label: "Para médicas estéticas em plena atividade",
    features: [
      "Tudo do Estudante",
      "Analista IA com métricas em tempo real",
      "Benchmarks anônimos com pares",
      "Diagnóstico de Reels + hook score",
      "Funil de receita DM → agenda",
      "Suporte prioritário",
    ],
    highlight: true,
  },
];

// ─── StepBar ───────────────────────────────────────────────────────────────────

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-start gap-0 mb-7">
      {STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-all shrink-0",
                  done && "text-kairos-paper",
                  active && "border-2",
                  !done && !active && "border"
                )}
                style={{
                  background: done ? "var(--ink)" : "transparent",
                  borderColor: active
                    ? "var(--gold)"
                    : done
                    ? "var(--ink)"
                    : "var(--line)",
                  color: active ? "var(--gold-dark)" : undefined,
                }}
              >
                {done ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              </div>
              <span
                className="text-[9px] uppercase tracking-widest font-medium whitespace-nowrap"
                style={{
                  color: active
                    ? "var(--gold-dark)"
                    : done
                    ? "var(--ink)"
                    : "color-mix(in oklch, var(--mute) 60%, transparent)",
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-2 mb-4"
                style={{ background: i < idx ? "var(--ink)" : "var(--line)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PlanCard ──────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200",
        selected
          ? "border-kairos-gold-dark bg-kairos-paper-warm/40"
          : "border-kairos-line hover:border-kairos-gold/50",
        plan.highlight && !selected && "border-kairos-gold/35"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[14px] font-medium text-kairos-charcoal">
              {plan.name}
            </span>
            {plan.highlight && (
              <span
                className="mono-label px-2 py-0.5 rounded-full leading-none"
                style={{
                  background: "var(--gold)",
                  color: "var(--paper)",
                  fontSize: 8,
                }}
              >
                ◆ POPULAR
              </span>
            )}
          </div>
          <span className="text-[10px] text-kairos-stone uppercase tracking-wider">
            {plan.label}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div
            className="text-[22px] font-medium text-kairos-charcoal leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            R${plan.price}
          </div>
          <div className="text-[9px] text-kairos-stone mt-0.5">/mês</div>
        </div>
      </div>

      <ul className="flex flex-col gap-1 mb-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-1.5 text-[11.5px] text-kairos-charcoal/75 leading-snug"
          >
            <span
              className="shrink-0 mt-px"
              style={{ color: "var(--gold-dark)", fontSize: 9 }}
            >
              ◆
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
          style={{
            borderColor: selected ? "var(--ink)" : "var(--line)",
            background: selected ? "var(--ink)" : "transparent",
          }}
        >
          {selected && (
            <Check className="h-2.5 w-2.5" style={{ color: "var(--paper)" }} />
          )}
        </div>
      </div>
    </button>
  );
}

// ─── CPF / Phone formatters ────────────────────────────────────────────────────

function formatCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CadastroPage() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);

  const [step, setStep] = useState<Step>("conta");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [contaData, setContaData] = useState<ContaForm | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Conta form
  const {
    register: regConta,
    handleSubmit: submitConta,
    formState: { errors: errConta },
  } = useForm<ContaForm>({ resolver: zodResolver(contaSchema) });

  // ── Pagamento form
  const {
    register: regPag,
    handleSubmit: submitPag,
    setValue: setPagValue,
    formState: { errors: errPag },
  } = useForm<PagamentoForm>({ resolver: zodResolver(pagamentoSchema) });

  // ── Handlers
  function onContaSubmit(data: ContaForm) {
    setContaData(data);
    setStep("plano");
  }

  async function onPagamentoSubmit(_data: PagamentoForm) {
    setLoading(true);
    /**
     * TODO — integração real com Abacate Pay:
     *
     * 1. POST /v1/customer/create  { name, email, taxId (CPF), cellphone }
     *    → recebe { data: { id: customerId } }
     *
     * 2. POST /v2/checkouts/create {
     *      items: [{ id: PRODUCT_ID_DO_PLANO, quantity: 1 }],
     *      customerId,
     *      completionUrl: `${window.location.origin}/cadastro?step=confirmacao`,
     *      returnUrl: `${window.location.origin}/cadastro`,
     *    }
     *    → recebe { data: { url: checkoutUrl } }
     *
     * 3. window.location.href = checkoutUrl  ← redireciona para página da AbacatePay
     */
    await new Promise((r) => setTimeout(r, 1500)); // mock
    setLoading(false);
    setStep("confirmacao");
  }

  async function onEntrar() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    authService.setAuth("mock-token-new-user");
    setAuthenticated(true);
    router.push("/onboarding");
  }

  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* ── Top chrome ── */}
      <div className="px-8 py-5 flex items-center justify-between shrink-0">
        <KairosLogo size="sm" />
        <span
          className="mono-label mono-label-wide inline-flex items-center gap-2"
          style={{ color: "var(--gold-dark)" }}
        >
          ◆ NOVA CONTA · KAIRÓS
        </span>
      </div>
      <div className="hairline shrink-0" />

      {/* ── Scrollable body ── */}
      <div className="flex-1 min-h-0 overflow-y-auto kairos-scroll">
        <div className="grid place-items-center p-6 min-h-full">

          {/* ════ STEP 1: CONTA ════ */}
          {step === "conta" && (
            <div className="card-surface w-full max-w-[480px] p-8 animate-fade-in">
              <StepBar current="conta" />

              <span className="kicker">Passo 1 de 4</span>
              <h1
                className="text-[28px] text-kairos-charcoal leading-[1.08] font-medium mt-2 mb-1"
                style={{ letterSpacing: "-0.025em" }}
              >
                Crie sua{" "}
                <span className="italic-gold font-medium">conta</span>.
              </h1>
              <p className="text-[13.5px] text-kairos-charcoal/70 leading-[1.55] mb-5">
                Apenas o essencial para começar. Sem burocracia.
              </p>

              <form
                onSubmit={submitConta(onContaSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nome" className="mono-label">
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Dra. Marina Vasconcellos"
                    {...regConta("nome")}
                  />
                  {errConta.nome && (
                    <p className="text-xs text-red-600">{errConta.nome.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="mono-label">
                    E-mail profissional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="dra.marina@clinica.com.br"
                    {...regConta("email")}
                  />
                  {errConta.email && (
                    <p className="text-xs text-red-600">{errConta.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="senha" className="mono-label">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Mínimo 8 caracteres"
                      className="pr-10"
                      {...regConta("senha")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-kairos-stone hover:text-kairos-charcoal transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errConta.senha && (
                    <p className="text-xs text-red-600">{errConta.senha.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirma" className="mono-label">
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirma"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repita a senha"
                      className="pr-10"
                      {...regConta("confirmaSenha")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-kairos-stone hover:text-kairos-charcoal transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errConta.confirmaSenha && (
                    <p className="text-xs text-red-600">
                      {errConta.confirmaSenha.message}
                    </p>
                  )}
                </div>

                <GoldButton type="submit" fullWidth className="mt-2">
                  Continuar <ArrowRight className="h-3.5 w-3.5" />
                </GoldButton>

                <div className="dotted-rule my-1" />

                <p className="text-center text-[12px] text-kairos-stone">
                  Já tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-kairos-charcoal border-b border-kairos-line hover:border-kairos-charcoal transition-colors"
                  >
                    Entrar na Kairós →
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* ════ STEP 2: PLANO ════ */}
          {step === "plano" && (
            <div className="card-surface w-full max-w-[500px] p-8 animate-fade-in">
              <StepBar current="plano" />

              <span className="kicker">Passo 2 de 4</span>
              <h1
                className="text-[28px] text-kairos-charcoal leading-[1.08] font-medium mt-2 mb-1"
                style={{ letterSpacing: "-0.025em" }}
              >
                Escolha seu{" "}
                <span className="italic-gold font-medium">plano</span>.
              </h1>
              <p className="text-[13.5px] text-kairos-charcoal/70 leading-[1.55] mb-5">
                Cancele quando quiser, sem fidelidade.
              </p>

              <div className="flex flex-col gap-3 mb-5">
                {PLANS.map((p) => (
                  <PlanCard
                    key={p.id}
                    plan={p}
                    selected={selectedPlan === p.id}
                    onSelect={() => setSelectedPlan(p.id)}
                  />
                ))}
              </div>

              <GoldButton fullWidth onClick={() => setStep("pagamento")}>
                Continuar com {plan.name} — R${plan.price}/mês{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </GoldButton>

              <button
                type="button"
                onClick={() => setStep("conta")}
                className="block w-full text-center text-[12px] text-kairos-stone hover:text-kairos-charcoal transition-colors mt-3"
              >
                ← Voltar
              </button>
            </div>
          )}

          {/* ════ STEP 3: PAGAMENTO ════ */}
          {step === "pagamento" && (
            <div className="card-surface w-full max-w-[480px] p-8 animate-fade-in">
              <StepBar current="pagamento" />

              <span className="kicker">Passo 3 de 4</span>
              <h1
                className="text-[28px] text-kairos-charcoal leading-[1.08] font-medium mt-2 mb-1"
                style={{ letterSpacing: "-0.025em" }}
              >
                Seus{" "}
                <span className="italic-gold font-medium">dados</span>.
              </h1>

              {/* Resumo do plano */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl mb-5 mt-4"
                style={{
                  background: "var(--paper-warm)",
                  border: "1px solid var(--line)",
                }}
              >
                <div>
                  <p className="text-[13px] font-medium text-kairos-charcoal">
                    Plano {plan.name}
                  </p>
                  <p className="text-[11px] text-kairos-stone mt-0.5">
                    R${plan.price}/mês · sem fidelidade
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("plano")}
                  className="text-[11px] text-kairos-stone border-b border-kairos-line hover:text-kairos-charcoal hover:border-kairos-charcoal transition-colors"
                >
                  Trocar
                </button>
              </div>

              <form
                onSubmit={submitPag(onPagamentoSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Nome e e-mail vêm do step 1 — só mostramos confirmação */}
                <div
                  className="px-4 py-3 rounded-xl flex flex-col gap-1"
                  style={{
                    background: "var(--paper-surface)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span className="mono-label mb-0.5">Dados da conta</span>
                  <p className="text-[12px] text-kairos-charcoal">
                    {contaData?.nome}
                  </p>
                  <p className="text-[12px] text-kairos-stone">
                    {contaData?.email}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cpf" className="mono-label">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    {...regPag("cpf")}
                    onChange={(e) =>
                      setPagValue("cpf", formatCPF(e.target.value))
                    }
                  />
                  {errPag.cpf && (
                    <p className="text-xs text-red-600">{errPag.cpf.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="telefone" className="mono-label">
                    Telefone / WhatsApp
                  </Label>
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    {...regPag("telefone")}
                    onChange={(e) =>
                      setPagValue("telefone", formatPhone(e.target.value))
                    }
                  />
                  {errPag.telefone && (
                    <p className="text-xs text-red-600">
                      {errPag.telefone.message}
                    </p>
                  )}
                </div>

                {/* Aviso sobre redirecionamento */}
                <div
                  className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl text-[11.5px] text-kairos-charcoal/75 leading-[1.5]"
                  style={{
                    background: "color-mix(in oklch, var(--gold) 6%, var(--paper-surface))",
                    border: "1px solid color-mix(in oklch, var(--gold) 30%, transparent)",
                  }}
                >
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--gold-dark)" }}
                  />
                  <span>
                    Ao continuar você será redirecionada para o ambiente seguro da{" "}
                    <strong className="text-kairos-charcoal">AbacatePay</strong>{" "}
                    para concluir o pagamento via PIX ou cartão.
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10.5px] text-kairos-stone"
                  style={{
                    background: "var(--paper-surface)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <Lock
                    className="h-3 w-3 shrink-0"
                    style={{ color: "var(--gold-dark)" }}
                  />
                  Conexão criptografada com SSL · Dados protegidos
                </div>

                <GoldButton
                  type="submit"
                  fullWidth
                  disabled={loading}
                  className="mt-1"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Aguarde…
                    </span>
                  ) : (
                    <>
                      Ir para pagamento{" "}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </GoldButton>

                <button
                  type="button"
                  onClick={() => setStep("plano")}
                  className="block w-full text-center text-[12px] text-kairos-stone hover:text-kairos-charcoal transition-colors"
                >
                  ← Voltar
                </button>
              </form>
            </div>
          )}

          {/* ════ STEP 4: CONFIRMAÇÃO ════ */}
          {step === "confirmacao" && (
            <div className="card-surface w-full max-w-[480px] p-8 animate-fade-in">
              <StepBar current="confirmacao" />

              <div className="flex flex-col items-center text-center gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "color-mix(in oklch, var(--gold) 12%, transparent)",
                    border:
                      "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
                  }}
                >
                  <Sparkles
                    className="h-7 w-7"
                    style={{ color: "var(--gold-dark)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="kicker">Conta criada</span>
                  <h1
                    className="text-[28px] text-kairos-charcoal leading-[1.08] font-medium"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    Bem-vinda à{" "}
                    <span className="italic-gold font-medium">Kairós</span>.
                  </h1>
                  <p className="text-[13.5px] text-kairos-charcoal/70 leading-[1.6]">
                    Pagamento confirmado. Seu plano{" "}
                    <strong className="text-kairos-charcoal">{plan.name}</strong>{" "}
                    está ativo.
                  </p>
                </div>

                <div
                  className="w-full text-left px-5 py-4 rounded-xl flex flex-col gap-2.5"
                  style={{
                    background: "var(--paper-warm)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span className="mono-label">Resumo da sua conta</span>
                  {[
                    { label: "E-mail", value: contaData?.email ?? "—" },
                    { label: "Plano", value: `${plan.name} · R$${plan.price}/mês` },
                    { label: "Ciclo ativo", value: "Maio 2026" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-[12px]"
                    >
                      <span className="text-kairos-stone">{row.label}</span>
                      <span className="text-kairos-charcoal font-medium">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <GoldButton fullWidth disabled={loading} onClick={onEntrar}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando…
                    </span>
                  ) : (
                    <>
                      Entrar na plataforma{" "}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </GoldButton>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Footer band ── */}
      <div className="hairline shrink-0" />
      <div className="px-8 py-4 flex items-center justify-between shrink-0">
        <span className="mono-label">◆ KAIRÓS · 2026</span>
        <div className="flex items-center gap-1.5">
          <Lock className="h-3 w-3" style={{ color: "var(--gold-dark)" }} />
          <span className="mono-label">PAGAMENTO SEGURO · ABACATEPAY</span>
        </div>
      </div>
    </div>
  );
}
