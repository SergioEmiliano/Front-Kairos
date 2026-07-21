# Fluxo de planos e assinatura (pagamento primeiro) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recuperar a assinatura dentro do app (modelo pagamento-primeiro, 3 planos) a partir do login, mantendo o visual com mármore — tudo em fase mock.

**Architecture:** Novas rotas `(auth)/planos` e `(auth)/checkout` seguindo o padrão de colocation. Uma fonte única de planos em `shared/lib/plans.ts`. Um `subscription.service.ts` mock que sempre aprova e devolve um grant de primeiro-acesso, reaproveitando o estado de auth (`firstAccessCompleted`) já existente para cair no `/onboarding`.

**Tech Stack:** Next.js 14 App Router, React client components, Tailwind + tokens Kairós (OKLCH), Zustand (`app.store`), lucide-react. Sem test runner.

## Global Constraints

- Sem self-signup: conta só "nasce" após pagamento aprovado (mock sempre aprova nesta fase).
- Sem dado de cartão real em nenhuma etapa (princípio "zero dado de cartão na Kairós").
- pt-BR em toda a copy.
- Usar tokens de cor Kairós (`paper`, `ink`, `gold`, `steel`, etc.) e utilitários (`.btn-gold`, `.card-surface`, `.mono-label`, `.italic-gold`) — nunca hex cru.
- Padrão de colocation: componentes de uma única rota ficam em `components/` ao lado do `page.tsx`; reuso em `shared/`.
- Serviços checam `NEXT_PUBLIC_USE_MOCK !== "false"`; o branch real (`/api/*`) fica como stub não exercitado nesta fase.
- **Preços (verbatim do plano de negócio):** Estudante R$ 117 mensal / R$ 99 anual · Pro R$ 287 / R$ 269 (destaque) · Pro+ R$ 647 / R$ 597.
- Verificação por task (não há testes automatizados): `npm run lint` e, ao final de tasks que tocam build/rotas, `npm run build`; checagem visual no dev server quando indicado.
- Mensagens de commit terminam com `Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t`.

---

## Mapa de arquivos

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/shared/lib/plans.ts` (criar) | Fonte única: tipo `Plan`, `BillingCycle`, constante `PLANS`, helper de preço |
| `src/services/subscription.service.ts` (criar) | Mock de criação de assinatura + grant de primeiro-acesso |
| `src/app/(auth)/planos/page.tsx` (criar) | Tela de planos: 3 cards + toggle de ciclo |
| `src/app/(auth)/planos/components/BillingToggle.tsx` (criar) | Alterna mensal/anual |
| `src/app/(auth)/planos/components/PlanCard.tsx` (criar) | Card de um plano |
| `src/app/(auth)/checkout/page.tsx` (criar) | Lê query, resumo + form simulado, mock de pagamento, sucesso |
| `src/app/(auth)/checkout/components/CheckoutSummary.tsx` (criar) | Resumo do plano/valor |
| `src/app/(auth)/checkout/components/PaymentSuccess.tsx` (criar) | Estado de sucesso + entrada via primeiro-acesso |
| `src/app/(auth)/login/page.tsx` (modificar) | Trocar link externo por botão → `/planos` |
| `src/app/globals.css` (modificar) | Suavizar `.bg-marble` / `.bg-grain` |
| `CLAUDE.md` (modificar) | `/cadastro` → `/planos` + `/checkout` |

---

### Task 1: Fonte única dos planos

**Files:**
- Create: `src/shared/lib/plans.ts`

**Interfaces:**
- Produces:
  - `type BillingCycle = "mensal" | "anual"`
  - `interface Plan { id: "estudante" | "pro" | "proPlus"; name: string; priceMensal: number; priceAnual: number; label: string; features: string[]; highlight?: boolean }`
  - `const PLANS: Plan[]`
  - `function priceForCycle(plan: Plan, cycle: BillingCycle): number`
  - `function getPlan(id: string): Plan | undefined`

- [ ] **Step 1: Criar o arquivo com tipos, dados e helpers**

```typescript
// Fonte única dos planos Kairós. Preços conforme o plano de negócio.
// Consumida por /planos e /checkout — não duplicar valores em outro lugar.

export type BillingCycle = "mensal" | "anual";

export type PlanId = "estudante" | "pro" | "proPlus";

