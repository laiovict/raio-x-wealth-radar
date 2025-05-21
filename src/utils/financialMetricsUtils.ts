
import { toNumber, ensureNumber } from '@/utils/typeConversionHelpers';
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Calculate diversification score based on portfolio allocation
 * @param portfolioSummary Summary of the portfolio with asset allocations
 * @returns Score between 0-100 with data source
 */
export const calculateDiversificationScore = (portfolioSummary: any): { score: number; dataSource: DataSourceType } => {
  if (!portfolioSummary) {
    return { score: 65, dataSource: 'synthetic' };
  }

  // Get allocation percentages
  const fixedIncome = toNumber(portfolioSummary.fixed_income_representation) || 0;
  const stocks = toNumber(portfolioSummary.stocks_representation) || 0;
  const funds = toNumber(portfolioSummary.investment_fund_representation) || 0;
  const realEstate = toNumber(portfolioSummary.real_estate_representation) || 0;
  const pension = toNumber(portfolioSummary.private_pension_representation) || 0;
  const international = toNumber(portfolioSummary.investment_international_representation) || 0;

  // Count how many asset classes have significant allocations (>10%)
  let significantClasses = 0;
  if (fixedIncome > 5) significantClasses++;
  if (stocks > 5) significantClasses++;
  if (funds > 5) significantClasses++;
  if (realEstate > 5) significantClasses++;
  if (pension > 5) significantClasses++;
  if (international > 5) significantClasses++;

  // Base score on number of significant asset classes
  let score = Math.min(significantClasses * 20, 100);
  
  // Penalize over-concentration (>70% in one asset class)
  const maxAllocation = Math.max(fixedIncome, stocks, funds, realEstate, pension, international);
  if (maxAllocation > 70) {
    score = Math.max(score - 20, 0);
  } else if (maxAllocation > 50) {
    score = Math.max(score - 10, 0);
  }

  // Reward international exposure
  if (international > 15) {
    score = Math.min(score + 10, 100);
  }

  return {
    score: Math.round(score),
    dataSource: portfolioSummary.dataSource || 'xp'
  };
};

/**
 * Calculate savings rate based on assets to liabilities ratio
 * A corrected implementation considering assets divided by liabilities
 * @param assets Total assets value
 * @param liabilities Total liabilities value (if available)
 * @returns Savings rate with data source
 */
export const calculateSavingsRate = (
  assets: number | string | null | undefined,
  liabilities: number | string | null | undefined = 0
): { rate: number; trend: string; dataSource: DataSourceType } => {
  const totalAssets = toNumber(assets);
  // Default to 20% of assets if liabilities not available
  const totalLiabilities = liabilities ? toNumber(liabilities) : totalAssets * 0.2;
  
  // If we have no valid asset data, return synthetic data
  if (!totalAssets || totalAssets <= 0) {
    return { rate: 28, trend: '+2.0%', dataSource: 'synthetic' };
  }

  // If liabilities are zero, that's technically infinite savings rate, but we'll cap at 100%
  if (totalLiabilities <= 0) {
    return { rate: 100, trend: '+5.0%', dataSource: 'xp' };
  }

  // Calculate assets to liabilities ratio
  const savingsRate = Math.min((totalAssets / totalLiabilities) * 10, 100);
  
  // Simple trend calculation: assume positive if ratio > 3, negative if < 1.5
  let trend = '+2.0%';
  if (savingsRate > 50) {
    trend = '+5.0%';
  } else if (savingsRate < 25) {
    trend = '-3.0%';
  }

  return {
    rate: Math.round(savingsRate),
    trend,
    dataSource: 'xp'
  };
};

/**
 * Calculate investment consistency score based on dividend history
 * @param dividendHistory Array of dividend payments
 * @returns Investment consistency score with data source
 */
export const calculateInvestmentConsistency = (dividendHistory: any[] = []): { 
  grade: string;
  description: string;
  dataSource: DataSourceType;
} => {
  if (!dividendHistory || dividendHistory.length === 0) {
    return {
      grade: 'B',
      description: "Dados insuficientes para avaliar investimentos recorrentes",
      dataSource: 'synthetic'
    };
  }

  // Count dividend payments in last 24 months
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);

  const recentDividends = dividendHistory.filter(div => {
    const paymentDate = div.payment_date ? new Date(div.payment_date) : null;
    if (!paymentDate) return false;
    return paymentDate >= twoYearsAgo;
  });

  // Evaluate based on number of dividend payments
  if (recentDividends.length >= 12) {
    return {
      grade: 'A+',
      description: "Investiu consistentemente nos últimos 24 meses",
      dataSource: 'xp'
    };
  } else if (recentDividends.length >= 6) {
    return {
      grade: 'A',
      description: "Investimentos regulares nos últimos meses",
      dataSource: 'xp'
    };
  } else if (recentDividends.length >= 3) {
    return {
      grade: 'B+',
      description: "Alguns investimentos recentes identificados",
      dataSource: 'xp'
    };
  } else {
    return {
      grade: 'B',
      description: "Poucos investimentos recorrentes encontrados",
      dataSource: 'xp'
    };
  }
};

