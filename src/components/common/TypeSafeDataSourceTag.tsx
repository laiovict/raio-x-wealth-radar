
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, BeakerIcon, Calculator } from "lucide-react";

// Import the DataSourceType
import { DataSourceType } from '@/types/raioXTypes';

interface TypeSafeDataSourceTagProps {
  source: DataSourceType;
  showLabel?: boolean;
  className?: string;
}

/**
 * Component to display a visual indicator of data source
 */
const TypeSafeDataSourceTag: React.FC<TypeSafeDataSourceTagProps> = ({
  source,
  showLabel = false,
  className = ""
}) => {
  // Define appearance based on data source
  const tagConfig = {
    supabase: {
      icon: <Database className="h-3 w-3" />,
      label: "Dados Reais",
      className: "bg-green-900/20 text-green-400 border-green-800/30"
    },
    synthetic: {
      icon: <BeakerIcon className="h-3 w-3" />,
      label: "Dados Sintéticos",
      className: "bg-amber-900/20 text-amber-400 border-amber-800/30"
    },
    xp: {
      icon: <CheckCircle className="h-3 w-3" />,
      label: "XP",
      className: "bg-blue-900/20 text-blue-400 border-blue-800/30" 
    },
    openfinance: {
      icon: <CheckCircle className="h-3 w-3" />,
      label: "Open Finance",
      className: "bg-indigo-900/20 text-indigo-400 border-indigo-800/30"
    },
    calculated: {
      icon: <Calculator className="h-3 w-3" />,
      label: "Calculado",
      className: "bg-purple-900/20 text-purple-400 border-purple-800/30"
    }
  };
  
  // Use supabase as default if source is not recognized
  const config = tagConfig[source] || tagConfig.synthetic;
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${className} flex items-center gap-1 px-1.5 py-0.5`}
    >
      {config.icon}
      {showLabel && <span className="text-xs">{config.label}</span>}
    </Badge>
  );
};

export default TypeSafeDataSourceTag;
