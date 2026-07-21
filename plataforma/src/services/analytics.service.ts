import { AnalyticsSummary } from "@/shared/types";
import { mockAnalytics } from "@/shared/mock/analytics";
import { delay } from "@/shared/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const analyticsService = {
  async getSummary(_month: string): Promise<AnalyticsSummary> {
    if (USE_MOCK) {
      await delay(300);
      return mockAnalytics;
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("kairos-auth") : null;
    const res = await fetch(`/api/analytics?month=${_month}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return mockAnalytics;
    return res.json();
  },
};
