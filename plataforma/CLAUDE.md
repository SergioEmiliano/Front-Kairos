# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # Run ESLint
```

No test runner is configured.

## What This Is

**Kairós** — an AI-powered growth platform for medical aesthetic clinics (dermatologists/aesthetic physicians). Built in Portuguese (pt-BR). The core loop: doctor sets a monthly revenue goal → the math engine calculates posts/DMs/appointments needed → doctor plans content on a calendar → AI generates scripts/captions → daily check-ins track progress.

## Architecture

Next.js 14 App Router. `src/` has four top-level concerns: `app/` (routing), `services/` (data layer), `store/` (state), and `shared/` (cross-cutting code). Route groups under `app/`:
- `(auth)` — `/login`, `/planos`, `/checkout`, `/onboarding` (6-step wizard)
- `(plataform)` — `/dashboard` (calendar), `/dashboard/analytics`, `/dashboard/checkin`, `/dashboard/settings`, `/dashboard/materials`

Route groups in parentheses do not affect URLs.

### Access & First-Access Flow

There is **no self-signup**. Accounts are created only as a consequence of an approved payment on the landing page (outside this repo). The app just authenticates and gates:

- `/login` accepts anyone but `authService.login` returns a `reason` on failure. In mock phase, test emails drive each state: `pendente@kairos.com` → `pending_approval`, `cancelada@kairos.com` → `subscription_inactive`, `primeiroacesso@kairos.com` → first access (`firstAccessCompleted: false`), any other valid email → active.
- `firstAccessCompleted` (on `DoctorProfile` and mirrored in `app.store`) gates onboarding. `false` forces the user into `/onboarding`; the wizard's `finish()` sets it to `true` permanently so onboarding never reappears.
- `AuthGuard` (`shared/components/AuthGuard.tsx`) wraps `(plataform)/layout.tsx`: not authenticated → `/login`, first access → `/onboarding`. The `/onboarding` route has its own equivalent gate. The guard is client-side (auth lives in localStorage/Zustand, not cookies, so a Next.js edge middleware can't see it) and waits for store hydration before redirecting.

### Colocation Pattern

Components and types are **colocated with the route that uses them**. Each `page.tsx` keeps its own `components/` (and `types/` when needed) folder beside it. Anything reused across more than one page lives in `src/shared/` instead. When adding a component, ask: is it used by a single page? Colocate it next to that page. Used by multiple pages, or layout chrome shown across a whole group? Put it in `shared/components/`.

### Data Layer Pattern

All data goes through `src/services/`. Each service checks `NEXT_PUBLIC_USE_MOCK`:
- `true` (default) → returns data from `src/shared/mock/` with simulated delays
- `false` → calls real API routes at `/api/*`

The API routes themselves are not implemented yet — the app is in frontend-complete / mock-data phase. The mocks are intentionally kept until the backend exists; remove the `if (USE_MOCK)` branches and `src/shared/mock/` together once real `/api/*` routes are wired.

### State Management

Three Zustand stores, all persisted to localStorage:
- `src/store/app.store.ts` (`kairos-app`) — auth state + doctor profile
- `src/store/onboarding.store.ts` (`kairos-onboarding`) — 6-step onboarding form
- `src/store/ui.store.ts` — ephemeral UI state (sidebar, modals, calendar view mode), not persisted

### Key Business Logic

`src/shared/lib/math-engine.ts` — converts a monthly revenue target into actionable daily/weekly content and DM goals using fixed industry conversion rates (35% DM→appointment, 65% appointment→procedure). This drives the entire KPI display on the dashboard.

### Directory Structure

```
src/
  app/                              # routing (App Router — required, not removable)
    (auth)/
      login/page.tsx
      planos/
        page.tsx
        components/                 # BillingToggle, PlanCard
      checkout/
        page.tsx
        components/                 # CheckoutSummary, PaymentSuccess
      onboarding/
        page.tsx
        components/                 # StepShell, OnboardingProgress, steps/
    (plataform)/
      layout.tsx
      dashboard/
        page.tsx
        components/                 # CalendarGrid, WeekView, ContentGenerationModal,
                                    #   ContentViewModal, PlanNextWeekPanel
        analytics/
          page.tsx
          components/               # AIAnalystPanel, FloatingAnalystButton, MetricCard
        settings/
          page.tsx
          components/               # CancelSubscriptionModal, DnaModal
        checkin/page.tsx
        materials/page.tsx
  shared/
    components/                     # cross-cutting: AuthGuard, BibleVerse, FrostedCard,
                                    #   GoldButton, KairosLogo, PageBackground,
                                    #   ThemeProvider, ThemeSwitch, and layout chrome
                                    #   (Sidebar, TopBar, DnaProfileBanner)
      ui/                           # Radix/shadcn primitives — treat as library, avoid editing
    lib/                            # math-engine, date-utils, utils
    types/                          # shared TypeScript interfaces (index.ts)
    mock/                           # mock data backing the services layer
  services/                         # data layer (see Data Layer Pattern)
  store/                            # Zustand stores (see State Management)
```

### Styling

- Tailwind with a custom Kairós design token palette defined in `src/app/globals.css` using OKLCH color space and CSS custom properties
- Color names: `paper`, `ink`, `gold`, `steel`, `espresso`, etc. — use these, not raw hex values
- Custom utility classes in globals.css: `.btn-gold`, `.glass-card`, `.card-surface`, `.kicker`, `.mono-label`, `.shimmer-bar`
- Dark mode via `class` strategy (next-themes manages it)
- Path alias: `@/*` → `src/*`

### Types

Shared TypeScript interfaces live in `src/shared/types/index.ts` — `DoctorProfile`, `ContentEntry`, `AnalyticsSummary`, `CheckinEntry`, etc. Add cross-cutting types there. Types used by a single page belong in a `types/` folder colocated with that page (see Colocation Pattern).
