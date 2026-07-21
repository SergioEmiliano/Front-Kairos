# Fluxo de planos e assinatura — modelo "pagamento primeiro"

**Data:** 2026-06-29
**Branch:** `redesign-front-login`
**Status:** Aprovado para implementação (fase mock — sem backend)

## Contexto e objetivo

A Kairós não tem self-signup: contas existem apenas como consequência de um
pagamento aprovado. Hoje o login da branch atual aponta o "Conhecer e assinar"
para uma **landing externa** (`NEXT_PUBLIC_LANDING_URL`). Na `main`, esse mesmo
ponto levava a uma rota interna `/cadastro` (planos + assinatura dentro do app).

Este spec recupera a **entrada de planos/assinatura dentro do app** — mantendo o
visual novo do login (mármore, medalhão, animação) — e a reconstrói no modelo
**pagamento primeiro**, com os 3 planos do plano de negócio.

> Nota sobre "rollback": a palavra usada pelo usuário não significa reverter o
> commit `dcefd55` (foi ele que adicionou o mármore que queremos manter).
> Significa restaurar a capacidade de assinar dentro do app que a `main` tinha.

### Decisões travadas

1. **Modelo: pagamento primeiro.** Conta só "nasce" depois do pagamento
   aprovado. Reaproveita o fluxo de primeiro-acesso (`firstAccessCompleted`) que
   já existe no `login/page.tsx` e no `auth.service`.
2. **3 planos**, fiéis ao plano de negócio (não os 2 da `main`).
3. **Escopo agora: UI + mock de checkout.** Sem backend; sem Asaas real. O loop
   ponta a ponta é simulado para ser demonstrável.
4. **Rota: `/planos`** (não `/cadastro`), porque não há formulário de cadastro no
   modelo pagamento-primeiro.

### Por que pagamento-primeiro (e não conta-primeiro como a `main`)

Com Asaas, Pix/boleto confirmam por **webhook assíncrono**. No modelo
conta-primeiro seria obrigatório gravar um registro pendente (com hash de senha e
PII) de quem talvez nunca pague — exatamente o "usuário não-liberado no sistema"
que queremos evitar, e exposição LGPD desnecessária. Pagamento-primeiro elimina
isso: nenhuma conta/PII antes do dinheiro entrar.

## Preços (fonte do plano de negócio)

| Plano | Mensal | Anual (por mês) | Para quem |
|-------|--------|------------------|-----------|
| Estudante | R$ 117 | R$ 99 | Doutora em formação construindo base de pacientes |
| Pro (destaque) | R$ 287 | R$ 269 | Clínica estabelecida em busca de escala previsível |
| Pro+ | R$ 647 | R$ 597 | Operação de maior porte / multi-perfil |

O plano anual é cobrado de uma vez, com desconto frente ao mensal. O preço do
Pro+ é "sugestão a definir pelos fundadores" — exibir normalmente, sem marcação
especial na UI.

## Fluxo (frontend, mock)

```
/login
  └─ CTA primário "Entrar na Kairós" (inalterado)
  └─ botão secundário "Conhecer planos e assinar" ──► /planos
/planos
  └─ 3 cards (Estudante / Pro destaque / Pro+) + toggle mensal/anual
  └─ "Assinar {plano}" ──► /checkout?plano=<id>&ciclo=<mensal|anual>
/checkout
  └─ resumo do plano escolhido + dados de cobrança simulados
  └─ "Pagar" (mock: delay + sempre aprova) ──► estado de sucesso
  └─ sucesso: "Pagamento aprovado — enviamos seu link de primeiro acesso"
        └─ botão simula o magic-link: autentica com firstAccessCompleted=false
           ──► /onboarding
```

