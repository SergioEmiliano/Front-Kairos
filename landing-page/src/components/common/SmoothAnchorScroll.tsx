"use client";

import { useEffect } from "react";

const HEADER_GAP = 24;

// Delegated click handler for every same-page `#id` link (nav, footer, etc.):
// scrolls with the fixed header's real height accounted for, so the target
// section lands fully below it instead of partially hidden underneath.
export function SmoothAnchorScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        HEADER_GAP;

      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
