# Reestruturação da Arquitetura do Frontend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar `src/` para colocation por página dentro do `app/`, com uma camada `shared/` (components, ui, lib, types, mock), mantendo o app funcional.

**Architecture:** Mudança puramente estrutural (movimentação de arquivos + reescrita de imports). O route group `(app)` vira `(plataform)`. Componentes usados por uma única página são colocados ao lado dela; o resto vai para `shared/`. O alias `@/* → src/*` é mantido; só os caminhos após `@/` mudam.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Zustand. Sem test runner — a **verificação é `npx tsc --noEmit` (deve permanecer 0 erros)** após cada task, com `npm run build` + `npm run lint` no final.

---

## Convenções de verificação

- Baseline confirmado antes de iniciar: `npx tsc --noEmit` retorna **0 erros**.
- Após **cada** task: rodar `npx tsc --noEmit` → deve continuar **0 erros**.
- Usar `git mv` para preservar histórico.
- Reescrita de imports em massa via `grep -rl ... | xargs sed -i`. Sempre restringir a `src/`.
- Commits frequentes (um por task).

## File Structure (estado final)

```
src/
  app/
    layout.tsx, page.tsx
    (auth)/{login,cadastro}/page.tsx
    (auth)/onboarding/{page.tsx, components/}
    (plataform)/{layout.tsx, components/}
    (plataform)/dashboard/{page.tsx, components/, types/}
    (plataform)/dashboard/{analytics,settings}/{page.tsx, components/}
    (plataform)/dashboard/{checkin,materials}/page.tsx
  shared/{components/, components/ui/, lib/, types/, mock/}
  services/  (inalterado)
  store/     (inalterado)
```

---

## Task 1: Renomear route group (app) → (plataform)

Nenhum arquivo importa as páginas do `app/` por path, então o rename é seguro e o typecheck permanece limpo.

**Files:**
- Rename: `src/app/(app)/` → `src/app/(plataform)/`

- [ ] **Step 1: Renomear o diretório**

```bash
git mv "src/app/(app)" "src/app/(plataform)"
```

- [ ] **Step 2: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros (nenhuma saída).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Refac: Renomeia route group (app) para (plataform)"
```

---

## Task 2: Mover lib → shared/lib

`@/lib/` é usado por 43 arquivos.

**Files:**
- Move: `src/lib/` → `src/shared/lib/`
- Modify: todos os arquivos com import `@/lib/`

- [ ] **Step 1: Mover o diretório**

```bash
mkdir -p src/shared
git mv src/lib src/shared/lib
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/lib/" src/ | xargs sed -i 's#@/lib/#@/shared/lib/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/lib/" src/ ; echo "fim"`
Expected: somente a linha `fim` (nenhum match).

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Move lib para shared/lib"
```

---

## Task 3: Mover types → shared/types

`@/types` (bare e `@/types/...`) é usado por 24 arquivos. O padrão `@/types` cobre ambos.

**Files:**
- Move: `src/types/` → `src/shared/types/`
- Modify: todos os arquivos com import `@/types`

- [ ] **Step 1: Mover o diretório**

```bash
git mv src/types src/shared/types
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/types" src/ | xargs sed -i 's#@/types#@/shared/types#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/types['\"/]" src/ | grep -v "@/shared/types" ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Move types para shared/types"
```

---

## Task 4: Mover common + ui → shared/components

`@/components/common/` (12 arquivos) e `@/components/ui/` (12 arquivos).

**Files:**
- Move: `src/components/common/` → `src/shared/components/`
- Move: `src/components/ui/` → `src/shared/components/ui/`
- Modify: arquivos com imports `@/components/common/` e `@/components/ui/`

- [ ] **Step 1: Mover os diretórios**

```bash
git mv src/components/common src/shared/components
git mv src/components/ui src/shared/components/ui
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/components/common/" src/ | xargs sed -i 's#@/components/common/#@/shared/components/#g'
grep -rl -- "@/components/ui/" src/ | xargs sed -i 's#@/components/ui/#@/shared/components/ui/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/components/common/\|@/components/ui/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Move common e ui para shared/components"
```

---

## Task 5: Mover mock → shared/mock

`@/mock/` é usado por 6 arquivos (services).

**Files:**
- Move: `src/mock/` → `src/shared/mock/`
- Modify: arquivos com import `@/mock/`

- [ ] **Step 1: Mover o diretório**

