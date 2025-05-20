import { supabase } from "@/integrations/supabase/client";
import { parseValueToNumber } from "@/components/modules/dividends/dividendUtils";
import { toNumber, toString, toFormattableString } from '@/utils/typeConversionHelpers';
import { DividendHistory, FinancialSummary, DataSourceType } from '@/types/raioXTypes';

// Define the data source type
export type DataSource = DataSourceType;

/**
 * Fetches client portfolio summary from the database
 * @param clientId Client account ID
 * @returns Portfolio summary data
 */
export const getClientPortfolioSummary = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('investor_portfolio_summary')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching portfolio summary:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSourceType } : null;
  } catch (error) {
    console.error("Error in portfolio summary fetch:", error);
    return null;
  }
};

/**
 * Fetches client's fixed income investments
 * @param clientId Client account ID
 * @returns Fixed income investments
 */
export const getClientFixedIncome = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('fixed_income')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching fixed income:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in fixed income fetch:", error);
    return [];
  }
};

/**
 * Fetches client's investment funds
 * @param clientId Client account ID
 * @returns Investment funds
 */
export const getClientInvestmentFunds = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('investment_funds')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching investment funds:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in investment funds fetch:", error);
    return [];
  }
};

/**
 * Fetches client's real estate investments
 * @param clientId Client account ID
 * @returns Real estate investments
 */
export const getClientRealEstate = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('real_estate')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching real estate:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
  } catch (error) {
    console.error("Error in real estate fetch:", error);
    return [];
  }
};

/**
 * Fetches client's stocks
 * @param clientId Client account ID
 * @returns Stocks
 */
export const getClientStocks = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching stocks:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
  } catch (error) {
    console.error("Error in stocks fetch:", error);
    return [];
  }
};

/**
 * Fetches client's profitability data
 * @param clientId Client account ID
 * @returns Profitability data
 */
export const getClientProfitability = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('profitability_ytd')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching profitability:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSource } : null;
  } catch (error) {
    console.error("Error in profitability fetch:", error);
    return null;
  }
};

/**
 * Fetches client's dividend history, filtering out future unpaid dividends
 * @param clientId Client account ID
 * @returns Dividend history data (only paid dividends)
 */
export const getClientDividendHistory = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('portfolio_earnings_history')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .order('payment_date', { ascending: false });
    
    if (error) {
      console.error("Error fetching dividend history:", error);
      return [];
    }
    
    if (!data || !data.length) return [];
    
    // Filter out future dividends that haven't been paid yet
    // Only include dividends that have a payment date in the past
    const now = new Date();
    const paidDividends = data.filter(dividend => {
      if (!dividend.payment_date) return true; // Include if no date specified
      
      // Parse date (format: "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD")
      const parts = dividend.payment_date.split(' ')[0].split('-');
      if (parts.length < 3) return true; // Include if can't parse date
      
      const paymentDate = new Date(
        parseInt(parts[0]), // Year
        parseInt(parts[1]) - 1, // Month (0-indexed)
        parseInt(parts[2]) // Day
      );
      
      return paymentDate <= now; // Only include if payment date is in the past
    });
    
    console.log(`Filtered dividends: ${paidDividends.length} paid out of ${data.length} total`);
    
    // Add dataSource metadata to each item
    return paidDividends.map(item => ({ ...item, dataSource: 'supabase' as DataSource }));
  } catch (error) {
    console.error("Error in dividend history fetch:", error);
    return [];
  }
};

/**
 * Fetches client's summary information
 * @param clientId Client account ID
 * @returns Client summary data
 */
export const getClientSummary = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('investors_summaries')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching client summary:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSource } : null;
  } catch (error) {
    console.error("Error in client summary fetch:", error);
    return null;
  }
};

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
      ? 'supabase' as DataSource 
      : 'synthetic' as DataSource
  };
};

/**
 * Gets the client's total portfolio value including OpenFinance investments
 * @param clientId Client account ID
 * @param portfolioSummary Portfolio summary from XP
 * @returns Total portfolio value including external investments
 */
export const getConsolidatedPortfolioValue = async (clientId: number | null, portfolioSummary: any) => {
  if (!clientId) return null;
  
  try {
    // Get OpenFinance accounts mapped to this client
    const { data: accountData, error: accountError } = await supabase
      .from('investorXOpenFinanceAccount')
      .select('account_id')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (accountError || !accountData || accountData.length === 0) {
      // Return XP portfolio value only
      return portfolioSummary ? {
        xpValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
        externalValue: 0,
        totalValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
        dataSource: 'supabase' as DataSource
      } : null;
    }
    
    const accountIds = accountData.map(item => item.account_id).filter(Boolean);
    
    // Get OpenFinance investments
    const { data: investmentData, error: investmentError } = await supabase
      .from('open_finance_investments')
      .select('book_amount')
      .in('item_id', accountIds);
    
    if (investmentError || !investmentData) {
      console.error("Error fetching OpenFinance investment values:", investmentError);
      return portfolioSummary ? {
        xpValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
        externalValue: 0,
        totalValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
        dataSource: 'supabase' as DataSource
      } : null;
    }
    
    // Calculate total external investment value
    const externalValue = investmentData.reduce((sum, item) => {
      return sum + (Number(item.book_amount) || 0);
    }, 0);
    
    // Calculate total combined value
    const xpValue = parseValueToNumber(portfolioSummary?.total_portfolio_value || '0');
    
    return {
      xpValue,
      externalValue,
      totalValue: xpValue + externalValue,
      dataSource: 'supabase' as DataSource
    };
  } catch (error) {
    console.error("Error calculating consolidated portfolio value:", error);
    return portfolioSummary ? {
      xpValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
      externalValue: 0,
      totalValue: parseValueToNumber(portfolioSummary.total_portfolio_value || '0'),
      dataSource: 'supabase' as DataSource
    } : null;
  }
};

