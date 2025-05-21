
import { DataSourceType } from '@/types/raioXTypes';

// Converting different data sources to a limited set for UI display
export const toLimitedDataSource = (source: DataSourceType | string): 'supabase' | 'synthetic' => {
  // If source is a string but not a valid DataSourceType, convert it
  if (typeof source === 'string') {
    if (['supabase', 'xp', 'openfinance', 'calculated'].includes(source)) {
      return 'supabase';
    }
  }
  
  // Return synthetic for any other value
  return 'synthetic';
};

// Get appropriate label for data source display
export const getDataSourceLabel = (source: DataSourceType | string): string => {
  const mappedSource = toLimitedDataSource(source);
  
  switch (mappedSource) {
    case 'supabase':
      return 'Dados reais';
    case 'synthetic':
      return 'Dados simulados';
    default:
      return 'Fonte desconhecida';
  }
};

// Get appropriate color for data source display
export const getDataSourceColor = (source: DataSourceType | string): string => {
  const mappedSource = toLimitedDataSource(source);
  
  switch (mappedSource) {
    case 'supabase':
      return 'text-green-400';
    case 'synthetic':
      return 'text-amber-400';
    default:
      return 'text-gray-400';
  }
};

export default {
  toLimitedDataSource,
  getDataSourceLabel,
  getDataSourceColor
};
