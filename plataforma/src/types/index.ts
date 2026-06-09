// ─── Doctor / Profile ───────────────────────────────────────────────────────

export type Procedure =
  | "harmonizacao"
  | "botox"
  | "preenchimento"
  | "bioestimulador"
  | "depilacao"
  | "outro";

export type ToneOfVoice = "sofisticado" | "acolhedor" | "educativo" | "inspiracional";
export type FormalityLevel = "formal" | "semiformal" | "informal";

export interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  instagram?: string;
  avatarUrl?: string;
  // DNA Estratégico
  procedures: Procedure[];
  monthlyRevenue: number;
  averageTicket: number;
  workingDays: number[];      // 0=Dom, 1=Seg ... 6=Sáb
  sessionsPerDay: number;
  teamSize: number;
  toneOfVoice: ToneOfVoice;
  formalityLevel: FormalityLevel;
  targetAudience: string;
  uniqueValue: string;
  // Metas calculadas
  proceduresGoal: number;
  dmGoal: number;
  appointmentGoal: number;
  postsPerWeek: number;
}

// ─── Content / Calendar ─────────────────────────────────────────────────────

export type ContentFormat = "reel" | "post" | "story" | "carrossel";
export type ContentStatus = "planejado" | "publicado" | "rascunho";

export interface ContentEntry {
  id: string;
  date: string;             // ISO date "YYYY-MM-DD"
  format: ContentFormat;
  idea: string;
  script?: string;
  caption?: string;
  hashtags?: string[];
  status: ContentStatus;
  color?: string;
  // ─── Rich fields — populated by AI generation or backend ───────────────
  platform?: "instagram" | "tiktok" | "youtube" | "linkedin";
  suggestedTime?: string;   // "HH:mm"
  objective?: string;
  cta?: string;
}

export interface GeneratedContent {
  script: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface WeeklyMetric {
  week: string;
  dms: number;
  appointments: number;
  sales: number;
  reach: number;
  engagement: number;
}

export interface AnalyticsSummary {
  monthlyRevenueGoal: number;
  monthlyRevenueCurrent: number;
  totalDms: number;
  totalAppointments: number;
  totalProcedures: number;
  revenuePercent: number;
  weekly: WeeklyMetric[];
}

// ─── Checkin ─────────────────────────────────────────────────────────────────

export interface CheckinEntry {
  id: string;
  date: string;
  dmsReceived: number;
  appointmentsScheduled: number;
  proceduresDone: number;
  revenueEarned: number;
  contentPublished: number;
  notes?: string;
}

// ─── Tasks / Ideas ────────────────────────────────────────────────────────────

export type TaskPriority = "alta" | "media" | "baixa";
export type TaskStatus = "pendente" | "em_progresso" | "concluida";

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  description: string;
  format: ContentFormat;
  tags: string[];
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export interface OnboardingState {
  step: number;
  procedures: Procedure[];
  monthlyRevenue: number;
  averageTicket: number;
  workingDays: number[];
  sessionsPerDay: number;
  teamSize: number;
  toneOfVoice: ToneOfVoice | "";
  formalityLevel: FormalityLevel | "";
  targetAudience: string;
  uniqueValue: string;
}

// ─── Calendar Views ───────────────────────────────────────────────────────────

export type CalendarView = "month" | "week";

// ─── Plan Next Week ───────────────────────────────────────────────────────────

export interface RefinementEntry {
  instruction: string;
  timestamp: Date;
}

export interface PlannedPost {
  id: string;
  title: string;
  description: string;
  objective: string;
  cta: string;
  suggestedTime: string;
  platform: "instagram" | "tiktok" | "youtube" | "linkedin";
  format: ContentFormat;
  weekday: string;
  refinementHistory: RefinementEntry[];
  isRefining?: boolean;
  refinedAt?: Date;
}

// ─── News ─────────────────────────────────────────────────────────────────────

export type NewsCategory =
  | "Harmonização"
  | "Botox"
  | "Bioestimulador"
  | "Negócios"
  | "Tecnologia"
  | "Regulatório"
  | "Marketing";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  readingTimeMin: number;
  publishedAt: string; // ISO date
  url?: string;
  isNew?: boolean;
}

// ─── Materials ────────────────────────────────────────────────────────────────

export type MaterialCategory =
  | "harmonizacao"
  | "botox"
  | "bioestimulador"
  | "negocios"
  | "marketing"
  | "protocolo";

export type MaterialType = "ebook" | "guia" | "checklist" | "video";

export interface Material {
  id: string;
  title: string;
  description: string;
  category: MaterialCategory;
  type: MaterialType;
  tags: string[];
  coverAccent: string;       // CSS color for cover gradient
  pages?: number;
  duration?: string;
  progress?: number;         // 0–100, undefined = not started
  isNew?: boolean;
  isFeatured?: boolean;
  publishedAt: string;
  accessUrl?: string;
  author?: string;
}

// ─── AI Chat / Analyst ────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;     // reserved for future streaming support
}

// ─── Bible Verse ──────────────────────────────────────────────────────────────

export interface BibleVerse {
  text: string;
  reference: string;        // e.g. "Sl 23:1"
  book: string;
}
