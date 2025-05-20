
import React from 'react';
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { CheckCircle } from "lucide-react";
import { DataSourceType } from '@/types/raioXTypes';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';

interface DataSourceTagProps {
  dataSource: DataSourceType | 'supabase' | 'synthetic' | undefined;
}

const DataSourceTag = ({ dataSource }: DataSourceTagProps) => {
  if (!dataSource) return null;
  
  // Convert any complex DataSourceType to limited type for display
  const limitedDataSource = toLimitedDataSource(dataSource);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`ml-1.5 ${limitedDataSource === 'supabase' ? 'text-green-400' : 'text-amber-400'}`}>
            {limitedDataSource === 'supabase' ? '✓' : '*'}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{limitedDataSource === 'supabase' ? 'Dados reais' : 'Dados estimados'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DataSourceTag;
