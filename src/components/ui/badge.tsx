import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-[#00C2D1]/30 bg-[#00C2D1]/10 text-[#00C2D1]",
        secondary:
          "border-[#232D3A] bg-[#10151C] text-[#B6C2CF]",
        destructive:
          "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]",
        outline:
          "border-[#232D3A] text-[#F5F7FA]",
        success:
          "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]",
        warning:
          "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]",
        info:
          "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

