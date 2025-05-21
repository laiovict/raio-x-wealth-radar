import { DividendHistory, FinancialSummary } from '@/types/raioXTypes';
import { toNumber as convertToNumber, ensureNumber, ensureString } from '@/utils/typeConversionHelpers';

/**
 * Format currency values consistently
 * @param value Number or string to format as currency
 * @param minimumFractionDigits Minimum fraction digits
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | string | undefined | null, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  // Convert value to number if it's a string
  const numValue = convertToNumber(value);
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numValue);
};

/**
 * Format percentage values consistently
 * @param value Number to format as percentage
 * @param digits Decimal digits to display
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number | string | undefined | null, digits = 1): string => {
  const numValue = convertToNumber(value);
  return `${numValue.toFixed(digits)}%`;
};

/**
 * Format date values consistently
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
 * Parse string values to numbers (handling Brazilian currency format)
 * @param value String value to parse
 * @returns Number value
 */
export const parseValueToNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  // Handle Brazilian currency format and other formats
  return Number(value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
};

/**
 * Calculate total dividends from dividend history
 * @param dividendHistory Array of dividend history entries
 * @returns Total dividends
 */
export const calculateTotalDividends = (dividendHistory: DividendHistory[] | undefined): number => {
  if (!dividendHistory || dividendHistory.length === 0) return 0;
  
  return dividendHistory.reduce((total, item) => {
    return total + parseValueToNumber(ensureString(item.value || '0'));
  }, 0);
};

/**
 * Export toNumber from typeConversionHelpers for backward compatibility
 */
export const toNumber = convertToNumber;

/**
 * Generate financial summary from portfolio data
 * @param portfolioSummary Portfolio summary data
 * @param dividendHistory Dividend history data
 * @returns FinancialSummary object
 */
export const generateFinancialSummary = (portfolioSummary: any, dividendHistory: DividendHistory[] | undefined): FinancialSummary => {
  const total = convertToNumber(portfolioSummary?.total_portfolio_value);
  const fixedIncome = convertToNumber(portfolioSummary?.fixed_income_value);
  const stocks = convertToNumber(portfolioSummary?.stocks_value);
  const realEstate = convertToNumber(portfolioSummary?.real_estate_value);
  const other = convertToNumber(portfolioSummary?.investment_fund_value) + 
                convertToNumber(portfolioSummary?.private_pension_value);
  
  const totalDividends = calculateTotalDividends(dividendHistory);
  const dividendYield = total > 0 ? (totalDividends / total) * 100 : 0;
  
  return {
    totalAssets: total,
    fixedIncomePercent: total > 0 ? (fixedIncome / total) * 100 : 0,
    variableIncomePercent: total > 0 ? (stocks / total) * 100 : 0,
    realEstatePercent: total > 0 ? (realEstate / total) * 100 : 0,
    otherPercent: total > 0 ? (other / total) * 100 : 0,
    monthlyDividends: totalDividends / 12,
    annualDividends: totalDividends,
    dividendYield,
    profitability: {
      ytd: 5.2,
      sixMonths: 3.1,
      twelveMonths: 8.7
    },
    netWorth: total * 0.8, // Synthetic calculation: assets - debts (approximation)
    monthlyIncome: totalDividends / 12 * 2.5, // Synthetic calculation: dividend income + estimated other income
    monthlyExpenses: totalDividends / 12 * 0.6, // Synthetic calculation: 60% of monthly income
    savingsRate: 0.4, // Synthetic calculation: 40% savings rate
    liquidAssets: total * 0.3, // Synthetic calculation: 30% of total assets as liquid assets
    dataSource: portfolioSummary?.dataSource || 'synthetic'
  };
};
