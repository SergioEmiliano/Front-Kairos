"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { NewsItem } from "@/shared/types";
import { mockNewsItems } from "@/shared/mock/news";
import { ExternalLink, Clock } from "lucide-react";

// ─── Pending tasks (unchanged) ────────────────────────────────────────────────

const pendingTasks = [
  { tag: "Hoje · 14:00", title: "Gravar carrossel de bioestimulador" },
  { tag: "Hoje · 18:30", title: "Revisar legenda · Reel harmonização" },
  { tag: "Amanhã · 09:00", title: "Postar story bastidores" },
  { tag: "Qui · 11:00", title: "Resposta às leads da semana" },
  { tag: "Sex · 16:00", title: "Check-in financeiro semanal" },
];

// ─── Category color map ───────────────────────────────────────────────────────

const categoryStyle: Record<string, string> = {
  Regulatório: "color-mix(in oklch, var(--error) 80%, transparent)",
  Bioestimulador: "var(--gold-dark)",
  Marketing: "var(--steel-dark)",
  Botox: "color-mix(in oklch, var(--ink) 70%, transparent)",
  Negócios: "var(--gold)",
  Tecnologia: "var(--steel-dark)",
  Harmonização: "var(--gold-dark)",
};

// ─── NewsCard ─────────────────────────────────────────────────────────────────

interface NewsCardProps {
  item: NewsItem;
  isLast: boolean;
}

function NewsCard({ item, isLast }: NewsCardProps) {
  const accentColor = categoryStyle[item.category] ?? "var(--mute)";

  return (
    <li
      className={cn(
        "py-3 group cursor-pointer border-t border-kairos-line/60 transition-colors hover:bg-kairos-pearl/30",
        isLast && "border-b border-kairos-line/60",
        "-mx-5 px-5"
      )}
    >
      {/* Category + reading time */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          {item.isNew && (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold)" }}
              aria-label="Novo"
            />
          )}
          <span
            className="mono-label"
            style={{ fontSize: 9, color: accentColor }}
          >
            {item.category}
          </span>
        </div>
        <div className="flex items-center gap-1 text-kairos-stone opacity-70">
          <Clock className="h-2.5 w-2.5" />
          <span className="mono-label" style={{ fontSize: 8 }}>
            {item.readingTimeMin} min
          </span>
        </div>
      </div>

      {/* Title */}
      <p className="text-[12px] text-kairos-charcoal/90 leading-[1.45] font-medium line-clamp-2 group-hover:text-kairos-charcoal transition-colors">
        {item.title}
      </p>

      {/* Summary */}
      <p className="text-[11px] text-kairos-stone leading-[1.4] mt-1 line-clamp-2">
        {item.summary}
      </p>

      {/* Ver mais */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 mt-1.5 text-[10px] transition-colors"
          style={{ color: "var(--gold-dark)" }}
        >
          Ver mais
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      )}
    </li>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <aside
      className={cn(
        "relative shrink-0 h-full z-30 transition-all duration-300 overflow-hidden border-r border-kairos-line bg-kairos-paper",
        sidebarOpen ? "w-72" : "w-0"
      )}
    >
      <div className="w-72 h-full overflow-y-auto kairos-scroll flex flex-col">
        <div className="px-5 pt-5 flex-1 space-y-5">

          {/* ── Tarefas pendentes ─────────────────────────────────────────── */}
          <section>
            <h4 className="kicker mb-3.5" style={{ color: "var(--gold-dark)", gap: 8 }}>
              <span>Tarefas pendentes</span>
              <span className="ml-auto text-kairos-stone">
                ({String(pendingTasks.length).padStart(2, "0")})
              </span>
            </h4>
            <ul>
              {pendingTasks.map((task, i) => (
                <li
                  key={task.title}
                  className={cn(
                    "py-3 text-[13px] text-kairos-charcoal/90 cursor-pointer hover:text-kairos-charcoal transition-colors border-t border-kairos-line/60",
                    i === pendingTasks.length - 1 && "border-b border-kairos-line/60"
                  )}
                >
                  <span className="mono-label block mb-1" style={{ fontSize: 9 }}>
                    {task.tag}
                  </span>
                  {task.title}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Notícias importantes ──────────────────────────────────────── */}
          <section>
            <h4
              className="kicker mb-3.5"
              style={{ color: "var(--gold-dark)" }}
            >
              <span>Central de notícias</span>
              <span className="ml-auto text-kairos-stone">
                ({String(mockNewsItems.length).padStart(2, "0")})
              </span>
            </h4>
            <ul>
              {mockNewsItems.map((item, i) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  isLast={i === mockNewsItems.length - 1}
                />
              ))}
            </ul>
          </section>
        </div>

        {/* Footer status */}
        <div className="px-5 py-4 border-t border-kairos-line-soft">
          <div className="mono-label inline-flex items-center gap-2">
            <span className="animate-gold-pulse" style={{ color: "var(--gold-dark)" }}>
              ◆
            </span>
            Refinando sua estratégia · ciclo 04/26
          </div>
        </div>
      </div>
    </aside>
  );
}
