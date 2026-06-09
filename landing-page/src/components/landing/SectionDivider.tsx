"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label?: string;
  tone?: "paper" | "warm" | "ink";
}

export function SectionDivider({ label, tone = "paper" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.5 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const bg =
    tone === "ink"
      ? "var(--ink)"
      : tone === "warm"
      ? "var(--paper-warm)"
      : "var(--paper)";

  const lineColor =
    tone === "ink"
      ? "color-mix(in oklch, var(--paper) 20%, transparent)"
      : "var(--line)";

  const labelColor =
    tone === "ink" ? "color-mix(in oklch, var(--paper) 65%, transparent)" : "var(--mute)";

  return (
    <div
      ref={ref}
      className="relative"
      style={{ background: bg }}
      aria-hidden="true"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 relative h-[1px]">
        <div
          className="absolute inset-y-0 left-0 right-0 transition-[width,opacity] duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{
            height: 1,
            background: lineColor,
            width: visible ? "100%" : "0%",
            opacity: visible ? 1 : 0,
          }}
        />
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-3 px-5 flex items-center gap-3 transition-[opacity,transform] duration-[900ms] ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          )}
          style={{
            background: bg,
            transitionDelay: "350ms",
          }}
        >
          <span
            className="italic-gold leading-none"
            style={{ fontSize: 11 }}
          >
            ◆
          </span>
          {label && (
            <span
              className="mono-label mono-label-wide"
              style={{ color: labelColor, fontSize: 10 }}
            >
              {label}
            </span>
          )}
          <span
            className="italic-gold leading-none"
            style={{ fontSize: 11 }}
          >
            ◆
          </span>
        </div>
      </div>
    </div>
  );
}
