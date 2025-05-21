
import { DividendHistory } from '@/types/raioXTypes';
import { toParseableString } from '@/utils/typeConversionHelpers';

/**
 * Creates a deep clone of an object
 * @param obj The object to clone
 * @returns A deep clone of the input object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any;
  }

  // Handle Object
  if (obj instanceof Object) {
    const copy: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, any>)[key]);
    });
    return copy as T;
  }

  throw new Error(`Unable to copy obj! Its type isn't supported: ${typeof obj}`);
};

/**
 * Removes duplicate dividend entries from dividend history
 * based on asset, payment_date and value
 */
export const removeDuplicateDividends = (dividends: DividendHistory[]): DividendHistory[] => {
  if (!dividends || !Array.isArray(dividends)) {
    return [];
  }
  
  // Create a Map to track unique dividends
  const uniqueDividendsMap = new Map();
  
  dividends.forEach(dividend => {
    // Create a unique key based on asset, date and value
    const key = `${dividend.asset}-${dividend.payment_date}-${String(dividend.value)}`;
    
    // Only add to map if this key doesn't exist yet
    if (!uniqueDividendsMap.has(key)) {
      uniqueDividendsMap.set(key, dividend);
    }
  });
  
  // Convert map values back to array
  const uniqueDividends = Array.from(uniqueDividendsMap.values());
  
  console.info(`Filtered dividends: ${uniqueDividends.length} paid out of ${dividends.length} total`);
  
  return uniqueDividends;
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
    const value = parseFloat(toParseableString(item.value));
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
    const dividendValue = parseFloat(toParseableString(dividend.value)) || 0;
    
    monthlyDividends.set(monthYearKey, currentValue + dividendValue);
  });
  
  return monthlyDividends;
};
