
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Utility functions for handling data safely across modules
 */

/**
 * Safely convert a value to a number
 * @param value The value to convert
 * @param fallback Optional fallback value if conversion fails
 * @returns A number
 */
export function toNumber(value: string | number | undefined | null, fallback: number = 0): number {
  if (value === undefined || value === null) return fallback;
  
  if (typeof value === 'number') return isNaN(value) ? fallback : value;
  
  // Handle string representations
  if (typeof value === 'string') {
    // Remove currency symbols, spaces, and replace commas with dots
    const cleaned = value.replace(/[^\d,-]/g, '').replace(',', '.');
    const result = parseFloat(cleaned);
    return isNaN(result) ? fallback : result;
  }
  
  return fallback;
}

/**
 * Compare a value to a number
 * @param value Value to compare
 * @param compareValue Value to compare against
 * @returns True if value is greater than compareValue
 */
export function compareToNumber(value: string | number | undefined | null, compareValue: number): boolean {
  return toNumber(value) > compareValue;
}

/**
 * Format a value as currency
 * @param value The value to format
 * @param locale The locale to use
 * @returns A formatted string
 */
export function formatCurrency(
  value: string | number | undefined | null, 
  locale: string = 'pt-BR', 
  currency: string = 'BRL'
): string {
  const num = toNumber(value);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format a value as percentage
 * @param value The value to format
 * @returns A formatted string
 */
export function formatPercentage(value: string | number | undefined | null): string {
  const num = toNumber(value);
  return `${num.toFixed(2)}%`;
}

/**
 * Clean an object by removing undefined or null values
 * @param obj The object to clean
 * @returns A new object with only defined values
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * Determine if data should use synthetic or real values
 * @param realValue The real value from the data source
 * @param syntheticValue The synthetic value to use as fallback
 * @param realSource The data source of the real value
 * @returns An object containing the appropriate value and data source
 */
export function determineDataSource<T>(
  realValue: T | undefined | null,
  syntheticValue: T,
  realSource: DataSourceType = 'supabase'
): { value: T, dataSource: DataSourceType } {
  if (realValue !== undefined && realValue !== null) {
    return { value: realValue, dataSource: realSource };
  }
  return { value: syntheticValue, dataSource: 'synthetic' };
}
