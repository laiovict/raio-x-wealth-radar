
import { toNumber } from './typeConversionHelpers';

/**
 * Format a value as currency
 * 
 * @param value Value to format as currency (can be string or number)
 * @param options Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: string | number | undefined | null,
  minimumFractionDigits = 0, 
  maximumFractionDigits = 0
): string => {
  // Convert value to number using our utility
  const numValue = toNumber(value);
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numValue);
};

/**
 * Format a value as percentage
 * 
 * @param value Value to format as percentage
 * @param digits Number of decimal digits to display
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: string | number | undefined | null,
  digits = 1
): string => {
  const numValue = toNumber(value);
  return `${numValue.toFixed(digits)}%`;
};

/**
 * Format a date value
 * 
 * @param date Date to format
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', options || {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
