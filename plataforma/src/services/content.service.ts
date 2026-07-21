import { ContentEntry, ContentFormat, GeneratedContent } from "@/shared/types";
import { mockContentEntries } from "@/shared/mock/calendar";
import { mockGeneratedContent } from "@/shared/mock/analytics";
import { delay } from "@/shared/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const contentService = {
  async generateContent(
    _date: string,
    format: ContentFormat,
    _idea: string
  ): Promise<GeneratedContent> {
    if (USE_MOCK) {
      await delay(1500);
      return mockGeneratedContent[format];
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch("/api/content/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ date: _date, format, idea: _idea }),
    });
    return res.json();
  },

  async getCalendarContent(_month: string): Promise<ContentEntry[]> {
    if (USE_MOCK) {
      await delay(200);
      return mockContentEntries;
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch(`/api/content/calendar?month=${_month}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async saveContentEntry(entry: Omit<ContentEntry, "id">): Promise<ContentEntry> {
    if (USE_MOCK) {
      await delay(300);
      return { ...entry, id: `c-${Date.now()}` };
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(entry),
    });
    return res.json();
  },
};
