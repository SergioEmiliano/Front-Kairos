import { create } from "zustand";
import { CalendarView, ContentEntry } from "@/shared/types";

interface UIStore {
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Content creation modal
  selectedDate: string | null;
  contentModalOpen: boolean;
  selectedFormat: string;
  openContentModal: (date: string) => void;
  closeContentModal: () => void;
  setSelectedFormat: (format: string) => void;

  // Content view modal (for existing entries)
  contentViewModalOpen: boolean;
  contentViewEntry: ContentEntry | null;
  contentViewSiblings: ContentEntry[];   // other entries on the same day
  openContentViewModal: (entry: ContentEntry, siblings?: ContentEntry[]) => void;
  closeContentViewModal: () => void;

  // Calendar view
  calendarView: CalendarView;
  setCalendarView: (view: CalendarView) => void;
  toggleCalendarView: () => void;

  // Plan next week panel
  planNextWeekOpen: boolean;
  setPlanNextWeekOpen: (open: boolean) => void;

  // AI analyst panel
  analystPanelOpen: boolean;
  setAnalystPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Sidebar
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // Content creation modal
  selectedDate: null,
  contentModalOpen: false,
  selectedFormat: "reel",
  openContentModal: (date) => set({ contentModalOpen: true, selectedDate: date }),
  closeContentModal: () => set({ contentModalOpen: false, selectedDate: null }),
  setSelectedFormat: (format) => set({ selectedFormat: format }),

  // Content view modal
  contentViewModalOpen: false,
  contentViewEntry: null,
  contentViewSiblings: [],
  openContentViewModal: (entry, siblings = []) =>
    set({
      contentViewModalOpen: true,
      contentViewEntry: entry,
      // Siblings = all entries for the day EXCEPT the one being viewed
      contentViewSiblings: siblings.filter((s) => s.id !== entry.id),
    }),
  closeContentViewModal: () =>
    set({ contentViewModalOpen: false, contentViewEntry: null, contentViewSiblings: [] }),

  // Calendar view
  calendarView: "month",
  setCalendarView: (view) => set({ calendarView: view }),
  toggleCalendarView: () =>
    set((s) => ({ calendarView: s.calendarView === "month" ? "week" : "month" })),

  // Plan next week panel
  planNextWeekOpen: false,
  setPlanNextWeekOpen: (open) => set({ planNextWeekOpen: open }),

  // AI analyst panel
  analystPanelOpen: false,
  setAnalystPanelOpen: (open) => set({ analystPanelOpen: open }),
}));
