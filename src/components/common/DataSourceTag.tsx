
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { CheckCircle, Database } from 'lucide-react';
import { Globe } from '@/components/common/icons';
import { DataSourceType } from '@/types/raioXTypes';

interface DataSourceTagProps {
  source?: 'synthetic' | 'supabase' | DataSourceType | string | number;
  className?: string;
}

/**
 * Component to display a tag indicating the source of data
 */
const DataSourceTag: React.FC<DataSourceTagProps> = ({ source, className = '' }) => {
  if (!source) return null;
  
  // Convert number to string if needed
  const sourceValue = typeof source === 'number' ? String(source) : source;
  
  const getTagContent = () => {
    switch (sourceValue) {
      case 'xp':
        return (
          <>
            <CheckCircle className="inline-block h-3 w-3 text-green-400" />
            <span className="sr-only">Dados XP</span>
          </>
        );
      case 'openfinance':
        return (
          <>
            <Globe className="inline-block h-3 w-3 text-blue-400" />
            <span className="sr-only">Dados Open Finance</span>
          </>
        );
      case 'supabase':
        return (
          <>
            <Database className="inline-block h-3 w-3 text-green-500" />
            <span className="sr-only">Dados Supabase</span>
          </>
        );
      case 'synthetic':
        return (
          <>
            <span className="text-amber-400">*</span>
            <span className="sr-only">Dados sintéticos</span>
          </>
        );
      default:
        // Fallback to synthetic display for unknown sources
        return (
          <>
            <span className="text-amber-400">*</span>
            <span className="sr-only">Fonte de dados desconhecida</span>
          </>
        );
    }
  };
  
  const getTooltipContent = () => {
    switch (sourceValue) {
      case 'xp':
        return "Dados reais da XP Investimentos";
      case 'openfinance':
        return "Dados obtidos via Open Finance";
      case 'supabase':
        return "Dados reais do banco de dados";
      case 'synthetic':
        return "Dados sintéticos para demonstração";
      default:
        return "Fonte de dados desconhecida";
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`ml-1 ${className}`}>
            {getTagContent()}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DataSourceTag;
