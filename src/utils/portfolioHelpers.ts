
import { DividendHistory } from '@/types/raioXTypes';

/**
 * Remove duplicate dividend entries based on Asset and Payment Date
 * @param dividendHistory The raw dividend history from the database
 * @returns Deduplicated dividend history
 */
export const removeDuplicateDividends = (dividendHistory: DividendHistory[]): DividendHistory[] => {
  if (!dividendHistory || dividendHistory.length === 0) {
    return [];
  }
  
  const uniqueMap = new Map<string, DividendHistory>();
  
  dividendHistory.forEach(dividend => {
    // Get just the date part (without time) for comparison
    const paymentDateObj = new Date(dividend.payment_date);
    const datePart = paymentDateObj.toISOString().split('T')[0];
    
    // Create a unique key based on asset and payment date
    const uniqueKey = `${dividend.asset}-${datePart}`;
    
    // Only add if not already in the map
    if (!uniqueMap.has(uniqueKey)) {
      uniqueMap.set(uniqueKey, dividend);
    }
  });
  
  return Array.from(uniqueMap.values());
};

/**
 * Calculate total dividends from dividend history
 * @param dividendHistory The dividend history array (already deduplicated)
 * @returns Total dividend value
 */
export const calculateTotalDividends = (dividendHistory: DividendHistory[]): number => {
  if (!dividendHistory || dividendHistory.length === 0) {
    return 0;
  }
  
  const deduplicated = removeDuplicateDividends(dividendHistory);
  
  return deduplicated.reduce((total, item) => {
    // Parse value safely
    const value = parseFloat(item.value);
    if (isNaN(value)) return total;
    return total + value;
  }, 0);
};

/**
 * Group dividends by month and year
 * @param dividendHistory The dividend history array
 * @returns Map of month-year to dividend total
 */
export const groupDividendsByMonth = (dividendHistory: DividendHistory[]): Map<string, number> => {
  const monthlyDividends = new Map<string, number>();
  
  if (!dividendHistory || dividendHistory.length === 0) {
    return monthlyDividends;
  }
  
  const deduplicated = removeDuplicateDividends(dividendHistory);
  
  deduplicated.forEach(dividend => {
    const paymentDate = new Date(dividend.payment_date);
    if (isNaN(paymentDate.getTime())) return;
    
    const monthYearKey = `${paymentDate.getMonth() + 1}-${paymentDate.getFullYear()}`;
    const currentValue = monthlyDividends.get(monthYearKey) || 0;
    const dividendValue = parseFloat(dividend.value) || 0;
    
    monthlyDividends.set(monthYearKey, currentValue + dividendValue);
  });
  
  return monthlyDividends;
};
