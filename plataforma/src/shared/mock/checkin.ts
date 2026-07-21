import { CheckinEntry } from "@/shared/types";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");

function d(day: number) {
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

export const mockCheckins: CheckinEntry[] = [
  { id: "ch1", date: d(today.getDate() - 6), dmsReceived: 8, appointmentsScheduled: 3, proceduresDone: 2, revenueEarned: 3000, contentPublished: 1 },
  { id: "ch2", date: d(today.getDate() - 5), dmsReceived: 12, appointmentsScheduled: 4, proceduresDone: 3, revenueEarned: 4500, contentPublished: 1 },
  { id: "ch3", date: d(today.getDate() - 4), dmsReceived: 6, appointmentsScheduled: 2, proceduresDone: 2, revenueEarned: 3000, contentPublished: 0, notes: "Dia mais tranquilo" },
  { id: "ch4", date: d(today.getDate() - 3), dmsReceived: 15, appointmentsScheduled: 5, proceduresDone: 4, revenueEarned: 6000, contentPublished: 2, notes: "Reel viralizou!" },
  { id: "ch5", date: d(today.getDate() - 2), dmsReceived: 9, appointmentsScheduled: 3, proceduresDone: 2, revenueEarned: 3000, contentPublished: 1 },
  { id: "ch6", date: d(today.getDate() - 1), dmsReceived: 14, appointmentsScheduled: 6, proceduresDone: 5, revenueEarned: 7500, contentPublished: 1 },
];
