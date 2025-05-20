
import React from 'react';
import { CheckCircle } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface DataSourceTagProps {
  dataSource: DataSourceType | 'supabase' | 'synthetic' | undefined;
}

const DataSourceTag = ({ dataSource }: DataSourceTagProps) => {
  if (!dataSource) return null;
  
  // Use TypeSafeDataSourceTag to handle conversion between full and limited DataSourceType
  return (
    <TypeSafeDataSourceTag source={dataSource} />
  );
};

export default DataSourceTag;