export interface Plan {
  id: PlanId;
  name: string;
  priceMensal: number;
  priceAnual: number; // preço por mês no plano anual (cobrado de uma vez)
  label: string;
  features: string[];
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "estudante",
    name: "Estudante",
    priceMensal: 117,
    priceAnual: 99,
    label: "Para doutoras em formação construindo base de pacientes",
    features: [
      "Check-in de rotina e metas",
      "Calendário de conteúdo editorial",
      "Analytics básico de alcance",
      "Biblioteca de materiais",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMensal: 287,
    priceAnual: 269,
    label: "Para clínicas estabelecidas em busca de escala previsível",
    features: [
      "Tudo do Estudante",
      "Geração de conteúdo por IA",
      "Analytics completo (benchmarks e funil)",
      "Integrações: Instagram, WhatsApp, Calendar",
      "IA analista de performance",
    ],
    highlight: true,
  },
  {
    id: "proPlus",
    name: "Pro+",
    priceMensal: 647,
    priceAnual: 597,
    label: "Para operações de maior porte / multi-perfil",
    features: [
      "Tudo do Pro",
      "Múltiplos perfis / unidades",
      "Cota ampliada de geração por IA",
      "Suporte e consultoria estratégica prioritária",
    ],
  },
];

export function priceForCycle(plan: Plan, cycle: BillingCycle): number {
  return cycle === "anual" ? plan.priceAnual : plan.priceMensal;
}

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
```

- [ ] **Step 2: Verificar lint/tipos**

Run: `npm run lint`
Expected: sem erros novos no arquivo criado.

- [ ] **Step 3: Commit**

```bash
git add src/shared/lib/plans.ts
git commit -m "Feat: Fonte única dos 3 planos Kairós (preços do plano de negócio)

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 2: Serviço de assinatura (mock)

**Files:**
- Create: `src/services/subscription.service.ts`

**Interfaces:**
- Consumes: `BillingCycle`, `PlanId` de `@/shared/lib/plans`; `AuthResult` de `@/services/auth.service`.
- Produces:
  - `interface CreateSubscriptionInput { planId: PlanId; cycle: BillingCycle }`
  - `interface CreateSubscriptionResult { success: boolean; subscriptionId?: string; status?: "active" }`
  - `subscriptionService.createSubscription(input): Promise<CreateSubscriptionResult>`
  - `subscriptionService.simulateFirstAccessGrant(): Promise<AuthResult>`

- [ ] **Step 1: Criar o serviço seguindo o padrão USE_MOCK**

```typescript
import { delay } from "@/shared/lib/utils";
import type { BillingCycle, PlanId } from "@/shared/lib/plans";
import type { AuthResult } from "@/services/auth.service";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export interface CreateSubscriptionInput {
  planId: PlanId;
  cycle: BillingCycle;
}

export interface CreateSubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  status?: "active";
}

export const subscriptionService = {
  // Cria a assinatura. No mock sempre aprova; em produção chamaria
  // /api/subscriptions e o provisionamento real viria por webhook do Asaas.
  async createSubscription(
    input: CreateSubscriptionInput
  ): Promise<CreateSubscriptionResult> {
    if (USE_MOCK) {
      await delay(1400);
      return {
        success: true,
        subscriptionId: `sub_mock_${input.planId}_${input.cycle}`,
        status: "active",
      };
    }
    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return res.json();
  },

  // Simula o "primeiro acesso" liberado após o pagamento: equivalente ao
  // cenário primeiroacesso@kairos.com do auth.service (firstAccessCompleted=false).
  async simulateFirstAccessGrant(): Promise<AuthResult> {
    if (USE_MOCK) {
      await delay(400);
      return {
        success: true,
        token: "mock-jwt-token",
        userId: "dr-novo-acesso",
        name: "Dra. Marina Vasconcellos",
        subscriptionStatus: "active",
        firstAccessCompleted: false,
      };
    }
    const res = await fetch("/api/auth/first-access", { method: "POST" });
    return res.json();
  },
};
```

- [ ] **Step 2: Verificar lint/tipos**

Run: `npm run lint`
Expected: sem erros. Confirma que `AuthResult` é importável (export já existe em `auth.service.ts:17`).

- [ ] **Step 3: Commit**

