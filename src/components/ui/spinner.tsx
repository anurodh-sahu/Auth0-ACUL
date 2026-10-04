import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "text-surface inline-block rounded-full duration-[5000] ease-linear",
  {
    variants: {
      variant: {
        dots: "border-[#E7000B] animate-[spin_5s_linear_infinite] border-6 border-dotted",
        pulse: "bg-[#E7000B] animate-pulse",
        solid:
          "border-[#E7000B] animate-spin border-6 border-t-transparent",
      },
      size: {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
        page: "h-40 w-40",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "page",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ variant, size, className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-white/30",
        className
      )}
      {...props}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={props["aria-label"] || "Loading page"}
    >
      <div
        className={spinnerVariants({ variant, size })}
        aria-hidden="true"
      />
    </div>
  );
}