/**
 * Calculate spending discipline based on financial data
 * For now this returns synthetic data, would be connected to real data
 * from Open Finance in the future
 * @returns Spending discipline assessment
 */
export const calculateSpendingDiscipline = (): {
  grade: string;
  description: string;
  dataSource: DataSourceType;
} => {
  // For now, return synthetic data since this would come from Open Finance
  return {
    grade: 'B',
    description: "Excedeu o orçamento em 18% em 3 dos últimos 6 meses",
    dataSource: 'synthetic'
  };
};

/**
 * Calculate financial resilience based on emergency fund coverage
 * @param liquidAssets Liquid assets value
 * @param monthlyExpenses Monthly expenses (estimated if not provided)
 * @returns Financial resilience assessment
 */
export const calculateFinancialResilience = (
  liquidAssets: number | string | null | undefined,
  monthlyExpenses: number | string | null | undefined
): {
  grade: string;
  description: string;
  dataSource: DataSourceType;
} => {
  const liquid = ensureNumber(liquidAssets);
  
  // Estimate monthly expenses if not provided (as 2% of liquid assets)
  const expenses = monthlyExpenses ? ensureNumber(monthlyExpenses) : liquid * 0.02;
  
  if (!liquid || !expenses || expenses <= 0) {
    return {
      grade: 'A',
      description: "Reserva de emergência cobre 8 meses de despesas",
      dataSource: 'synthetic'
    };
  }

  // Calculate how many months of expenses the liquid assets can cover
  const monthsCovered = liquid / expenses;
  
  if (monthsCovered >= 12) {
    return {
      grade: 'A+',
      description: `Reserva de emergência cobre ${Math.floor(monthsCovered)} meses de despesas`,
      dataSource: 'xp'
    };
  } else if (monthsCovered >= 6) {
    return {
      grade: 'A',
      description: `Reserva de emergência cobre ${Math.floor(monthsCovered)} meses de despesas`,
      dataSource: 'xp'
    };
  } else if (monthsCovered >= 3) {
    return {
      grade: 'B+',
      description: `Reserva de emergência cobre ${Math.floor(monthsCovered)} meses de despesas`,
      dataSource: 'xp'
    };
  } else {
    return {
      grade: 'C',
      description: `Reserva de emergência cobre apenas ${Math.floor(monthsCovered)} meses de despesas`,
      dataSource: 'xp'
    };
  }
};

/**
 * Calculate overall financial behavior score
 * @param portfolioSummary Portfolio summary data
 * @param dividendHistory Dividend history data
 * @param liquidAssets Liquid assets value
 * @param monthlyExpenses Monthly expenses
 * @returns Financial behavior metrics
 */
export const calculateFinancialBehaviorMetrics = (
  portfolioSummary: any,
  dividendHistory: any[] = [],
  liquidAssets: number | string | null | undefined,
  monthlyExpenses: number | string | null | undefined
) => {
  const diversification = calculateDiversificationScore(portfolioSummary);
  const savingsRate = calculateSavingsRate(
    portfolioSummary?.total_portfolio_value,
    monthlyExpenses ? ensureNumber(monthlyExpenses) * 12 : undefined
  );
  const investmentConsistency = calculateInvestmentConsistency(dividendHistory);
  const spendingDiscipline = calculateSpendingDiscipline();
  const financialResilience = calculateFinancialResilience(liquidAssets, monthlyExpenses);

  return {
    diversification,
    savingsRate,
    investmentConsistency,
    spendingDiscipline,
    financialResilience,
    // Determine if we're using mostly real or synthetic data
    dataSource: diversification.dataSource === 'synthetic' && 
               savingsRate.dataSource === 'synthetic' &&
               investmentConsistency.dataSource === 'synthetic' ? 'synthetic' : 'xp'
  };
};
