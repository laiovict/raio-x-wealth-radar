
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
