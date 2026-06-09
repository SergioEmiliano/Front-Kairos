"use client";

import { useCallback } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends ButtonProps {
  fullWidth?: boolean;
}

export function GoldButton({ children, className, fullWidth = false, ...props }: GoldButtonProps) {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <Button
      variant="default"
      size="lg"
      onMouseMove={onMouseMove}
      className={cn(
        "btn-gold h-12 px-7 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