```bash
git add src/services/subscription.service.ts
git commit -m "Feat: subscription.service mock (criar assinatura + grant de primeiro acesso)

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 3: BillingToggle

**Files:**
- Create: `src/app/(auth)/planos/components/BillingToggle.tsx`

**Interfaces:**
- Consumes: `BillingCycle` de `@/shared/lib/plans`.
- Produces: `function BillingToggle({ value, onChange }: { value: BillingCycle; onChange: (c: BillingCycle) => void })`

- [ ] **Step 1: Criar o componente**

```tsx
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
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/planos/components/BillingToggle.tsx"
git commit -m "Feat: BillingToggle mensal/anual da tela de planos

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 4: PlanCard

**Files:**
- Create: `src/app/(auth)/planos/components/PlanCard.tsx`

**Interfaces:**
- Consumes: `Plan`, `BillingCycle`, `priceForCycle` de `@/shared/lib/plans`.
- Produces: `function PlanCard({ plan, cycle, onSubscribe }: { plan: Plan; cycle: BillingCycle; onSubscribe: (plan: Plan) => void })`

- [ ] **Step 1: Criar o componente**

```tsx
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
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros. Confirme que `GoldButton` aceita `onClick`/`fullWidth`/`type` (já usado assim em `login/page.tsx:301`).

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/planos/components/PlanCard.tsx"
git commit -m "Feat: PlanCard da tela de planos

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 5: Página /planos

**Files:**
- Create: `src/app/(auth)/planos/page.tsx`

**Interfaces:**
- Consumes: `PLANS`, `Plan`, `BillingCycle` de `@/shared/lib/plans`; `BillingToggle`, `PlanCard`.

- [ ] **Step 1: Criar a página**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PLANS, type Plan, type BillingCycle } from "@/shared/lib/plans";
import { KairosLogo } from "@/shared/components/KairosLogo";
import { LoginBackdrop } from "@/app/(auth)/login/components/LoginBackdrop";
import { BillingToggle } from "./components/BillingToggle";
import { PlanCard } from "./components/PlanCard";

export default function PlanosPage() {
  const router = useRouter();
  const [cycle, setCycle] = useState<BillingCycle>("mensal");

  function handleSubscribe(plan: Plan) {
    router.push(`/checkout?plano=${plan.id}&ciclo=${cycle}`);
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-kairos-paper">
      <LoginBackdrop />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 gap-8">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="self-start inline-flex items-center gap-1.5 text-xs text-kairos-stone hover:text-kairos-charcoal transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao login
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <KairosLogo markOnly className="!h-12 !w-12" />
          <h1 className="text-[28px] font-medium text-kairos-charcoal leading-tight">
            Escolha seu <span className="italic-gold">plano</span>
          </h1>
          <p className="text-sm text-kairos-stone max-w-md">
            Sua conta é criada após a confirmação do pagamento. Você recebe um
            link de primeiro acesso para começar.
          </p>
          <BillingToggle value={cycle} onChange={setCycle} />
        </div>

        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar build e rota**

Run: `npm run build`
Expected: build passa; rota `/planos` aparece na listagem do Next.

- [ ] **Step 3: Verificação visual**

Run: `npm run dev` e abrir `http://localhost:3000/planos`
Expected: 3 cards (Pro destacado), toggle troca os preços (mensal 117/287/647 → anual 99/269/597), "Voltar ao login" funciona.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(auth)/planos/page.tsx"
git commit -m "Feat: Tela /planos com 3 planos e toggle de ciclo

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 6: CheckoutSummary

**Files:**
- Create: `src/app/(auth)/checkout/components/CheckoutSummary.tsx`

**Interfaces:**
- Consumes: `Plan`, `BillingCycle`, `priceForCycle` de `@/shared/lib/plans`.
- Produces: `function CheckoutSummary({ plan, cycle }: { plan: Plan; cycle: BillingCycle })`

- [ ] **Step 1: Criar o componente**

