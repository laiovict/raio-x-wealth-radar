
import { FinancialSummary, DividendHistory } from '@/types/raioXTypes';
import { calculateTotalDividends } from '@/services/dividendService';
import { toNumber } from '@/utils/typeConversionHelpers';

/**
 * Generate a financial summary from portfolio data
 */
export const generateFinancialSummary = (
  portfolioSummary: any,
  dividendHistory: DividendHistory[] | undefined
): FinancialSummary => {
  // Calculate monthly income and expenses
  const monthlyIncome = calculateTotalDividends(dividendHistory || []);
  const monthlyExpenses = calculateTotalDividends(portfolioSummary?.monthly_expenses || []);
  
  // Calculate savings rate
  const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome * 100 : 0;
  
  // Get portfolio value from summary
  const portfolioValue = toNumber(portfolioSummary?.total_portfolio_value || '0');
  
  // Calculate asset percentages
  const fixedIncomePercent = toNumber(portfolioSummary?.fixed_income_representation || '0');
  const variableIncomePercent = toNumber(portfolioSummary?.stocks_representation || '0');
  const realEstatePercent = toNumber(portfolioSummary?.real_estate_representation || '0');
  const otherPercent = 100 - (fixedIncomePercent + variableIncomePercent + realEstatePercent);
  
  // Calculate dividend metrics
  const monthlyDividends = monthlyIncome / 12; // Simple average
  const annualDividends = monthlyIncome;
  const dividendYield = portfolioValue > 0 ? (annualDividends / portfolioValue) * 100 : 0;
  
  // Create financial summary with all required properties
  return {
    totalAssets: portfolioValue,
    netWorth: portfolioValue - (portfolioValue * 0.2), // Estimate net worth as assets minus 20% for liabilities
    totalLiabilities: portfolioValue * 0.2, // Estimate liabilities as 20% of portfolio value
    debtTotal: portfolioValue * 0.2, // Same as liabilities
    
    monthlyIncome: monthlyIncome,
    monthlyExpenses: monthlyExpenses,
    savingsRate: savingsRate,
    
    investmentBalance: portfolioValue * 0.9, // Estimate investment balance as 90% of portfolio
    cashReserves: portfolioValue * 0.1, // Estimate cash reserves as 10% of portfolio
    liquidAssets: portfolioValue * 0.3, // Estimate liquid assets as 30% of portfolio
    
    // Asset allocation
    fixedIncomePercent,
    variableIncomePercent,
    realEstatePercent,
    otherPercent,
    
    // Dividend information
    monthlyDividends,
    annualDividends,
    dividendYield,
    
    // Data source
    dataSource: portfolioSummary?.dataSource || 'synthetic',
    
    // Profitability (if available in portfolio summary)
    profitability: portfolioSummary?.profitability || {
      ytd: toNumber(portfolioSummary?.ytd || '0'),
      sixMonths: toNumber(portfolioSummary?.six_months || '0'),
      twelveMonths: toNumber(portfolioSummary?.twelve_months || '0'),
    }
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0%';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(numValue / 100);
};

export default {
  generateFinancialSummary,
  formatCurrency,
  formatPercentage
};
