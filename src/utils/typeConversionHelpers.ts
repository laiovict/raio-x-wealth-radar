
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
