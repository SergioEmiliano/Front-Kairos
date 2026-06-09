import { AnalyticsSummary } from "@/types";
import { mockAnalytics } from "@/mock/analytics";
import { delay } from "@/lib/utils";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const analyticsService = {
  async getSummary(_month: string): Promise<AnalyticsSummary> {
    if (USE_MOCK) {
      await delay(300);
      return mockAnalytics;
    }
    const res = await fetch(`/api/analytics?month=${_month}`);
    return res.json();
  },
};
