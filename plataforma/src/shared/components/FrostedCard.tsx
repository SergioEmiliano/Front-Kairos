import { cn } from "@/shared/lib/utils";

interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

/**
 * Editorial paper card. Keeps the existing class name "glass-card"
 * (now re-pointed in globals.css to a flat, hairline-bordered surface).
 */
export function FrostedCard({ children, className, noPadding = false, ...props }: FrostedCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-[var(--radius)]",
        !noPadding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
