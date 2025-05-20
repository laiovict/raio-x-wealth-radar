
import { toNumber } from '@/utils/typeConversionHelpers';

/**
 * Format a currency value
 * @param value Number or string to format
 * @param minimumFractionDigits Minimum fraction digits (default 0)
 * @param maximumFractionDigits Maximum fraction digits (default 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | string, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  const numValue = toNumber(value);
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(numValue);
};

/**
 * Format a percentage value
 * @param value Number to format
 * @param minimumFractionDigits Minimum fraction digits (default 1)
 * @param maximumFractionDigits Maximum fraction digits (default 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, minimumFractionDigits = 1, maximumFractionDigits = 1): string => {
  return `${value.toFixed(minimumFractionDigits)}%`;
};

/**
 * Format a date value
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', options || {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format a number value
 * @param value Number to format
 * @param minimumFractionDigits Minimum fraction digits (default 0)
 * @param maximumFractionDigits Maximum fraction digits (default 0)
 * @returns Formatted number string
 */
export const formatNumber = (value: number | string, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  const numValue = toNumber(value);
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(numValue);
};
