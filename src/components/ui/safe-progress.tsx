
import React from "react";
import { cn } from "@/lib/utils";

interface SafeProgressProps {
  /** The current progress value (0-100) */
  value: number;
  /** Optional CSS class name */
  className?: string;
  /** Optional CSS class for the indicator */
  indicatorClassName?: string;
  /** Variant of the progress bar */
  variant?: "default" | "success" | "info" | "warning" | "danger";
  /** Max value (default 100) */
  max?: number;
}

/**
 * A safe progress component that properly handles classNames
 * without TypeScript errors.
 */
const SafeProgress = React.forwardRef<HTMLDivElement, SafeProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, variant = "default", ...props }, ref) => {
    // Calculate percentage
    const percentage = Math.min(Math.max(0, value), max) / max * 100;
    
    // Get variant class
    const getVariantClass = () => {
      switch(variant) {
        case "success": return "bg-green-600";
        case "info": return "bg-blue-600";
        case "warning": return "bg-yellow-600";
        case "danger": return "bg-red-600";
        default: return "bg-primary";
      }
    };
    
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/10",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all",
            getVariantClass(),
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

SafeProgress.displayName = "SafeProgress";

export { SafeProgress };
