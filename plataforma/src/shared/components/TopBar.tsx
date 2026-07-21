"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import { KairosLogo } from "@/shared/components/KairosLogo";
import { ThemeSwitch } from "@/shared/components/ThemeSwitch";
import { BibleVerse } from "@/shared/components/BibleVerse";
import { Button } from "@/shared/components/ui/button";
import { useUIStore } from "@/store/ui.store";
import { useAppStore } from "@/store/app.store";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Planejamento" },
  { href: "/dashboard/analytics", label: "Insights" },
  { href: "/dashboard/checkin", label: "Check-in" },
  { href: "/dashboard/materials", label: "Biblioteca" },
  { href: "/dashboard/settings", label: "Configurações" },
];

function firstInitial(name?: string) {
  if (!name) return "M";
  const parts = name.trim().split(/\s+/);
  const first = parts[1] ?? parts[0];
  return first?.[0]?.toUpperCase() ?? "M";
}

export function TopBar() {
  const pathname = usePathname();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const doctor = useAppStore((s) => s.doctor);

  return (
    <header
      className="sticky top-0 z-40 h-16 border-b border-kairos-line flex items-center px-5 gap-4"
      style={{
        background: "color-mix(in oklch, var(--paper) 88%, transparent)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="shrink-0 w-10 h-10 rounded-full border border-kairos-line hover:border-kairos-charcoal"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-4 w-4 text-kairos-charcoal" />
      </Button>

      {/* Logo */}
      <Link href="/dashboard" className="shrink-0 ml-1">
        <KairosLogo size="sm" />
      </Link>

      {/* Primary nav */}
      <nav className="hidden md:flex items-center gap-1 ml-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-4 py-4 text-[13px] tracking-[0.01em] transition-colors whitespace-nowrap",
              pathname === item.href
                ? "text-kairos-charcoal"
                : "text-kairos-stone hover:text-kairos-charcoal"
            )}
          >
            {item.label}
            {pathname === item.href && (
              <span
                className="absolute bottom-0 left-4 right-4 h-px"
                style={{ background: "var(--gold)" }}
                aria-hidden
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-3">
        {/* Bible verse — discrete, hidden on smaller screens */}
        <BibleVerse />

        {/* Hairline divider */}
        <div
          className="hidden lg:block w-px h-5 shrink-0"
          style={{ background: "var(--line)" }}
          aria-hidden
        />

        {/* Theme switch */}
        <ThemeSwitch compact />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full border border-kairos-line hover:border-kairos-charcoal"
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4 text-kairos-charcoal" />
        </Button>

        {/* Doctor avatar chip */}
        <div className="avatar-chip-editorial ml-1">
          <span className="avatar-serif">{firstInitial(doctor?.name)}</span>
          <div className="hidden md:flex flex-col gap-0.5 leading-none">
            <span className="text-xs text-kairos-charcoal">
              {doctor?.name ?? "Dra. Marina Vasconcellos"}
            </span>
            <span className="mono-label" style={{ fontSize: 9 }}>
              Harmonização · SP
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
