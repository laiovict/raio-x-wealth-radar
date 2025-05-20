/**
 * Utility functions to help with type conversions
 * consistently across the application
 */

/**
 * Convert any value to a number
 * Handles string representations of numbers including those with currency symbols
 * 
 * @param value The value to convert to a number
 * @returns The converted number, or 0 if conversion fails
 */
export const toNumber = (value: string | number | undefined | null): number => {
  if (value === undefined || value === null) return 0;
  
  // If already a number, return it
  if (typeof value === 'number') return value;
  
  // Handle string representations
  if (typeof value === 'string') {
    // Remove currency symbols, spaces, and replace commas with dots
    const cleaned = value.replace(/[^\d,-]/g, '').replace(',', '.');
    const result = parseFloat(cleaned);
    return isNaN(result) ? 0 : result;
  }
  
  return 0;
};

/**
 * Convert a value to string for display 
 * 
 * @param value The value to convert to string
 * @returns The string representation
 */
export const toString = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Convert a value to a string specifically for formatting functions
 * Ensures the output is suitable for formatting functions that expect strings
 * 
 * @param value The value to convert
 * @returns The value as a string
 */
export const toFormattableString = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  return typeof value === 'number' ? value.toString() : value;
};

/**
 * Safely format a currency value, handling both string and number types
 * 
 * @param value The value to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (value: string | number | undefined | null): string => {
  const num = toNumber(value);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Safely format a percentage value, handling both string and number types
 * 
 * @param value The value to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: string | number | undefined | null): string => {
  const num = toNumber(value);
  return `${num.toFixed(2)}%`;
};

/**
 * Safely compare a value that could be string or number with a number
 * 
 * @param value The value to compare (could be string or number)
 * @param compareValue The number to compare with
 * @returns The comparison result
 */
export const compareToNumber = (value: string | number | undefined | null, compareValue: number): boolean => {
  return toNumber(value) > compareValue;
};

/**
 * Helper function to ensure a value is treated as a number for UI components
 * This is particularly useful for components that strictly require number types
 * 
 * @param value The value to ensure is a number
 * @returns A number value
 */
export const ensureNumber = (value: string | number | undefined | null): number => {
  const num = toNumber(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Helper function to ensure a value is treated as a string for UI components
 * This is particularly useful for components that strictly require string types
 * 
 * @param value The value to ensure is a string
 * @returns A string value
 */
export const ensureString = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return 'N/A';
  return String(value);
};

/**
 * Helper function to fix allocation defaults
 * @param allocation The allocation object to fix
 * @returns The fixed allocation object
 */
export const fixAllocationDefaults = (allocation: any): any => {
  if (!allocation) return null;
  
  // Ensure all required properties exist
  const result = {
    current: { ...allocation.current },
    recommended: { ...allocation.recommended },
    optimizationGain: allocation.optimizationGain || 0,
    dataSource: allocation.dataSource || 'synthetic'
  };
  
  return result;
};

/**
 * Helper function to fix liquidity defaults
 * @param liquidity The liquidity object to fix
 * @returns The fixed liquidity object
 */
export const fixLiquidityDefaults = (liquidity: any): any => {
  if (!liquidity) return null;
  
  // Ensure all required properties exist
  const result = {
    currentIdle: liquidity.currentIdle || 0,
    recommended: liquidity.recommended || 0,
    difference: liquidity.difference || 0,
    currentIdleMonths: liquidity.currentIdleMonths || 0,
    recommendedMonths: liquidity.recommendedMonths || 0,
    dataSource: liquidity.dataSource || 'synthetic'
  };
  
  return result;
};

/**
 * Helper function to perform arithmetic operations safely with any type
 * @param a First value
 * @param operation Operation to perform (+, -, *, /)
 * @param b Second value
 * @returns Result of operation as number
 */
export const arithmeticOperation = (
  a: string | number | undefined | null,
  operation: '+' | '-' | '*' | '/',
  b: string | number | undefined | null
): number => {
  const numA = toNumber(a);
  const numB = toNumber(b);
  
  switch (operation) {
    case '+': return numA + numB;
    case '-': return numA - numB;
    case '*': return numA * numB;
    case '/': return numB !== 0 ? numA / numB : 0;
    default: return 0;
  }
};

/**
 * Safely gets a value with fallback to synthetic data if needed
 * @param value The value to check
 * @param fallbackValue The fallback value to use if value is invalid
 * @returns The safe value
 */
export const getSafeValue = <T>(value: T | undefined | null, fallbackValue: T): T => {
  if (value === undefined || value === null) return fallbackValue;
  return value;
};

/**
 * Determines the appropriate data source for values
 * @param realValue The real value from the database
 * @param syntheticValue The synthetic value to use as fallback
 * @param realSource The data source of the real value
 * @returns The appropriate value and data source
 */
export const determineDataSource = <T>(
  realValue: T | undefined | null,
  syntheticValue: T,
  realSource: 'xp' | 'supabase' | 'openfinance' = 'supabase'
): { value: T, dataSource: 'xp' | 'supabase' | 'openfinance' | 'synthetic' } => {
  if (realValue !== undefined && realValue !== null) {
    return { value: realValue, dataSource: realSource };
  }
  return { value: syntheticValue, dataSource: 'synthetic' };
};

/**
 * Convert any DataSourceType to compatible format for components
 * that only support 'synthetic' or 'supabase'
 * 
 * @param sourceType The original DataSourceType value
 * @returns A compatible data source type
 */
export const toCompatibleDataSource = (sourceType?: string): 'synthetic' | 'supabase' => {
  if (!sourceType || sourceType === 'synthetic') return 'synthetic';
  
  // Map all real sources (xp, openfinance) to supabase for compatibility
  return 'supabase';
};

/**
 * Check if we have actual data or need to use synthetic data
 * 
 * @param value The value to check
 * @returns Whether the value represents actual data
 */
export const hasActualData = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'number' && value === 0) return false;
  return true;
};

/**
 * Get a safe string for display purposes
 * Ensures the output is never undefined or null
 * 
 * @param value The value to make safe for display
 * @returns A safe string for display
 */
export const getSafeDisplayString = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};
