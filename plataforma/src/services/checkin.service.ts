import { CheckinEntry } from "@/types";
import { mockCheckins } from "@/mock/checkin";
import { delay } from "@/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const checkinService = {
  async getRecent(): Promise<CheckinEntry[]> {
    if (USE_MOCK) {
      await delay(200);
      return mockCheckins;
    }
    const res = await fetch("/api/checkin");
    return res.json();
  },

  async submitCheckin(data: Omit<CheckinEntry, "id">): Promise<CheckinEntry> {
    if (USE_MOCK) {
      await delay(600);
      return { ...data, id: `ch-${Date.now()}` };
    }
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
