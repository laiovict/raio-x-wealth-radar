
/**
 * Formatting utilities for consistent display across the application
 */

import { toNumber, toString } from './typeConversionHelpers';

/**
 * Format a value as currency (BRL)
 * @param value The value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: string | number): string => {
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
export const formatPercentage = (value: string | number, decimals = 2): string => {
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
