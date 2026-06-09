# Kairós — Landing Page

Site institucional da Kairós. Next.js 14 (App Router) · React 18 · TypeScript · Tailwind 3.4. Compartilha o sistema editorial do produto (`frontend/`): tipografia única em **Inter Tight**, paleta `oklch`, marca `◆`, hairlines e itálico dourado.

## Stack

- Next.js 14.2 (App Router, Server Components)
- TypeScript estrito
- Tailwind 3.4 + tokens `oklch` em CSS Vars
- `next-themes` (light / dark)
- shadcn/ui Button + primitivas próprias (`KairosLogo`, `GoldButton`, `Reveal`)
- `IntersectionObserver` para scroll-reveal (sem libs)

## Scripts

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Estrutura

```
src/
  app/
    layout.tsx       # Inter Tight + ThemeProvider
    globals.css      # tokens editoriais + .kicker, .mono-label, .pull-quote, .step-num, .metric-card
    page.tsx         # composição das sections
  components/
    common/          # KairosLogo, GoldButton, ThemeProvider, ThemeSwitch, Reveal
    landing/         # TopBar · Hero · Manifesto · Motor · HowItWorks · Indicadores · Curadoria · FAQ · Cycle · Footer
    ui/              # Button (shadcn)
  lib/
    utils.ts         # cn()
```

## Design system

- **Tipografia única:** `Inter Tight` (300/400/500/600/700, `italic`). Itálico é tratamento de display, em dourado (`var(--gold-dark)` no claro, `var(--gold)` no escuro).
- **Tokens cromáticos** em `oklch` — `--ink`, `--paper`, `--paper-warm`, `--gold`, `--gold-dark`, `--line`, `--mute`. Espelham os tokens do produto.
- **Marca `◆`** como prefixo de `.kicker` e separador editorial.
- **Hairlines** em `var(--line)` (1px) como divisor primário, em vez de cards opacos.

## Sections

| # | Section | Função |
|---|---|---|
| 1 | Hero | Posicionamento + CTA primário · 412 doutoras · 42 vagas |
| 2 | Manifesto | Quote editorial — Kairós como tempo do instante certo |
| 3 | Motor | 4 motores: matemático · curadoria · leads · receita |
| 4 | Como funciona | 4 passos: curadoria · DNA · calibragem · operação |
| 5 | Indicadores | KPIs de coorte 2025 |
| 6 | Curadoria | 4 critérios de fit |
| 7 | FAQ | 6 perguntas pré-entrevista |
| 8 | Ciclo | CTA final · email + especialidade |
| 9 | Footer | Sistema · Curadoria · Plataforma · Ciclo |

## Conexão com o produto

A landing aponta para a plataforma autenticada em `app.kairos.med` (entrada e onboarding em 6 etapas — DNA Estratégico).
