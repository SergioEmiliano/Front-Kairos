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

Next.js 15 App Router with two route groups:
- `(auth)` — `/login`, `/cadastro`, `/onboarding` (6-step wizard)
- `(app)` — `/dashboard` (calendar), `/dashboard/analytics`, `/dashboard/checkin`, `/dashboard/settings`

### Data Layer Pattern

All data goes through `src/services/`. Each service checks `NEXT_PUBLIC_USE_MOCK`:
- `true` (default) → returns data from `src/mock/` with simulated delays
- `false` → calls real API routes at `/api/*`

The API routes themselves are not implemented yet — the app is in frontend-complete / mock-data phase.

### State Management

Three Zustand stores, all persisted to localStorage:
- `src/store/app.store.ts` (`kairos-app`) — auth state + doctor profile
- `src/store/onboarding.store.ts` (`kairos-onboarding`) — 6-step onboarding form
- `src/store/ui.store.ts` — ephemeral UI state (sidebar, modals, calendar view mode), not persisted

### Key Business Logic

`src/lib/math-engine.ts` — converts a monthly revenue target into actionable daily/weekly content and DM goals using fixed industry conversion rates (35% DM→appointment, 65% appointment→procedure). This drives the entire KPI display on the dashboard.

### Component Structure

```
src/components/
  ui/          # Radix/shadcn primitives — treat as library, avoid editing
  common/      # Cross-cutting shared components (Logo, ThemeSwitch, etc.)
  layout/      # TopBar, Sidebar, StepIndicator
  dashboard/   # CalendarGrid, WeekView, ContentGenerationModal, ContentViewModal
  analytics/   # MetricCard, AIAnalystPanel
  onboarding/  # Step-specific components
  settings/    # CancelSubscriptionModal
```

### Styling

- Tailwind with a custom Kairós design token palette defined in `src/app/globals.css` using OKLCH color space and CSS custom properties
- Color names: `paper`, `ink`, `gold`, `steel`, `espresso`, etc. — use these, not raw hex values
- Custom utility classes in globals.css: `.btn-gold`, `.glass-card`, `.card-surface`, `.kicker`, `.mono-label`, `.shimmer-bar`
- Dark mode via `class` strategy (next-themes manages it)
- Path alias: `@/*` → `src/*`

### Types

All shared TypeScript interfaces live in `src/types/index.ts` — `DoctorProfile`, `ContentEntry`, `AnalyticsSummary`, `CheckinEntry`, etc. Add new shared types there.
