
/**
 * Formats a number as a currency string in Brazilian Reals (R$)
 * @param value The number to format
 * @param maximumFractionDigits Number of decimal places (default 2)
 * @returns A formatted currency string
 */
export const formatCurrency = (value: number | string, maximumFractionDigits = 2): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits
  }).format(numValue);
};

/**
 * Formats a percentage value
 * @param value The number to format as percentage
 * @param maximumFractionDigits Number of decimal places (default 1)
 * @returns A formatted percentage string
 */
export const formatPercentage = (value: number | string, maximumFractionDigits = 1): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0%';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits
  }).format(numValue / 100);
};

/**
 * Formats a date in Brazilian format (DD/MM/YYYY)
 * @param date The date to format (string or Date object)
 * @returns A formatted date string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('pt-BR');
};
