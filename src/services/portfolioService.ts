
import { supabase } from "@/integrations/supabase/client";

// Define the data source type
export type DataSource = 'synthetic' | 'supabase';

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
    return data ? { ...data, dataSource: 'supabase' as DataSource } : null;
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
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
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
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
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
 * Fetches client's dividend history
 * @param clientId Client account ID
 * @returns Dividend history data
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
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
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
    // Parse the value string to a number
    const value = parseFloat(item.value?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
    return total + (isNaN(value) ? 0 : value);
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
    
    // Parse the value string to a number
    const value = parseFloat(item.value?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
    
    // Add to month total
    if (!dividendsByMonth[yearMonth]) {
      dividendsByMonth[yearMonth] = 0;
    }
    
    dividendsByMonth[yearMonth] += (isNaN(value) ? 0 : value);
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
