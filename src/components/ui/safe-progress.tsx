
import React from "react";
import { Progress } from "./progress";
import { cn } from "@/lib/utils";

interface SafeProgressProps {
  value?: number;
  className?: string;
  indicatorClassName?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

/**
 * A safe wrapper for the Progress component that handles undefined/null values
 */
export const SafeProgress: React.FC<SafeProgressProps> = ({ 
  value, 
  className, 
  variant = "default",
  indicatorClassName
}) => {
  // Make sure value is between 0-100
  const safeValue = !value || isNaN(value) || value < 0 
    ? 0 
    : value > 100 
      ? 100 
      : value;
  
  return (
    <Progress 
      value={safeValue} 
      className={cn("h-2", className)} 
      variant={variant}
      indicatorClassName={indicatorClassName}
    />
  );
};

export default SafeProgress;
