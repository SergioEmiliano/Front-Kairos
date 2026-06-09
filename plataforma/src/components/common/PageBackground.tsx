import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "auth" | "app";
}

export function PageBackground({ children, className, variant = "auth" }: PageBackgroundProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        variant === "auth" && "bokeh-bg flex items-center justify-center",
        variant === "app" && "bg-kairos-cream",
        className
      )}
    >
      {children}
    </div>
  );
}
