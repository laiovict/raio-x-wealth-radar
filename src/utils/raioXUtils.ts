
import { DividendHistory, FinancialSummary } from '@/types/raioXTypes';
import { toNumber } from '@/utils/formattingUtils';

/**
 * Format currency values consistently
 * @param value Number to format as currency
 * @param minimumFractionDigits Minimum fraction digits
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, minimumFractionDigits = 0, maximumFractionDigits = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format percentage values consistently
 * @param value Number to format as percentage
 * @param digits Decimal digits to display
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, digits = 1) => {
  return `${value.toFixed(digits)}%`;
};

/**
 * Format date values consistently
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
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
    return total + parseValueToNumber(item.value || '0');
  }, 0);
};

/**
 * Calculate monthly average dividends
 * @param dividendHistory Array of dividend history entries
 * @param monthsToConsider Number of months to consider
 * @returns Monthly average dividends
 */
export const calculateMonthlyAverageDividends = (dividendHistory: DividendHistory[] | undefined, monthsToConsider = 12): number => {
  if (!dividendHistory || dividendHistory.length === 0) return 0;
  
  // Group dividends by month
  const dividendsByMonth: Record<string, number> = {};
  
  dividendHistory.forEach(item => {
    if (!item.payment_date) return;
    
    const paymentDate = item.payment_date.split(' ')[0]; // Format: "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
    const yearMonth = paymentDate.substring(0, 7); // "YYYY-MM"
    
    if (!dividendsByMonth[yearMonth]) {
      dividendsByMonth[yearMonth] = 0;
    }
    
    dividendsByMonth[yearMonth] += parseValueToNumber(item.value || '0');
  });
  
  const months = Object.keys(dividendsByMonth).sort().reverse();
  const relevantMonths = months.slice(0, monthsToConsider);
  const totalDividends = relevantMonths.reduce((total, month) => total + dividendsByMonth[month], 0);
  
  return relevantMonths.length === 0 ? 0 : totalDividends / Math.min(relevantMonths.length, monthsToConsider);
};

/**
 * Generate a financial summary from portfolio data
 * @param portfolioSummary Portfolio summary data
 * @param dividendHistory Dividend history data
 * @returns Financial summary object
 */
export const generateFinancialSummary = (
  portfolioSummary: any,
  dividendHistory: DividendHistory[] | undefined
): FinancialSummary => {
  // Parse total portfolio value
  const totalAssets = parseValueToNumber(portfolioSummary?.total_portfolio_value || '0');
  
  // Calculate dividend metrics
  const totalDividends = calculateTotalDividends(dividendHistory);
  const monthlyDividendAvg = calculateMonthlyAverageDividends(dividendHistory);
  
  // Default monthly income (could be enhanced with more data)
  const monthlyIncome = monthlyDividendAvg * 1.5; // Estimate income as slightly higher than dividends
  
  // Estimate monthly expenses (typically 60-80% of income for average investors)
  const monthlyExpenses = monthlyIncome * 0.7;
  
  // Calculate savings rate
  const savingsRate = totalAssets > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  
  // Map asset allocation from portfolio summary
  const stocksPercentage = parseValueToNumber(portfolioSummary?.stocks_representation || '0');
  const bondsPercentage = portfolioSummary?.fixed_income_representation || 0;
  const realEstatePercentage = portfolioSummary?.real_estate_representation || 0;
  const alternativesPercentage = (
    (portfolioSummary?.investment_fund_representation || 0) + 
    toNumber(portfolioSummary?.investment_international_representation || '0')
  );
  const cashPercentage = toNumber(portfolioSummary?.total_balance_representation || '0');
  
  // Determine risk profile based on asset allocation
  let riskProfile = 'Moderado';
  if (stocksPercentage > 60) {
    riskProfile = 'Agressivo';
  } else if (stocksPercentage < 30) {
    riskProfile = 'Conservador';
  }
  
  // Create risk metrics
  const riskMetrics = [
    { name: 'Concentração em Renda Variável', value: stocksPercentage, color: '#34d399' },
    { name: 'Diversificação Internacional', value: toNumber(portfolioSummary?.investment_international_representation || '0'), color: '#60a5fa' },
    { name: 'Exposição a Alternativos', value: portfolioSummary?.investment_fund_representation || 0, color: '#a78bfa' },
  ];
  
  return {
    totalAssets,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    netWorth: totalAssets * 0.8, // Net worth = assets - debts (approximation)
    investmentBalance: totalAssets * 0.9, // Approximate investment balance
    cashReserves: totalAssets * 0.1, // Approximate cash reserves
    debtTotal: totalAssets * 0.2, // Approximate debt (placeholder)
    totalLiabilities: totalAssets * 0.2, // Same as debt total
    liquidAssets: totalAssets * 0.3, // Approximate liquid assets
    fixedIncomePercent: bondsPercentage,
    variableIncomePercent: stocksPercentage,
    realEstatePercent: realEstatePercentage,
    otherPercent: alternativesPercentage,
    monthlyDividends: monthlyDividendAvg,
    annualDividends: monthlyDividendAvg * 12,
    dividendYield: totalAssets > 0 ? (monthlyDividendAvg * 12 / totalAssets) * 100 : 0,
    profitability: {
      ytd: 0,
      sixMonths: 0,
      twelveMonths: 0
    },
    riskProfile,
    allocationSummary: {
      stocks: stocksPercentage,
      bonds: bondsPercentage,
      cash: cashPercentage,
      realEstate: realEstatePercentage,
      alternatives: alternativesPercentage
    },
    riskMetrics,
    creditScore: 750, // Placeholder credit score
    dataSource: portfolioSummary?.dataSource || 'synthetic',
  };
};
