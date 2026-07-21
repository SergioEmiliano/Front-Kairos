import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  progress?: number;
  index?: number;
  italic?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  progress,
  index,
  italic = false,
}: MetricCardProps) {
  return (
    <div className="metric">
      <div className="flex items-start justify-between gap-2">
        <div className="metric-icon-wrap">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.4} />
        </div>
        {typeof index === "number" && (
          <span className="mono-label" style={{ fontSize: 9 }}>
            ◆ {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div>
        <div className={italic ? "metric-value italic" : "metric-value"}>{value}</div>
        <div className="metric-label mt-2.5">{title}</div>
      </div>
      {(typeof progress === "number" || subtitle) && (
        <div>
          {typeof progress === "number" && (
            <div className="metric-progress">
              <div
                className="metric-progress-bar"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              />
            </div>
          )}
          {subtitle && (
            <div className="mono-label mt-2.5" style={{ fontSize: 9 }}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
