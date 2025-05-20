
import React from 'react';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';
import { DataSourceType } from '@/types/raioXTypes';

interface DataSourceIndicatorProps {
  source: DataSourceType | 'supabase' | 'synthetic' | string;
}

const DataSourceIndicator = ({ source }: DataSourceIndicatorProps) => {
  const limitedSource = toLimitedDataSource(source as DataSourceType);
  
  return (
    <span className={`ml-1 ${limitedSource === 'supabase' ? 'text-green-400' : 'text-amber-400'}`}>
      {limitedSource === 'supabase' ? '✓' : '*'}
    </span>
  );
};

export default DataSourceIndicator;
