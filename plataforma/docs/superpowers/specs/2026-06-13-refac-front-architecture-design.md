# Reestruturação da arquitetura de pastas do frontend

**Data:** 2026-06-13
**Status:** Aprovado para planejamento

## Objetivo

Reorganizar a estrutura de diretórios de `src/` para um modelo de **colocation por
página** com uma camada `shared/` explícita, mantendo o app 100% funcional e
idiomático em relação ao Next.js App Router.

## Contexto e restrições do Next.js

A intenção original do usuário era: remover o diretório `app/`, ter `src/pages/`
como pasta de features, e colocar `components/`/`types/` por página. Dois conflitos
técnicos com o Next.js (App Router, versão 14.2.35) impedem isso literalmente:

1. **`app/` é obrigatório.** No App Router, `src/app/` *é* o sistema de rotas. Não
   pode ser removido nem renomeado — sem ele a aplicação não tem rotas e não builda.
2. **`pages/` é nome reservado.** É a convenção do roteador legado (Pages Router).
   Criar `src/pages/` faz o Next interpretar tudo lá como rotas legadas, colidindo
   com o App Router.

**Resolução aprovada:** usar *colocation* dentro do `app/`. As rotas continuam em
`app/`, mas cada pasta de rota recebe seus próprios `components/` e `types/` ao lado
do `page.tsx` (o roteador só trata `page.tsx`, `layout.tsx`, etc. como especiais; o
resto é ignorado pelo roteamento). Isso entrega o objetivo real — cada página com
seus componentes e types, mais um `shared/` ao lado — sem sair das convenções.

## Estrutura-alvo

```
src/
  app/                          # roteamento (obrigatório)
    layout.tsx
    page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
      cadastro/page.tsx
      onboarding/
        page.tsx
        components/             # StepShell, OnboardingProgress, ProcedureButton, steps/
        types/                  # types só de onboarding (se houver)
    (plataform)/                # renomeado de (app)
      layout.tsx
      components/               # Sidebar, TopBar, DnaProfileBanner (usados só pelo layout do grupo)
      dashboard/
        page.tsx
        components/             # CalendarGrid, WeekView, ContentGenerationModal,
                                #   ContentViewModal, PlanNextWeekPanel
        types/
        analytics/
          page.tsx
          components/           # AIAnalystPanel, FloatingAnalystButton, MetricCard
          types/
        checkin/page.tsx
        settings/
          page.tsx
          components/           # CancelSubscriptionModal, DnaModal
        materials/page.tsx
  shared/
    components/                 # common/*: BibleVerse, FrostedCard, GoldButton,
                                #   KairosLogo, PageBackground, ThemeProvider, ThemeSwitch
      ui/                       # primitivos shadcn/radix
    lib/                        # date-utils, math-engine, utils
    types/                      # index.ts (types compartilhados, mantido inteiro)
    mock/                       # mocks (mantidos até o backend existir)
  services/                     # inalterado
  store/                        # inalterado
```

## Mapeamento de componentes (baseado em análise de imports)

Cada componente abaixo foi verificado por quantidade de arquivos que o importam.

### Page-local (colocados na rota)
| Componente | Importado por | Destino |
|---|---|---|
| CalendarGrid, WeekView, ContentGenerationModal, ContentViewModal, PlanNextWeekPanel | `dashboard/page.tsx` | `app/(plataform)/dashboard/components/` |
| AIAnalystPanel, FloatingAnalystButton, MetricCard | `dashboard/analytics/page.tsx` | `app/(plataform)/dashboard/analytics/components/` |
| CancelSubscriptionModal, DnaModal | `dashboard/settings/page.tsx` | `app/(plataform)/dashboard/settings/components/` |
| StepShell, OnboardingProgress, ProcedureButton, steps/* | onboarding | `app/(auth)/onboarding/components/` |

### Nível de grupo (layout do grupo (plataform))
| Componente | Importado por | Destino |
|---|---|---|
| Sidebar, TopBar, DnaProfileBanner | `(plataform)/layout.tsx` | `app/(plataform)/components/` |

### Shared (cross-cutting)
| Origem | Destino |
|---|---|
| `components/common/*` | `shared/components/` |
| `components/ui/*` | `shared/components/ui/` |
| `lib/*` | `shared/lib/` |
| `types/index.ts` | `shared/types/index.ts` |
| `mock/*` | `shared/mock/` |

## Decisões-chave

1. **`app/` permanece**; o route group `(app)` é renomeado para `(plataform)`.
2. **Colocation**: cada `page.tsx` recebe `components/` e `types/` ao lado quando aplicável.
3. **`shared/`** fica ao lado de `services/` e `store/`, contendo `components` (+ `ui`),
   `lib`, `types` e `mock`.
4. **Mocks mantidos** (são a única fonte de dados enquanto `/api/*` não existe;
   `NEXT_PUBLIC_USE_MOCK` default `true`). Apenas reposicionados para `shared/mock/`.
   Remoção real fica para quando o backend estiver pronto.
5. **Alias `@/*` mantido** (`@/* → src/*`). Apenas os caminhos após `@/` mudam em todos
   os imports afetados. Esta é a parte mecânica mais volumosa do trabalho.
6. **`types/index.ts` mantido inteiro** em `shared/types/`; `types/` por página só será
   criado quando surgir um type específico daquela página (YAGNI — sem fatiamento forçado).

## Código morto identificado

Dois componentes sem nenhum importador (0 refs):
- `components/layout/StepIndicator.tsx`
- `components/onboarding/ProcedureButton.tsx`

**Ação (autorizada pelo usuário):** confirmar durante a implementação que estão
realmente sem uso e, se confirmado, **remover**. Também remover a pasta vazia
`components/checkin/`. Qualquer outro componente/código que a análise revele estar
sem uso pode ser removido na mesma linha.

## Critérios de sucesso

- `npm run build` passa sem erros.
- `npm run lint` passa (ou sem novos erros introduzidos pela mudança).
- Nenhum import quebrado; nenhuma referência a caminhos antigos (`@/components/...`,
  `@/lib/...`, `@/types`, `@/mock/...`) remanescente.
- Rotas funcionam: `(plataform)` substitui `(app)` sem mudança de URL pública (route
  groups entre parênteses não afetam a URL).
- App roda com mocks (`NEXT_PUBLIC_USE_MOCK` default) exatamente como antes.

## Fora de escopo

- Remoção dos mocks (adiada até o backend existir).
- Implementação das rotas `/api/*`.
- Fatiamento do `types/index.ts` em types por página.
- Qualquer refactor de lógica/comportamento — esta mudança é puramente estrutural
  (exceto remoção de código comprovadamente morto, ver seção acima).
- Atualização da CLAUDE.md — confirmado fora de escopo deste trabalho.
```