```bash
git mv src/mock src/shared/mock
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/mock/" src/ | xargs sed -i 's#@/mock/#@/shared/mock/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/mock/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Move mock para shared/mock"
```

---

## Task 6: Colocar componentes do dashboard

CalendarGrid, WeekView, ContentGenerationModal, ContentViewModal, PlanNextWeekPanel. Usados só por `dashboard/page.tsx`.

**Files:**
- Move: `src/components/dashboard/` → `src/app/(plataform)/dashboard/components/`
- Modify: arquivos com import `@/components/dashboard/`

- [ ] **Step 1: Mover o diretório**

```bash
git mv src/components/dashboard "src/app/(plataform)/dashboard/components"
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/components/dashboard/" src/ | xargs sed -i 's#@/components/dashboard/#@/app/(plataform)/dashboard/components/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/components/dashboard/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Coloca componentes do dashboard junto da rota"
```

---

## Task 7: Colocar componentes de analytics

AIAnalystPanel, FloatingAnalystButton, MetricCard. Usados só por `dashboard/analytics/page.tsx`.

**Files:**
- Move: `src/components/analytics/` → `src/app/(plataform)/dashboard/analytics/components/`
- Modify: arquivos com import `@/components/analytics/`

- [ ] **Step 1: Mover o diretório**

```bash
git mv src/components/analytics "src/app/(plataform)/dashboard/analytics/components"
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/components/analytics/" src/ | xargs sed -i 's#@/components/analytics/#@/app/(plataform)/dashboard/analytics/components/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/components/analytics/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Coloca componentes de analytics junto da rota"
```

---

## Task 8: Colocar componentes de settings

CancelSubscriptionModal, DnaModal. Usados só por `dashboard/settings/page.tsx`.

**Files:**
- Move: `src/components/settings/` → `src/app/(plataform)/dashboard/settings/components/`
- Modify: arquivos com import `@/components/settings/`

- [ ] **Step 1: Mover o diretório**

```bash
git mv src/components/settings "src/app/(plataform)/dashboard/settings/components"
```

- [ ] **Step 2: Reescrever imports**

```bash
grep -rl -- "@/components/settings/" src/ | xargs sed -i 's#@/components/settings/#@/app/(plataform)/dashboard/settings/components/#g'
```

- [ ] **Step 3: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/components/settings/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 4: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Refac: Coloca componentes de settings junto da rota"
```

---

## Task 9: Colocar componentes de layout no grupo + remover StepIndicator morto

Sidebar, TopBar, DnaProfileBanner são usados pelo layout do grupo `(plataform)`. StepIndicator tem 0 referências (código morto, remoção autorizada).

**Files:**
- Create: `src/app/(plataform)/components/`
- Move: `src/components/layout/{Sidebar,TopBar,DnaProfileBanner}.tsx` → `src/app/(plataform)/components/`
- Delete: `src/components/layout/StepIndicator.tsx`
- Modify: arquivos com import `@/components/layout/`

- [ ] **Step 1: Reconfirmar que StepIndicator está sem uso**

Run: `grep -rn "StepIndicator" src/ | grep -v "components/layout/StepIndicator.tsx" ; echo "fim"`
Expected: somente a linha `fim` (0 referências). Se aparecer qualquer uso, PARAR e reavaliar antes de deletar.

- [ ] **Step 2: Remover o componente morto**

```bash
git rm src/components/layout/StepIndicator.tsx
```

- [ ] **Step 3: Mover os 3 componentes do grupo**

```bash
mkdir -p "src/app/(plataform)/components"
git mv src/components/layout/Sidebar.tsx "src/app/(plataform)/components/Sidebar.tsx"
git mv src/components/layout/TopBar.tsx "src/app/(plataform)/components/TopBar.tsx"
git mv src/components/layout/DnaProfileBanner.tsx "src/app/(plataform)/components/DnaProfileBanner.tsx"
```

- [ ] **Step 4: Reescrever imports**

```bash
grep -rl -- "@/components/layout/" src/ | xargs sed -i 's#@/components/layout/#@/app/(plataform)/components/#g'
```

- [ ] **Step 5: Confirmar que não sobrou referência antiga e que a pasta layout sumiu**

Run: `grep -rn -- "@/components/layout/" src/ ; ls src/components/layout 2>/dev/null ; echo "fim"`
Expected: somente a linha `fim` (nenhum import, pasta inexistente).

- [ ] **Step 6: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Refac: Move layout para (plataform)/components e remove StepIndicator morto"
```

