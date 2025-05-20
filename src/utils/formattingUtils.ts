/**
 * Formatting utilities for consistent display across the application
 */

import { toNumber, toString, ensureString, ensureNumber } from './typeConversionHelpers';

/**
 * Format a value as currency (BRL)
 * @param value The value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: string | number | undefined | null): string => {
  // Convert to number first
  const numValue = toNumber(value);
  
  // Return formatted value
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
};

/**
 * Format a value as a percentage
 * @param value The value to format
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: string | number | undefined | null, decimals = 2): string => {
  // Convert to number first
  const numValue = toNumber(value);
  
  // Return formatted value
  return `${numValue.toFixed(decimals)}%`;
};

/**
 * Format a date in Brazilian style
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format a date in a shorter format (day and month)
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatShortDate = (date: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });
};

/**
 * Format a value as a number with thousands separators
 * @param value The value to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (value: string | number, decimals = 0): string => {
  // Convert to number first  
  const numValue = toNumber(value);

  // Return formatted value
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(numValue);
};

/**
 * Truncate a string if it exceeds a certain length
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated string
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format a name (capitalize first letter of each word)
 * @param name The name to format
 * @returns Formatted name
 */
export const formatName = (name: string): string => {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format a value for display based on its type
 * Automatically detects if it should be shown as currency, percentage or plain number
 * 
 * @param value The value to format
 * @param type Optional formatting type ('currency', 'percentage', 'number')
 * @param decimals Number of decimal places for numbers/percentages
 * @returns Formatted display string
 */
export const smartFormat = (
  value: string | number | undefined | null, 
  type?: 'currency' | 'percentage' | 'number', 
  decimals = 2
): string => {
  if (value === undefined || value === null) return '';
  
  // Determine type automatically if not specified
  if (!type) {
    if (toString(value).includes('%')) {
      type = 'percentage';
    } else if (toString(value).includes('R$')) {
      type = 'currency';
    } else {
      type = 'number';
    }
  }
  
  switch (type) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return formatPercentage(value, decimals);
    case 'number':
      return formatNumber(value, decimals);
    default:
      return toString(value);
  }
};

/**
 * Format a number as Brazilian currency (R$) and ensure it's always a string
 * Safe version that handles any input type
 * 
 * @param value The value to format as currency
 * @returns Formatted currency string
 */
export const safeCurrencyFormat = (value: any): string => {
  // Handle edge cases
  if (value === undefined || value === null) return 'R$ 0,00';
  
  // Convert to number safely
  const numValue = toNumber(value);
  return formatCurrency(numValue);
};
