"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KairosLogo } from "@/components/common/KairosLogo";

const NAV = [
  { href: "#produto", label: "Produto" },
  { href: "#metodo", label: "Método" },
  { href: "#planos", label: "Planos" },
  { href: "#manifesto", label: "Manifesto" },
];

const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 40,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled
          ? "color-mix(in oklch, var(--paper) 90%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(150%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(150%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px",
          height: 80,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Kairós" style={{ flexShrink: 0 }}>
          <KairosLogo size="sm" />
        </Link>

        {/* Nav — desktop only */}
        <nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
          className="hidden lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontFamily: bodyFont,
                fontSize: 13,
                color: "var(--ink)",
                opacity: 0.65,
                padding: "8px 14px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.65")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Entrar button */}
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kairos.med"}/login`}
          style={{
            fontFamily: bodyFont,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink)",
            border: "1px solid var(--line)",
            borderRadius: 9999,
            padding: "9px 20px",
            textDecoration: "none",
            transition: "border-color 0.2s",
            flexShrink: 0,
          }}
        >
          Entrar
        </a>
      </div>
    </header>
  );
}