```tsx
import type { Plan, BillingCycle } from "@/shared/lib/plans";
import { priceForCycle } from "@/shared/lib/plans";

export function CheckoutSummary({
  plan,
  cycle,
}: {
  plan: Plan;
  cycle: BillingCycle;
}) {
  const price = priceForCycle(plan, cycle);
  const total = cycle === "anual" ? price * 12 : price;
  return (
    <div className="card-surface flex flex-col gap-4 p-6">
      <span className="mono-label">Resumo da assinatura</span>
      <div className="flex items-center justify-between">
        <span className="text-kairos-charcoal font-medium">Plano {plan.name}</span>
        <span className="text-xs text-kairos-stone capitalize">{cycle}</span>
      </div>
      <p className="text-xs text-kairos-stone leading-snug">{plan.label}</p>
      <div className="dotted-rule my-1 text-kairos-line" />
      <div className="flex items-end justify-between">
        <span className="text-sm text-kairos-stone">
          {cycle === "anual" ? "Cobrança anual" : "Cobrança mensal"}
        </span>
        <span className="text-2xl font-medium text-kairos-charcoal">
          R$ {total}
          {cycle === "anual" && (
            <span className="text-xs text-kairos-stone ml-1">/ano</span>
          )}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/checkout/components/CheckoutSummary.tsx"
git commit -m "Feat: CheckoutSummary com resumo do plano e valor

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 7: PaymentSuccess

**Files:**
- Create: `src/app/(auth)/checkout/components/PaymentSuccess.tsx`

**Interfaces:**
- Consumes: `subscriptionService.simulateFirstAccessGrant` de `@/services/subscription.service`; `authService.setAuth`; `useAppStore` (`setAuthenticated`, `setFirstAccessCompleted`).
- Produces: `function PaymentSuccess()`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { subscriptionService } from "@/services/subscription.service";
import { authService } from "@/services/auth.service";
import { useAppStore } from "@/store/app.store";
import { GoldButton } from "@/shared/components/GoldButton";

export function PaymentSuccess() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setFirstAccessCompleted = useAppStore((s) => s.setFirstAccessCompleted);
  const [loading, setLoading] = useState(false);

  // Simula o magic-link de primeiro acesso: provisiona a sessão e leva ao
  // onboarding (firstAccessCompleted=false), reusando o estado de auth.
  async function handleFirstAccess() {
    setLoading(true);
    const grant = await subscriptionService.simulateFirstAccessGrant();
    if (grant.success && grant.token) {
      authService.setAuth(grant.token);
      setAuthenticated(true);
      setFirstAccessCompleted(grant.firstAccessCompleted ?? false);
      router.push("/onboarding");
      return;
    }
    setLoading(false);
  }

  return (
    <div className="card-surface flex flex-col items-center gap-5 p-10 text-center max-w-md">
      <CheckCircle2 className="h-12 w-12" style={{ color: "var(--gold-dark)" }} />
      <h2 className="text-2xl font-medium text-kairos-charcoal">
        Pagamento <span className="italic-gold">aprovado</span>
      </h2>
      <p className="text-sm text-kairos-stone leading-relaxed">
        Sua conta foi criada. Enviamos um link de primeiro acesso para o seu
        e-mail. (Nesta versão de demonstração, use o botão abaixo.)
      </p>
      <GoldButton
        type="button"
        fullWidth
        disabled={loading}
        onClick={handleFirstAccess}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Preparando…
          </span>
        ) : (
          <>
            Acessar e configurar minha conta <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </GoldButton>
    </div>
  );
}
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros. Confirme nomes do store (`setAuthenticated`, `setFirstAccessCompleted`) — definidos em `app.store.ts:14-15`.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/checkout/components/PaymentSuccess.tsx"
git commit -m "Feat: PaymentSuccess que entra via primeiro acesso

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 8: Página /checkout

**Files:**
- Create: `src/app/(auth)/checkout/page.tsx`

**Interfaces:**
- Consumes: `getPlan`, `BillingCycle` de `@/shared/lib/plans`; `subscriptionService.createSubscription`; `CheckoutSummary`; `PaymentSuccess`; `LoginBackdrop`.

- [ ] **Step 1: Criar a página**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { getPlan, type BillingCycle } from "@/shared/lib/plans";
import { subscriptionService } from "@/services/subscription.service";
import { LoginBackdrop } from "@/app/(auth)/login/components/LoginBackdrop";
import { GoldButton } from "@/shared/components/GoldButton";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentSuccess } from "./components/PaymentSuccess";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = getPlan(params.get("plano") ?? "");
  const cycleParam = params.get("ciclo");
  const cycle: BillingCycle = cycleParam === "anual" ? "anual" : "mensal";

  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  // Query inválida/ausente → volta para a seleção de planos.
  useEffect(() => {
    if (!plan) router.replace("/planos");
  }, [plan, router]);

  if (!plan) return null;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setPaying(true);
    const result = await subscriptionService.createSubscription({
      planId: plan.id,
      cycle,
    });
    if (result.success) {
      setPaid(true);
      return;
    }
    setPaying(false);
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-kairos-paper">
      <LoginBackdrop />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 gap-8">
        {paid ? (
          <PaymentSuccess />
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-6">
            <button
              type="button"
              onClick={() => router.push("/planos")}
              className="self-start inline-flex items-center gap-1.5 text-xs text-kairos-stone hover:text-kairos-charcoal transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Trocar de plano
            </button>

            <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
              <CheckoutSummary plan={plan} cycle={cycle} />

              <form onSubmit={handlePay} className="card-surface flex flex-col gap-4 p-6">
                <span className="mono-label">Dados de cobrança</span>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="nome" className="mono-label">Nome completo</Label>
                  <Input id="nome" placeholder="Dra. Marina Vasconcellos" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="mono-label">E-mail profissional</Label>
                  <Input id="email" type="email" placeholder="dra.marina@clinica.com.br" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cpf" className="mono-label">CPF</Label>
                  <Input id="cpf" inputMode="numeric" placeholder="000.000.000-00" required />
                </div>

                <p className="text-[11px] text-kairos-stone flex items-center gap-1.5 leading-snug">
                  <Lock className="h-3 w-3 shrink-0" />
                  Pagamento processado pelo Asaas. A Kairós não armazena dados de cartão.
                </p>

                <GoldButton type="submit" fullWidth disabled={paying} className="btn-glow mt-1">
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Processando pagamento…
                    </span>
                  ) : (
                    "Pagar e criar minha conta"
                  )}
                </GoldButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build passa; rotas `/checkout` e `/planos` listadas. Se o Next reclamar de `useSearchParams` sem Suspense no build, envolver o conteúdo num `<Suspense>` — registrar e aplicar.

- [ ] **Step 3: Verificação visual do fluxo completo**

Run: `npm run dev`, navegar `/planos` → Assinar → `/checkout` → Pagar → sucesso → "Acessar e configurar"
Expected: cai em `/onboarding`. Acessar `/checkout` sem query → redireciona para `/planos`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(auth)/checkout/page.tsx"
git commit -m "Feat: Tela /checkout mock (pagamento primeiro) com sucesso e fallback

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 9: Entrada no login → /planos

**Files:**
- Modify: `src/app/(auth)/login/page.tsx:316-327` (bloco "Ainda não é Kairós?")

**Interfaces:**
- Consumes: `router` (já presente na página).

- [ ] **Step 1: Substituir o link externo por botão → /planos**

Localizar o bloco atual (login/page.tsx ~316-327):

```tsx
              <div className="stg flex flex-col items-center gap-1.5 text-center" style={delay("0.42s")}>
                <span className="mono-label">Ainda não é Kairós?</span>
                <a
                  href={LANDING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif-display italic text-[18px] text-kairos-charcoal hover:underline decoration-kairos-gold underline-offset-4"
                >
                  <span className="italic-gold">Conhecer e assinar</span> →
                </a>
              </div>
```

Substituir por:

```tsx
              <div className="stg flex flex-col items-center gap-1.5 text-center" style={delay("0.42s")}>
                <span className="mono-label">Ainda não é Kairós?</span>
                <button
                  type="button"
                  onClick={() => router.push("/planos")}
                  className="font-serif-display italic text-[18px] text-kairos-charcoal hover:underline decoration-kairos-gold underline-offset-4"
                >
                  <span className="italic-gold">Conhecer planos e assinar</span> →
                </button>
              </div>
```

Manter `LANDING_URL` no arquivo — ainda é usado no erro `subscription_inactive` (login/page.tsx:289).

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros; `LANDING_URL` continua referenciado (sem `no-unused-vars`).

- [ ] **Step 3: Verificação visual**

Run: `npm run dev`, abrir `/login`, clicar "Conhecer planos e assinar"
Expected: navega para `/planos`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(auth)/login/page.tsx"
git commit -m "Feat: Botão 'Conhecer planos e assinar' leva a /planos (in-app)

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 10: Mármore "muito leve"

**Files:**
- Modify: `src/app/globals.css:543-558` (`.bg-grain` e `.bg-marble`)

- [ ] **Step 1: Suavizar grão e nuvens tonais**

Em `.bg-grain`, reduzir a opacidade base:

```css
  .bg-grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 110px 110px;
    opacity: 0.05;
  }
  .dark .bg-grain, .theme-dark .bg-grain { opacity: 0.09; }
