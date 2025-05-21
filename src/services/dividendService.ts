
import { DividendHistory, DataSourceType } from '@/types/raioXTypes';
import { parseValueToNumber } from '@/components/modules/dividends/dividendUtils';
import { toString } from '@/utils/typeConversionHelpers';

/**
 * Calculate total dividends from the dividend history
 * @param dividendHistory Array of dividend history items
 * @returns Total dividends amount
 */
export const calculateTotalDividends = (dividendHistory: any[]) => {
  if (!dividendHistory || !dividendHistory.length) return 0;
  
  return dividendHistory.reduce((total, item) => {
    // Use the parseValueToNumber helper to handle Brazilian currency format
    const value = parseValueToNumber(toString(item.value || '0'));
    return total + value;
  }, 0);
};

/**
 * Calculate monthly average dividends from the dividend history
 * @param dividendHistory Array of dividend history items
 * @param monthsToConsider Number of months to consider for average calculation
 * @returns Monthly average dividends
 */
export const calculateMonthlyAverageDividends = (dividendHistory: any[], monthsToConsider = 12) => {
  if (!dividendHistory || !dividendHistory.length) return 0;
  
  // Group dividends by month
  const dividendsByMonth: Record<string, number> = {};
  
  dividendHistory.forEach(item => {
    if (!item.payment_date) return;
    
    // Extract year and month from payment_date
    const paymentDate = item.payment_date.split(' ')[0]; // Format: "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
    const yearMonth = paymentDate.substring(0, 7); // "YYYY-MM"
    
    // Parse the value using the helper function
    const value = parseValueToNumber(toString(item.value || '0'));
    
    // Add to month total
    if (!dividendsByMonth[yearMonth]) {
      dividendsByMonth[yearMonth] = 0;
    }
    
    dividendsByMonth[yearMonth] += value;
  });
  
  // Get the list of months
  const months = Object.keys(dividendsByMonth).sort().reverse();
  
  // Calculate total for the specified number of months (or all if less)
  const relevantMonths = months.slice(0, monthsToConsider);
  const totalDividends = relevantMonths.reduce((total, month) => total + dividendsByMonth[month], 0);
  
  // Calculate average (if we have data for at least one month)
  if (relevantMonths.length === 0) return 0;
  
  return totalDividends / Math.min(relevantMonths.length, monthsToConsider);
};

/**
 * Gets a summary of dividend performance
 * @param dividendHistory Array of dividend history items
 * @param portfolioValue Total portfolio value
 * @returns Dividend performance summary
 */
export const getDividendPerformanceSummary = (dividendHistory: any[], portfolioValue: number) => {
  const totalDividends = calculateTotalDividends(dividendHistory);
  const monthlyAverage = calculateMonthlyAverageDividends(dividendHistory);
  
  // Calculate dividend yield (annualized)
  const annualDividends = monthlyAverage * 12;
  const dividendYield = portfolioValue > 0 ? (annualDividends / portfolioValue) * 100 : 0;
  
  // Count unique assets that paid dividends
  const uniqueAssets = new Set();
  dividendHistory.forEach(item => {
    if (item.asset) uniqueAssets.add(item.asset);
  });
  
  // Group by type
  const dividendsByType: Record<string, number> = {};
  dividendHistory.forEach(item => {
    const type = item.type || 'Dividend';
    if (!dividendsByType[type]) {
      dividendsByType[type] = 0;
    }
    dividendsByType[type] += parseValueToNumber(item.value || '0');
  });
  
  return {
    totalDividends,
    monthlyAverage,
    dividendYield,
    dividendCount: dividendHistory.length,
    uniqueAssetsCount: uniqueAssets.size,
    dividendsByType,
    dataSource: dividendHistory.length > 0 && dividendHistory[0].dataSource === 'supabase' 
      ? 'supabase' as DataSourceType 
      : 'synthetic' as DataSourceType
  };
};

export default {
  calculateTotalDividends,
  calculateMonthlyAverageDividends,
  getDividendPerformanceSummary
};
