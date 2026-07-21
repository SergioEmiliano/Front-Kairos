import { CheckinEntry } from "@/shared/types";
import { mockCheckins } from "@/shared/mock/checkin";
import { delay } from "@/shared/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const checkinService = {
  async getRecent(): Promise<CheckinEntry[]> {
    if (USE_MOCK) {
      await delay(200);
      return mockCheckins;
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch("/api/checkin", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async submitCheckin(data: Omit<CheckinEntry, "id">): Promise<CheckinEntry> {
    if (USE_MOCK) {
      await delay(600);
      return { ...data, id: `ch-${Date.now()}` };
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