Sem dado de cartão real em nenhuma etapa (princípio "zero dado de cartão na
Kairós" do plano de negócio). O checkout mock coleta apenas campos de fachada.

## Componentes e arquivos

Seguindo o padrão de **colocation** do projeto (componentes ao lado da rota que
os usa; reuso → `shared/`).

### Fonte única dos planos
- **`src/shared/lib/plans.ts`** — constante `PLANS` (id, nome, preços mensal/anual,
  label, features, flag `highlight`). Tipo `Plan` e `BillingCycle = "mensal" | "anual"`.
  Consumida por `/planos` e `/checkout`.

### Rota `/planos`
- **`src/app/(auth)/planos/page.tsx`** — server/client component que renderiza os
  3 cards e o toggle de ciclo; "Assinar" navega para `/checkout` com query params.
- **`src/app/(auth)/planos/components/PlanCard.tsx`** — card de um plano (preço
  conforme ciclo, features, destaque do Pro, CTA).
- **`src/app/(auth)/planos/components/BillingToggle.tsx`** — alterna mensal/anual.

### Rota `/checkout`
- **`src/app/(auth)/checkout/page.tsx`** — lê `plano`/`ciclo` da query, mostra
  resumo + formulário de cobrança simulado, dispara o mock de pagamento e troca
  para o estado de sucesso.
- **`src/app/(auth)/checkout/components/CheckoutSummary.tsx`** — resumo do plano +
  valor conforme ciclo.
- **`src/app/(auth)/checkout/components/PaymentSuccess.tsx`** — estado de sucesso +
  botão que simula o magic-link de primeiro acesso.

### Camada de serviço
- **`src/services/subscription.service.ts`** (novo) — segue o padrão
  `NEXT_PUBLIC_USE_MOCK`. Métodos:
  - `createSubscription({ planId, cycle, billing })` → mock: `delay`, retorna
    `{ success: true, subscriptionId, status: "active" }` (sempre aprova).
  - `simulateFirstAccessGrant()` → mock que devolve um `AuthResult` equivalente ao
    cenário `primeiroacesso@kairos.com` (token + `firstAccessCompleted: false`),
    usado pela tela de sucesso para entrar no app.

  Em produção (`USE_MOCK=false`), `createSubscription` chamaria
  `/api/subscriptions` e o provisionamento real viria por webhook do Asaas — fora
  do escopo desta fase.

### Login
- **`src/app/(auth)/login/page.tsx`** — substituir o bloco "Ainda não é Kairós?"
  com link externo por um botão **"Conhecer planos e assinar"** → `router.push("/planos")`.
  Manter `NEXT_PUBLIC_LANDING_URL` apenas para o caso `subscription_inactive`
  (reativação), que continua fazendo sentido externo.

### Estilo — mármore "muito leve"
- **`src/app/globals.css`** — suavizar `.bg-grain` (opacidade `0.08` → ~`0.05`) e
  reduzir a intensidade das nuvens tonais de `.bg-marble` (percentuais dos
  `color-mix` mais baixos). Mesma textura, presença menor. Sem novo asset.

### Documentação
- **`CLAUDE.md`** — já cita `/cadastro`; trocar a referência por `/planos` e
  `/checkout` na árvore de diretórios e na lista de rotas do grupo `(auth)`.

## Reuso do estado de auth existente

A tela de sucesso reusa o mecanismo já presente no `login/page.tsx`:

```
authService.setAuth(token)
setAuthenticated(true)
setFirstAccessCompleted(false)   // força onboarding
router.push("/onboarding")
```

`AuthResult` (em `auth.service.ts`) e o `app.store` já têm os campos necessários
(`firstAccessCompleted`, `setFirstAccessCompleted`). Nada de novo no store.

## Fora de escopo (fase futura, quando houver backend)

- Integração real com Asaas (checkout hospedado/transparente, tokenização).
- Webhook de confirmação de pagamento e provisionamento real da conta.
- Envio real do e-mail/magic-link de primeiro acesso.
- Rotas `/api/subscriptions`, `/api/auth/first-access`.
- Plano anual com lógica de cobrança única real / descontos calculados no backend.

## Tratamento de erros (mock)

- `/checkout` mock sempre aprova; expor um estado de "processando" (delay) e o
  sucesso. Um caminho de erro de pagamento fica para a fase com backend.
- `/planos` e `/checkout` com query param inválido/ausente → redirecionar para
  `/planos` (fallback seguro).

## Critérios de aceite

1. Login mostra mármore mais suave e o botão "Conhecer planos e assinar".
2. O botão leva a `/planos` com os 3 planos e toggle mensal/anual exibindo os
   preços corretos do plano de negócio.
3. "Assinar" leva a `/checkout` com o plano/ciclo certos no resumo.
4. "Pagar" (mock) leva ao estado de sucesso; o botão de primeiro acesso entra no
   app e cai no `/onboarding`.
5. `npm run lint` e `npm run build` passam.
