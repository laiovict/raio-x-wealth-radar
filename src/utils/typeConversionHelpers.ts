
/**
 * Safely convert a value to a number
 */
export const toNumber = (value: any): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsedValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNaN(parsedValue) ? 0 : parsedValue;
  }
  return 0;
};

/**
 * Ensure a value is a number, or return 0 if it can't be converted
 */
export const ensureNumber = (value: any): number => {
  return toNumber(value);
};

/**
 * Convert any value to a string safely
 */
export const toString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  return String(value);
};

/**
 * Ensure a value is a string, or return '' if it can't be converted
 */
export const ensureString = (value: any): string => {
  return toString(value);
};

/**
 * Convert a string or number to a safe string representation
 * that can be displayed in UI
 */
export const toSafeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return toString(value);
};

/**
 * Convert a string or number to a parseable string
 * that can be used for calculation
 */
export const toParseableString = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '0';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'string') {
    // Remove all non-numeric characters except for the decimal point
    return value.replace(/[^\d.-]/g, '') || '0';
  }
  return '0';
};