```

Em `.bg-marble`, baixar os percentuais dos `color-mix` (nuvens mais discretas):

```css
  .bg-marble {
    background-color: var(--paper);
    background-image:
      radial-gradient(60% 50% at 22% 26%, color-mix(in oklch, var(--paper-warm) 38%, transparent), transparent 70%),
      radial-gradient(55% 48% at 80% 74%, color-mix(in oklch, var(--paper-warm) 30%, transparent), transparent 72%),
      radial-gradient(46% 42% at 66% 16%, color-mix(in oklch, var(--gold) 4%, transparent), transparent 68%),
      radial-gradient(50% 46% at 28% 82%, color-mix(in oklch, var(--gold) 3%, transparent), transparent 70%);
  }
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build passa.

- [ ] **Step 3: Verificação visual**

Run: `npm run dev`, abrir `/login` e `/planos`
Expected: mármore visivelmente mais suave, sem perder a textura.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "Style: Suaviza mármore e grão do fundo de autenticação

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 11: Atualizar CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (linha 22 da lista de rotas `(auth)` e linhas 57-58 da árvore de diretórios)

- [ ] **Step 1: Trocar `/cadastro` por `/planos` e `/checkout`**

Na lista de rotas do grupo `(auth)` (linha ~22):

```
- `(auth)` — `/login`, `/planos`, `/checkout`, `/onboarding` (6-step wizard)
```

