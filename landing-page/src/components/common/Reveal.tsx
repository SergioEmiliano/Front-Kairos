"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "section" | "p" | "h1" | "h2" | "h3" | "h4" | "span" | "ul" | "li";

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: RevealTag;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, className, as = "div", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Check if already in viewport on mount (e.g. first fold elements)
    const rect = node.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight + 200 && rect.bottom > -200;
    if (alreadyVisible) {
      const t = setTimeout(() => setVisible(true), delay * 80);
      return () => clearTimeout(t);
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const delayClass = delay > 0 ? `reveal-d${delay}` : "";

  return createElement(
    as,
    {
      ref,
      className: cn("reveal", delayClass, visible && "in", className),
      style,
    },
    children
  );
}
