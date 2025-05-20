
/**
 * Utility functions for formatting values consistently across the app
 */

/**
 * Format currency values according to Brazilian format
 * @param value Number or string to format as currency
 * @param maxDigits Maximum fraction digits (default: 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | string, maxDigits: number = 0) => {
  // Parse the value if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(numValue)) {
    return 'R$ 0';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: maxDigits,
  }).format(numValue);
};

/**
 * Format percentage values
 * @param value Number to format as percentage
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 2) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date according to Brazilian format
 * @param date Date to format
 * @returns Formatted date string (DD/MM/YYYY)
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

/**
 * Format number with thousands separator
 * @param value Number or string to format
 * @param decimals Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export const formatNumber = (value: number | string, decimals: number = 0) => {
  // Parse the value if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(numValue)) {
    return '0';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(numValue);
};

/**
 * Format date to month/year format
 * @param date Date to format
 * @returns Formatted date string (MM/YYYY)
 */
export const formatMonthYear = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

/**
 * Format simple ISO date string to DD/MM/YYYY
 * @param dateString ISO date string
 * @returns Formatted date string (DD/MM/YYYY)
 */
export const formatISODate = (dateString: string) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return formatDate(date);
  } catch (error) {
    console.error("Error formatting ISO date:", error);
    return dateString;
  }
};

/**
 * Parse YYY-MM-DD string to Date object
 * @param dateString Date string in YYYY-MM-DD format
 * @returns Date object
 */
export const parseYYYYMMDD = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  try {
    // Extract date parts
    const parts = dateString.split('-');
    if (parts.length < 3) return null;
    
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Month is 0-indexed in JS Date
    const day = parseInt(parts[2]);
    
    return new Date(year, month, day);
  } catch (error) {
    console.error("Error parsing YYYY-MM-DD date:", error);
    return null;
  }
};

/**
 * Convert string or number to number safely
 * @param value String or number to convert
 * @param defaultValue Default value if conversion fails
 * @returns Number value
 */
export const toNumber = (value: string | number, defaultValue: number = 0): number => {
  if (typeof value === 'number') return value;
  if (!value) return defaultValue;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};