Na árvore de diretórios, substituir a linha `cadastro/page.tsx` (linhas ~57-58) por:

```
      planos/
        page.tsx
        components/                 # BillingToggle, PlanCard
      checkout/
        page.tsx
        components/                 # CheckoutSummary, PaymentSuccess
      onboarding/
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Docs: Atualiza CLAUDE.md com rotas /planos e /checkout

Claude-Session: https://claude.ai/code/session_01PuAh8YuGqkSCD2npGBE17t"
```

---

### Task 12: Verificação final ponta a ponta

**Files:** nenhum (verificação).

- [ ] **Step 1: Lint + build limpos**

Run: `npm run lint && npm run build`
Expected: ambos passam sem erros.

- [ ] **Step 2: Fluxo completo no dev server**

Run: `npm run dev`
Percorrer: `/login` → "Conhecer planos e assinar" → `/planos` (trocar mensal/anual, conferir preços) → "Assinar Pro" → `/checkout` (resumo Pro correto) → preencher e "Pagar e criar minha conta" → sucesso → "Acessar e configurar" → `/onboarding`.
Conferir também: mármore suave; `/checkout` sem query redireciona a `/planos`.
Expected: todo o caminho funciona; nenhum erro no console.

- [ ] **Step 3: Sem commit** (nada a alterar se tudo passou).

---

## Self-Review

**Cobertura do spec:**
- Mármore leve → Task 10 ✓
- Botão "Conhecer planos e assinar" → Task 9 ✓
- `/planos` 3 planos + toggle, preços corretos → Tasks 1, 3, 4, 5 ✓
- `/checkout` mock + resumo + sucesso → Tasks 6, 7, 8 ✓
- Fluxo primeiro-acesso → Task 7 (reusa store/auth existentes) ✓
- Fonte única de planos → Task 1 ✓
- Serviço de assinatura mock → Task 2 ✓
- CLAUDE.md `/cadastro` → `/planos` → Task 11 ✓
- Critérios de aceite do spec → Task 12 ✓
- Fora de escopo (Asaas real, webhooks, APIs, e-mail real) → mantido fora; branch real deixado como stub não exercitado ✓

**Placeholders:** nenhum "TBD/TODO"; todo passo de código mostra o código.

**Consistência de tipos:** `Plan`/`BillingCycle`/`priceForCycle`/`getPlan` (Task 1) usados consistentemente em 4, 5, 6, 8. `AuthResult` reusado de `auth.service.ts`. `createSubscription`/`simulateFirstAccessGrant` (Task 2) batem com o uso em 7 e 8. Nomes do store (`setAuthenticated`, `setFirstAccessCompleted`) conferem com `app.store.ts`.
