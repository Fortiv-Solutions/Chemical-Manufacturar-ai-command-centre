import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-bold cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8D9] disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#00B8D9] text-[#FFFFFF] font-bold shadow-[0_2px_10px_rgba(0,184,217,0.25)] hover:bg-[#009BB8]",
        destructive:
          "bg-[#EF4444] text-[#FFFFFF] font-bold shadow-sm hover:bg-[#DC2626]",
        outline:
          "border border-[#D9E2EC] bg-[#FFFFFF] text-[#1E293B] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]",
        secondary:
          "bg-[#0F4C81] text-[#FFFFFF] font-bold hover:bg-[#0C3C66] shadow-sm",
        ghost:
          "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]",
        link:
          "text-[#00B8D9] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9.5 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10.5 rounded-lg px-6 text-sm",
        icon: "h-9.5 w-9.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };


