
import { DataSourceType } from '@/types/raioXTypes';
import { 
  formatCurrency, 
  toNumber, 
  toString,
  formatPercentage
} from '@/utils/typeConversionHelpers';

/**
 * Adapters for converting mixed data types consistently across the application
 */

/**
 * Safely handle number formats for display
 * @param value Number or string value
 * @param formatter Optional formatter function
 * @returns Formatted string
 */
export const formatSafeNumber = (
  value: number | string | undefined | null, 
  formatter?: (val: number) => string
): string => {
  if (value === undefined || value === null || value === '') return '0';
  
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  
  if (isNaN(numValue)) return '0';
  
  return formatter ? formatter(numValue) : numValue.toString();
};

/**
 * Format a value as currency
 * @param value Value to format
 * @returns Formatted currency string
 */
export const formatSafeCurrency = (value: number | string | undefined | null): string => {
  return formatSafeNumber(value, (val) => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val)
  );
};

/**
 * Format a value as percentage
 * @param value Value to format
 * @returns Formatted percentage string
 */
export const formatSafePercentage = (value: number | string | undefined | null): string => {
  return formatSafeNumber(value, (val) => `${val.toFixed(2)}%`);
};

/**
 * Ensure a value is a number for calculations
 * @param value Value to convert
 * @returns Number value
 */
export const ensureSafeNumber = (value: number | string | undefined | null): number => {
  if (value === undefined || value === null || value === '') return 0;
  
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  
  return isNaN(numValue) ? 0 : numValue;
};

/**
 * Get safe data source for component
 * @param source DataSourceType value
 * @returns Safe data source value for components that expect 'synthetic' | 'supabase'
 */
export const getSafeDataSource = (source?: DataSourceType): 'synthetic' | 'supabase' => {
  if (!source || source === 'synthetic') return 'synthetic';
  return 'supabase';
};

/**
 * Process mixed types in array data
 * @param items Array of items with potential mixed types
 * @param numberFields Fields that should be treated as numbers
 * @returns Array with consistent types
 */
export const processMixedTypeArray = <T extends Record<string, any>>(
  items: T[] | null | undefined,
  numberFields: string[] = []
): T[] => {
  if (!items || !Array.isArray(items)) return [];
  
  return items.map(item => {
    const result = { ...item } as Record<string, any>;
    
    numberFields.forEach(field => {
      if (field in item) {
        result[field] = ensureSafeNumber(item[field]);
      }
    });
    
    return result as T;
  });
};