---

## Task 10: Colocar componentes de onboarding + remover ProcedureButton morto

StepShell, OnboardingProgress, steps/ vão para a rota onboarding. ProcedureButton tem 0 referências (código morto, remoção autorizada).

**Files:**
- Move: `src/components/onboarding/` → `src/app/(auth)/onboarding/components/`
- Delete: `src/app/(auth)/onboarding/components/ProcedureButton.tsx` (após o move)
- Modify: arquivos com import `@/components/onboarding/`

- [ ] **Step 1: Reconfirmar que ProcedureButton está sem uso**

Run: `grep -rn "ProcedureButton" src/ | grep -v "components/onboarding/ProcedureButton.tsx" ; echo "fim"`
Expected: somente a linha `fim` (0 referências). Se aparecer uso, PARAR antes de deletar.

- [ ] **Step 2: Mover o diretório**

```bash
git mv src/components/onboarding "src/app/(auth)/onboarding/components"
```

- [ ] **Step 3: Remover o componente morto**

```bash
git rm "src/app/(auth)/onboarding/components/ProcedureButton.tsx"
```

- [ ] **Step 4: Reescrever imports**

```bash
grep -rl -- "@/components/onboarding/" src/ | xargs sed -i 's#@/components/onboarding/#@/app/(auth)/onboarding/components/#g'
```

- [ ] **Step 5: Confirmar que não sobrou referência antiga**

Run: `grep -rn -- "@/components/onboarding/" src/ ; echo "fim"`
Expected: somente a linha `fim`.

- [ ] **Step 6: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Refac: Coloca onboarding junto da rota e remove ProcedureButton morto"
```

---

## Task 11: Limpeza de diretórios vazios + verificação final

Após todos os moves, `src/components/` deve conter apenas a pasta vazia `checkin/`.

**Files:**
- Delete: `src/components/checkin/` (vazia)
- Delete: `src/components/` (se vazia)

- [ ] **Step 1: Conferir o que restou em src/components**

Run: `find src/components -type f ; echo "--- dirs ---" ; find src/components -type d`
Expected: nenhum arquivo (`find -type f` vazio); apenas dirs `src/components` e `src/components/checkin`.
Se aparecer QUALQUER arquivo, PARAR — algo não foi movido; mover ao destino correto antes de continuar.

- [ ] **Step 2: Remover diretórios vazios**

```bash
rmdir src/components/checkin src/components 2>/dev/null; echo "ok"
```

- [ ] **Step 3: Garantir que nenhum caminho antigo permaneceu**

Run:
```bash
grep -rn -- "@/components/\|@/lib/\|@/mock/" src/ ; \
grep -rn -- "@/types['\"/]" src/ | grep -v "@/shared/types" ; \
echo "fim"
```
Expected: somente a linha `fim` (nenhum caminho legado).

- [ ] **Step 4: Typecheck final**

Run: `npx tsc --noEmit`
Expected: 0 erros.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: sem novos erros introduzidos pela mudança (mesmo estado do baseline).

- [ ] **Step 6: Build de produção**

Run: `npm run build`
Expected: build conclui com sucesso; rotas listadas incluem `/dashboard`, `/dashboard/analytics`, `/dashboard/checkin`, `/dashboard/settings`, `/dashboard/materials`, `/login`, `/cadastro`, `/onboarding` (URLs inalteradas — route groups não afetam a URL).

- [ ] **Step 7: Commit final**

```bash
git add -A
git commit -m "Refac: Remove diretorios vazios e finaliza reestruturacao"
```

---

## Self-review (preenchido pelo autor do plano)

- **Spec coverage:** rename (T1), shared/lib (T2), shared/types (T3), shared/components+ui (T4), shared/mock (T5), colocation dashboard/analytics/settings/layout/onboarding (T6–T10), código morto + dirs vazios (T9, T10, T11), build/lint final (T11). Todos os itens do spec têm task.
- **Placeholders:** nenhum — todos os comandos são concretos.
- **Type consistency:** os caminhos de destino usados nos `sed` batem exatamente com os destinos dos `git mv` em cada task.
- **Fora de escopo respeitado:** mocks mantidos (só movidos), CLAUDE.md não tocada, `types/index.ts` não fatiado.
```