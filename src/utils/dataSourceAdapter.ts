
import { DataSourceType } from '@/types/raioXTypes';

/**
 * This adapter handles compatibility between different DataSourceType definitions
 * Some components expect only 'synthetic' | 'supabase', while our system supports
 * 'xp' | 'openfinance' | 'synthetic' | 'supabase'
 */

/**
 * Convert full DataSourceType to the limited version expected by some components
 * @param sourceType The original DataSourceType value
 * @returns 'synthetic' or 'supabase' for legacy component compatibility
 */
export const toLimitedDataSource = (sourceType?: DataSourceType | string): 'synthetic' | 'supabase' => {
  if (!sourceType || sourceType === 'synthetic') {
    return 'synthetic';
  }
  
  // All real data sources are mapped to 'supabase' for limited components
  return 'supabase';
};

/**
 * Convert the limited DataSource type back to a full DataSourceType
 * @param limitedType The limited data source type ('synthetic' or 'supabase')
 * @param actualSource The actual data source if known
 * @returns The full DataSourceType value
 */
export const toFullDataSource = (
  limitedType: 'synthetic' | 'supabase', 
  actualSource?: DataSourceType
): DataSourceType => {
  if (limitedType === 'synthetic') {
    return 'synthetic';
  }
  
  // If we know the actual source, use it, otherwise default to 'supabase'
  return actualSource || 'supabase';
};

/**
 * Convert to compatible data source format for older components
 * Alias for toLimitedDataSource
 * @param sourceType The original DataSourceType value
 * @returns 'synthetic' or 'supabase' for legacy component compatibility
 */
export const toCompatibleDataSource = (sourceType?: DataSourceType | string): 'synthetic' | 'supabase' => {
  return toLimitedDataSource(sourceType as DataSourceType);
};

/**
 * Check if a value is from a real data source or is synthetic
 * @param sourceType The data source type to check
 * @returns True if this is real (non-synthetic) data
 */
export const isRealData = (sourceType?: DataSourceType | string): boolean => {
  return sourceType !== undefined && sourceType !== 'synthetic';
};

/**
 * Interface for objects with a dataSource property
 */
export interface WithDataSource {
  dataSource?: DataSourceType | string;
}

/**
 * Adapt an object's dataSource property to be compatible with limited components
 * @param obj The object with a dataSource property
 * @returns The object with a compatible dataSource property
 */
export const adaptForLimitedComponents = <T extends WithDataSource>(obj: T): T & {dataSource: 'synthetic' | 'supabase'} => {
  return {
    ...obj,
    dataSource: toLimitedDataSource(obj.dataSource as DataSourceType)
  };
};

/**
 * Adapt a collection of objects with dataSource properties
 * @param collection The collection of objects with dataSource properties
 * @returns The collection with compatible dataSource properties
 */
export const adaptCollectionForLimitedComponents = <T extends WithDataSource>(
  collection: T[]
): (T & {dataSource: 'synthetic' | 'supabase'})[] => {
  return collection.map(item => adaptForLimitedComponents(item));
};

/**
 * Determine if a value is likely a "real" value (not missing/empty/zero)
 * @param value The value to check
 * @returns True if the value is considered real (not empty/zero)
 */
export const hasActualValue = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'number' && value === 0) return false;
  return true;
};

/**
 * Get a user-friendly display name for a data source
 * @param sourceType The data source type
 * @returns A user-friendly name for the data source
 */
export const getDataSourceDisplayName = (sourceType?: DataSourceType | string): string => {
  if (!sourceType) return 'Dados sintéticos';
  
  switch (sourceType) {
    case 'xp':
      return 'Dados XP';
    case 'openfinance':
      return 'Open Finance';
    case 'supabase':
      return 'Dados reais';
    case 'synthetic':
    default:
      return 'Dados sintéticos';
  }
};

/**
 * Merge data sources, prioritizing real data over synthetic
 * @param sources Array of data sources to merge
 * @returns The most reliable data source
 */
export const mergeDataSources = (sources: Array<DataSourceType | string | undefined>): DataSourceType => {
  // Filter out undefined values
  const validSources = sources.filter(source => source !== undefined) as DataSourceType[];
  
  // If no valid sources, return synthetic
  if (validSources.length === 0) return 'synthetic';
  
  // Priority: xp > openfinance > supabase > synthetic
  if (validSources.includes('xp')) return 'xp';
  if (validSources.includes('openfinance')) return 'openfinance';
  if (validSources.includes('supabase')) return 'supabase';
  
  // Default to synthetic if no real data sources found
  return 'synthetic';
};
