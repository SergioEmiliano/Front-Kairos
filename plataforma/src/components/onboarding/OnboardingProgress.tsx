"use client";

import { motion } from "framer-motion";

interface Props {
  step: number;
  total: number;
}

export function OnboardingProgress({ step, total }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono-label" style={{ color: "var(--gold-dark)" }}>
        {String(step).padStart(2, "0")}
      </span>
      <div
        className="relative overflow-hidden rounded-full"
        style={{ width: 80, height: 2, background: "var(--line)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "var(--gold)" }}
          initial={false}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
      <span className="mono-label" style={{ color: "var(--mute)" }}>
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
