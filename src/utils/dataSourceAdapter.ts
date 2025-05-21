
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Convert any data source type to a limited set for display purposes
 * This helps with consistency in UI display of data sources
 * 
 * @param dataSource The data source to convert
 * @returns A simplified data source type for display
 */
export const toLimitedDataSource = (dataSource: DataSourceType | string | undefined): 'supabase' | 'synthetic' => {
  if (!dataSource) return 'synthetic';
  
  // Map all real data sources to 'supabase'
  if (dataSource === 'supabase' || dataSource === 'xp' || dataSource === 'openfinance') {
    return 'supabase';
  }
  
  // For calculated data, it depends on what the source data was
  if (dataSource === 'calculated') {
    // In our system, calculated data is still considered real data
    return 'supabase';
  }
  
  // Default to synthetic
  return 'synthetic';
};

/**
 * Function to standardize data sources across the application
 * @param source Original data source
 * @returns Standardized data source
 */
export const standardizeDataSource = (source: string | undefined): DataSourceType => {
  if (!source) return 'synthetic';
  
  switch (source.toLowerCase()) {
    case 'supabase':
    case 'xp':
      return 'supabase';
    case 'openfinance':
      return 'openfinance';
    case 'calculated':
      return 'calculated';
    default:
      return 'synthetic';
  }
};
