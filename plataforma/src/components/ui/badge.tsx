import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "mono-label inline-flex items-center rounded-full px-2.5 py-1 transition-colors",
  {
    variants: {
      variant: {
        default: "border border-kairos-gold/40 text-kairos-gold-dark bg-transparent",
        secondary: "border border-kairos-line text-kairos-stone bg-transparent",
        outline: "border border-kairos-line text-kairos-charcoal bg-transparent",
        reel: "border border-kairos-gold/40 text-kairos-gold-dark bg-transparent",
        post: "border border-kairos-line text-kairos-stone bg-transparent",
        story: "border border-kairos-gold/30 text-kairos-gold-dark bg-transparent",
        carrossel: "border border-kairos-line text-kairos-charcoal bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
