
import { toNumber, toString, toFormattableString, toParseableString } from '@/utils/typeConversionHelpers';
import { FinancialSummary, DividendHistory, DataSourceType } from '@/types/raioXTypes';

/**
 * Generate a financial summary
 * @param portfolioSummary Portfolio summary from XP
 * @param dividendHistory Array of dividend history items
 * @returns Financial summary
 */
export const generateFinancialSummary = (
  portfolioSummary: any,
  dividendHistory: DividendHistory[] | undefined
): FinancialSummary => {
  // Import here to avoid circular dependencies
  const { calculateTotalDividends } = require('./dividendService');
  
  // Calculate monthly income and expenses
  const monthlyIncome = calculateTotalDividends(dividendHistory || []);
  const monthlyExpenses = calculateTotalDividends(portfolioSummary?.monthly_expenses || []);
  
  // Calculate savings rate
  const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
  
  // Get portfolio value (safely)
  const portfolioValue = toNumber(portfolioSummary?.total_portfolio_value);
  
  // Convert values where needed using our utility functions
  return {
    totalAssets: portfolioValue,
    monthlyIncome: toNumber(monthlyIncome),
    monthlyExpenses: toNumber(monthlyExpenses),
    savingsRate: toNumber(savingsRate),
    netWorth: portfolioValue * 0.8, // Net worth = assets - debts (approximation)
    investmentBalance: portfolioValue * 0.9, // Approximate investment balance
    cashReserves: portfolioValue * 0.1, // Approximate cash reserves
    debtTotal: portfolioValue * 0.2, // Approximate debt (placeholder)
    totalLiabilities: portfolioValue * 0.2, // Same as debt total
    liquidAssets: portfolioValue * 0.3, // Approximate liquid assets
    
    // Add asset allocation percentages
    fixedIncomePercent: toNumber(portfolioSummary?.fixed_income_representation),
    variableIncomePercent: toNumber(portfolioSummary?.stocks_representation),
    realEstatePercent: toNumber(portfolioSummary?.real_estate_representation),
    otherPercent: 100 - (
      toNumber(portfolioSummary?.fixed_income_representation || 0) +
      toNumber(portfolioSummary?.stocks_representation || 0) + 
      toNumber(portfolioSummary?.real_estate_representation || 0)
    ),
    
    // Calculate monthly and annual dividends
    monthlyDividends: calculateTotalDividends(dividendHistory || []) / 
                      (dividendHistory && dividendHistory.length > 0 ? dividendHistory.length : 12),
    annualDividends: calculateTotalDividends(dividendHistory || []),
    dividendYield: portfolioValue > 0 ? 
                  (calculateTotalDividends(dividendHistory || []) / portfolioValue) * 100 : 
                  0,
    
    dataSource: portfolioSummary?.dataSource || 'synthetic',
  };
};

/**
 * Format a value to a currency string
 * @param value The value to format
 * @returns The formatted currency string
 */
export const formatCurrency = (value: any): string => {
  if (!value) return "R$ 0,00";
  return toString(value);
};

/**
 * Get styled portfolio summary data
 * @param portfolioSummary Portfolio summary data
 * @param colorScale Color scale for the chart
 * @returns Styled portfolio summary data
 */
export const getStyledPortfolioSummaryData = (portfolioSummary: any, colorScale: any) => {
  // If no data is provided, return null
  if (!portfolioSummary) return null;
  
  // Extract values or use defaults
  const totalValue = portfolioSummary.total_portfolio_value ? parseFloat(toString(portfolioSummary.total_portfolio_value)) : 0;
  
  // Calculate percentages and ensure they're numbers
  const fixed = typeof portfolioSummary.fixed_income_representation === 'number' ? 
                portfolioSummary.fixed_income_representation : 
                parseFloat(toParseableString(portfolioSummary.fixed_income_representation, "0"));
                
  const funds = typeof portfolioSummary.investment_fund_representation === 'number' ? 
               portfolioSummary.investment_fund_representation : 
               parseFloat(toParseableString(portfolioSummary.investment_fund_representation, "0"));
               
  const real = typeof portfolioSummary.real_estate_representation === 'number' ? 
              portfolioSummary.real_estate_representation : 
              parseFloat(toParseableString(portfolioSummary.real_estate_representation, "0"));
              
  const stocks = typeof portfolioSummary.stocks_representation === 'string' ? 
                parseFloat(toParseableString(portfolioSummary.stocks_representation, "0")) : 
                portfolioSummary.stocks_representation || 0;
  
  // Format values for display (ensuring they are strings)
  const fixedIncomeValue = formatCurrency(portfolioSummary.fixed_income_value ? 
    toString(portfolioSummary.fixed_income_value) : "0");
  const fundsValue = formatCurrency(portfolioSummary.investment_fund_value ? 
    toString(portfolioSummary.investment_fund_value) : "0");
  const realEstateValue = formatCurrency(portfolioSummary.real_estate_value ? 
    toString(portfolioSummary.real_estate_value) : "0");
  const stocksValue = formatCurrency(portfolioSummary.stocks_value ? 
    toString(portfolioSummary.stocks_value) : "0");
  
  // Return the formatted data
  return [
    {
      id: "Renda Fixa",
      label: "Renda Fixa",
      value: fixed,
      color: colorScale[0],
      formattedValue: `${fixedIncomeValue} (${fixed.toFixed(1)}%)`,
    },
    {
      id: "Fundos",
      label: "Fundos",
      value: funds,
      color: colorScale[1],
      formattedValue: `${fundsValue} (${funds.toFixed(1)}%)`,
    },
    {
      id: "Imobiliários",
      label: "Imobiliários",
      value: real,
      color: colorScale[2],
      formattedValue: `${realEstateValue} (${real.toFixed(1)}%)`,
    },
    {
      id: "Ações",
      label: "Ações",
      value: stocks,
      color: colorScale[3],
      formattedValue: `${stocksValue} (${stocks.toFixed(1)}%)`,
    },
  ];
};

export default {
  generateFinancialSummary,
  formatCurrency,
  getStyledPortfolioSummaryData
};