/**
 * Generate a consolidated financial report merging XP and OpenFinance data
 * @param clientId Client account ID
 * @returns Consolidated financial report
 */
export const generateConsolidatedFinancialReport = async (clientId: number | null) => {
  if (!clientId) return null;
  
  // Get XP portfolio data
  const portfolioSummary = await getClientPortfolioSummary(clientId);
  const dividendHistory = await getClientDividendHistory(clientId);
  const fixedIncome = await getClientFixedIncome(clientId);
  const investmentFunds = await getClientInvestmentFunds(clientId);
  const realEstate = await getClientRealEstate(clientId);
  const stocks = await getClientStocks(clientId);
  const profitability = await getClientProfitability(clientId);
  
  // Get consolidated portfolio value (XP + external)
  const consolidatedValue = await getConsolidatedPortfolioValue(clientId, portfolioSummary);
  
  // Calculate dividend performance
  const dividendPerformance = getDividendPerformanceSummary(
    dividendHistory, 
    portfolioSummary ? parseValueToNumber(portfolioSummary.total_portfolio_value || '0') : 0
  );
  
  // Calculate XP allocation
  const allocation = {
    fixedIncome: portfolioSummary ? parseValueToNumber(portfolioSummary.fixed_income_value || '0') : 0,
    investmentFunds: portfolioSummary ? parseValueToNumber(portfolioSummary.investment_fund_value || '0') : 0,
    realEstate: portfolioSummary ? parseValueToNumber(portfolioSummary.real_estate_value || '0') : 0,
    stocks: portfolioSummary ? parseValueToNumber(portfolioSummary.stocks_value || '0') : 0,
    other: 0,
    total: consolidatedValue ? consolidatedValue.xpValue : 0
  };
  
  allocation.other = allocation.total - (
    allocation.fixedIncome + 
    allocation.investmentFunds + 
    allocation.realEstate + 
    allocation.stocks
  );
  
  // Check if we have OpenFinance data
  const hasOpenFinanceData = consolidatedValue ? consolidatedValue.externalValue > 0 : false;
  
  return {
    allocation,
    dividendPerformance,
    portfolioSummary,
    fixedIncome,
    investmentFunds,
    realEstate,
    stocks,
    profitability,
    consolidatedValue,
    hasOpenFinanceData,
    dataSource: 'supabase' as DataSource
  };
};

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
  // Calculate monthly income and expenses
  const monthlyIncome = calculateTotalDividends(dividendHistory || []);
  const monthlyExpenses = calculateTotalDividends(portfolioSummary?.monthly_expenses || []);
  
  // Calculate savings rate
  const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
  
  // Convert values where needed using our utility functions
  return {
    totalAssets: toNumber(portfolioSummary?.total_portfolio_value),
    monthlyIncome: toNumber(monthlyIncome),
    monthlyExpenses: toNumber(monthlyExpenses),
    savingsRate: toNumber(savingsRate),
    netWorth: toNumber(portfolioSummary?.total_portfolio_value) * 0.8, // Net worth = assets - debts (approximation)
    investmentBalance: toNumber(portfolioSummary?.total_portfolio_value) * 0.9, // Approximate investment balance
    cashReserves: toNumber(portfolioSummary?.total_portfolio_value) * 0.1, // Approximate cash reserves
    debtTotal: toNumber(portfolioSummary?.total_portfolio_value) * 0.2, // Approximate debt (placeholder)
    totalLiabilities: toNumber(portfolioSummary?.total_portfolio_value) * 0.2, // Same as debt total
    liquidAssets: toNumber(portfolioSummary?.total_portfolio_value) * 0.3, // Approximate liquid assets
    
    dataSource: portfolioSummary?.dataSource || 'synthetic',
  };
};

/**
 * Format a value to a currency string
 * @param value The value to format
 * @returns The formatted currency string
 */
const formatCurrency = (value: any): string => {
  if (!value) return "R$ 0,00";
  return typeof value === 'string' ? value : String(value);
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
  const totalValue = portfolioSummary.total_portfolio_value ? parseFloat(portfolioSummary.total_portfolio_value) : 0;
  
  // Calculate percentages and ensure they're numbers
  const fixed = typeof portfolioSummary.fixed_income_representation === 'number' ? 
                portfolioSummary.fixed_income_representation : 
                parseFloat(portfolioSummary.fixed_income_representation || "0");
                
  const funds = typeof portfolioSummary.investment_fund_representation === 'number' ? 
               portfolioSummary.investment_fund_representation : 
               parseFloat(portfolioSummary.investment_fund_representation || "0");
               
  const real = typeof portfolioSummary.real_estate_representation === 'number' ? 
              portfolioSummary.real_estate_representation : 
              parseFloat(portfolioSummary.real_estate_representation || "0");
              
  const stocks = typeof portfolioSummary.stocks_representation === 'string' ? 
                parseFloat(portfolioSummary.stocks_representation || "0") : 
                portfolioSummary.stocks_representation || 0;
  
  // Format values for display (ensuring they are strings)
  const fixedIncomeValue = formatCurrency(portfolioSummary.fixed_income_value ? 
    String(portfolioSummary.fixed_income_value) : "0");
  const fundsValue = formatCurrency(portfolioSummary.investment_fund_value ? 
    String(portfolioSummary.investment_fund_value) : "0");
  const realEstateValue = formatCurrency(portfolioSummary.real_estate_value ? 
    String(portfolioSummary.real_estate_value) : "0");
  const stocksValue = formatCurrency(portfolioSummary.stocks_value ? 
    String(portfolioSummary.stocks_value) : "0");
  
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
