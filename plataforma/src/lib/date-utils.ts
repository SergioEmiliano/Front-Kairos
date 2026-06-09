import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameMonth,
  isSameWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function getMonthDays(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = eachDayOfInterval({ start, end });
  const startWeekday = getDay(start); // 0 = Sunday
  return { days, startWeekday };
}

/** Returns the 7 days of the week that contains `date` (Sun→Sat). */
export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** Returns the Monday–Sunday range label: "5–11 mai. 2026" */
export function formatWeekRange(date: Date): string {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });
  const startFmt = format(start, "d", { locale: ptBR });
  const endFmt = format(end, "d 'de' MMM yyyy", { locale: ptBR });
  return `${startFmt}–${endFmt}`;
}

export function formatMonthYear(date: Date): string {
  return format(date, "MMMM yyyy", { locale: ptBR });
}

export function formatDay(date: Date): string {
  return format(date, "d");
}

export function formatShortDate(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

export function formatFullDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
}

/** "Seg" / "Ter" / etc. */
export function formatWeekdayShort(date: Date): string {
  return format(date, "EEE", { locale: ptBR });
}

/** "11" */
export function formatDayNumber(date: Date): string {
  return format(date, "d");
}

export {
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameMonth,
  isSameWeek,
};

export const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
