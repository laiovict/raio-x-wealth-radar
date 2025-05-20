
import { DataSourceType } from '@/types/raioXTypes';

/**
 * This adapter handles compatibility between different DataSourceType definitions
 * Some components expect only 'synthetic' | 'supabase', while our system supports
 * 'xp' | 'openfinance' | 'synthetic' | 'supabase'
 */

/**
 * Convert full DataSourceType to the limited version expected by some components
 */
export const toLimitedDataSource = (sourceType?: DataSourceType): 'synthetic' | 'supabase' => {
  if (!sourceType || sourceType === 'synthetic') {
    return 'synthetic';
  }
  
  // All real data sources are mapped to 'supabase' for limited components
  return 'supabase';
};

/**
 * Convert the limited DataSource type back to a full DataSourceType
 */
export const toFullDataSource = (limitedType: 'synthetic' | 'supabase', actualSource?: DataSourceType): DataSourceType => {
  if (limitedType === 'synthetic') {
    return 'synthetic';
  }
  
  // If we know the actual source, use it, otherwise default to 'supabase'
  return actualSource || 'supabase';
};

/**
 * Convert to compatible data source format for older components
 * Alias for toLimitedDataSource
 */
export const toCompatibleDataSource = (sourceType?: DataSourceType): 'synthetic' | 'supabase' => {
  return toLimitedDataSource(sourceType);
};

/**
 * Check if a value is from a real data source or is synthetic
 */
export const isRealData = (sourceType?: DataSourceType): boolean => {
  return sourceType !== undefined && sourceType !== 'synthetic';
};

/**
 * Interface for objects with a dataSource property
 */
export interface WithDataSource {
  dataSource?: DataSourceType;
}

/**
 * Adapt an object's dataSource property to be compatible with limited components
 */
export const adaptForLimitedComponents = <T extends WithDataSource>(obj: T): T & {dataSource: 'synthetic' | 'supabase'} => {
  return {
    ...obj,
    dataSource: toLimitedDataSource(obj.dataSource)
  };
};

/**
 * Adapt a collection of objects with dataSource properties
 */
export const adaptCollectionForLimitedComponents = <T extends WithDataSource>(collection: T[]): (T & {dataSource: 'synthetic' | 'supabase'})[] => {
  return collection.map(item => adaptForLimitedComponents(item));
};

/**
 * Determine if a value is likely a "real" value (not missing/empty/zero)
 */
export const hasActualValue = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'number' && value === 0) return false;
  return true;
};
